// src/controllers/authController.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

export async function register(req, res) {
    try {
        // THIS IS THE KEY: Use the '...' rest operator to gather all extra fields
        // into a single `profileData` object.
        const { name, email, password, role, ...profileData } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }
        
        // Create the user. The User model will hash the password automatically.
        // The profileData object will perfectly match the 'profile' field in your schema.
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
            user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
        });
    } catch (err) {
        // This will log the detailed Mongoose validation error to your backend terminal
        console.error("REGISTRATION ERROR:", err); 
        res.status(500).json({ message: 'Server error during registration.' });
    }
}

// ... (the rest of your login and me functions, which should be correct already) ...

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const token = signToken(user);
            res.json({
                token,
                user: { id: user._id, name: user.name, email: user.email, role: user.role },
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during login.' });
    }
}

export async function me(req, res) {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(404).json({ message: 'User not found.' });
    }
}