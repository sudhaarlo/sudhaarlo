// src/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * @desc 
 * This is the protection middleware.
 * It checks for the 'x-auth-token' in the request headers.
 * This matches the 'api.js' interceptor on your frontend.
 */
export const protect = async (req, res, next) => {
    let token;

    // 1. Check for the token in the 'x-auth-token' header
    if (req.headers['x-auth-token']) {
        try {
            // 2. Get token from header
            token = req.headers['x-auth-token'];

            // 3. Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Get the user from the database using the ID in the token
            // Attach the user object to the request (excluding the password)
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            // 5. Move to the next function (the controller)
            next();
        } catch (error) {
            console.error('Token verification failed:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

/**
 * @desc 
 * This middleware checks if the user (added by 'protect') has a specific role.
 */
export const hasRole = (role) => (req, res, next) => {
    if (req.user && req.user.role === role) {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
    }
};