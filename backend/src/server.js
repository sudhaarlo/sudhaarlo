// src/server.js

// --- 1. DOTENV/CONFIG MUST BE THE FIRST IMPORT ---
import 'dotenv/config'; 

import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';

// --- ROUTE IMPORTS ---
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // Added admin routes

// --- INITIALIZATION ---
connectDB();
const app = express();
const server = http.createServer(app); // Create HTTP server for Socket.IO

// --- Socket.IO Setup ---
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Your Vite frontend URL
        methods: ["GET", "POST"]
    }
});

// --- In-memory map for online users { userId: socketId } ---
let onlineUsers = {};

// --- MIDDLEWARE SETUP ---
app.use(cors());
app.use(express.json());

// --- Middleware to pass 'io' and 'onlineUsers' to routes ---
app.use((req, res, next) => {
    req.io = io;
    req.onlineUsers = onlineUsers;
    next();
});

// --- API ROUTE DEFINITIONS ---
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes); // Use the admin routes

// --- Socket.IO Connection Logic ---
io.on('connection', (socket) => {
    console.log(`[Socket.IO] New client connected: ${socket.id}`);

    // Listen for a user to register themselves as online
    socket.on('registerUser', (userId) => {
        onlineUsers[userId] = socket.id;
        console.log('[Socket.IO] Online Users:', onlineUsers);
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
        // Remove user from the map
        for (const userId in onlineUsers) {
            if (onlineUsers[userId] === socket.id) {
                delete onlineUsers[userId];
                break;
            }
        }
        console.log('[Socket.IO] Online Users:', onlineUsers);
    });
});

// --- SERVER STARTUP ---
const PORT = process.env.PORT || 5000;
// Use server.listen() to start both Express and Socket.IO
server.listen(PORT, () => {
    console.log(`Server is running with Socket.IO on port ${PORT}`);
});