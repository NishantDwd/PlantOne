import { adminModel } from '../models/adminModel.js';
import { donorModel } from '../models/donorModel.js';
import { donationModel } from '../models/donationModel.js';

export const adminController = {
  // Create admin
  createAdmin: async (req, res, next) => {
    try {
      const existingUsername = await adminModel.findByUsername(req.body.username);
      if (existingUsername) {
        return res.status(409).json({ error: 'Username already exists' });
      }

      const existingEmail = await adminModel.findByEmail(req.body.email);
      if (existingEmail) {
        return res.status(409).json({ error: 'Email already exists' });
      }

      const admin = await adminModel.create(req.body);
      delete admin.password;
      
      res.status(201).json({
        success: true,
        data: admin
      });
    } catch (err) {
      next(err);
    }
  },

  // Get admin by ID
  getAdminById: async (req, res, next) => {
    try {
      const admin = await adminModel.getById(req.params.id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      delete admin.password;
      res.json({
        success: true,
        data: admin
      });
    } catch (err) {
      next(err);
    }
  },

  // Login admin
  loginAdmin: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const admin = await adminModel.findByUsername(username);
      
      if (!admin || admin.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      delete admin.password;
      res.json({
        success: true,
        data: admin
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /admin/donors - Get all donors with their donations and total
  getAllDonorsWithDonations: async (req, res, next) => {
    try {
      const donors = await donorModel.getAll();
      
      const donorsWithDonations = await Promise.all(
        donors.map(async (donor) => {
          const donations = await donationModel.getByDonorId(donor.id);
          const totalAmount = await donationModel.getDonorTotal(donor.id);
          
          return {
            donorId: donor.id,
            name: donor.name,
            email: donor.email,
            phone: donor.phone,
            address: donor.address,
            city: donor.city,
            state: donor.state,
            country: donor.country,
            pincode: donor.pincode,
            donations: donations,
            totalAmount: totalAmount,
            donationCount: donations.length,
            createdAt: donor.created_at
          };
        })
      );

      res.json({
        success: true,
        count: donorsWithDonations.length,
        data: donorsWithDonations
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /admin/donations/total - Get total of all donations
  getTotalDonations: async (req, res, next) => {
    try {
      const total = await donationModel.getTotalAmount();
      const allDonations = await donationModel.getAll();
      
      res.json({
        success: true,
        data: {
          total: total,
          count: allDonations.length
        }
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /admin/statistics - Dashboard statistics
  getStatistics: async (req, res, next) => {
    try {
      const donors = await donorModel.getAll();
      const donations = await donationModel.getAll();
      const total = await donationModel.getTotalAmount();

      res.json({
        success: true,
        data: {
          totalDonors: donors.length,
          totalDonations: donations.length,
          totalAmount: total,
          averageDonation: donations.length > 0 ? (total / donations.length).toFixed(2) : 0
        }
      });
    } catch (err) {
      next(err);
    }
  }
};