// src/modules/auth/RegistrationPage.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';

const ROLES = {
    CUSTOMER: 'customer',
    EXPERT: 'expert',
    ADMIN: 'admin',
    NONE: '',
};

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
    "Uttar Pradesh", "Uttarakhand", "West Bengal",
    // Union Territories
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

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
    "Other" // The critical "Other" option
];

// --- Customer-Specific Fields Component (No structural changes, only data additions) ---
const CustomerFields = ({ customerDetails, setCustomerDetails }) => (
    <div className="space-y-4 pt-4 border-t border-gray-200">
        <h3 className="text-xl font-bold text-[#225599]">Customer Profile</h3>
        
        {/* Address Fields */}
        <div>
            <label className="block text-gray-700 font-semibold mb-2">Street/Area Address</label>
            <input
                type="text"
                value={customerDetails.streetAddress || ''}
                onChange={(e) => setCustomerDetails({ ...customerDetails, streetAddress: e.target.value })}
                placeholder="House No, Street, Landmark"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                required
            />
        </div>
        
        <div>
            <label className="block text-gray-700 font-semibold mb-2">City</label>
            <input
                type="text"
                value={customerDetails.city || ''}
                onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })}
                placeholder="e.g., Pune"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                required
            />
        </div>

        {/* State Field (DROPDOWN) */}
        <div>
            <label className="block text-gray-700 font-semibold mb-2">State</label>
            <select
                value={customerDetails.state || ''}
                onChange={(e) => setCustomerDetails({ ...customerDetails, state: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                required
            >
                <option value="" disabled>Select State</option>
                {INDIAN_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                ))}
            </select>
        </div>

        {/* Country Field (DEFAULTED) */}
        <div>
            <label className="block text-gray-700 font-semibold mb-2">Country</label>
            <input
                type="text"
                value="India" // Defaulted to India
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-600 focus:outline-none transition-all duration-300"
            />
             <input type="hidden" name="country" value="India" onChange={() => setCustomerDetails({ ...customerDetails, country: 'India' })} />
        </div>

        {/* Pincode Field */}
        <div>
            <label className="block text-gray-700 font-semibold mb-2">Pincode</label>
            <input
                type="text"
                pattern="\d{6}"
                maxLength="6"
                value={customerDetails.pincode || ''}
                onChange={(e) => setCustomerDetails({ ...customerDetails, pincode: e.target.value })}
                placeholder="e.g., 411001"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                required
            />
        </div>
        
        {/* Date of Birth */}
        <div>
            <label className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
            <input
                type="date"
                value={customerDetails.birthday || ''}
                onChange={(e) => setCustomerDetails({ ...customerDetails, birthday: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                required
            />
        </div>
    </div>
);

// --- Expert-Specific Fields Component ---
const ExpertFields = ({ expertDetails, setExpertDetails }) => {
    // Local state for the new pincode/city input and custom service
    const [newServicePincode, setNewServicePincode] = useState('');
    const [newServiceCity, setNewServiceCity] = useState('');
    const [customService, setCustomService] = useState('');

    const addServiceArea = () => {
        if (newServicePincode && newServiceCity && newServicePincode.length === 6) {
            const newArea = { city: newServiceCity, pincode: newServicePincode };
            const isDuplicate = expertDetails.serviceAreas.some(area => area.pincode === newServicePincode);
            
            if (!isDuplicate) {
                setExpertDetails({
                    ...expertDetails,
                    serviceAreas: [...expertDetails.serviceAreas, newArea]
                });
                setNewServicePincode('');
                setNewServiceCity('');
            } else {
                alert("This Pincode is already added.");
            }
        } else {
            alert("Please enter a valid city and a 6-digit Pincode.");
        }
    };

    const removeServiceArea = (pincodeToRemove) => {
        setExpertDetails({
            ...expertDetails,
            serviceAreas: expertDetails.serviceAreas.filter(area => area.pincode !== pincodeToRemove)
        });
    };
    
    // Handler for service selection, updates customService field if 'Other' is selected
    const handleServiceChange = (e) => {
        const selectedTrade = e.target.value;
        setExpertDetails({ ...expertDetails, trade: selectedTrade });
        // Clear custom service if they switch away from 'Other'
        if (selectedTrade !== 'Other') {
            setExpertDetails(prev => ({ ...prev, customService: '' }));
        }
    };

    // Handler for custom service input
    const handleCustomServiceChange = (e) => {
        setCustomService(e.target.value);
        setExpertDetails(prev => ({ ...prev, customService: e.target.value }));
    };

    // Ensure serviceAreas is initialized as an array
    if (!expertDetails.serviceAreas) {
        setExpertDetails({ ...expertDetails, serviceAreas: [] });
    }

    return (
        <div className="space-y-4 pt-4 border-t border-gray-200">
            <h3 className="text-xl font-bold text-[#225599]">Expert Details</h3>
            
            {/* Service Trade (EXPANDED DROPDOWN) */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Service Trade</label>
                <select
                    value={expertDetails.trade || ''}
                    onChange={handleServiceChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    required
                >
                    <option value="" disabled>Select a Trade/Service</option>
                    {VALID_SERVICES.map(service => (
                        <option key={service} value={service}>{service}</option>
                    ))}
                </select>
            </div>

            {/* Conditional Custom Service Input */}
            {expertDetails.trade === 'Other' && (
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Specify Your Service</label>
                    <input
                        type="text"
                        value={customService}
                        onChange={handleCustomServiceChange}
                        placeholder="e.g., Solar Panel Installation, Handyman Services"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
                        required
                    />
                </div>
            )}

            {/* Years of Experience */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Years of Experience</label>
                <input
                    type="number"
                    value={expertDetails.experience || ''}
                    onChange={(e) => setExpertDetails({ ...expertDetails, experience: e.target.value })}
                    placeholder="e.g., 5"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    required
                />
            </div>
            
            {/* --- Multiple Service Areas (DYNAMIC INPUT) --- */}
            <div className='border border-orange-300 p-4 rounded-xl'>
                <label className="block text-gray-700 font-semibold mb-2">Service City & Pincode</label>
                <div className="flex space-x-2 mb-3">
                    <input
                        type="text"
                        value={newServiceCity}
                        onChange={(e) => setNewServiceCity(e.target.value)}
                        placeholder="City"
                        className="flex-grow px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                        required={expertDetails.serviceAreas?.length === 0}
                    />
                    <input
                        type="text"
                        pattern="\d{6}"
                        maxLength="6"
                        value={newServicePincode}
                        onChange={(e) => setNewServicePincode(e.target.value)}
                        placeholder="Pincode (6 digits)"
                        className="w-32 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500/50"
                        required={expertDetails.serviceAreas?.length === 0}
                    />
                    <button
                        type="button"
                        onClick={addServiceArea}
                        className="bg-[#fe913b] text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
                        aria-label="Add service area"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    </button>
                </div>
                
                {/* List of Added Service Areas */}
                {expertDetails.serviceAreas?.length > 0 && (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                        <p className="text-sm font-medium text-gray-700 mt-2">Added Areas:</p>
                        {expertDetails.serviceAreas.map((area, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border border-gray-200">
                                <span className="text-sm text-gray-700">
                                    **{area.city}**, Pincode: {area.pincode}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => removeServiceArea(area.pincode)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                    aria-label={`Remove area ${area.city}`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {expertDetails.serviceAreas?.length === 0 && (
                    <p className="text-sm text-gray-500 italic mt-2">Experts must add at least one service area.</p>
                )}
            </div>
            {/* --- End Multiple Service Areas --- */}

            {/* State Field (DROPDOWN) */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">State of Operation</label>
                <select
                    value={expertDetails.state || ''}
                    onChange={(e) => setExpertDetails({ ...expertDetails, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    required
                >
                    <option value="" disabled>Select State</option>
                    {INDIAN_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </div>
            
            {/* Country Field (DEFAULTED) */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Country of Operation</label>
                <input
                    type="text"
                    value="India"
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-600 focus:outline-none transition-all duration-300"
                />
                <input type="hidden" name="country" value="India" onChange={() => setExpertDetails({ ...expertDetails, country: 'India' })} />
            </div>

            {/* ID Proof */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">ID Proof (Aadhaar/PAN Number)</label>
                <input
                    type="text"
                    value={expertDetails.idProof || ''}
                    onChange={(e) => setExpertDetails({ ...expertDetails, idProof: e.target.value })}
                    placeholder="Aadhaar or PAN Number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    required
                />
            </div>

            {/* Referred By Code (Optional) */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2">Referred By Code (Optional)</label>
                <input
                    type="text"
                    value={expertDetails.referredBy || ''}
                    onChange={(e) => setExpertDetails({ ...expertDetails, referredBy: e.target.value })}
                    placeholder="Enter referral code"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                />
            </div>
            
            <p className="text-sm text-gray-500 pt-2">
                *All documents are subject to manual verification by the admin team.
            </p>
        </div>
    );
};

// --- Admin-Specific Fields Component ---
const AdminFields = ({ adminDetails, setAdminDetails }) => (
    <div className="space-y-4 pt-4 border-t border-gray-200">
        <h3 className="text-xl font-bold text-[#225599]">Admin Code</h3>
        <div>
            <label className="block text-gray-700 font-semibold mb-2">Access Key</label>
            <input
                type="text"
                value={adminDetails.accessKey || ''}
                onChange={(e) => setAdminDetails({ ...adminDetails, accessKey: e.target.value })}
                placeholder="Enter Admin Access Key"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                required
            />
        </div>
    </div>
);

export default function RegistrationPage() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(ROLES.NONE);
    
    // State for role-specific details
    const [customerDetails, setCustomerDetails] = useState({ country: 'India' });
    const [expertDetails, setExpertDetails] = useState({ serviceAreas: [], country: 'India' }); 
    const [adminDetails, setAdminDetails] = useState({});
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (role === ROLES.NONE) {
            setError('Please select a user role.');
            return;
        }

        if (role === ROLES.EXPERT && expertDetails.serviceAreas.length === 0) {
            setError('Experts must add at least one service area before submitting.');
            return;
        }
        
        // Final validation for the "Other" service field
        if (role === ROLES.EXPERT && expertDetails.trade === 'Other' && !expertDetails.customService) {
             setError('Please specify the custom service you offer.');
             return;
        }

        setLoading(true);
        
        let registrationData = { name, phone, email, password, role };
        
        // Merge details and explicitly include the default country for both
        if (role === ROLES.EXPERT) {
            registrationData = { 
                ...registrationData, 
                ...expertDetails, 
                country: 'India',
                // When "Other" is selected, use the customService field as the trade name for the backend
                trade: expertDetails.trade === 'Other' ? expertDetails.customService : expertDetails.trade
            };
            // Clean up temporary customService field before sending
            delete registrationData.customService;

        } else if (role === ROLES.CUSTOMER) {
            registrationData = { ...registrationData, ...customerDetails, country: 'India' };
        } else if (role === ROLES.ADMIN) {
            registrationData = { ...registrationData, ...adminDetails };
        }

        try {
            // API call to register the user
            const res = await registerUser(registrationData);
            
            const token = res?.data?.token || res?.token || (res && res.data && res.data.token);
            if (token) localStorage.setItem('token', token);
            
            // Navigate based on the final registered role
            if (role === ROLES.EXPERT) {
                navigate('/expert/dashboard');
            } else if (role === ROLES.CUSTOMER) {
                navigate('/customer/dashboard');
            } else {
                navigate('/admin/dashboard');
            }

        } catch (err) {
            setError(err?.response?.data?.message || err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-8 min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 font-sans flex items-center justify-center">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                <h2 className="text-3xl font-black text-center mb-6">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Join Our</span>
                    <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent"> Community</span>
                </h2>
                {error && <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>}
                
                <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                    {/* --- Basic Fields (Global) --- */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91-9876543210"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                            required
                        />
                    </div>
                    
                    {/* --- Role Selection Dropdown --- */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">I am a...</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                            required
                        >
                            <option value={ROLES.NONE} disabled>Select your role</option>
                            <option value={ROLES.CUSTOMER}>Customer</option>
                            <option value={ROLES.EXPERT}>Expert</option>
                            <option value={ROLES.ADMIN}>Admin</option>
                        </select>
                    </div>

                    {/* --- Conditional Role-Specific Fields --- */}
                    {role === ROLES.CUSTOMER && (
                        <CustomerFields customerDetails={customerDetails} setCustomerDetails={setCustomerDetails} />
                    )}
                    {role === ROLES.EXPERT && (
                        <ExpertFields expertDetails={expertDetails} setExpertDetails={setExpertDetails} />
                    )}
                    {role === ROLES.ADMIN && (
                        <AdminFields adminDetails={adminDetails} setAdminDetails={setAdminDetails} />
                    )}

                    {/* --- Submit Button --- */}
                    <button
                        type="submit"
                        disabled={loading || role === ROLES.NONE}
                        className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:transform-none"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-orange-600 hover:underline">
                        Login Here
                    </Link>
                </p>
            </div>
        </div>
    );
}