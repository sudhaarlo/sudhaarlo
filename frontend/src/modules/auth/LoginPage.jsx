import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// NOTE: In a multi-file project, you would import the Modal and
// other shared components from a central components folder.
// For this single-file output, we will assume they are available.
export default function LoginPage({ onLogin, openModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Attempting login with:', email, password); // This logs the login attempt with the entered email and password.
    // Simulate successful login
    onLogin('customer'); // Or expert, or admin based on logic
    openModal('Login successful!');
  };

  return (
    <div className="pt-24 pb-8 min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 font-sans flex items-center justify-center">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-black text-center mb-6">
          <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Login to Your</span>
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> Account</span>
        </h2>
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
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
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300"
          >
            Sign In
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