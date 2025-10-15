// src/components/common/LocationPickerModal.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// NOTE: In a real environment, you must ensure these marker images are copied to your 'public' folder
// For now, we use a small, non-image SVG marker fallback in CSS to avoid asset linking issues.

// Function to handle map interaction (marker placement)
const MapClickHandler = ({ onLocationChange }) => {
    useMapEvents({
        click(e) {
            onLocationChange(e.latlng);
        },
    });
    return null;
};

const LocationPickerModal = ({ isOpen, onClose, onSelectLocation }) => {
    if (!isOpen) return null;

    const [currentPosition, setCurrentPosition] = useState(null);
    const defaultCenter = useMemo(() => [18.5204, 73.8567], []); // Pune, India

    const handleLocationChange = (latlng) => {
        setCurrentPosition(latlng);
        // Automatically close and save location after selection (simulated)
        // In a real scenario, you'd confirm this selection with a button.
        setTimeout(() => {
            onSelectLocation(latlng);
        }, 300);
    };

    // Custom marker icon (SVG fallback to avoid needing image assets)
    const customIcon = new L.DivIcon({
        className: 'custom-div-icon',
        html: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#fe913b" stroke="#225599" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="3"/></svg>',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h3 className="text-2xl font-bold text-[#225599] mb-4">Select Service Location</h3>
                
                <div style={{ height: '50vh', zIndex: 0 }}>
                    <MapContainer 
                        center={defaultCenter} 
                        zoom={13} 
                        scrollWheelZoom={true}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapClickHandler onLocationChange={handleLocationChange} />
                        {currentPosition && <Marker position={currentPosition} icon={customIcon} />}
                    </MapContainer>
                </div>
                
                {currentPosition && (
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Selected: Lat {currentPosition.lat.toFixed(4)}, Lng {currentPosition.lng.toFixed(4)} 
                    </p>
                )}
                
                <button 
                    onClick={onClose}
                    className="mt-6 w-full py-3 bg-[#225599] text-white font-bold rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
                    disabled={!currentPosition}
                >
                    Confirm Location
                </button>
            </div>
        </div>
    );
};

export default LocationPickerModal;