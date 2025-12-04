import express from 'express';
import { donorController } from '../controllers/donorController.js';

const router = express.Router();

// GET all donors
router.get('/', donorController.getAllDonors);

// GET donor by ID
router.get('/:id', donorController.getDonorById);

// POST create donor
router.post('/', donorController.createDonor);

// PUT update donor
router.put('/:id', donorController.updateDonor);

// DELETE donor
router.delete('/:id', donorController.deleteDonor);

export default router;