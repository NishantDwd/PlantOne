import { query } from '../config/db.js';

export const donationModel = {
  // Create a new donation
  create: async (donationData) => {
    const { 
      donor_id, 
      amount, 
      payment_mode, 
      donation_type,
      impact_type,
      on_behalf_of, 
      message 
    } = donationData;
    
    const result = await query(
      `INSERT INTO donations 
       (donor_id, amount, payment_mode, donation_type, impact_type, on_behalf_of, message, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'completed') 
       RETURNING *`,
      [donor_id, amount, payment_mode || 'UPI', donation_type || 'one_time', impact_type, on_behalf_of, message]
    );
    return result.rows[0];
  },

  // Get all donations with donor info
  getAll: async () => {
    const result = await query(`
      SELECT 
        d.id,
        d.amount,
        d.payment_mode,
        d.donation_type,
        d.impact_type,
        d.on_behalf_of,
        d.message,
        d.donation_date,
        d.status,
        d.created_at,
        don.id as donor_id,
        don.name as donor_name,
        don.email as donor_email,
        don.phone as donor_phone,
        don.city as donor_city
      FROM donations d
      LEFT JOIN donors don ON d.donor_id = don.id
      ORDER BY d.created_at DESC
    `);
    return result.rows;
  },

  // Get donation by ID
  getById: async (id) => {
    const result = await query(`
      SELECT 
        d.*,
        don.name as donor_name,
        don.email as donor_email,
        don.phone as donor_phone
      FROM donations d
      LEFT JOIN donors don ON d.donor_id = don.id
      WHERE d.id = $1
    `, [id]);
    return result.rows[0];
  },

  // Get all donations by donor ID
  getByDonorId: async (donorId) => {
    const result = await query(`
      SELECT * FROM donations 
      WHERE donor_id = $1 
      ORDER BY created_at DESC
    `, [donorId]);
    return result.rows;
  },

  // Update donation
  update: async (id, donationData) => {
    const { amount, payment_mode, on_behalf_of, message, status } = donationData;
    const result = await query(
      `UPDATE donations 
       SET amount = $1, payment_mode = $2, on_behalf_of = $3, 
           message = $4, status = $5, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $6 
       RETURNING *`,
      [amount, payment_mode, on_behalf_of, message, status, id]
    );
    return result.rows[0];
  },

  // Delete donation
  delete: async (id) => {
    await query('DELETE FROM donations WHERE id = $1', [id]);
  },

  // Get total donations amount
  getTotalAmount: async () => {
    const result = await query('SELECT COALESCE(SUM(amount), 0) as total FROM donations');
    return parseFloat(result.rows[0].total);
  },

  // Get donor's total donations
  getDonorTotal: async (donorId) => {
    const result = await query(
      'SELECT COALESCE(SUM(amount), 0) as total FROM donations WHERE donor_id = $1',
      [donorId]
    );
    return parseFloat(result.rows[0].total);
  },
};