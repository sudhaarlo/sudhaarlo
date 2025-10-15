import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// NOTE: We'll assume a new function for login that handles both phone and email
import { loginUser } from '../../services/api'; 
// NOTE: For this component to work outside of a dedicated App context, 
// you'll need to remove 'onLogin' and 'openModal' from the function signature
// and handle navigation and state locally or via a global context/hook.

export default function LoginPage() {
    // Single state for the identifier (can be email or phone)
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Utility function to check if the input is likely an email
    const isEmail = (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    // Utility function to check if the input is likely an Indian phone number (10 digits)
    const isPhone = (input) => /^\d{10}$/.test(input.replace(/[^0-9]/g, ''));

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        let loginData = { password };

        if (isEmail(identifier)) {
            loginData.email = identifier;
        } else if (isPhone(identifier)) {
            loginData.phone = identifier.replace(/[^0-9]/g, ''); // Clean up phone number
        } else {
            setError("Please enter a valid email or 10-digit phone number.");
            setLoading(false);
            return;
        }
        
        try {
            // Assume loginUser handles authentication and returns user data with a role
            const res = await loginUser(loginData);
            const userRole = res?.data?.user?.role || 'customer'; // Default to customer if role isn't clear
            
            // Assuming successful login sets a token and redirects
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
            }

            // Redirect based on the determined role
            if (userRole === 'expert') {
                navigate('/expert/dashboard');
            } else if (userRole === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/customer/dashboard');
            }

        } catch (err) {
            // Display error from the API or a general failure message
            setError(err?.response?.data?.message || 'Login failed. Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-8 min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 font-sans flex items-center justify-center">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                <h2 className="text-3xl font-black text-center mb-6">
                    <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Login to Your</span>
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> Account</span>
                </h2>
                {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}
                
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="identifier">
                            Email or Phone Number
                        </label>
                        <input
                            id="identifier"
                            type="text" // Use text type for flexible input
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            placeholder="Email (e.g., you@example.com) or 10-digit Phone"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:transform-none"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p className="mt-8 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-bold text-orange-600 hover:underline">
                        Register Here
                    </Link>
                </p>
            </div>
        </div>
    );
}
