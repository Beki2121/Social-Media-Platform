const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Health check endpoint
router.get('/ping', (req, res) => {
  res.json({ status: 'ok' });
});

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router; 