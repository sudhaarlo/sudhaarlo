// src/services/api.js

import axios from 'axios';

// 1. Get the base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// 2. Create a re-usable axios instance
const api = axios.create({
    baseURL: API_URL,
});

// 3. IMPORTANT: Use an interceptor to automatically add the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Your backend middleware ('protect') is looking for 'x-auth-token'
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- AUTH FUNCTIONS ---
export const apiRegister = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const apiLogin = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const apiGetProfile = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

// --- BOOKING FUNCTIONS ---
export const getCustomerBookings = async () => {
    const response = await api.get('/bookings/customer');
    return response.data;
};

export const getExpertBookings = async () => {
    const response = await api.get('/bookings/expert');
    return response.data;
};

export const createBooking = async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
};

// --- USER/EXPERT FUNCTIONS ---
export const getExperts = async () => {
    // This route is public, so it doesn't need a token
    const response = await api.get('/users/experts'); 
    return response.data;
};


// --- NEW ADMIN FUNCTIONS ---

/**
 * @desc    Get all experts pending verification
 * @route   GET /api/admin/experts/unverified
 */
export const getUnverifiedExperts = async () => {
    // Token is added automatically by the interceptor
    const response = await api.get('/admin/experts/unverified');
    return response.data;
};

/**
 * @desc    Verify a single expert by their user ID
 * @route   PATCH /api/admin/experts/verify/:id
 */
export const verifyExpert = async (expertId) => {
    // Token is added automatically by the interceptor
    const response = await api.patch(`/admin/experts/verify/${expertId}`);
    return response.data;
};
// --- END NEW FUNCTIONS ---

export default api;