import express from 'express';
import adminMiddleware from '../middleware/adminMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { listUsers, verifyExpert } from '../controllers/adminController.js';

const router = express.Router();
router.get('/users', authMiddleware, adminMiddleware, listUsers);
router.post('/experts/:id/verify', authMiddleware, adminMiddleware, verifyExpert);
export default router;