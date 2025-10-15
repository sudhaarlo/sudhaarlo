// src/modules/expert/ServicesPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

// Data should ideally be fetched from the backend, but using local data for now
const VALID_SERVICES = [
    "Plumbing Repair", "Water Tank Cleaning", "Tap & Mixer Installation",
    "Electrical Wiring & Repair", "Fan Installation", "Inverter/UPS Repair",
    "AC Service & Repair (Split/Window)", "Refrigerator Repair", "Washing Machine Repair",
    "Geyser Installation & Repair", "Microwave Oven Repair",
    "Custom Furniture Making", "Interior Painting", "Exterior Painting",
    "Pest Control (General)", "Termite Control", "Security Camera Installation",
    "Laptop & Desktop Repair", "Vehicle Washing (At Home)", "Gardening & Landscaping", 
];

const SERVICE_AREAS = [
    { city: "Pune", state: "Maharashtra", key_services: ["Plumbing Repair", "Electrical Wiring", "AC Service", "Home Cleaning"] },
    { city: "Mumbai", state: "Maharashtra", key_services: ["Washing Machine Repair", "Pest Control", "Interior Painting", "Carpentry"] },
    { city: "Bengaluru", state: "Karnataka", key_services: ["Laptop & Desktop Repair", "Security Camera Installation", "Plumbing Repair", "AC Service"] },
    { city: "Delhi", state: "Delhi", key_services: ["Geyser Installation", "Electrical Wiring", "Home Cleaning", "Painting"] },
];

const TOP_SERVICES = VALID_SERVICES.slice(0, 10); // Displaying only the top 10

const ServicesPage = () => {
    const [selectedCity, setSelectedCity] = useState(SERVICE_AREAS[0].city);
    const [suggestedService, setSuggestedService] = useState('');
    const navigate = useNavigate();

    // Find the currently selected area data
    const currentArea = SERVICE_AREAS.find(area => area.city === selectedCity);

    const handleServiceClick = (serviceName, city) => {
        // Formats the service name for a clean URL (e.g., "Plumbing Repair" -> "plumbing-repair")
        const serviceSlug = serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        // Simulates navigation to a page listing experts for this service/city pair
        navigate(`/experts/${city.toLowerCase()}/${serviceSlug}`);
    };

    const handleServiceSuggestion = (e) => {
        e.preventDefault();
        if (suggestedService.trim()) {
            alert(`Thank you! Your suggestion for "${suggestedService.trim()}" has been recorded for review.`);
            setSuggestedService('');
        } else {
            alert("Please enter a service name to suggest.");
        }
    };

    return (
        <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-black text-[#225599] mb-4 text-center">
                        Find Your Local Expert
                    </h1>
                    <p className="text-lg text-gray-600 mb-10 text-center">
                        Use the **Search Bar in the Header** to find verified experts in your specific area by pincode.
                    </p>

                    {/* --- Top 10 Services Section --- */}
                    <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                        <h2 className="text-3xl font-bold text-[#fe913b] mb-6">Top 10 Requested Services</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                            {TOP_SERVICES.map((service, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleServiceClick(service, 'Pune')} // Defaults to Pune for demonstration
                                    className="p-3 bg-blue-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-100 hover:text-[#225599] transition-colors shadow-sm"
                                >
                                    {service}
                                </button>
                            ))}
                        </div>
                    </section>
                    
                    {/* --- Browse By City/Area Panel --- */}
                    <section className="bg-white rounded-xl shadow-lg p-8 mb-8 border-t-4 border-[#225599]">
                        <h2 className="text-3xl font-bold text-[#225599] mb-6">Browse Services By City</h2>
                        
                        {/* City Selection Dropdown */}
                        <div className="mb-6 max-w-sm">
                            <label htmlFor="city-select" className="block text-gray-700 font-semibold mb-2">Select Your City</label>
                            <select
                                id="city-select"
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-orange-500/50"
                            >
                                {SERVICE_AREAS.map((area) => (
                                    <option key={area.city} value={area.city}>
                                        {area.city}, {area.state}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Services List for Selected City */}
                        {currentArea && (
                            <div>
                                <h3 className="text-xl font-bold text-[#fe913b] mb-4">Popular in {currentArea.city}:</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {currentArea.key_services.map((service, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleServiceClick(service, currentArea.city)}
                                            className="p-3 border border-orange-200 rounded-lg text-gray-700 font-medium hover:bg-orange-100 transition-colors shadow-sm"
                                        >
                                            {service}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* --- Suggest/Request New Service Section --- */}
                    <section id="suggest" className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-[#225599] mb-6">Can't Find a Service?</h2>
                        <p className="text-md text-gray-600 mb-4">
                            Suggest a new service below, and we'll work on adding verified experts in your area!
                        </p>
                        <form onSubmit={handleServiceSuggestion} className="max-w-md mx-auto space-y-4">
                            <div>
                                <label htmlFor="suggest-service" className="block text-gray-700 font-semibold mb-2">New Service Name</label>
                                <input
                                    id="suggest-service"
                                    type="text"
                                    value={suggestedService}
                                    onChange={(e) => setSuggestedService(e.target.value)}
                                    placeholder="e.g., Appliance Gas Refill"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500/50"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-[#225599] text-white font-bold rounded-xl hover:bg-blue-600 transition-colors"
                            >
                                Submit Suggestion
                            </button>
                        </form>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ServicesPage;