import { query } from './db.js';

const testConnection = async () => {
  try {
    const result = await query('SELECT NOW()');
    console.log('✅ Database connected successfully!');
    console.log('Current time from DB:', result.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
};

testConnection();