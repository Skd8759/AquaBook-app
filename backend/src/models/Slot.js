import mongoose from 'mongoose';

// Swimming pool configuration
const SLOT_DURATION_MINUTES = 30;
const BOYS_CAPACITY = 20;
const GIRLS_CAPACITY = 20;

const SlotSchema = new mongoose.Schema(
  {
    startTime: { type: Date, required: true, index: true },
    endTime: { type: Date, required: true },
    gender: { type: String, enum: ['boys', 'girls'], required: true },
    capacity: { type: Number, required: true, default: BOYS_CAPACITY },
    occupied: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

SlotSchema.statics.createWithDefaults = function createWithDefaults(startTime, gender = 'boys') {
  const start = new Date(startTime);
  const end = new Date(start.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
  
  return { 
    startTime: start, 
    endTime: end, 
    gender: gender,
    capacity: gender === 'boys' ? BOYS_CAPACITY : GIRLS_CAPACITY,
    occupied: 0
  };
};

SlotSchema.methods.getStatus = async function getStatus() {
  // Get total swimmers from bookings
  const Booking = mongoose.model('Booking');
  const activeBookings = await Booking.find({ 
    slot: this._id, 
    cancelledAt: null 
  });
  
  const totalSwimmers = activeBookings.length;
  
  if (totalSwimmers === 0) return 'available';
  if (totalSwimmers < this.capacity) return 'partial';
  return 'full';
};

SlotSchema.methods.updateOccupancy = async function updateOccupancy() {
  const Booking = mongoose.model('Booking');
  const activeBookings = await Booking.find({ 
    slot: this._id, 
    cancelledAt: null 
  });
  
  this.occupied = activeBookings.length;
  await this.save();
  return this.occupied;
};

export default mongoose.model('Slot', SlotSchema);


