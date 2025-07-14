const db = require('../config/db');

module.exports = {
  async getByPostId(post_id) {
    const [rows] = await db.query(
      'SELECT comments.*, users.username, users.profile_picture FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = ? ORDER BY comments.created_at ASC',
      [post_id]
    );
    return rows;
  },
  async getById(id) {
    const [rows] = await db.query('SELECT * FROM comments WHERE id = ?', [id]);
    return rows[0];
  },
  async create({ post_id, user_id, content }) {
    const [result] = await db.query(
      'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
      [post_id, user_id, content]
    );
    return result.insertId;
  },
  async update(id, { content }) {
    await db.query('UPDATE comments SET content = ? WHERE id = ?', [content, id]);
  },
  async delete(id) {
    await db.query('DELETE FROM comments WHERE id = ?', [id]);
  },
}; 