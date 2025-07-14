const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Health check endpoint
router.get('/ping', (req, res) => {
  res.json({ status: 'ok' });
});

router.post('/register', authController.register);
router.post('/login', authController.login);

// Persistent login endpoint
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({
    id: user.id,
    email: user.email,
    username: user.username,
    profile_picture: user.profile_picture,
  });
});

module.exports = router; 