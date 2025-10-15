import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js'; // ⬅️ Will be protected now
import bookingRoutes from './routes/bookings.js'; // ⬅️ Will be protected now
import adminRoutes from './routes/admin.js'; // ⬅️ Will be protected and restricted now

// This import is crucial for your password comparison logic to be available
import 'bcryptjs'; // ⬅️ Import bcryptjs globally to avoid issues in controllers

dotenv.config();

// Connect to the database
await connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes); // Auth routes (register, login) are public
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.json({ ok: true, name: 'sudhaarlo-backend' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));