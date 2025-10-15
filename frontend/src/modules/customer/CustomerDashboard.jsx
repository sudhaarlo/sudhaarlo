// src/modules/customer/CustomerDashboard.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, getCustomerBookings } from '../../services/api';

// A simple loading component for a better user experience
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
    </div>
);

// --- MAIN DASHBOARD COMPONENT ---
export default function CustomerDashboard() {
    const navigate = useNavigate();

    // --- STATE MANAGEMENT (Combined from both versions) ---
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedService, setSelectedService] = useState(null); // From friend's code for the UI

    // --- DATA FETCHING (From your functional code) ---
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [profileData, bookingsData] = await Promise.all([
                    getUserProfile(),
                    getCustomerBookings(),
                ]);
                setUser(profileData);
                setBookings(bookingsData);
            } catch (err) {
                console.error("Dashboard Error:", err);
                setError("Sorry, we couldn't load your dashboard. Please try logging in again.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []); // Empty dependency array means this runs only once on mount.

    // --- DATA DERIVATION & MEMOIZATION ---
    // Calculate quick stats dynamically based on live booking data
    const quickStats = useMemo(() => {
        const upcomingCount = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending').length;
        const completedCount = bookings.filter(b => b.status === 'Completed').length;
        
        return [
            { key: 'upcoming', label: 'Upcoming Bookings', value: upcomingCount, accent: 'from-blue-400 to-blue-600' },
            { key: 'completed', label: 'Completed Bookings', value: completedCount, accent: 'from-green-400 to-green-600' },
            { key: 'total', label: 'Total Bookings', value: bookings.length, accent: 'from-yellow-400 to-yellow-500' },
        ];
    }, [bookings]);

    // Static category data for the booking grid (from your friend's code)
    const categories = useMemo(() => [
        { name: 'AC Servicing', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' },
        { name: 'Plumbing', icon: 'M19 9h-4V3H9v6H5l7 7 7-7z' },
        { name: 'Electrical Repair', icon: 'M13 14h-2v-4h2v4zm0-6h-2V4h2v4zm1-8H9v2h5V0z' },
        { name: 'Appliance Repair', icon: 'M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z' },
        { name: 'Home Cleaning', icon: 'M12 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-2-5h4v-2h-4v2zM5 13H3v-2h2v2zm14 0h-2v-2h2v2zM15 9H9V4h6v5z' },
        { name: 'Pest Control', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8-8-3.58-8-8z' },
    ], []);

    // --- HANDLERS (From your friend's code) ---
    const handleSelectService = (serviceName) => {
        setSelectedService(serviceName);
        // This would eventually navigate to a booking page
        setTimeout(() => {
            console.log(`Navigating to booking page for: ${serviceName}`);
            // navigate(`/customer/book?service=${serviceName}`);
            setSelectedService(null); // Reset after action
        }, 1500);
    };

    // --- RENDER LOGIC (Handles loading and error states) ---
    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="text-center mt-40 text-red-600 font-semibold">{error}</div>;
    }

    return (
        <div className="font-poppins pt-24 pb-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');`}</style>

            <div className="container mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
                
                {/* --- Welcome Header (Now Dynamic) --- */}
                <header>
                    <h1
                        className="text-4xl font-bold cursor-pointer hover:text-blue-600 text-gray-900 transition-colors duration-300"
                        onClick={() => navigate('/customer/profile')}
                    >
                        Welcome, {user?.name}!
                    </h1>
                    <p className="mt-2 text-gray-600 text-base">
                        {user?.profile?.city || 'Your City'} • {bookings.length} total bookings
                    </p>
                </header>

                {/* --- Quick Stats (Now Dynamic) --- */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Current Booking Status</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {quickStats.map((s) => (
                            <div key={s.key} className="relative overflow-hidden rounded-2xl bg-white shadow-lg p-6 hover:scale-105 transform transition duration-300">
                                <div className={`absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${s.accent}`} />
                                <p className="text-sm text-gray-500 uppercase tracking-wider">{s.label}</p>
                                <p className="mt-2 text-4xl font-semibold text-gray-900">{s.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Book New Services (UI from friend's code) --- */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Book New Services</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => handleSelectService(cat.name)}
                                disabled={!!selectedService}
                                className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-gray-800 transition transform hover:scale-105 hover:shadow-xl hover:bg-blue-50 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <svg className="w-12 h-12 mb-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d={cat.icon} />
                                </svg>
                                <span className="text-lg font-medium text-center">{cat.name}</span>
                                <span className="text-xs mt-1 text-gray-500">Find experts now</span>
                            </button>
                        ))}
                    </div>
                    {selectedService && (
                        <div className="mt-6 p-4 bg-blue-600/90 rounded-xl text-white flex items-center justify-center shadow-lg">
                            Loading nearest {selectedService} experts...
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}