// src/models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Links this to the User model
    },
    expert: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Links to the expert User
    },
    service: {
        type: String,
        required: true,
    },
    scheduled: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    location: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;