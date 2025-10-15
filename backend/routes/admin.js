import express from 'express';
// Ensure both named exports are imported to match the authMiddleware.js file
import { protect, restrictTo } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// --- Mock Controller Functions (Replace with actual imports later) ---
// These are simple placeholders. You must import your real adminController here.
const getAllUsers = (req, res) => res.json({ message: "Admin: List of all users" });
const getAllExperts = (req, res) => res.json({ message: "Admin: List of all experts" });
// --------------------------------------------------------------------

// All routes here should be restricted to 'admin' role, 
// and must run 'protect' first to attach req.user.

// @route   GET /api/admin/users
// @access  Private (Admin only)
router.get('/users', protect, restrictTo('admin'), getAllUsers);

// @route   GET /api/admin/experts
// @access  Private (Admin only)
router.get('/experts', protect, restrictTo('admin'), getAllExperts);

export default router;
