const db = require('../config/db');
const Like = require('./Like');

module.exports = {
  async getAll(userId = null) {
    const [rows] = await db.query(
      'SELECT posts.*, users.username, users.profile_picture FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC'
    );
    // For each post, fetch like/unlike counts and user status
    const posts = await Promise.all(rows.map(async row => {
      const likeCount = await Like.countPostLikes(row.id);
      const unlikeCount = await Like.countPostUnlikes(row.id);
      let userLikeStatus = null;
      if (userId) {
        if (await Like.isPostLikedByUser(userId, row.id)) userLikeStatus = 'like';
        else if (await Like.isPostUnlikedByUser(userId, row.id)) userLikeStatus = 'unlike';
      }
      return {
        id: row.id,
        userId: row.user_id,
        username: row.username,
        userAvatar: row.profile_picture,
        content: row.content,
        image: row.image_url,
        createdAt: row.created_at ? new Date(row.created_at).toISOString() : null,
        likeCount,
        unlikeCount,
        userLikeStatus,
      };
    }));
    return posts;
  },
  async getById(id) {
    const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
    return rows[0];
  },
  async create({ user_id, content, image_url }) {
    const [result] = await db.query(
      'INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)',
      [user_id, content, image_url]
    );
    return result.insertId;
  },
  async update(id, { content, image_url }) {
    await db.query(
      'UPDATE posts SET content = ?, image_url = ? WHERE id = ?',
      [content, image_url, id]
    );
  },
  async delete(id) {
    await db.query('DELETE FROM posts WHERE id = ?', [id]);
  },
  async getByUserId(user_id) {
    const [rows] = await db.query('SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC', [user_id]);
    return rows;
  },
}; 