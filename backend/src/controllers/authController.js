const User = require('../models/User');
//const generateToken = require('../utils/generateToken');
const generateToken = require("../utils/generateToken");



// POST /api/auth/register
exports.registerUser = async (req, res) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ message: 'Please provide name, email and password' });


const exists = await User.findOne({ email });
if (exists) return res.status(400).json({ message: 'User already exists' });


const user = await User.create({ name, email, password });


res.status(201).json({
_id: user._id,
name: user.name,
email: user.email,
token: generateToken(user._id)
});
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


// POST /api/auth/login
exports.authUser = async (req, res) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (user && (await user.matchPassword(password))) {
res.json({
_id: user._id,
name: user.name,
email: user.email,
token: generateToken(user._id)
});
} else {
res.status(401).json({ message: 'Invalid email or password' });
}
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


// GET /api/auth/me
exports.getProfile = async (req, res) => {
try {
const user = await User.findById(req.user.id).select('-password');
if (!user) return res.status(404).json({ message: 'User not found' });
res.json(user);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};