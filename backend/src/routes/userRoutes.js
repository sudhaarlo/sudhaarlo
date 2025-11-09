// src/routes/userRoutes.js
import express from 'express';
import { getExperts } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- MODIFIED ---
// This route is now PUBLIC. Anyone can see the list of experts.
// The "Book Now" button on the frontend is already hidden if you're not logged in.
router.get('/experts', getExperts);

export default router;