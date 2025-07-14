const db = require('../config/db');

module.exports = {
  async likePost(user_id, post_id) {
    await db.query('INSERT INTO likes (user_id, post_id, type) VALUES (?, ?, \'like\') ON DUPLICATE KEY UPDATE type=\'like\'', [user_id, post_id]);
  },
  async unlikePost(user_id, post_id) {
    await db.query('INSERT INTO likes (user_id, post_id, type) VALUES (?, ?, \'unlike\') ON DUPLICATE KEY UPDATE type=\'unlike\'', [user_id, post_id]);
  },
  async removeLike(user_id, post_id) {
    await db.query('DELETE FROM likes WHERE user_id = ? AND post_id = ? AND type = \'like\'', [user_id, post_id]);
  },
  async removeUnlike(user_id, post_id) {
    await db.query('DELETE FROM likes WHERE user_id = ? AND post_id = ? AND type = \'unlike\'', [user_id, post_id]);
  },
  async countPostLikes(post_id) {
    const [rows] = await db.query('SELECT COUNT(*) as count FROM likes WHERE post_id = ? AND type = \'like\'', [post_id]);
    return rows[0].count;
  },
  async countPostUnlikes(post_id) {
    const [rows] = await db.query('SELECT COUNT(*) as count FROM likes WHERE post_id = ? AND type = \'unlike\'', [post_id]);
    return rows[0].count;
  },
  async isPostLikedByUser(user_id, post_id) {
    const [rows] = await db.query('SELECT * FROM likes WHERE user_id = ? AND post_id = ? AND type = \'like\'', [user_id, post_id]);
    return rows.length > 0;
  },
  async isPostUnlikedByUser(user_id, post_id) {
    const [rows] = await db.query('SELECT * FROM likes WHERE user_id = ? AND post_id = ? AND type = \'unlike\'', [user_id, post_id]);
    return rows.length > 0;
  },
}; 