import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { profile, updateProfile, listExperts } from '../controllers/userController.js';

const router = express.Router();
router.get('/me', authMiddleware, profile);
router.put('/me', authMiddleware, updateProfile);
router.get('/experts', listExperts);
export default router;