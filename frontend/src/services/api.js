import axios from 'axios';

// Base URL for backend API. Use Vite env var when available.
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token from localStorage automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers = config.headers || {};
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Auth ---
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// --- Experts ---
export const getExperts = () => API.get('/experts');
export const getExpertHistory = (expertId) => API.get(`/experts/${expertId}/history`);

// --- Bookings ---
export const createBooking = (data) => API.post('/bookings', data);
export const getCustomerBookings = () => API.get('/bookings/customer');

// Default export the axios instance for advanced use
export default API;