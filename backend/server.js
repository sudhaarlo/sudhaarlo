import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './src/config/db.js'; // Points to db.js in src/

// --- ROUTE IMPORTS ---
// We will ONLY use the routes from the /src folder
import authRoutes from './src/routes/authRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
// import adminRoutes from './src/routes/adminRoutes.js'; // You'll need to create this file

// --- INITIALIZATION ---
connectDB();
const app = express();
const server = http.createServer(app);

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
// All routes now point to your /src/routes folder
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/admin', adminRoutes);

// --- Socket.IO Connection Logic ---
io.on('connection', (socket) => {
    console.log(`[Socket.IO] New client connected: ${socket.id}`);

    socket.on('registerUser', (userId) => {
        onlineUsers[userId] = socket.id;
        console.log('[Socket.IO] Online Users:', onlineUsers);
    });

    socket.on('disconnect', () => {
        console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
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
const PORT = process.env.PORT || 5173;
server.listen(PORT, () => {
    console.log(`Server is running with Socket.IO on port ${PORT}`);
});