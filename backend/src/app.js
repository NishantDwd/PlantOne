import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Import routes
import donorRoutes from './routes/donorRoutes.js';
import donationRoutes from './routes/donationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Use routes
app.use('/api/donors', donorRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/admins', adminRoutes);

// 404 handler 
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;