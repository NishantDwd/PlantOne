import { donationModel } from '../models/donationModel.js';
import { donorModel } from '../models/donorModel.js';

export const donationController = {
  // Create donation with validation
  createDonation: async (req, res, next) => {
    try {
      const { donor_id, amount, payment_mode } = req.body;

      if (!donor_id || !amount) {
        return res.status(400).json({ 
          error: 'Validation Error',
          message: 'Donor ID and amount are required' 
        });
      }

      // Amount validation
      if (amount <= 0) {
        return res.status(400).json({ 
          error: 'Validation Error',
          message: 'Amount must be greater than 0' 
        });
      }

      // Check if donor exists
      const donor = await donorModel.getById(donor_id);
      if (!donor) {
        return res.status(404).json({ 
          error: 'Not Found',
          message: 'Donor not found' 
        });
      }

      const donation = await donationModel.create(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Donation successful',
        data: donation
      });
    } catch (err) {
      next(err);
    }
  },

  // Get all donations
  getAllDonations: async (req, res, next) => {
    try {
      const donations = await donationModel.getAll();
      res.json({
        success: true,
        count: donations.length,
        data: donations
      });
    } catch (err) {
      next(err);
    }
  },

  // Get donation by ID
  getDonationById: async (req, res, next) => {
    try {
      const donation = await donationModel.getById(req.params.id);
      if (!donation) {
        return res.status(404).json({ 
          success: false,
          error: 'Donation not found' 
        });
      }
      res.json({
        success: true,
        data: donation
      });
    } catch (err) {
      next(err);
    }
  },

  // Get donations by donor ID
  getDonationsByDonorId: async (req, res, next) => {
    try {
      const donations = await donationModel.getByDonorId(req.params.donorId);
      res.json({
        success: true,
        count: donations.length,
        data: donations
      });
    } catch (err) {
      next(err);
    }
  },

  // Update donation
  updateDonation: async (req, res, next) => {
    try {
      const donation = await donationModel.update(req.params.id, req.body);
      if (!donation) {
        return res.status(404).json({ 
          success: false,
          error: 'Donation not found' 
        });
      }
      res.json({
        success: true,
        message: 'Donation updated successfully',
        data: donation
      });
    } catch (err) {
      next(err);
    }
  },

  // Delete donation
  deleteDonation: async (req, res, next) => {
    try {
      await donationModel.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};