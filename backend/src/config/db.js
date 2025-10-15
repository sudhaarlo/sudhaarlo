// C:\Users\jayza\OneDrive\Desktop\Sudhaarlo\sudhaarlo\backend\src\config\db.js

import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB cluster using the URI from your .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // If successful, log the host it connected to
        console.log(`MongoDB Connected successfully to: ${conn.connection.host}`);
    } catch (error) {
        // If an error occurs, log the error message and exit the process
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

// Export the function using the new ES Module syntax
export default connectDB;