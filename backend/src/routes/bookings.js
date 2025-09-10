import express from "express";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";
import { auth } from "../middleware/auth.js";
import Slot from "../models/Slot.js";
import Booking from "../models/Booking.js";

const router = express.Router();

// Swimming pool booking rules
// Each booking is for 1 individual swimmer

// Check availability endpoint
router.get("/check-availability/:slotId", auth(), async (req, res) => {
  try {
    const { slotId } = req.params;
    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ error: "Slot not found" });

    const now = new Date();
    if (slot.endTime <= now)
      return res.status(400).json({ error: "Cannot book past slots" });

    // Get all active bookings for this slot
    const activeBookings = await Booking.find({
      slot: slotId,
      cancelledAt: null,
    });

    const totalSwimmers = activeBookings.length;
    const availableSpaces = slot.capacity - totalSwimmers;
    const canBook = availableSpaces > 0;

    return res.json({
      slotId,
      startTime: slot.startTime,
      endTime: slot.endTime,
      gender: slot.gender,
      capacity: slot.capacity,
      occupied: totalSwimmers,
      available: availableSpaces,
      canBook: canBook,
    });
  } catch (error) {
    console.error("Check availability error:", error);
    return res.status(500).json({ error: "Failed to check availability" });
  }
});

router.post("/", auth(), [body("slotId").isMongoId()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { slotId } = req.body;
  const userId = req.user.id;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const slot = await Slot.findById(slotId).session(session);
    if (!slot) throw new Error("Slot not found");

    const now = new Date();
    if (slot.endTime <= now) throw new Error("Cannot book past slots");

    // Check if slot has enough space for 1 more swimmer
    const activeBookings = await Booking.find({
      slot: slotId,
      cancelledAt: null,
    }).session(session);

    if (activeBookings.length >= slot.capacity) {
      throw new Error(
        `Swimming pool slot is full. ${activeBookings.length}/${slot.capacity} swimmers already booked`
      );
    }

    // Prevent duplicate booking by same user on same slot
    const existing = await Booking.findOne({
      user: userId,
      slot: slot._id,
      cancelledAt: null,
    }).session(session);
    if (existing) throw new Error("Already booked this swimming pool slot");


    // Gender-based restriction: user gender must match slot gender
    const User = (await import("../models/User.js")).default;
    const user = await User.findById(userId).session(session);
    if (!user) throw new Error("User not found");
    if ((user.gender === "male" && slot.gender !== "boys") || (user.gender === "female" && slot.gender !== "girls")) {
      throw new Error("You can only book slots for your gender");
    }

    // Create the booking for 1 swimmer (individual booking)
    const booking = await Booking.create(
      [
        {
          user: userId,
          slot: slot._id,
        },
      ],
      { session }
    );

    // Update slot occupancy
    await slot.updateOccupancy();

    await session.commitTransaction();
    return res.status(201).json({
      id: booking[0]._id,
      message: "Swimming pool booking confirmed successfully!",
      booking: {
        startTime: slot.startTime,
        endTime: slot.endTime,
        gender: slot.gender,
      },
    });
  } catch (e) {
    await session.abortTransaction();
    return res.status(400).json({ error: e.message });
  } finally {
    session.endSession();
  }
});

router.post(
  "/cancel",
  auth(),
  [body("bookingId").isMongoId()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { bookingId } = req.body;
    const userId = req.user.id;

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const booking = await Booking.findById(bookingId).session(session);
      if (!booking || String(booking.user) !== String(userId))
        throw new Error("Booking not found");
      if (booking.cancelledAt) throw new Error("Already cancelled");

      const slot = await Slot.findById(booking.slot).session(session);
      if (!slot) throw new Error("Slot not found");

      booking.cancelledAt = new Date();
      await booking.save({ session });

      // Update slot occupancy
      await slot.updateOccupancy();

      await session.commitTransaction();
      return res.json({ ok: true });
    } catch (e) {
      await session.abortTransaction();
      return res.status(400).json({ error: e.message });
    } finally {
      session.endSession();
    }
  }
);

// Get all bookings (admin only)
router.get("/all", auth(), async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    const bookings = await Booking.find({ cancelledAt: null })
      .populate("user", "name email")
      .populate("slot", "startTime endTime")
      .sort({ createdAt: -1 });

    return res.json(bookings);
  } catch (error) {
    console.error("Get all bookings error:", error);
    return res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Get user's own bookings
router.get("/my-bookings", auth(), async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
      cancelledAt: null,
    })
      .populate("slot", "startTime endTime")
      .sort({ createdAt: -1 });

    return res.json(bookings);
  } catch (error) {
    console.error("Get user bookings error:", error);
    return res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Admin cancel booking
router.post(
  "/admin-cancel",
  auth(),
  [body("bookingId").isMongoId()],
  async (req, res) => {
    try {
      // Check if user is admin
      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }

      const { bookingId } = req.body;
      const booking = await Booking.findById(bookingId);
      if (!booking) return res.status(404).json({ error: "Booking not found" });
      if (booking.cancelledAt)
        return res.status(400).json({ error: "Already cancelled" });

      const slot = await Slot.findById(booking.slot);
      if (!slot) return res.status(404).json({ error: "Slot not found" });

      booking.cancelledAt = new Date();
      await booking.save();

      // Update slot occupancy
      await slot.updateOccupancy();

      return res.json({ message: "Booking cancelled successfully" });
    } catch (error) {
      console.error("Admin cancel booking error:", error);
      return res.status(500).json({ error: "Failed to cancel booking" });
    }
  }
);

export default router;
