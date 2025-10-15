// src/components/common/Header.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo'; 
import Modal from './Modal'; // Assuming this simple modal component is defined elsewhere
import LocationPickerModal from './LocationPickerModal'; // NEW IMPORT for the map

// Mock Data for Search Suggestions
const MOCK_SERVICES = [
    "Plumbing Repair", "Electrical Wiring", "AC Service", "Washing Machine Repair",
    "Pest Control", "Carpentry", "Home Cleaning", "Geyser Repair"
];

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false); // NEW State for Map Modal
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [searchTerm, setSearchTerm] = useState(''); // NEW State for search input
    const [suggestions, setSuggestions] = useState([]); // NEW State for suggestions
    const [currentLocation, setCurrentLocation] = useState("Pune"); // State for displayed location

    const navigate = useNavigate();

    // --- Search Logic ---
    useEffect(() => {
        if (searchTerm.length > 1) {
            const filtered = MOCK_SERVICES.filter(service =>
                service.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    const handleSearchSelect = (service) => {
        setSearchTerm(service);
        setSuggestions([]);
        navigate(`/services?search=${encodeURIComponent(service)}`);
    };

    // --- Location Logic ---
    const handleLocationSelect = (locationData) => {
        // Here, you'd use a service (like an external API or GeoJSON data) 
        // to convert lat/lng to a human-readable city/pincode.
        // For simulation, we'll just set it to 'Selected Area'.
        setCurrentLocation(`Area (${locationData.lat.toFixed(2)}, ${locationData.lng.toFixed(2)})`);
        setIsLocationModalOpen(false);
        // Crucial: Store the lat/lng in a global state here for filtering the expert list later.
    };

    // --- Profile Logic ---
    const handleProfileClick = () => {
        // Check local storage/context for a persistent session
        if (localStorage.getItem('token') || isLoggedIn) {
            navigate('/customer/dashboard'); // Use a generic dashboard route for simplicity
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <nav className="bg-white/80 backdrop-blur-xl shadow-lg py-4 px-6 md:px-12 fixed top-0 left-0 w-full z-40 border-b border-gray-100">
                <div className="container mx-auto flex items-center justify-between">
                    
                    {/* Left Section: Logo and Direct Links */}
                    <div className="flex items-center space-x-8">
                        <a href="/">
                            <Logo />
                        </a>
                        <div className="hidden lg:flex items-center space-x-6 text-gray-700 font-medium">
                            <a href="/services" className="hover:text-[#225599] transition-colors">Services</a>
                            <a href="/offers" className="hover:text-[#225599] transition-colors">Offers</a>
                        </div>
                    </div>
                    
                    {/* Center Section: Search Bar (Urban Company Style) */}
                    <div className="hidden lg:flex flex-grow max-w-2xl mx-12 border border-gray-200 rounded-lg relative">
                        <div className="flex w-full">
                            {/* Location Input - Opens Map Modal */}
                            <button 
                                onClick={() => setIsLocationModalOpen(true)}
                                className="relative flex items-center px-4 py-2 border-r border-gray-200 cursor-pointer group hover:bg-gray-50 transition-colors duration-300 rounded-l-lg"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#225599] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.899A2 2 0 0110.586 20.899L6.343 16.657A8 8 0 1117.657 16.657z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="bg-transparent focus:outline-none text-gray-800 font-semibold cursor-pointer pl-2 w-48 text-left truncate">
                                    {currentLocation}
                                </span>
                            </button>
                            
                            {/* Search Input with Suggestions */}
                            <div className="relative flex flex-grow items-center px-4 py-2">
                                <input
                                    type="text"
                                    placeholder="Search for a service..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-transparent flex-grow focus:outline-none placeholder-gray-500 text-gray-800 pr-4"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Search Suggestions Dropdown */}
                        {suggestions.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-30">
                                {suggestions.map((service, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSearchSelect(service)}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        {service}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Section: Icons and Login/Profile */}
                    <div className="hidden md:flex items-center space-x-6">
                        
                        {/* Profile Icon with conditional navigation */}
                        <button 
                            aria-label="Profile" 
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            onClick={handleProfileClick} 
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            className="text-gray-600 hover:text-[#225599] transition-colors p-2 rounded-full hover:bg-blue-50"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Modal Menu */}
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="flex flex-col space-y-6 text-center pt-4">
                        <button
                            onClick={() => { setIsModalOpen(false); navigate('/login'); }}
                            className="text-gray-700 hover:text-[#225599] transition-colors font-semibold text-lg py-3 px-6 rounded-xl hover:bg-blue-50"
                        >
                            Login / Sign Up
                        </button>
                        <button
                            onClick={() => { setIsModalOpen(false); navigate('/register/expert'); }}
                            className="text-gray-700 hover:text-[#225599] transition-colors font-semibold text-lg py-3 px-6 rounded-xl hover:bg-blue-50"
                        >
                            SudhaarLo For Experts
                        </button>
                    </div>
                </Modal>
            </nav>
            {/* Map Location Picker Modal (Full Screen) */}
            <LocationPickerModal 
                isOpen={isLocationModalOpen} 
                onClose={() => setIsLocationModalOpen(false)} 
                onSelectLocation={handleLocationSelect}
            />
        </>
    );
};

export default Header;