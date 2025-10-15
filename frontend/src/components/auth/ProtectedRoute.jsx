// src/components/auth/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import for the library

/**
 * Checks for a valid, non-expired token and user role.
 * @returns {object|null} An object with token and user details, or null.
 */
const getAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }

    try {
        const decoded = jwtDecode(token);
        // Check if the token is expired
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('token'); // Clean up expired token
            return null;
        }
        return { token, user: decoded }; // Contains { id, role, iat, exp }
    } catch (e) {
        // If token is malformed
        localStorage.removeItem('token');
        return null;
    }
};

/**
 * A component to protect routes that require authentication.
 * Can also check for a specific role.
 * @param {object} props - Component props.
 * @param {string} [props.role] - The required role to access the route ('customer' or 'expert').
 */
const ProtectedRoute = ({ role }) => {
    const auth = getAuth();

    if (!auth) {
        // If user is not logged in, redirect to the login page
        return <Navigate to="/login" replace />;
    }

    if (role && auth.user.role !== role) {
        // If a specific role is required and the user's role doesn't match,
        // redirect them to a default page (or a 'Not Authorized' page).
        // For example, an expert trying to access a customer page.
        const defaultPath = auth.user.role === 'expert' ? '/expert/dashboard' : '/customer/dashboard';
        return <Navigate to={defaultPath} replace />;
    }

    // If the user is authenticated (and has the correct role), render the requested component
    return <Outlet />;
};

export default ProtectedRoute;