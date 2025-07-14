const db = require('../config/db');

module.exports = {
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  async create({ email, password, username }) {
    const [result] = await db.query(
      'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
      [email, password, username]
    );
    return result.insertId;
  },
  async updateProfile(id, { username, bio, profile_picture }) {
    await db.query(
      'UPDATE users SET username = ?, bio = ?, profile_picture = ? WHERE id = ?',
      [username, bio, profile_picture, id]
    );
  },
  // Add more user-related queries as needed
}; 