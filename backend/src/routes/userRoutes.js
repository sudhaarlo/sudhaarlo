// src/routes/userRoutes.js
import express from 'express';
import { getExperts } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// This route is protected. Only logged-in users can access it.
router.get('/experts', protect, getExperts);

export default router;