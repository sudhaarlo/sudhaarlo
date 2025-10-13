import User from '../models/User.js';

export async function profile(req, res) {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
}

export async function updateProfile(req, res) {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
  res.json(user);
}

export async function listExperts(req, res) {
  const experts = await User.find({ role: 'expert' }).select('-password');
  res.json(experts);
}