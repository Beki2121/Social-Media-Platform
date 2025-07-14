const Like = require('../models/Like');

exports.likePost = async (req, res) => {
  await Like.likePost(req.user.id, req.params.postId);
  res.json({ message: 'Post liked' });
};

exports.unlikePost = async (req, res) => {
  await Like.unlikePost(req.user.id, req.params.postId);
  res.json({ message: 'Post unliked' });
};

exports.removeLike = async (req, res) => {
  await Like.removeLike(req.user.id, req.params.postId);
  res.json({ message: 'Like removed' });
};

exports.removeUnlike = async (req, res) => {
  await Like.removeUnlike(req.user.id, req.params.postId);
  res.json({ message: 'Unlike removed' });
};

exports.getPostLikes = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;
  const likeCount = await Like.countPostLikes(postId);
  const unlikeCount = await Like.countPostUnlikes(postId);
  const liked = await Like.isPostLikedByUser(userId, postId);
  const unliked = await Like.isPostUnlikedByUser(userId, postId);
  res.json({ likeCount, unlikeCount, liked, unliked });
};

exports.likeComment = async (req, res) => {
  await Like.likeComment(req.user.id, req.params.commentId);
  res.json({ message: 'Comment liked' });
};

exports.unlikeComment = async (req, res) => {
  await Like.unlikeComment(req.user.id, req.params.commentId);
  res.json({ message: 'Comment unliked' });
}; 