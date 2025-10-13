import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';

export default function RegistrationPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleRegistrationSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			const res = await registerUser({ name, email, password });
			const token = res?.data?.token || res?.token || (res && res.data && res.data.token);
			if (token) localStorage.setItem('token', token);
			navigate('/customer');
		} catch (err) {
			setError(err?.response?.data?.message || err.message || 'Registration failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="pt-24 pb-8 min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 font-sans flex items-center justify-center">
			<div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
				<h2 className="text-3xl font-black text-center mb-6">
					<span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Join Our</span>
					<span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent"> Community</span>
				</h2>
				{error && <div className="mb-4 text-sm text-red-600">{error}</div>}
				<form onSubmit={handleRegistrationSubmit} className="space-y-6">
					<div>
						<label className="block text-gray-700 font-semibold mb-2">Full Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="John Doe"
							className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
							required
						/>
					</div>
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
						disabled={loading}
						className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-60"
					>
						{loading ? 'Registering...' : 'Register'}
					</button>
				</form>
				<p className="mt-8 text-center text-gray-600">
					Already have an account?{' '}
					<Link to="/login" className="font-bold text-orange-600 hover:underline">
						Login Here
					</Link>
				</p>
			</div>
		</div>
	);
}

