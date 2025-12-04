import { query } from '../config/db.js';

export const donorModel = {
  // Create a new donor with all required fields
  create: async (donorData) => {
    const { name, email, phone, address, city, state, country, pincode, note } = donorData;
    const result = await query(
      `INSERT INTO donors (name, email, phone, address, city, state, country, pincode, note) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [name, email, phone, address, city, state, country, pincode, note]
    );
    return result.rows[0];
  },

  // Get all donors
  getAll: async () => {
    const result = await query('SELECT * FROM donors ORDER BY created_at DESC');
    return result.rows;
  },

  // Get donor by ID
  getById: async (id) => {
    const result = await query('SELECT * FROM donors WHERE id = $1', [id]);
    return result.rows[0];
  },

  // Get donor by email
  getByEmail: async (email) => {
    const result = await query('SELECT * FROM donors WHERE email = $1', [email]);
    return result.rows[0];
  },

  // Update donor
  update: async (id, donorData) => {
    const { name, email, phone, address, city, state, country, pincode, note } = donorData;
    const result = await query(
      `UPDATE donors 
       SET name = $1, email = $2, phone = $3, address = $4, city = $5, 
           state = $6, country = $7, pincode = $8, note = $9, 
           updated_at = CURRENT_TIMESTAMP 
       WHERE id = $10 
       RETURNING *`,
      [name, email, phone, address, city, state, country, pincode, note, id]
    );
    return result.rows[0];
  },

  // Delete donor
  delete: async (id) => {
    await query('DELETE FROM donors WHERE id = $1', [id]);
  },
};