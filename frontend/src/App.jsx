// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';

// --- Import All Pages from Both Versions ---

// Auth & Public Pages
import LoginPage from './modules/auth/LoginPage.jsx';
import RegistrationPage from './modules/auth/RegistrationPage.jsx';
import HomePage from './modules/home/HomePage.jsx';
import AboutUsPage from './modules/home/AboutUsPage.jsx';
import TermsPage from './modules/home/TermsPage.jsx';
import FaqPage from './modules/home/FAQPage.jsx';
import OffersPage from './modules/home/OffersPage.jsx';
import ServicesPage from './modules/expert/ServicesPage.jsx';

// Customer-Specific Pages
import CustomerDashboard from './modules/customer/CustomerDashboard.jsx';
import BookingHistory from './modules/customer/BookingHistory.jsx';
import CustomerProfile from './modules/customer/CustomerProfile.jsx';

// Expert-Specific Pages
import ExpertDashboard from './modules/expert/ExpertDashboard.jsx';
import WorkHistory from './modules/expert/WorkHistory.jsx';
import ExpertProfile from './modules/expert/ExpertProfile.jsx';

// Import our gatekeeper component
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        {/* --- Public Routes --- */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegistrationPage />} />
                        <Route path="/about" element={<AboutUsPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/faq" element={<FaqPage />} />
                        <Route path="/offers" element={<OffersPage />} />
                        <Route path="/services" element={<ServicesPage />} />

                        {/* --- Protected Customer Routes --- */}
                        <Route element={<ProtectedRoute role="customer" />}>
                            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                            <Route path="/customer/history" element={<BookingHistory />} />
                            <Route path="/customer/profile" element={<CustomerProfile />} />
                            <Route path="/customer/book" element={<ServicesPage />} /> 
                        </Route>

                        {/* --- Protected Expert Routes --- */}
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

export default App;