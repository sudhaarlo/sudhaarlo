import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// NOTE: Ensure process.env.JWT_SECRET is configured in your environment.

/**
 * Helper function to generate a JWT token.
 * @param {string} id - The user ID.
 * @returns {string} The signed JWT.
 */
const generateToken = (id) => {
    // Uses the user's ID and the secret key to sign the token
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};


// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // Basic validation for required fields
        if (!name || !password || (!email && !phone)) {
            return res.status(400).json({ message: 'Please provide name, password, and either email or phone number.' });
        }

        // 1. Check if user already exists (by email OR phone)
        // Assumes User.findOne supports MongoDB's $or operator via Mongoose
        const userExists = await User.findOne({ 
            $or: [{ email: email || null }, { phone: phone || null }] 
        });

        if (userExists) {
            return res.status(400).json({ message: 'A user already exists with this email or phone number.' });
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create user
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            // Default role to 'customer' if not provided
            role: role || 'customer', 
        });

        if (user) {
            // Registration successful
            res.status(201).json({
                token: generateToken(user._id), 
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            });
        } else {
            // Should be caught by the general catch block, but kept for explicit data error
            res.status(400).json({ message: 'Invalid user data provided.' });
        }
    } catch (error) {
        console.error('Registration Error:', error.message);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};


// @desc    Authenticate a user (Handles both email and phone)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        // 1. Destructure both email and phone (only one will be present from frontend logic)
        const { email, phone, password } = req.body; 

        // 2. Determine the search query based on which identifier was provided
        const searchQuery = email ? { email } : (phone ? { phone } : null);

        if (!searchQuery) {
            return res.status(400).json({ message: 'Email or phone number is required.' });
        }
        
        // 3. Find the user
        const user = await User.findOne(searchQuery);

        // 4. Check user existence and password validity
        if (user && (await bcrypt.compare(password, user.password))) {
            // Login successful
            res.json({
                // Token is at the root level (expected by client for localStorage.setItem)
                token: generateToken(user._id), 
                
                // User details expected by the frontend (for role-based redirection)
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role, // ⬅️ Crucial for frontend redirection logic
                }
            });
        } else {
            // Login failed
            res.status(401).json({ message: 'Invalid credentials. Check email/phone and password.' });
        }
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({ message: 'Server error during login.' });
    }
};