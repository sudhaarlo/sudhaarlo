// models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Good practice to store emails consistently
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['customer', 'expert', 'admin'], // Role must be one of these values
        default: 'customer',
    },
    // This flexible field is ESSENTIAL for storing all your registration form data
    // Inside src/models/User.js, in your userSchema

    // ... (after the 'role' field)

    profile: {
        phone: {
            type: String,
            unique: true,
            sparse: true, // THIS IS THE FIX. Allows multiple users to have no phone number.
        },
        streetAddress: String,
        city: String,
        state: String,
        pincode: String,
        birthday: Date,
        country: String,
        // For experts
        trade: String,
        experience: Number,
        serviceAreas: Array,
        idProof: String,
        referredBy: String,
    },

    
    verified: {
        type: Boolean,
        default: false, // Used for verifying experts
    },
}, {
    // This is a better way to handle timestamps.
    // It automatically adds 'createdAt' and 'updatedAt' fields.
    timestamps: true,
});

// MIDDLEWARE: This function automatically hashes the password before saving a user
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// METHOD: This adds a helper function to compare passwords during login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the model using the new ES Module syntax
export default User;