// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Auth & Public Pages
import LoginPage from './modules/auth/LoginPage';
import RegistrationPage from './modules/auth/RegistrationPage';
import HomePage from './modules/home/HomePage';
import AboutUsPage from './modules/home/AboutUsPage';
import TermsPage from './modules/home/TermsPage';
import FaqPage from './modules/home/FAQPage';

// Import ONLY the pages we are currently working on
import CustomerDashboard from './modules/customer/CustomerDashboard';
import BookingHistory from './modules/customer/BookingHistory';
import ExpertDashboard from './modules/expert/ExpertDashboard';
// import WorkHistory from './modules/expert/WorkHistory'; // <-- STEP 1: COMMENT OUT THIS IMPORT

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
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegistrationPage />} />
                        <Route path="/about" element={<AboutUsPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/faq" element={<FaqPage />} />

                        {/* --- Protected Customer Routes --- */}
                        <Route element={<ProtectedRoute role="customer" />}>
                            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                            <Route path="/customer/history" element={<BookingHistory />} />
                        </Route>

                        {/* --- Protected Expert Routes --- */}
                        <Route element={<ProtectedRoute role="expert" />}>
                            <Route path="/expert/dashboard" element={<ExpertDashboard />} />
                            
                            {/* STEP 2: COMMENT OUT THIS ROUTE FOR NOW */}
                            {/* <Route path="/expert/:id/history" element={<WorkHistory />} /> */}
                        </Route>
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;