const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const likeController = require('../controllers/likeController');

// Like a post
router.post('/post/:postId', auth, likeController.likePost);

// Unlike a post
router.delete('/post/:postId', auth, likeController.unlikePost);

// Like a comment
router.post('/comment/:commentId', auth, likeController.likeComment);

// Unlike a comment
router.delete('/comment/:commentId', auth, likeController.unlikeComment);

module.exports = router; 