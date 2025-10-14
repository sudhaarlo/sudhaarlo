import express from 'express';
const router = express.Router();

// placeholder expert routes
router.get('/', (req, res) => {
  res.json({ ok: true, experts: [] });
});


import Booking from '../models/Booking.js';
import User from '../models/User.js';

router.get('/:id/history', async (req, res) => {
  try {
    const expertId = req.params.id;
    // Find all bookings for this expert
    const jobs = await Booking.find({ expert: expertId })
      .populate('customer', 'name email')
      .sort({ date: -1, time: -1 });
    res.json({ ok: true, expertId, jobs });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Failed to fetch work history' });
  }
});

export default router;