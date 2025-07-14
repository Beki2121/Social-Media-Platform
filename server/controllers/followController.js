const Follow = require('../models/Follow');

exports.follow = async (req, res) => {
  await Follow.follow(req.user.id, req.params.userId);
  res.json({ message: 'User followed' });
};

exports.unfollow = async (req, res) => {
  await Follow.unfollow(req.user.id, req.params.userId);
  res.json({ message: 'User unfollowed' });
};

exports.getFollowers = async (req, res) => {
  const followers = await Follow.getFollowers(req.params.userId);
  res.json(followers);
};

exports.getFollowing = async (req, res) => {
  const following = await Follow.getFollowing(req.params.userId);
  res.json(following);
}; 