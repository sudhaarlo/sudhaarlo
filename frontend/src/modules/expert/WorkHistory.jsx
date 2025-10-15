// src/modules/expert/WorkHistory.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { getExpertHistory } from '../../services/api'; // Commented out for dummy data

// --- DUMMY DATA FOR DEMONSTRATION ---
const MOCK_JOB_HISTORY = [
    {
        _id: 'JID-12345',
        service: 'Electrical Wiring Repair',
        date: '2025-10-10',
        time: '11:00 AM',
        status: 'Completed',
        customerName: 'Priya Verma',
        fee: '₹1200'
    },
    {
        _id: 'JID-12344',
        service: 'AC Service (Deep Clean)',
        date: '2025-09-28',
        time: '02:30 PM',
        status: 'Completed',
        customerName: 'Rajesh Kulkarni',
        fee: '₹2500'
    },
    {
        _id: 'JID-12343',
        service: 'Fan Installation',
        date: '2025-09-15',
        time: '09:00 AM',
        status: 'Completed',
        customerName: 'Aisha Singh',
        fee: '₹750'
    },
    {
        _id: 'JID-12342',
        service: 'Plumbing Leak Fix',
        date: '2025-09-01',
        time: '04:00 PM',
        status: 'Cancelled (Customer)',
        customerName: 'Vikram Reddy',
        fee: '—'
    },
];

export default function WorkHistory() {
    const { id: expertId } = useParams();
    // Initialize jobs with dummy data for immediate display
    const [jobs, setJobs] = useState(MOCK_JOB_HISTORY); 
    const [loading, setLoading] = useState(false); // Set to false since data is local
    const [error, setError] = useState(null);

    // The useEffect hook is now minimal, simulating a completed fetch/load for now.
    // Uncomment the API call once your backend endpoint is active.
    useEffect(() => {
        // If you want to simulate loading delay:
        // setLoading(true);
        // setTimeout(() => {
        //     setJobs(MOCK_JOB_HISTORY);
        //     setLoading(false);
        // }, 500); 
        
        // This line simulates the API call being successful immediately with dummy data.
        // setJobs(MOCK_JOB_HISTORY); 
        // setLoading(false);
        
    }, [expertId]);


    // Helper function for styling job status
    const getStatusClass = (status) => {
        if (status.includes('Completed')) return 'text-green-700 bg-green-100 px-2 py-1 rounded';
        if (status.includes('Cancelled')) return 'text-red-700 bg-red-100 px-2 py-1 rounded';
        return 'text-gray-700 bg-gray-200 px-2 py-1 rounded';
    };

    return (
        <div className="pt-24 pb-10 min-h-screen bg-gray-50 font-poppins">
            <div className="container mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
                <h1 className="text-3xl font-bold text-gray-900 border-b pb-2">Work History (Expert ID: {expertId || 'N/A'})</h1>

                {loading && <div className="text-gray-500 text-center">Loading work history...</div>}
                {error && <div className="text-red-500 text-center">{error}</div>}

                {!loading && !error && !jobs.length && <div className="text-gray-500 text-center py-8">No completed jobs found in your history.</div>}

                <ul className="space-y-4">
                    {jobs.map((job) => (
                        <li key={job._id} className="p-4 bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow border border-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                <div>
                                    <div className="font-semibold text-lg text-[#225599]">{job.service}</div>
                                    <div className="text-sm text-gray-500 mt-0.5">
                                        Scheduled: {job.date} at {job.time}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Customer: <span className="font-medium">{job.customerName || '—'}</span>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end mt-3 sm:mt-0">
                                    <div className={getStatusClass(job.status)}>{job.status}</div>
                                    <div className="text-lg font-bold text-gray-800 mt-1">Fee: {job.fee || 'N/A'}</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}