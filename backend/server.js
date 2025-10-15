// src/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js'; // <-- 1. IMPORT new routes

// ... (connectDB and app initialization) ...
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

// ... (API ROUTES) ...
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes); // <-- 2. USE new routes

// ... (PORT and listen) ...
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});