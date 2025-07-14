const Post = require('../models/Post');

exports.getFeed = async (req, res) => {
  // If user is authenticated, pass user id for like status
  const userId = req.user ? req.user.id : null;
  const posts = await Post.getAll(userId);
  res.json(posts);
};

exports.getById = async (req, res) => {
  const post = await Post.getById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

exports.create = async (req, res) => {
  const { content, image_url } = req.body;
  const user_id = req.user.id;
  if (!content && !image_url) return res.status(400).json({ message: 'Content or image required' });
  const postId = await Post.create({ user_id, content, image_url });
  res.status(201).json({ id: postId });
};

exports.update = async (req, res) => {
  const { content, image_url } = req.body;
  const post = await Post.getById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  await Post.update(req.params.id, { content, image_url });
  res.json({ message: 'Post updated' });
};

exports.delete = async (req, res) => {
  const post = await Post.getById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  await Post.delete(req.params.id);
  res.json({ message: 'Post deleted' });
}; 