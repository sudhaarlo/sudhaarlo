import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming User model is available for lookup

// @desc    Middleware to protect routes
// Checks for a valid JWT in the Authorization header and attaches the user object to the request.
export const protect = async (req, res, next) => {
    let token;

    // 1. Check for token in the 'Authorization' header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (Format: "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify token and decode user ID
            // process.env.JWT_SECRET must match the secret used in authController.js
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Find the user by ID and attach it to the request object (excluding the password)
            // req.user will be used in subsequent middleware or route handlers
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found.' });
            }

            next(); // Proceed to the next middleware or route handler

        } catch (error) {
            console.error('Authorization Error:', error.message);
            // If verification fails (e.g., token expired or invalid secret)
            res.status(401).json({ message: 'Not authorized, token failed.' });
        }
    } else {
        // If no token starts with 'Bearer'
        res.status(401).json({ message: 'Not authorized, no token found.' });
    }
};

// @desc    Middleware to restrict access by role
// Accepts a variable number of allowed roles (e.g., restrictTo('admin', 'expert'))
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        // req.user is guaranteed to be set if the 'protect' middleware runs first
        if (!req.user || !roles.includes(req.user.role)) {
            // Send a 403 Forbidden status if the user's role is not in the allowed list
            return res.status(403).json({
                message: `User role ${req.user ? req.user.role : 'unauthenticated'} is not authorized to access this route.`
            });
        }
        next();
    };
};