import jwt from 'jsonwebtoken';
import User from '../src/models/User.js'; // Ensure this path is correct

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
        // THIS IS THE KEY FIX: Capture all profile data using the '...' rest operator.
        const { name, email, password, role, ...profileData } = req.body;

        // Core validation.
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Please provide name, email, password, and role.' });
        }

        // Check if user exists.
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }

        // Create the new user. The User.js model will handle hashing the password.
        const newUser = await User.create({
            name,
            email,
            password, // The model's pre-save hook will hash this.
            role,
            profile: profileData, // All other form fields are saved here.
        });

        // Respond with token and user info if creation is successful.
        if (newUser) {
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
        } else {
            res.status(400).json({ message: 'Invalid user data received.' });
        }
    } catch (err) {
        console.error(err); // This will log the detailed error to your backend terminal.
        res.status(500).json({ message: 'Server error during registration.' });
    }
}

/**
 * @desc    Authenticate an existing user and get a token.
 * @route   POST /api/auth/login
 * @access  Public
 */
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Use the matchPassword method from the User model.
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
            res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during login.' });
    }
}

/**
 * @desc    Get the profile of the currently logged-in user.
 * @route   GET /api/auth/me
 * @access  Private
 */
export async function me(req, res) {
    try {
        // Assumes middleware has attached user.id to the request.
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching user profile.' });
    }
}