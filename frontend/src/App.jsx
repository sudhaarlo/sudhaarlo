import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginPage from './modules/auth/LoginPage';
import RegistrationPage from './modules/auth/RegistrationPage';
import HomePage from './modules/home/HomePage';
import ExpertDashboard from './modules/expert/ExpertDashboard';
import WorkHistory from './modules/expert/WorkHistory';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* The root path "/" now renders the HomePage */}
            <Route path="/" element={<HomePage />} />
            {/* The "/login" path is now explicitly for the LoginPage */}
            <Route path="/login" element={<LoginPage />} />
            {/* The "/register" path is for the RegistrationPage */}
            <Route path="/register" element={<RegistrationPage />} />
            {/* Expert pages */}
            <Route path="/expert/dashboard" element={<ExpertDashboard />} />
            <Route path="/expert/history" element={<WorkHistory />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;