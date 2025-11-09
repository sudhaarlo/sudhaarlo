// src/controllers/bookingController.js

import Booking from '../models/Booking.js';

export async function createBooking(req, res) {
    // --- NEW: Get 'io' and 'onlineUsers' from the request ---
    const { io, onlineUsers } = req;

    try {
        const { serviceCategory, date, time, price, expert, notes } = req.body;
        
        // 1. Create the booking
        const booking = await Booking.create({
            customer: req.user.id,
            expert, // expert is just the ID string from req.body
            serviceCategory,
            date,
            time,
            price: price || 0,
            notes
        });

        // 2. Populate the new booking for a richer notification
        const populatedBooking = await Booking.findById(booking._id)
            .populate('customer', 'name email');

        // --- NEW: Real-time Notification Logic ---
        
        // 3. Find the expert's socket ID from the map
        const expertSocketId = onlineUsers[expert.toString()];

        if (expertSocketId) {
            // 4. If the expert is online, emit the event to their specific socket
            io.to(expertSocketId).emit('newBookingRequest', populatedBooking);
            console.log(`Notification sent to expert ${expert}`);
        } else {
            // 5. If offline, just log it. (You could add email/SMS logic here)
            console.log(`Expert ${expert} is offline. No real-time notification sent.`);
        }
        // --- End of Notification Logic ---

        // 6. Send the created booking back to the customer
        res.status(201).json(populatedBooking);

    } catch (error) {
        console.error("Booking creation error:", error);
        res.status(500).json({ message: "Server error creating booking." });
    }
}

export async function getCustomerBookings(req, res) {
    try {
        const bookings = await Booking.find({ customer: req.user.id }).populate('expert', 'name email');
        res.json(bookings);
    } catch (error) {
        console.error("Error fetching customer bookings:", error);
        res.status(500).json({ message: "Server error fetching bookings." });
    }
}

export async function getBooking(req, res) {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('expert', 'name email')
            .populate('customer', 'name email');
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }
        res.json(booking);
    } catch (error) {
        console.error("Error fetching single booking:", error);
        res.status(500).json({ message: "Server error fetching booking." });
    }
}

export async function getExpertBookings(req, res) {
    try {
        const bookings = await Booking.find({ expert: req.user.id }).populate('customer', 'name email');
        res.json(bookings);
    } catch (error) {
        console.error("Error fetching expert bookings:", error);
        res.status(500).json({ message: "Server error fetching bookings." });
    }
}