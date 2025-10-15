// src/controllers/authController.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Corrected path

/**
 * @desc    Generates a JSON Web Token for a given user.
 * @param   {object} user - The user document from MongoDB.
 * @returns {string} The signed JWT.
 */
const signToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

/**
 * @desc    Register a new user (Customer, Expert, or Admin).
 * @route   POST /api/auth/register
 * @access  Public
 */
export async function register(req, res) {
    try {
        // YOUR VERSION'S SUPERIOR DATA HANDLING: Captures all profile fields.
        const { name, email, password, role, ...profileData } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Please provide name, email, password, and role.' });
        }

        // MERGED FEATURE: Check for duplicates by email OR phone (from friend's code).
        const phone = profileData.phone;
        const searchCriteria = [];
        if (email) searchCriteria.push({ email });
        if (phone) searchCriteria.push({ 'profile.phone': phone });

        if (searchCriteria.length > 0) {
            const userExists = await User.findOne({ $or: searchCriteria });
            if (userExists) {
                return res.status(400).json({ message: 'A user with this email or phone number already exists.' });
            }
        }
        
        // YOUR VERSION'S CORRECT USER CREATION: Uses the profile object.
        // The User.js model will automatically hash the password.
        const newUser = await User.create({
            name,
            email,
            password,
            role,
            profile: profileData,
        });

        const token = signToken(newUser);
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ message: 'Server error during registration.' });
    }
}

/**
 * @desc    Authenticate an existing user (with email OR phone) and get a token.
 * @route   POST /api/auth/login
 * @access  Public
 */
export async function login(req, res) {
    try {
        // MERGED FEATURE: Handle login with either email or phone (from friend's code).
        const { email, phone, password } = req.body;

        let searchQuery;
        if (email) {
            searchQuery = { email };
        } else if (phone) {
            searchQuery = { 'profile.phone': phone };
        } else {
            return res.status(400).json({ message: 'Please provide an email or phone number.' });
        }

        const user = await User.findOne(searchQuery);

        // YOUR VERSION'S SUPERIOR PASSWORD CHECK: Uses the model method.
        if (user && (await user.matchPassword(password))) {
            const token = signToken(user);
            res.json({
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials.' });
        }
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: 'Server error during login.' });
    }
}

/**
 * @desc    Get the profile of the currently logged-in user.
 * @route   GET /api/auth/me
 * @access  Private
 */
export async function me(req, res) {
    // SIMPLIFIED AND CORRECTED 'me' function
    // The 'protect' middleware already found the user and attached it to req.user.
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(404).json({ message: 'User not found.' });
    }
}