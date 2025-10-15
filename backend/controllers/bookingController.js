// src/controllers/bookingController.js

import Booking from '../models/Booking.js'; // Use default import for Mongoose models

export async function createBooking(req, res) {
    try {
        const { serviceCategory, date, time, price, expert, notes } = req.body;
        const booking = await Booking.create({
            customer: req.user.id,
            expert,
            serviceCategory,
            date,
            time,
            price: price || 0,
            notes
        });
        res.status(201).json(booking);
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