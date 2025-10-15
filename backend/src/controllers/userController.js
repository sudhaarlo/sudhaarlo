// src/controllers/userController.js

import User from '../models/User.js';

/**
 * @desc    Get all users with the role of 'expert'
 * @route   GET /api/users/experts
 * @access  Private
 */
export const getExperts = async (req, res) => {
    try {
        // Find all documents in the User collection where the role is 'expert'
        const experts = await User.find({ role: 'expert' }).select('-password');
        res.json(experts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching experts.' });
    }
};