import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expert: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  serviceCategory: { type: String, required: true },
  date: { type: String },
  time: { type: String },
  status: { type: String, enum: ['Pending','Scheduled','Confirmed','Completed','Cancelled'], default: 'Pending' },
  price: { type: Number, default: 0 },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);