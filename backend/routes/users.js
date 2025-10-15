import express from 'express';
// Ensure both named exports are imported
import { protect, restrictTo } from '../middleware/authMiddleware.js'; 

// --- Mock Controller Functions (Replace with actual imports later) ---
// Note: You must import your actual controllers (userController) here later.
const getUserProfile = (req, res) => res.json({ profile: "User profile data", userId: req.user.id });
const listExperts = (req, res) => res.json({ experts: ["Expert 1", "Expert 2"] });
// --------------------------------------------------------------------

const router = express.Router();

// @route   GET /api/users/profile
// @access  Private (Customer/Expert/Admin)
router.get('/profile', protect, getUserProfile); 

// @route   GET /api/users/experts
// @access  Private (Admin only)
// This is now uncommented and functional using the restrictTo middleware
router.get('/experts', protect, restrictTo('admin'), listExperts); 

export default router;
