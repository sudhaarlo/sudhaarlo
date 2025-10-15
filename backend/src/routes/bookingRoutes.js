// src/routes/bookingRoutes.js

import express from 'express';
// Import BOTH controller functions now
import { getCustomerBookings, getExpertBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for customers to get their bookings
router.get('/customer', protect, getCustomerBookings);

// Route for experts to get their assigned bookings
router.get('/expert', protect, getExpertBookings); // <-- ADD THIS NEW ROUTE

export default router;