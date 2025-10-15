// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// --- Import All Pages from Both Versions ---

// Auth & Public Pages
import LoginPage from './modules/auth/LoginPage';
import RegistrationPage from './modules/auth/RegistrationPage';
import HomePage from './modules/home/HomePage';
import AboutUsPage from './modules/home/AboutUsPage';
import TermsPage from './modules/home/TermsPage';
import FaqPage from './modules/home/FAQPage'; // Corrected casing from friend's version
import OffersPage from './modules/home/OffersPage';
import ServicesPage from './modules/expert/ServicesPage'; // Assuming this is a public page to view services

// Customer-Specific Pages
import CustomerDashboard from './modules/customer/CustomerDashboard';
import BookingHistory from './modules/customer/BookingHistory';
import CustomerProfile from './modules/customer/CustomerProfile';

// Expert-Specific Pages
import ExpertDashboard from './modules/expert/ExpertDashboard';
import WorkHistory from './modules/expert/WorkHistory';
import ExpertProfile from './modules/expert/ExpertProfile';

// Import our gatekeeper component
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        {/* --- Public Routes --- */}
                        {/* Anyone can access these pages */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegistrationPage />} />
                        <Route path="/about" element={<AboutUsPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/faq" element={<FaqPage />} />
                        <Route path="/offers" element={<OffersPage />} />
                        <Route path="/services" element={<ServicesPage />} />

                        {/* --- Protected Customer Routes --- */}
                        {/* Only logged-in users with the 'customer' role can access these */}
                        <Route element={<ProtectedRoute role="customer" />}>
                            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                            <Route path="/customer/history" element={<BookingHistory />} />
                            <Route path="/customer/profile" element={<CustomerProfile />} />
                            {/* The booking page might need its own component later */}
                            <Route path="/customer/book" element={<CustomerDashboard />} /> 
                        </Route>

                        {/* --- Protected Expert Routes --- */}
                        {/* Only logged-in users with the 'expert' role can access these */}
                        <Route element={<ProtectedRoute role="expert" />}>
                            <Route path="/expert/dashboard" element={<ExpertDashboard />} />
                            <Route path="/expert/history" element={<WorkHistory />} />
                            <Route path="/expert/profile" element={<ExpertProfile />} />
                        </Route>

                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}