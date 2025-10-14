// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Auth Pages
import LoginPage from './modules/auth/LoginPage';
import RegistrationPage from './modules/auth/RegistrationPage';

// Home / Utility Pages
import HomePage from './modules/home/HomePage';
import AboutUsPage from './modules/home/AboutUsPage';
import TermsPage from './modules/home/TermsPage';
import FaqPage from './modules/home/FaqPage'; // Using FaqPage for naming consistency
import OffersPage from './modules/home/OffersPage';   // Added Offers Page

// Expert Pages
import ExpertDashboard from './modules/expert/ExpertDashboard';
import WorkHistory from './modules/expert/WorkHistory';
import ServicesPage from './modules/expert/ServicesPage'; // Added Services Page
import ExpertProfile from './modules/expert/ExpertProfile'; // Added Expert Profile

// Customer Pages
import CustomerDashboard from './modules/customer/CustomerDashboard';
import BookingHistory from './modules/customer/BookingHistory';
import CustomerProfile from './modules/customer/CustomerProfile'; // Added Customer Profile


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* CORE APPLICATION ROUTES */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/register/expert" element={<RegistrationPage />} />

            {/* UTILITY/INFO PAGES (About, Terms, FAQ, Offers) */}
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/offers" element={<OffersPage />} />
            
            {/* SERVICE/LISTING PAGE */}
            <Route path="/services" element={<ServicesPage />} />

            {/* EXPERT PAGES */}
            <Route path="/expert/dashboard" element={<ExpertDashboard />} />
            <Route path="/expert/:id/history" element={<WorkHistory />} /> 
            <Route path="/expert/profile" element={<ExpertProfile />} />

            {/* CUSTOMER PAGES */}
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/history" element={<BookingHistory />} />
            <Route path="/customer/book" element={<CustomerDashboard />} />
            <Route path="/customer/profile" element={<CustomerProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;