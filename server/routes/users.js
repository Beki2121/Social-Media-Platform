const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user profile by ID
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Update profile (protected)
router.put('/:id', auth, async (req, res) => {
  if (parseInt(req.params.id) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  const { username, bio, profile_picture } = req.body;
  await User.updateProfile(req.user.id, { username, bio, profile_picture });
  res.json({ message: 'Profile updated' });
});

// TODO: Add followers/following endpoints

module.exports = router; 