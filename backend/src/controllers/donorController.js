import { donorModel } from '../models/donorModel.js';

export const donorController = {
  // Create donor with validation
  createDonor: async (req, res, next) => {
    try {
      const { name, email, phone, address, city, state, country, pincode } = req.body;

      if (!name || !email || !phone || !address || !city || !state || !country || !pincode) {
        return res.status(400).json({ 
          error: 'Validation Error',
          message: 'All required fields must be provided' 
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          error: 'Validation Error',
          message: 'Invalid email format' 
        });
      }

      // Check if email already exists
      const existingDonor = await donorModel.getByEmail(email);
      if (existingDonor) {
        return res.status(409).json({ 
          error: 'Duplicate Entry',
          message: 'Email already exists' 
        });
      }

      const donor = await donorModel.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Donor profile created successfully',
        data: donor
      });
    } catch (err) {
      next(err);
    }
  },

  // Get all donors
  getAllDonors: async (req, res, next) => {
    try {
      const donors = await donorModel.getAll();
      res.json({
        success: true,
        count: donors.length,
        data: donors
      });
    } catch (err) {
      next(err);
    }
  },

  // Get donor by ID
  getDonorById: async (req, res, next) => {
    try {
      const donor = await donorModel.getById(req.params.id);
      if (!donor) {
        return res.status(404).json({ 
          success: false,
          error: 'Donor not found' 
        });
      }
      res.json({
        success: true,
        data: donor
      });
    } catch (err) {
      next(err);
    }
  },

  // Update donor
  updateDonor: async (req, res, next) => {
    try {
      const donor = await donorModel.update(req.params.id, req.body);
      if (!donor) {
        return res.status(404).json({ 
          success: false,
          error: 'Donor not found' 
        });
      }
      res.json({
        success: true,
        message: 'Donor updated successfully',
        data: donor
      });
    } catch (err) {
      next(err);
    }
  },

  // Delete donor
  deleteDonor: async (req, res, next) => {
    try {
      await donorModel.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};