import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createBooking, getCustomerBookings, getBooking, getExpertBookings } from '../controllers/bookingController.js';

const router = express.Router();

// placeholder booking routes
router.post('/', authMiddleware, createBooking);
router.get('/customer', authMiddleware, getCustomerBookings);
router.get('/expert', authMiddleware, getExpertBookings);
router.get('/:id', authMiddleware, getBooking);

export default router;