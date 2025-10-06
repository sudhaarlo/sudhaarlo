import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginPage from './modules/auth/LoginPage';
import RegistrationPage from './modules/auth/RegistrationPage';
import HomePage from './modules/home/HomePage';
import AboutUsPage from './modules/home/AboutUsPage';
import TermsPage from './modules/home/TermsPage'; 
import FAQPage from './modules/home/FAQPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/FAQ" element={<FAQPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;