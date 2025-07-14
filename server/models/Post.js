const db = require('../config/db');

module.exports = {
  async getAll() {
    const [rows] = await db.query(
      'SELECT posts.*, users.username, users.profile_picture FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC'
    );
    return rows;
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