const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const likeController = require('../controllers/likeController');

// Like a post
router.post('/post/:postId', auth, likeController.likePost);
// Unlike a post
router.post('/post/:postId/unlike', auth, likeController.unlikePost);
// Remove like
router.delete('/post/:postId/like', auth, likeController.removeLike);
// Remove unlike
router.delete('/post/:postId/unlike', auth, likeController.removeUnlike);
// Get like/unlike counts and user status
router.get('/post/:postId', auth, likeController.getPostLikes);

// Like a comment
router.post('/comment/:commentId', auth, likeController.likeComment);
// Unlike a comment
router.delete('/comment/:commentId', auth, likeController.unlikeComment);

module.exports = router; 