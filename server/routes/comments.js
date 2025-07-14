const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/commentController');

// Get comments for a post
router.get('/post/:postId', commentController.getByPost);

// Add comment (protected)
router.post('/post/:postId', auth, commentController.create);

// Edit comment (protected)
router.put('/:id', auth, commentController.update);

// Delete comment (protected)
router.delete('/:id', auth, commentController.delete);

module.exports = router; 