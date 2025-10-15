// src/controllers/bookingController.js

import Booking from '../models/Booking.js';

/**
 * @desc    Get all bookings for the logged-in CUSTOMER
 * @route   GET /api/bookings/customer
 * @access  Private
 */
export const getCustomerBookings = async (req, res) => {
    try {
        // req.user.id is attached by the 'protect' middleware
        const bookings = await Booking.find({ user: req.user.id })
            .populate('expert', 'name profile.trade'); // Get the expert's name and trade

        res.json(bookings);
    } catch (error)
    {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching customer bookings.' });
    }
};

/**
 * @desc    Get all bookings assigned to the logged-in EXPERT
 * @route   GET /api/bookings/expert
 * @access  Private
 */
export const getExpertBookings = async (req, res) => {
    try {
        // Find bookings where the logged-in user is the 'expert'
        const bookings = await Booking.find({ expert: req.user.id })
            .populate('user', 'name profile.city'); // Get the customer's name and city

        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching expert bookings.' });
    }
};