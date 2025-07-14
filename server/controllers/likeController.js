const Like = require('../models/Like');

exports.likePost = async (req, res) => {
  await Like.likePost(req.user.id, req.params.postId);
  res.json({ message: 'Post liked' });
};

exports.unlikePost = async (req, res) => {
  await Like.unlikePost(req.user.id, req.params.postId);
  res.json({ message: 'Post unliked' });
};

exports.likeComment = async (req, res) => {
  await Like.likeComment(req.user.id, req.params.commentId);
  res.json({ message: 'Comment liked' });
};

exports.unlikeComment = async (req, res) => {
  await Like.unlikeComment(req.user.id, req.params.commentId);
  res.json({ message: 'Comment unliked' });
}; 