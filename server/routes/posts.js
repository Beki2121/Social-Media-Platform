const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postController = require('../controllers/postController');

// Get all posts (feed)
router.get('/', postController.getFeed);

// Get a single post by ID
router.get('/:id', postController.getById);

// Create post (protected)
router.post('/', auth, postController.create);

// Update post (protected)
router.put('/:id', auth, postController.update);

// Delete post (protected)
router.delete('/:id', auth, postController.delete);

module.exports = router; 