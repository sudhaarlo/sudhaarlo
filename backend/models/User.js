// src/models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // ⬅️ IMPORT bcryptjs

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: { 
        type: String, 
        enum: ['customer', 'expert', 'admin'], 
        default: 'customer' 
    },
    details: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, { timestamps: true });

// ⬅️ PRE-SAVE HOOK: Hash password before saving
UserSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) {
        return next();
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', UserSchema);

export default User;