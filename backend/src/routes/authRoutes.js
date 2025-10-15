// src/routes/authRoutes.js

import express from 'express';
import { register, login, me } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

// Create a new router instance
const router = express.Router();

// --- PUBLIC ROUTES ---
// Anyone can access these endpoints
router.post('/register', register);
router.post('/login', login);

// --- PRIVATE ROUTE ---
// THIS IS THE LINE THAT WAS LIKELY MISSING OR INCORRECT
// It defines the GET /me endpoint and protects it with the 'protect' middleware.
router.get('/me', protect, me);

// Export the router to be used in server.js
export default router;