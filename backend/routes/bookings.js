import express from 'express';
// Correctly import the named exports: protect and restrictTo
import { protect, restrictTo } from '../middleware/authMiddleware.js'; 

// Assume you have corresponding controller functions
// import { createBooking, getCustomerBookings, updateBookingStatus } from '../controllers/bookingController.js'; 

const router = express.Router();

// --- Mock Controller Functions (Replace with actual imports later) ---
const createBooking = (req, res) => res.json({ message: "Booking created", userId: req.user.id });
const getCustomerBookings = (req, res) => res.json({ message: "Customer bookings list" });
const updateBookingStatus = (req, res) => res.json({ message: "Booking status updated" });
// --------------------------------------------------------------------


// @route   POST /api/bookings
// @access  Private (Only logged-in users/customers can create bookings)
// We must use 'protect' instead of the undefined 'authMiddleware'
router.post('/', protect, createBooking);

// @route   GET /api/bookings/customer
// @access  Private (Customer only)
router.get('/customer', protect, restrictTo('customer'), getCustomerBookings);

// @route   PUT /api/bookings/:id/status
// @access  Private (Expert or Admin can update status)
router.put('/:id/status', protect, restrictTo('expert', 'admin'), updateBookingStatus);


export default router;
