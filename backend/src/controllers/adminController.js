// src/controllers/adminController.js

import User from '../models/User.js';

/**
 * @desc    Get all experts awaiting verification
 * @route   GET /api/admin/experts/unverified
 * @access  Private (Admin only)
 */
export const getUnverifiedExperts = async (req, res) => {
    try {
        // Find users who are experts AND whose profile.isVerified is false
        const experts = await User.find({ 
            role: 'expert', 
            'profile.isVerified': false 
        }).select('-password'); // Exclude password from the result

        res.json(experts);
    } catch (error) {
        console.error('Error fetching unverified experts:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Verify an expert by their ID
 * @route   PATCH /api/admin/experts/verify/:id
 * @access  Private (Admin only)
 */
export const verifyExpert = async (req, res) => {
    try {
        const expertId = req.params.id;
        
        // Find the expert by their User ID
        const expert = await User.findById(expertId);

        if (!expert || expert.role !== 'expert') {
            return res.status(404).json({ message: 'Expert not found' });
        }

        // Update the profile field
        expert.profile.isVerified = true;
        
        // Save the updated user document
        await expert.save();

        res.json({ message: `Expert ${expert.name} has been verified.` });
    } catch (error) {
        console.error('Error verifying expert:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * @desc    Get all users (for admin dashboard)
 * @route   GET /api/admin/users
 * @access  Private (Admin only)
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};