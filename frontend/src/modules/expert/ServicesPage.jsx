// src/modules/expert/ServicesPage.jsx

import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

// Data should ideally be fetched from the backend, but using local data for now
const VALID_SERVICES = [
    "Plumbing Repair", "Water Tank Cleaning", "Tap & Mixer Installation",
    "Electrical Wiring & Repair", "Fan Installation", "Inverter/UPS Repair",
    "AC Service & Repair (Split/Window)", "Refrigerator Repair", "Washing Machine Repair",
    "Geyser Installation & Repair", "Microwave Oven Repair",
    "Custom Furniture Making", "Door & Window Repair", "Modular Kitchen Installation",
    "Interior Painting", "Exterior Painting", "Waterproofing Services",
    "Tile & Marble Fitting", "Masonry Work", "Home Cleaning (Deep Clean)",
    "Pest Control (General)", "Termite Control", "Security Camera Installation",
    "Laptop & Desktop Repair", "Vehicle Washing (At Home)", "Gardening & Landscaping", 
];

const SERVICE_AREAS = [
    { city: "Pune", state: "Maharashtra", pincodes: "411001, 411002, 411003, 411004" },
    { city: "Mumbai", state: "Maharashtra", pincodes: "400001, 400002, 400003, 400004" },
    { city: "Bengaluru", state: "Karnataka", pincodes: "560001, 560002, 560003, 560004" },
    { city: "Delhi", state: "Delhi", pincodes: "110001, 110002, 110003, 110004" },
];

const ServicesPage = () => {
    const [selectedService, setSelectedService] = useState('');
    const [suggestedService, setSuggestedService] = useState('');

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
                    <h1 className="text-4xl md:text-5xl font-black text-[#225599] mb-8 text-center">
                        Our Services & Coverage
                    </h1>

                    {/* --- Service List Section --- */}
                    <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                        <h2 className="text-3xl font-bold text-[#fe913b] mb-6">Available Expert Services</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                            {VALID_SERVICES.map((service, index) => (
                                <div key={index} className="p-3 bg-blue-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-100 transition-colors">
                                    {service}
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    {/* --- Service Area Coverage Section --- */}
                    <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
                        <h2 className="text-3xl font-bold text-[#fe913b] mb-6">Areas We Service</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {SERVICE_AREAS.map((area, index) => (
                                <div key={index} className="p-4 border-2 border-gray-200 rounded-lg">
                                    <h3 className="text-xl font-bold text-[#225599]">{area.city}, {area.state}</h3>
                                    <p className="text-sm text-gray-600 mt-2">
                                        **Key Pincodes:** {area.pincodes.split(', ').slice(0, 3).join(', ')}{area.pincodes.split(', ').length > 3 ? '...' : ''}
                                    </p>
                                    <button 
                                        onClick={() => alert(`Full pincode list for ${area.city}: ${area.pincodes}`)}
                                        className="text-sm text-[#fe913b] hover:underline mt-1 focus:outline-none"
                                    >
                                        View all Pincodes
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* --- Suggest/Request New Service Section --- */}
                    <section className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-[#225599] mb-6">Suggest a New Service</h2>
                        <p className="text-md text-gray-600 mb-4">
                            Don't see a service you need? Suggest it, and we'll work on adding verified experts!
                        </p>
                        <form onSubmit={handleServiceSuggestion} className="max-w-md mx-auto space-y-4">
                            <div>
                                <label htmlFor="select-service" className="block text-gray-700 font-semibold mb-2">Service Type (Optional)</label>
                                <select
                                    id="select-service"
                                    value={selectedService}
                                    onChange={(e) => setSelectedService(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-orange-500/50"
                                >
                                    <option value="">-- Choose a Category (e.g., Plumbing) --</option>
                                    <option value="Plumbing">Plumbing/Water</option>
                                    <option value="Electrical">Electrical/AC</option>
                                    <option value="Carpentry">Carpentry/Woodwork</option>
                                    <option value="Cleaning">Cleaning/Pest Control</option>
                                    <option value="Appliance">Appliance Repair</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="suggest-service" className="block text-gray-700 font-semibold mb-2">New Service Name</label>
                                <input
                                    id="suggest-service"
                                    type="text"
                                    value={suggestedService}
                                    onChange={(e) => setSuggestedService(e.target.value)}
                                    placeholder="e.g., Robot Vacuum Repair"
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
        </div>
    );
};

export default ServicesPage;