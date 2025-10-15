import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginPage from './modules/auth/LoginPage';
import RegistrationPage from './modules/auth/RegistrationPage';
import HomePage from './modules/home/HomePage';
import AboutUsPage from './modules/home/AboutUsPage'; // Home/Utility Pages
import TermsPage from './modules/home/TermsPage';     // Home/Utility Pages
import FaqPage from './modules/home/FAQPage';         // use actual filename
import ExpertDashboard from './modules/expert/ExpertDashboard';
import WorkHistory from './modules/expert/WorkHistory';         // Expert Pages (Placeholder)

// ADDED: customer pages
import CustomerDashboard from './modules/customer/CustomerDashboard';
import BookingHistory from './modules/customer/BookingHistory';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Core Application Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/register/expert" element={<RegistrationPage />} />
            
            {/* Utility Pages */}
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            
            {/* Expert Dashboard Routes */}
            <Route path="/expert/dashboard" element={<ExpertDashboard />} />
            <Route path="/expert/:id/history" element={<WorkHistory />} />

            {/* Customer pages */}
            <Route path="/customer" element={<CustomerDashboard />} />
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/history" element={<BookingHistory />} />
            <Route path="/customer/book" element={<CustomerDashboard />} /> 

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
// API and router code outside of App function is irrelevant to the white screen issue.