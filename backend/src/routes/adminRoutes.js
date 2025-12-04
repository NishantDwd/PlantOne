import express from 'express';
import { adminController } from '../controllers/adminController.js';

const router = express.Router();

// Admin authentication routes
router.post('/', adminController.createAdmin);
router.get('/:id', adminController.getAdminById);
router.post('/login', adminController.loginAdmin);

// Admin dashboard routes
router.get('/donors/all', adminController.getAllDonorsWithDonations);
router.get('/donations/total', adminController.getTotalDonations);
router.get('/statistics/dashboard', adminController.getStatistics);

export default router;