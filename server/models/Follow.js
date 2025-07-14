const db = require('../config/db');

module.exports = {
  async follow(follower_id, following_id) {
    await db.query('INSERT IGNORE INTO follows (follower_id, following_id) VALUES (?, ?)', [follower_id, following_id]);
  },
  async unfollow(follower_id, following_id) {
    await db.query('DELETE FROM follows WHERE follower_id = ? AND following_id = ?', [follower_id, following_id]);
  },
  async getFollowers(user_id) {
    const [rows] = await db.query(
      'SELECT users.id, users.username, users.profile_picture FROM follows JOIN users ON follows.follower_id = users.id WHERE follows.following_id = ?',
      [user_id]
    );
    return rows;
  },
  async getFollowing(user_id) {
    const [rows] = await db.query(
      'SELECT users.id, users.username, users.profile_picture FROM follows JOIN users ON follows.following_id = users.id WHERE follows.follower_id = ?',
      [user_id]
    );
    return rows;
  },
}; 