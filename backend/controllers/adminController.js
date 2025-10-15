import User from '../src/models/User.js';

export async function listUsers(req, res) {
  const users = await User.find().select('-password').limit(200);
  res.json(users);
}

export async function verifyExpert(req, res) {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { verified: true }, { new: true }).select('-password');
  res.json(user);
}