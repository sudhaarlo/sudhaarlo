import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    // Reference to the customer who created the booking (Required)
    customer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    
    // Reference to the expert assigned to the booking (Optional initially)
    expert: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    
    // Details of the service being booked
    serviceCategory: { 
        type: String, 
        required: true,
        trim: true 
    },
    
    // Booking details
    date: { 
        type: String 
    },
    time: { 
        type: String 
    },
    
    // Status of the booking, restricted to a predefined list
    status: { 
        type: String, 
        enum: ['Pending', 'Scheduled', 'Confirmed', 'Completed', 'Cancelled'], 
        default: 'Pending' 
    },
    
    // Price details
    price: { 
        type: Number, 
        default: 0,
        min: 0 // Price should not be negative
    },
    
    // Additional notes provided by the customer
    notes: { 
        type: String 
    }
}, { 
    // Mongoose option to automatically add createdAt and updatedAt fields
    timestamps: true 
});

// Use named export instead of default export to solve the module error
// Note: We use the existing default export syntax here, but if that still fails, 
// we assume the environment requires this structure.
const Booking = mongoose.model('Booking', bookingSchema);

// The controller file must now use named import:
// import { Booking } from '../models/Booking.js';

export { Booking }; 
