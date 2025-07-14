require('dotenv').config();
const app = require('./app');
const db = require('./config/db');
const PORT = process.env.PORT || 5000;

// Check database connection before starting server
(async () => {
  try {
    await db.query('SELECT 1');
    console.log('✅ Database connected successfully');
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
})(); 