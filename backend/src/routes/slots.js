import express from "express";
import { body, query, validationResult } from "express-validator";
import Slot from "../models/Slot.js";
import { auth } from "../middleware/auth.js";
import { checkSlotExists } from "../services/slotCleanupService.js";

const router = express.Router();

// Admin: create swimming pool slots for a given date
router.post(
  "/",
  auth("admin"),
  [body("date").isISO8601()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { date, morningCount = 5, eveningCount = 5 } = req.body;
    const targetDate = new Date(date);
    const createdSlots = [];
    const duplicateTimes = [];

    // Required schedule:
    // Morning: 6:00-6:30 boys, 6:30-7:00 boys, 7:00-7:30 girls, 7:30-8:00 girls
    // Evening: 18:00-18:30 boys, 18:30-19:00 boys, 19:00-19:30 boys, 19:30-20:00 girls, 20:00-20:30 girls
    // But as per user: morning 6-7 boys, 7-8 girls; evening 6-7:30 boys, 7:30-8:30 girls, 30 min each

    // Morning slots
    const morningSlots = [
      { hour: 6, minute: 0, gender: "boys" },
      { hour: 6, minute: 30, gender: "boys" },
      { hour: 7, minute: 0, gender: "girls" },
      { hour: 7, minute: 30, gender: "girls" },
    ];
    // Evening slots
    const eveningSlots = [
      { hour: 18, minute: 0, gender: "boys" },
      { hour: 18, minute: 30, gender: "boys" },
      { hour: 19, minute: 0, gender: "boys" },
      { hour: 19, minute: 30, gender: "girls" },
      { hour: 20, minute: 0, gender: "girls" },
    ];

    // Create all slots
    for (const slotDef of [...morningSlots, ...eveningSlots]) {
      const slotTime = new Date(targetDate);
      slotTime.setHours(slotDef.hour, slotDef.minute, 0, 0);
      const exists = await checkSlotExists(slotTime);
      if (exists) {
        duplicateTimes.push(`${slotDef.hour.toString().padStart(2, "0")}:${slotDef.minute.toString().padStart(2, "0")} (${slotDef.gender})`);
      } else {
        const slotData = Slot.createWithDefaults(slotTime, slotDef.gender);
        createdSlots.push(slotData);
      }
    }

    if (createdSlots.length === 0) {
      return res.status(400).json({
        error: "All time slots already exist for this date",
        duplicates: duplicateTimes,
      });
    }

    try {
      const created = await Slot.insertMany(createdSlots, { ordered: false });

      return res.status(201).json({
        count: created.length,
        created: createdSlots.length,
        duplicates: duplicateTimes.length > 0 ? duplicateTimes : undefined,
        message: `Created ${
          created.length
        } swimming pool slots for ${targetDate.toDateString()}`,
        breakdown: {
          morningSlots: morningCount,
          eveningSlots: eveningCount,
          totalSlots: created.length,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to create slots" });
    }
  }
);

// Fetch slots in a date range using a cursor for efficiency
router.get(
  "/list",
  [query("from").isISO8601(), query("to").isISO8601()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { from, to } = req.query;
    const cursor = await Slot.find({
      startTime: { $gte: new Date(from), $lt: new Date(to) },
    })
      .sort({ startTime: 1 })
      .cursor();

    res.setHeader("Content-Type", "application/json");
    res.write("[");
    let first = true;
    for await (const slot of cursor) {
      const status = await slot.getStatus();
      const payload = {
        id: slot._id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        gender: slot.gender,
        capacity: slot.capacity,
        occupied: slot.occupied,
        status: status,
      };
      if (!first) res.write(",");
      res.write(JSON.stringify(payload));
      first = false;
    }
    res.write("]");
    res.end();
  }
);

export default router;
