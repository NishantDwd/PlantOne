import { query } from '../config/db.js';

export const adminModel = {
  // Create a new admin
  create: async (adminData) => {
    const { username, password, email, role } = adminData;
    const result = await query(
      'INSERT INTO admins (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, password, email, role]
    );
    return result.rows[0];
  },

  // Find admin by username
  findByUsername: async (username) => {
    const result = await query('SELECT * FROM admins WHERE username = $1', [username]);
    return result.rows[0];
  },

  // Find admin by email
  findByEmail: async (email) => {
    const result = await query('SELECT * FROM admins WHERE email = $1', [email]);
    return result.rows[0];
  },

  // Get admin by ID
  getById: async (id) => {
    const result = await query('SELECT * FROM admins WHERE id = $1', [id]);
    return result.rows[0];
  },
};