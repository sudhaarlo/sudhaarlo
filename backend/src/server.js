// src/server.js

// --- CORE IMPORTS ---
import 'dotenv/config'; // Loads .env variables immediately
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// --- ROUTE IMPORTS ---
// Import all the route handlers for different parts of the API
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js'; // This was missing
import userRoutes from './routes/userRoutes.js';     // This was also missing

// --- INITIALIZATION ---
// Connect to the database first
connectDB();
// Create the Express application instance
const app = express();

// --- MIDDLEWARE SETUP ---
// Enable CORS to allow requests from your frontend
app.use(cors());
// Enable express to parse incoming JSON bodies
app.use(express.json());

// --- API ROUTE DEFINITIONS ---
// Any request to /api/auth/... will be handled by authRoutes
app.use('/api/auth', authRoutes);
// Any request to /api/bookings/... will be handled by bookingRoutes
app.use('/api/bookings', bookingRoutes);
// Any request to /api/users/... will be handled by userRoutes
app.use('/api/users', userRoutes);


// --- SERVER STARTUP ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});