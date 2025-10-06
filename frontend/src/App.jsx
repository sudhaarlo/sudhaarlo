import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginPage from './modules/auth/LoginPage';
import RegistrationPage from './modules/auth/RegistrationPage';
import HomePage from './modules/home/HomePage';
<<<<<<< HEAD
import ExpertDashboard from './modules/expert/ExpertDashboard';
import WorkHistory from './modules/expert/WorkHistory';
=======
import AboutUsPage from './modules/home/AboutUsPage';
import TermsPage from './modules/home/TermsPage'; 
import FAQPage from './modules/home/FAQPage';
>>>>>>> 7104c55a140adc9dffb1167e331ab384219d9f5a

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
<<<<<<< HEAD
            {/* Expert pages */}
            <Route path="/expert/dashboard" element={<ExpertDashboard />} />
            <Route path="/expert/history" element={<WorkHistory />} />
=======
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/FAQ" element={<FAQPage />} />
>>>>>>> 7104c55a140adc9dffb1167e331ab384219d9f5a
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;