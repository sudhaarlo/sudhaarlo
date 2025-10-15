import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, CheckCircle, XCircle, Trash2, Shield, Loader, Clock, FileText } from 'lucide-react';


const MOCK_ADMIN_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Zjk4MGMxZDdkZTYxYmZmOGE2OTI0ZiIsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE2NTQ5OTIwMDAsImV4cCI6MTY4NjUzNjAwMH0.S-453uD1E2eB2h5j-5eXg8s7jN4k3u9l7t2t8w7";
const API_BASE_URL = 'http://localhost:5173/api/admin'; 
const DUMMY_S3_URL = "https://placehold.co/800x600/60a5fa/ffffff?text=Document+for+Verification";

// Mock Expert data for initial load/testing
const initialPendingExperts = [
    { 
        _id: '66f980c1d7de61bff8a6924a', 
        name: 'Rajesh Sharma', 
        email: 'rajesh.s@example.com', 
        phone: '9876543210', 
        trade: 'Plumber', 
        documents: DUMMY_S3_URL,
        createdAt: '2025-09-28T10:00:00Z'
    },
    { 
        _id: '66f980c1d7de61bff8a6924b', 
        name: 'Priya Verma', 
        email: 'priya.v@test.com', 
        phone: '9999988888', 
        trade: 'Electrician', 
        documents: DUMMY_S3_URL,
        createdAt: '2025-09-30T15:30:00Z'
    },
];

// --- COMPONENTS ---

// Card for displaying individual expert details and action buttons
const ExpertVerificationCard = ({ expert, onVerify, onReject }) => {
    // NOTE: Using window.open here is acceptable for a specific Admin function to review documents.
    const handleDocumentClick = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-[1.01] flex flex-col md:flex-row justify-between">
            <div className="flex-grow space-y-3">
                <div className="flex items-center space-x-3 border-b pb-2 mb-2">
                    <Shield className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-xl font-bold text-gray-800">{expert.name}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${expert.documents ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {expert.trade}
                    </span>
                </div>
                
                <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-700">Email:</span> {expert.email}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-700">Phone:</span> {expert.phone}
                </p>
                <div className="text-xs text-gray-400 flex items-center pt-2">
                    <Clock className="w-3 h-3 mr-1" />
                    Applied on: {new Date(expert.createdAt).toLocaleDateString()}
                </div>
            </div>

            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-3 w-full md:w-56 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                <button
                    onClick={() => handleDocumentClick(expert.documents)}
                    className="flex items-center justify-center space-x-2 bg-indigo-500 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-indigo-600 transition duration-150"
                    disabled={!expert.documents}
                >
                    <FileText className="w-5 h-5" />
                    <span>View Documents</span>
                </button>
                
                <button
                    onClick={() => onVerify(expert._id)}
                    className="flex items-center justify-center space-x-2 bg-green-500 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition duration-150"
                >
                    <CheckCircle className="w-5 h-5" />
                    <span>Approve</span>
                </button>

                <button
                    onClick={() => onReject(expert._id)}
                    className="flex items-center justify-center space-x-2 bg-red-500 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-red-600 transition duration-150"
                >
                    <XCircle className="w-5 h-5" />
                    <span>Reject/Delete</span>
                </button>
            </div>
        </div>
    );
};

// Main Admin Dashboard Component
export default function App() {
    const [pendingExperts, setPendingExperts] = useState(initialPendingExperts);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    // Common function for making authenticated API calls
    const makeAdminApiCall = useCallback(async (url, method = 'GET') => {
        const headers = { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MOCK_ADMIN_JWT}`,
        };
        
        // This is a placeholder for window.confirm, since we cannot use it
        // directly in a canvas environment without a custom modal UI.
        const confirmAction = (message) => {
            console.log(`ACTION CONFIRMED: ${message}`);
            return true;
        };


        try {
            const response = await fetch(url, { method, headers });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'API call failed');
            }
            return data;
        } catch (err) {
            console.error('API Error:', err);
            setError(err.message);
            setLoading(false);
            return null;
        }
    }, []);

    // Function to fetch the list of pending experts
    const fetchPendingExperts = useCallback(async () => {
        setLoading(true);
        setError(null);
        const data = await makeAdminApiCall(`${API_BASE_URL}/pending-experts`);
        
        if (data) {
            // NOTE: In a real app, this would use the real data. Using mock for visual stability.
            // setPendingExperts(data); 
            // For now, only update if the mock data is empty after actions
            if (data.length === 0 && pendingExperts.length > 0) {
                 setPendingExperts(data);
            } else if (pendingExperts.length === 0) {
                setPendingExperts(initialPendingExperts); // Use mock list if empty for quick testing
            }
            // Temporarily suppress success message during mock data load to avoid clutter
            // setMessage(`Successfully loaded ${pendingExperts.length} pending experts.`); 
        }
        setLoading(false);
    }, [makeAdminApiCall, pendingExperts.length]);

    // Handler for Approving an expert
    const handleVerify = async (id) => {
        setLoading(true);
        setMessage('');
        // NOTE: Replaced window.confirm with a console message to comply with the rules.
        if (true) {
             console.log(`ACTION: Attempting to APPROVE expert ID: ${id}`);
        } else {
            setLoading(false);
            return;
        }
        
        const data = await makeAdminApiCall(`${API_BASE_URL}/verify-expert/${id}`, 'PUT');
        
        if (data) {
            setMessage(data.message || 'Expert approved successfully!');
            // Optimistically remove from list
            setPendingExperts(prev => prev.filter(expert => expert._id !== id));
        }
        setLoading(false);
    };

    // Handler for Rejecting/Deleting an expert
    const handleReject = async (id) => {
        setLoading(true);
        setMessage('');
        // NOTE: Replaced window.confirm with a console message to comply with the rules.
        if (true) {
            console.log(`ACTION: Attempting to REJECT/DELETE expert ID: ${id}`);
        } else {
            setLoading(false);
            return;
        }

        // NOTE: The DELETE route needs to be created in admin.js/adminController.js 
        // For now, this is a simulated call.
        const data = await makeAdminApiCall(`${API_BASE_URL}/expert/${id}`, 'DELETE');
        
        if (data) {
            setMessage(data.message || 'Expert rejected and deleted successfully!');
            // Optimistically remove from list
            setPendingExperts(prev => prev.filter(expert => expert._id !== id));
        }
        setLoading(false);
    };

    useEffect(() => {
        // Initial fetch call
        fetchPendingExperts();
    }, [fetchPendingExperts]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-6 lg:p-8">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
            `}</style>
            
            <header className="mb-8 border-b pb-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        <Shield className="w-8 h-8 mr-3 text-indigo-600" />
                        Sudhaar Lo! Admin Panel
                    </h1>
                    <button 
                        onClick={fetchPendingExperts}
                        className="flex items-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium hover:bg-indigo-200 transition duration-150 shadow-sm"
                        disabled={loading}
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        <span>Refresh List</span>
                    </button>
                </div>
                <p className="text-gray-500 mt-1">Manage and verify professional expert registrations.</p>
            </header>

            <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Experts Awaiting Verification ({pendingExperts.length})
                </h2>
                
                {loading && (
                    <div className="flex items-center space-x-2 text-indigo-600 mt-2 md:mt-0">
                        <Loader className="w-5 h-5 animate-spin" />
                        <span className="text-sm">Processing action...</span>
                    </div>
                )}
                {message && !loading && (
                    <p className="text-sm text-green-600 font-medium bg-green-50 p-2 rounded-lg mt-2 md:mt-0">{message}</p>
                )}
                {error && (
                    <p className="text-sm text-red-600 font-medium bg-red-50 p-2 rounded-lg mt-2 md:mt-0">Error: {error}</p>
                )}
            </div>

            <div className="space-y-6">
                {pendingExperts.length > 0 ? (
                    pendingExperts.map(expert => (
                        <ExpertVerificationCard 
                            key={expert._id} 
                            expert={expert} 
                            onVerify={handleVerify} 
                            onReject={handleReject} 
                        />
                    ))
                ) : (
                    <div className="text-center p-12 bg-white rounded-xl shadow-lg border border-green-100">
                        <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-700">All Clear!</h3>
                        <p className="text-gray-500">No experts are currently awaiting document verification.</p>
                    </div>
                )}
            </div>

            <footer className="mt-12 text-center text-gray-400 text-sm border-t pt-4">
                &copy; {new Date().getFullYear()} Sudhaar Lo! Admin System. Powered by Expert Verification.
            </footer>
        </div>
    );
}
