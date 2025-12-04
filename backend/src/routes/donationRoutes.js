import express from 'express';
import { donationController } from '../controllers/donationController.js';

const router = express.Router();

// Get all donations
router.get('/', donationController.getAllDonations);

// Get donation by ID
router.get('/:id', donationController.getDonationById);

// Get donations by donor ID
router.get('/donor/:donorId', donationController.getDonationsByDonorId);

// Create donation
router.post('/', donationController.createDonation);

// Update donation
router.put('/:id', donationController.updateDonation);

// Delete donation
router.delete('/:id', donationController.deleteDonation);

export default router;