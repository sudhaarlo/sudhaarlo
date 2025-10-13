require("dotenv").config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');


dotenv.config();
connectDB();


const app = express();


// Allow frontend origin during development. Override via .env (CORS_ORIGIN)
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => res.send('Sudhaarlo backend — auth API'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));