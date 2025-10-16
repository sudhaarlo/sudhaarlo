import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, getExpertBookings } from '../../services/api.js';

// A simple loading component for a better user experience
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
    </div>
);

export default function ExpertDashboard() {
    const navigate = useNavigate();

    // --- STATE MANAGEMENT ---
    const [user, setUser] = useState(null); // Will hold the expert's profile
    const [bookings, setBookings] = useState([]); // Will hold their assigned jobs
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- DATA FETCHING ---
    useEffect(() => {
        const fetchExpertData = async () => {
            try {
                // Fetch the expert's profile and their bookings in parallel
                const [profileData, bookingsData] = await Promise.all([
                    getUserProfile(),
                    getExpertBookings(),
                ]);
                setUser(profileData);
                setBookings(bookingsData);
            } catch (err) {
                console.error("Expert Dashboard Error:", err);
                setError("Sorry, we couldn't load your dashboard. Please try logging in again.");
            } finally {
                setLoading(false);
            }
        };

        fetchExpertData();
    }, []); // Empty dependency array means this runs only once on mount

    // --- DATA DERIVATION ---
    // For now, we'll keep the dashboard stats static as calculating them requires more data
    const dashboardStats = useMemo(() => ([
        { key: 'activeJobs', label: 'Active Jobs', value: bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending').length, accent: 'from-blue-400 to-blue-600' },
        { key: 'completedThisMonth', label: 'Completed (30d)', value: bookings.filter(b => b.status === 'Completed').length, accent: 'from-green-400 to-green-600' },
        { key: 'cancellationRate', label: 'Cancellation Rate', value: '0%', accent: 'from-yellow-400 to-yellow-500' }, // Placeholder
        { key: 'avgEarnings', label: 'Avg. Fee / Job', value: '₹0', accent: 'from-orange-400 to-red-500' }, // Placeholder
    ]), [bookings]);

    // --- RENDER LOGIC ---
    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="text-center mt-40 text-red-600 font-semibold">{error}</div>;
    }

    return (
        <div className="pt-24 pb-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-poppins">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');`}</style>

            <div className="container mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
                {/* --- Header (Now Dynamic) --- */}
                <header className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <h1
                                className="text-3xl md:text-4xl font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                                onClick={() => navigate('/expert/profile')}
                            >
                                {user?.name}
                            </h1>
                            <p className="mt-1 text-gray-600">{user?.profile?.trade || 'Service Professional'} • {user?.profile?.state || 'Location not set'}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                                <span className={`px-2 py-1 rounded-md text-sm ${user?.verified ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                                    {user?.verified ? 'Verified' : 'Unverified'}
                                </span>
                                {/* Add placeholder data for fields not yet in the schema */}
                                <span className="text-gray-500">Rating 0.0 (0)</span>
                                <span className="text-gray-500">Subscr. Not Active</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                className="px-5 py-3 rounded-xl bg-white border border-blue-600 text-blue-700 font-medium hover:bg-blue-50 transition-all"
                                onClick={() => navigate('/expert/history')}
                            >
                                View Work History
                            </button>
                            <button
                                className="px-5 py-3 rounded-xl bg-blue-600 text-white font-medium shadow hover:shadow-lg hover:-translate-y-0.5 transition-all"
                            >
                                Start New Job
                            </button>
                        </div>
                    </div>
                </header>

                {/* --- Dashboard Stats (Now Partially Dynamic) --- */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {dashboardStats.map(item => (
                        <div key={item.key} className="relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-md shadow hover:shadow-lg transition-all">
                            <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-20 bg-gradient-to-br ${item.accent}`} />
                            <div className="p-6">
                                <p className="text-gray-700 text-sm">{item.label}</p>
                                <p className="mt-2 text-3xl font-semibold text-gray-900">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* --- Upcoming Jobs (Now Dynamic) --- */}
                <section className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md shadow">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900">Upcoming Jobs</h2>
                    </div>
                    {bookings.length > 0 ? (
                        <ul className="divide-y divide-gray-100">
                            {bookings.map(job => (
                                <li key={job._id} className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-50 transition-all rounded-xl">
                                    <div>
                                        <p className="text-gray-900 font-medium">{job.service}</p>
                                        <p className="text-sm text-gray-600">{job.user?.name || 'Customer'} • {job.location}</p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3 mt-2 sm:mt-0">
                                        <span className="text-sm text-gray-700">{new Date(job.scheduled).toLocaleString()}</span>
                                        <span className="px-2 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-700">{job.status}</span>
                                        <button className="px-3 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50">Details</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-6 text-center text-gray-500">You have no upcoming jobs.</p>
                    )}
                </section>
            </div>
        </div>
    );
}

