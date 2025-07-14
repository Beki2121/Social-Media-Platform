const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const followController = require('../controllers/followController');

// Follow a user
router.post('/:userId', auth, followController.follow);

// Unfollow a user
router.delete('/:userId', auth, followController.unfollow);

// Get followers
router.get('/:userId/followers', followController.getFollowers);

// Get following
router.get('/:userId/following', followController.getFollowing);

module.exports = router; 