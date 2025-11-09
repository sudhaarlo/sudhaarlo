// src/modules/admin/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// 1. Import the admin functions from our updated api.js (removed .js)
import { getUnverifiedExperts, verifyExpert } from '../../services/api'; 
// 2. Import the useAuth hook to get the admin's info (removed .js)
import { useAuth } from '../../hooks/useAuth';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
    </div>
);

export default function AdminDashboard() {
    const { user } = useAuth();
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch the list of unverified experts
    const fetchExperts = async () => {
        try {
            setLoading(true);
            const data = await getUnverifiedExperts();
            setExperts(data);
        } catch (err) {
            setError('Failed to fetch experts. Are you logged in as an Admin?');
            toast.error('Failed to fetch experts.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch the list when the component mounts
    useEffect(() => {
        fetchExperts();
    }, []);

    // Function to handle the "Verify" button click
    const handleVerifyClick = async (expertId) => {
        try {
            // Call the backend API to verify the expert
            const res = await verifyExpert(expertId);
            toast.success(res.message || 'Expert verified!');
            
            // Remove the verified expert from the list without a full reload
            setExperts((prevExperts) => 
                prevExperts.filter((expert) => expert._id !== expertId)
            );
        } catch (err) {
            toast.error('Verification failed. Please try again.');
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="pt-24 pb-10 min-h-screen bg-gray-50 font-sans">
            <ToastContainer />
            <div className="container mx-auto px-4 sm:px-6 lg:px-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
                <p className="text-lg text-gray-600 mb-8">Welcome, {user?.name}.</p>

                <section className="bg-white rounded-xl shadow-lg border">
                    <div className="p-6 border-b">
                        <h2 className="text-2xl font-semibold text-gray-800">Expert Verification Queue</h2>
                        <p className="text-gray-500">Approve or deny new experts.</p>
                    </div>

                    {error && <div className="p-6 text-red-600 bg-red-50">{error}</div>}
                    
                    <div className="divide-y divide-gray-200">
                        {experts.length > 0 ? (
                            experts.map((expert) => (
                                <div key={expert._id} className="p-6 flex flex-col md:flex-row justify-between md:items-center">
                                    <div>
                                        <p className="text-xl font-semibold text-blue-700">{expert.name}</p>
                                        <p className="text-gray-600">{expert.email} | {expert.profile.phone}</p>
                                        <p className="text-gray-800 mt-1">Trade: <span className="font-medium">{expert.profile.trade}</span></p>
                                        <p className="text-gray-600 text-sm">ID Proof: {expert.profile.idProof || 'Not Provided'}</p>
                                    </div>
                                    <div className="mt-4 md:mt-0">
                                        <button 
                                            onClick={() => handleVerifyClick(expert._id)}
                                            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-colors"
                                        >
                                            Verify Expert
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="p-6 text-center text-gray-500">
                                {loading ? 'Loading...' : 'No experts are currently pending verification.'}
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}