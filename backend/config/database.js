// src/config/database.js

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Mongoose connection options (Recommended for stability and avoiding warnings)
        const options = {
            // These options are often included for modern Mongoose versions but are frequently deprecated or default now.
            // We keep the call clean but mention common configuration best practices.
        };

        const connection = await mongoose.connect(process.env.MONGO_URI, options);

        console.log(`MongoDB connection SUCCESSFUL: ${connection.connection.host}`);

    } catch (error) {
        console.error('MongoDB connection FAILED: Ensure MONGO_URI is correct and MongoDB Atlas is running.');
        console.error('Error Details:', error.message);
        // 2. Exit process if connection fails
        process.exit(1);
    }
};

export default connectDB;