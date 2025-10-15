// src/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * @desc    Middleware to protect routes by verifying a JSON Web Token.
 * If the token is valid, it attaches the user's data to the request object.
 */
export const protect = async (req, res, next) => {
    let token;

    // Check if the Authorization header exists and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Extract the token from the "Bearer <token>" string
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify the token using the secret key from your .env file
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Find the user by the ID stored in the token's payload.
            //    This is crucial to ensure the user still exists.
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
            
            // 4. If everything is valid, proceed to the actual route handler (the controller)
            next();
        } catch (error) {
            // This will catch an expired or malformed token
            console.error('Token verification failed:', error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If no token was found in the header
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};