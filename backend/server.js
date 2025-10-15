// src/server.js

// --- CORE IMPORTS ---
import 'dotenv/config'; // Loads .env variables immediately
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// --- ROUTE IMPORTS ---
// Import all route handlers for different parts of the API
// We are using the consistent file paths we established earlier.
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // Assuming the file is named adminRoutes.js for consistency

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
// Mount the routers on their respective API endpoints
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);


// --- SERVER STARTUP ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});