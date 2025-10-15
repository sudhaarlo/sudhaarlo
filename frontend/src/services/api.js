// src/services/api.js

import axios from 'axios';

// MERGED: Use the superior environment variable approach from your friend,
// but keep the consistent 'API_URL' variable name.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// --- AUTH FUNCTIONS ---
export const registerUser = (userData) => {
    return api.post('/auth/register', userData);
};

export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const getUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// --- BOOKING FUNCTIONS ---
export const getCustomerBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await api.get('/bookings/customer', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getExpertBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await api.get('/bookings/expert', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// --- USER/EXPERT FUNCTIONS ---
export const getExperts = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await api.get('/users/experts', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};