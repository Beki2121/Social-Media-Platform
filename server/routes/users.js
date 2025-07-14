const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer setup for profile image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Get user profile by ID
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Update profile (protected, with avatar upload)
router.put('/:id', auth, upload.single('avatar'), async (req, res) => {
  if (parseInt(req.params.id) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  const { username, bio } = req.body;
  let profile_picture = req.body.profile_picture;
  if (req.file) {
    profile_picture = `/uploads/${req.file.filename}`;
  }
  await User.updateProfile(req.user.id, { username, bio, profile_picture });
  // Return updated user
  const user = await User.findById(req.user.id);
  res.json(user);
});

// TODO: Add followers/following endpoints

module.exports = router; 