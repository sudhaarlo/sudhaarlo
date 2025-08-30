import React, { useState, useEffect } from 'react';

// Main App component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isAuth, setIsAuth] = useState(false); // To handle user authentication state
  const [userRole, setUserRole] = useState(null); // 'customer', 'expert', 'admin'

  // A simple mock authentication function for demonstration
  const handleLogin = (role) => {
    setIsAuth(true);
    setUserRole(role);
    setCurrentPage(role === 'customer' ? 'customer' : role === 'expert' ? 'expert' : 'admin');
  };

  const handleLogout = () => {
    setIsAuth(false);
    setUserRole(null);
    setCurrentPage('home');
  };

  // Generic modal component
  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  // Base64 string of the official logo provided by the user
  const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEuGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI1LTA4LTMwPC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjY3YmIxMGNiLTA2MDUtNDFhNy04OWVkLTQyYjYyNWVmZDAyNzwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5TdWRoYWFyTG8gTG9nbyAtIDI8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgPHBkZjpBdXRob3I+U3VkaGFhciBMbzwvcGRmOkF1dGhvcj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOkNyZWF0b3JUb29sPkNhbnZhIChSZW5kZXJlcikgZG9jPURBR3hpUFpkTXY4IHVzZXI9VUFHeGlCOWRHSUEgYnJhbmQ9QkFHeGlIVlpBRWcgdGVtcGxhdGU9PC94bXA6Q3JlYXRvclRvb2w+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0ncic/PiJVtKsAAK5QSURBVHic7J15rGdnd+b9/n1mR31l4w9MGCYjM2EogY5QGuJsGqpuGkQUCi2pWlqgRtKUSlWqobTSSKpSU1K0X6gQRKqQURoNxnDRkiqZpivGg7Tj+XyOnz32e36+7/f7nHOvQYPhnPl+pPFvO+95z3vO9b3f91nO5zV3d4QQQghxWtOdogghhBBidkg6IYQQYhJIgC6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEkBHw/wA6Sdgh/kzQYwAAAABJRU5ErkJggg==";

  // Logo Component with Base64 Image
  const Logo = () => (
    <div className="flex items-center space-x-2">
      <img src={logoBase64} alt="SudhaarLo Logo" className="w-10 h-10 object-contain"/>
      <div className="flex flex-col">
        <span className="text-xl md:text-2xl font-extrabold" style={{ color: '#225599' }}>SudhaarLo</span>
        <span className="text-xs font-medium" style={{ color: '#fe913b' }}>An Expert for every fix!</span>
      </div>
    </div>
  );

  // Navbar component
  const Navbar = () => {
    return (
      <nav className="bg-white shadow-lg py-4 px-6 md:px-12 fixed top-0 left-0 w-full z-40">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="flex items-center space-x-4" onClick={() => setCurrentPage('home')}>
            <Logo />
          </a>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium" onClick={() => setCurrentPage('home')}>Home</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium" onClick={() => setCurrentPage('customer-auth')}>Customer Login</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium" onClick={() => setCurrentPage('expert-auth')}>Expert Login</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium" onClick={() => setCurrentPage('admin-auth')}>Admin Login</a>
          </div>
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-indigo-600 transition-colors" onClick={() => setIsModalOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col space-y-4 text-center">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium text-lg" onClick={() => { setCurrentPage('home'); setIsModalOpen(false); }}>Home</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium text-lg" onClick={() => { setCurrentPage('customer-auth'); setIsModalOpen(false); }}>Customer Login</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium text-lg" onClick={() => { setCurrentPage('expert-auth'); setIsModalOpen(false); }}>Expert Login</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium text-lg" onClick={() => { setCurrentPage('admin-auth'); setIsModalOpen(false); }}>Admin Login</a>
          </div>
        </Modal>
      </nav>
    );
  };

  // HomePage component
  const HomePage = () => (
    <div className="bg-gray-50 pt-24 min-h-screen font-sans">
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Reliable Home Repair, Just a Click Away.
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Sudhaar Lo! connects you with verified, skilled professionals for all your home repair and maintenance needs.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button className="px-6 py-3 text-white font-semibold rounded-full shadow-lg hover:brightness-110 transition-transform transform hover:-translate-y-1" style={{ backgroundColor: '#225599' }} onClick={() => setCurrentPage('customer')}>
            Get Started as a Customer
          </button>
          <button className="px-6 py-3 bg-white text-indigo-600 border font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:-translate-y-1" style={{ borderColor: '#225599', color: '#225599' }} onClick={() => setCurrentPage('expert-registration')}>
            Join as an Expert
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="mb-4" style={{ color: '#fe913b' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 5.04M12 18h.01M2.986 21.01c-.596-.341-.986-.985-.986-1.747v-4.636a2 2 0 012-2h12a2 2 0 012 2v4.636c0 .762-.39 1.406-.986 1.747M12 22a10 10 0 100-20 10 10 0 000 20z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Verified Professionals</h3>
            <p className="mt-2 text-gray-500">
              All experts are verified with valid IDs and a subscription, ensuring authenticity and trust.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="mb-4" style={{ color: '#fe913b' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Flexible Booking</h3>
            <p className="mt-2 text-gray-500">
              Connect directly with experts via phone or book them with a simple click, at your convenience.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="mb-4" style={{ color: '#fe913b' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Transparent & Fair</h3>
            <p className="mt-2 text-gray-500">
              No hidden fees or commissions. You negotiate the price and pay the expert directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // CustomerPage component
  const CustomerPage = () => (
    <div className="pt-24 pb-8 min-h-screen bg-gray-100 font-sans">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Find Your Expert</h1>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Search by trade (e.g., Plumber, Electrician)"
              className="flex-1 w-full px-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              style={{ borderColor: '#225599' }}
            />
            <button className="px-6 py-3 text-white font-semibold rounded-full shadow-md hover:brightness-110 transition-colors w-full sm:w-auto" style={{ backgroundColor: '#fe913b' }}>
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Expert Card - Will be dynamically generated later */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold" style={{ backgroundColor: '#225599', color: 'white' }}>A</div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-800">Ashok Kumar</h3>
                <p className="font-semibold" style={{ color: '#fe913b' }}>Plumber</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">5+ years experience | 4.8 Rating (230 jobs)</p>
            <p className="mt-4 text-gray-600">
              Expert in pipe leaks, drain cleaning, and fixture installation. Available for urgent calls.
            </p>
            <div className="mt-6 flex space-x-4">
              <button className="flex-1 py-2 px-4 text-white font-semibold rounded-full shadow-md hover:bg-green-600 transition-colors" style={{ backgroundColor: '#225599' }}>
                Call Expert
              </button>
              <button className="flex-1 py-2 px-4 text-white font-semibold rounded-full shadow-md hover:brightness-110 transition-colors" style={{ backgroundColor: '#fe913b' }}>
                Book Now
              </button>
            </div>
          </div>
          {/* More cards will go here */}
        </div>
      </div>
    </div>
  );

  // ExpertPage component
  const ExpertPage = () => (
    <div className="pt-24 pb-8 min-h-screen bg-gray-100 font-sans">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Expert Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h3>
            <p className="text-gray-600">Update your services and availability.</p>
            <div className="mt-4">
              <button className="w-full py-2 px-4 text-white font-semibold rounded-full shadow-md hover:brightness-110 transition-colors" style={{ backgroundColor: '#225599' }}>
                Edit Profile
              </button>
            </div>
          </div>
          {/* Bookings Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Pending Jobs</h3>
            <ul className="space-y-3">
              <li className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold">Booking ID: 12345</p>
                <p className="text-sm text-gray-500">Customer: Rajeev Sharma</p>
                <p className="text-sm text-gray-500">Service: AC Repair</p>
              </li>
              <li className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold">Booking ID: 12346</p>
                <p className="text-sm text-gray-500">Customer: Priya Singh</p>
                <p className="text-sm text-gray-500">Service: Electrical Wiring</p>
              </li>
            </ul>
          </div>
          {/* History Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Work History</h3>
            <p className="text-gray-600">All your completed jobs and earnings are logged here.</p>
            <div className="mt-4">
              <button className="w-full py-2 px-4 bg-white text-indigo-600 border font-semibold rounded-full shadow-md hover:bg-gray-100 transition-colors" style={{ borderColor: '#225599', color: '#225599' }}>
                View History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // AdminPage component
  const AdminPage = () => (
    <div className="pt-24 pb-8 min-h-screen bg-gray-100 font-sans">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expert Verification Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert Verification</h3>
            <p className="text-gray-600">Review and approve new expert registrations.</p>
            <div className="mt-4">
              <button className="w-full py-2 px-4 text-white font-semibold rounded-full shadow-md hover:brightness-110 transition-colors" style={{ backgroundColor: '#fe913b' }}>
                Review Experts
              </button>
            </div>
          </div>
          {/* User Management Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">User Management</h3>
            <p className="text-gray-600">Manage all customer and expert accounts.</p>
            <div className="mt-4">
              <button className="w-full py-2 px-4 bg-white text-indigo-600 border font-semibold rounded-full shadow-md hover:bg-gray-100 transition-colors" style={{ borderColor: '#225599', color: '#225599' }}>
                View All Users
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render the appropriate page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'customer':
        return <CustomerPage />;
      case 'expert':
        return <ExpertPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="pt-16">
        {renderPage()}
      </main>
    </div>
  );
}
