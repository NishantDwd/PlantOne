import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Donors API
export const donorAPI = {
  getAll: () => api.get('/donors'),
  getById: (id) => api.get(`/donors/${id}`),
  create: (data) => api.post('/donors', data),
  update: (id, data) => api.put(`/donors/${id}`, data),
  delete: (id) => api.delete(`/donors/${id}`),
};

// Donations API
export const donationAPI = {
  getAll: () => api.get('/donations'),
  getById: (id) => api.get(`/donations/${id}`),
  create: (data) => api.post('/donations', data),
  update: (id, data) => api.put(`/donations/${id}`, data),
  delete: (id) => api.delete(`/donations/${id}`),
};

// Admins API
export const adminAPI = {
  create: (data) => api.post('/admins', data),
  getById: (id) => api.get(`/admins/${id}`),
  login: (credentials) => api.post('/admins/login', credentials),
};

export default api;