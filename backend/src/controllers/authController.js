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
        // Gather all fields
        const { name, email, password, role, ...profileData } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Please provide name, email, password, and role.' });
        }

        // --- NEW: Security check for Admin Registration ---
        if (role === 'admin') {
            if (!profileData.accessKey) {
                return res.status(403).json({ message: 'Admin access key is required.' });
            }

            // --- !! ADDED DEBUGGING LOGS !! ---
            console.log('--- ADMIN KEY CHECK ---');
            console.log('Key from Form (profileData.accessKey):', `"${profileData.accessKey}"`);
            console.log('Key from .env (process.env.ADMIN_REGISTRATION_KEY):', `"${process.env.ADMIN_REGISTRATION_KEY}"`);
            console.log('Do they match?', profileData.accessKey === process.env.ADMIN_REGISTRATION_KEY);
            // --- END OF DEBUGGING LOGS ---

            if (profileData.accessKey !== process.env.ADMIN_REGISTRATION_KEY) {
                return res.status(403).json({ message: 'Invalid Admin access key.' });
            }
            // Don't save the access key to the database
            delete profileData.accessKey;
        }

        // --- UPDATED: Check for duplicates by email OR phone ---
        const phone = profileData.phone;
        const searchCriteria = [{ email }];
        if (phone) {
            searchCriteria.push({ 'profile.phone': phone });
        }

        const userExists = await User.findOne({ $or: searchCriteria });
        if (userExists) {
            return res.status(400).json({ message: 'A user with this email or phone number already exists.' });
        }
        
        // Create the user
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
        // --- UPDATED: Handle login with either email or phone ---
        const { email, phone, password } = req.body;

        let searchQuery;
        if (email) {
            searchQuery = { email };
        } else if (phone) {
            searchQuery = { 'profile.phone': phone };
        } else {
            return res.status(400).json({ message: 'Please provide an email or phone number.' });
        }

        // Find user by email OR phone, and select the password to compare it
        const user = await User.findOne(searchQuery).select('+password');

        // Check if user exists AND if password matches
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
            res.status(4401).json({ message: 'Invalid credentials.' });
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
    // The 'protect' middleware already found the user and attached it to req.user
    // We just need to return it.
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(404).json({ message: 'User not found.' });
    }
}