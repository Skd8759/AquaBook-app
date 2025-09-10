import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true, index: true },
    cancelledAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', BookingSchema);


