const db = require('../config/db');

module.exports = {
  async likePost(user_id, post_id) {
    await db.query('INSERT IGNORE INTO likes (user_id, post_id) VALUES (?, ?)', [user_id, post_id]);
  },
  async unlikePost(user_id, post_id) {
    await db.query('DELETE FROM likes WHERE user_id = ? AND post_id = ?', [user_id, post_id]);
  },
  async likeComment(user_id, comment_id) {
    await db.query('INSERT IGNORE INTO likes (user_id, comment_id) VALUES (?, ?)', [user_id, comment_id]);
  },
  async unlikeComment(user_id, comment_id) {
    await db.query('DELETE FROM likes WHERE user_id = ? AND comment_id = ?', [user_id, comment_id]);
  },
  async countPostLikes(post_id) {
    const [rows] = await db.query('SELECT COUNT(*) as count FROM likes WHERE post_id = ?', [post_id]);
    return rows[0].count;
  },
  async countCommentLikes(comment_id) {
    const [rows] = await db.query('SELECT COUNT(*) as count FROM likes WHERE comment_id = ?', [comment_id]);
    return rows[0].count;
  },
  async isPostLikedByUser(user_id, post_id) {
    const [rows] = await db.query('SELECT * FROM likes WHERE user_id = ? AND post_id = ?', [user_id, post_id]);
    return rows.length > 0;
  },
  async isCommentLikedByUser(user_id, comment_id) {
    const [rows] = await db.query('SELECT * FROM likes WHERE user_id = ? AND comment_id = ?', [user_id, comment_id]);
    return rows.length > 0;
  },
}; 