// src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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

// THIS IS THE NEW FUNCTION THAT WAS MISSING
export const getExpertBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    // We will create this backend endpoint next
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