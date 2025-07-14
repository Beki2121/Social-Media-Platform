const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) return res.status(400).json({ message: 'All fields required' });
  const existing = await User.findByEmail(email);
  if (existing) return res.status(409).json({ message: 'Email already in use' });
  const hash = await bcrypt.hash(password, 10);
  const userId = await User.create({ email, password: hash, username });
  const token = jwt.sign({ id: userId, email, username }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token });
};

exports.login = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  let user = null;
  if (emailOrUsername.includes('@')) {
    user = await User.findByEmail(emailOrUsername);
  } else {
    user = await User.findByUsername(emailOrUsername);
  }
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
}; 