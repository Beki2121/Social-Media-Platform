const Comment = require('../models/Comment');

exports.getByPost = async (req, res) => {
  const comments = await Comment.getByPostId(req.params.postId);
  res.json(comments);
};

exports.create = async (req, res) => {
  const { content } = req.body;
  const user_id = req.user.id;
  const post_id = req.params.postId;
  if (!content) return res.status(400).json({ message: 'Content required' });
  const commentId = await Comment.create({ post_id, user_id, content });
  res.status(201).json({ id: commentId });
};

exports.update = async (req, res) => {
  const { content } = req.body;
  const comment = await Comment.getById(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  if (comment.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  await Comment.update(req.params.id, { content });
  res.json({ message: 'Comment updated' });
};

exports.delete = async (req, res) => {
  const comment = await Comment.getById(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  if (comment.user_id !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  await Comment.delete(req.params.id);
  res.json({ message: 'Comment deleted' });
}; 