// src/routes/auth.js

import express from 'express';
// ⬅️ Import both controller functions
import { registerUser, loginUser } from '../controllers/authController.js'; 

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser); // ⬅️ NEW: Login Route

export default router;