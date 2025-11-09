// src/modules/expert/ServicesPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// --- 1. Corrected import paths (removed .js extension) ---
import { getExperts, createBooking } from '../../services/api'; 
import { useAuth } from '../../hooks/useAuth'; 

// --- Booking Modal Component ---
const BookingModal = ({ expert, onClose, onSubmit }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookingData = {
            expert: expert._id, // PASS expert._id (the User ID)
            serviceCategory: expert.profile.trade, 
            date,
            time,
            notes,
            price: 0 
        };
        onSubmit(bookingData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Book {expert.name}</h2>
                <p className="mb-4 text-gray-600">Service: <span className="font-semibold text-blue-600">{expert.profile.trade}</span></p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Preferred Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Notes for the Expert (Optional)</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="e.g., 'Leaking pipe under the kitchen sink'"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300"
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Confirm Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Main Services Page Component ---
const ServicesPage = () => {
    const { user } = useAuth(); 
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpert, setSelectedExpert] = useState(null);

    useEffect(() => {
        const loadExperts = async () => {
            try {
                setLoading(true);
                const data = await getExperts();
                // The data is an array of User objects: [ { _id, name, profile }, ... ]
                setExperts(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch experts:", err);
                setError("Could not load available experts.");
            } finally {
                setLoading(false);
            }
        };
        loadExperts();
    }, []);

    const handleBookClick = (expert) => {
        setSelectedExpert(expert);
        setIsModalOpen(true);
    };

    const handleBookingSubmit = async (bookingData) => {
        try {
            await createBooking(bookingData);
            alert('Booking successful! The expert has been notified.');
            setIsModalOpen(false);
            setSelectedExpert(null);
        } catch (err) {
            console.error("Booking failed:", err);
            alert("Booking failed. Please try again.");
        }
    };

    return (
        <div className="bg-gray-50 font-sans min-h-screen">
            <main className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-black text-[#225599] mb-4 text-center">
                        Find Your Local Expert
                    </h1>
                    <p className="text-lg text-gray-600 mb-10 text-center">
                        Browse our list of verified professionals and book with one click.
                    </p>

                    {loading && <div className="text-center p-10">Loading Experts...</div>}
                    {error && <div className="text-center p-10 text-red-600">{error}</div>}

                    {/* --- Expert List Section --- */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {!loading && experts.map((expert) => (
                            <div key={expert._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
                                <h3 className="text-2xl font-bold text-[#225599]">{expert.name}</h3>
                                <p className="text-lg font-semibold text-orange-600 my-1">{expert.profile.trade}</p>
                                <p className="text-gray-600">Experience: {expert.profile.experience} years</p>
                                <p className="text-gray-600">Location: {expert.profile.city}, {expert.profile.state}</p>
                                
                                <div className="mt-2 flex items-center">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        expert.profile.isVerified 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {expert.profile.isVerified ? 'Verified' : 'Pending Verification'}
                                    </span>
                                </div>

                                <div className="mt-6 flex-grow"></div> 
                                
                                {user && user.role === 'customer' && expert.profile.isVerified && (
                                    <button 
                                        onClick={() => handleBookClick(expert)}
                                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
                                    >
                                        Book Now
                                    </button>
                                )}
                                
                                {user && user.role === 'customer' && !expert.profile.isVerified && (
                                     <button 
                                        className="w-full py-3 bg-gray-400 text-white font-bold rounded-xl cursor-not-allowed"
                                        disabled
                                    >
                                        Expert Not Yet Verified
                                    </button>
                                )}
                            </div>
                        ))}
                    </section>
                </div>
            </main>

            {/* --- Render the Modal --- */}
            {isModalOpen && selectedExpert && (
                <BookingModal
                    expert={selectedExpert}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleBookingSubmit}
                />
            )}
        </div>
    );
};

export default ServicesPage;