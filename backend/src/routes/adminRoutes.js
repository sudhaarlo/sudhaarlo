// src/routes/adminRoutes.js

import express from 'express';
import { protect, hasRole } from '../middleware/authMiddleware.js';
import { 
    getUnverifiedExperts, 
    verifyExpert, 
    getAllUsers 
} from '../controllers/adminController.js';

const router = express.Router();

// All routes in this file are protected and for admins only

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin)
router.get(
    '/users', 
    protect, 
    hasRole('admin'), 
    getAllUsers
);

// @route   GET /api/admin/experts/unverified
// @desc    Get all experts pending verification
// @access  Private (Admin)
router.get(
    '/experts/unverified', 
    protect, 
    hasRole('admin'), 
    getUnverifiedExperts
);

// @route   PATCH /api/admin/experts/verify/:id
// @desc    Verify a single expert by their user ID
// @access  Private (Admin)
router.patch(
    '/experts/verify/:id', 
    protect, 
    hasRole('admin'), 
    verifyExpert
);

export default router;