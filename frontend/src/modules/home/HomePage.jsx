import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Logo and Modal components are defined here to keep the file self-contained
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border border-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEuGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcX4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI1LTA4LTMwPC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjY3YmIxMGNiLTA2MDUtNDFhNy04OWVkLTQyYjYyNWVmZDAyNzwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5TdWRoYWFyTG8gTG9nbyAtIDI8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgPHBkZjpBdXRob3I+U3VkaGFhciBMbzwvcGRmOkF1dGhvcj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOkNyZWF0b3JUb29sPkNhbnZhIChSZW5kZXJlcikgZG9jPURBR3hpUFpkTXY4IHVzZXI9VUFHeGlCOWRHSUEgYnJhbmQ9QkFHeGlIVlpBRWcgdGVtcGxhdGU9PC94bXA6Q3JlYXRvclRvb2w+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0ncic/PiJVtKsAAK5QSURBVHic7J15rGdnd+b9/n1mR31l4w9MGCYjM2EogY5QGuJsGmuo/x9Jq4eUqgIBAAAAAElFTkSuQmCC";

const Logo = () => (
  <div className="flex items-center space-x-3 group cursor-pointer">
    <div className="relative">
      <img
        src={logoBase64}
        alt="SudhaarLo Logo"
        className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute -inset-1 bg-gradient-to-r from-[#225599] to-[#fe913b] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
    </div>
    <div className="flex flex-col">
      <span className="text-xl md:text-2xl font-extrabold text-[#225599] group-hover:text-gray-900 transition-colors duration-300">
        SudhaarLo
      </span>
      <span className="text-xs font-semibold text-[#fe913b] group-hover:text-gray-700 transition-colors duration-300">
        An Expert for every fix!
      </span>
    </div>
  </div>
);

// New & Improved Header Component
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 py-4 px-6 md:px-12 fixed top-0 left-0 w-full z-40">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Search Bar & Location - Urban Company Style */}
        <div className="hidden lg:flex flex-grow max-w-2xl mx-12">
          <div className="relative flex w-full">
            <div className="relative flex items-center bg-gray-100 rounded-l-2xl border-2 border-r-0 border-gray-200 pl-4 py-2 hover:bg-white hover:border-gray-300 transition-colors duration-300 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.899A2 2 0 0110.586 20.899L6.343 16.657A8 8 0 1117.657 16.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                value="Pune"
                readOnly
                className="bg-transparent focus:outline-none text-gray-800 font-semibold cursor-pointer pl-2 w-24"
              />
            </div>
            <div className="relative flex flex-grow items-center bg-gray-100 rounded-r-2xl border-2 border-gray-200 pr-4 py-2 hover:bg-white hover:border-gray-300 transition-colors duration-300">
              <input
                type="text"
                placeholder="Search for a service..."
                className="bg-transparent flex-grow focus:outline-none placeholder-gray-500 text-gray-800 px-4"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => navigate('/login')}
            className="text-[#225599] font-bold hover:text-orange-500 transition-colors"
          >
            Login / Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-600 hover:text-[#225599] transition-colors p-2 rounded-full hover:bg-blue-50"
            onClick={() => setIsModalOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Modal Menu */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col space-y-6 text-center pt-4">
          <button
            onClick={() => { setIsModalOpen(false); navigate('/login'); }}
            className="text-gray-700 hover:text-[#225599] transition-colors font-semibold text-lg py-3 px-6 rounded-xl hover:bg-blue-50"
          >
            Login / Sign Up
          </button>
        </div>
      </Modal>
    </nav>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-24 min-h-screen font-sans overflow-hidden">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-16 text-center relative">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="relative z-10">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 leading-tight mb-8">
              <span className="bg-gradient-to-r from-[#225599] via-blue-800 to-blue-900 bg-clip-text text-transparent">
                Reliable Home Repair,
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#fe913b] to-orange-600 bg-clip-text text-transparent">
                Just a Click Away.
              </span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Sudhaar Lo! connects you with <span className="font-bold text-[#225599]">verified, skilled professionals</span> for all your home repair and maintenance needs.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
              <button
                className="px-8 py-4 bg-gradient-to-r from-[#225599] to-blue-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-[#225599]/25 transform hover:-translate-y-2 transition-all duration-300 text-lg"
                onClick={() => navigate('/login')}
              >
                Get Started as Customer
                <span className="ml-2">→</span>
              </button>
              <button
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-[#225599] border-2 border-[#225599] font-bold rounded-2xl shadow-2xl hover:shadow-[#225599]/25 hover:bg-blue-50 transform hover:-translate-y-2 transition-all duration-300 text-lg"
                onClick={() => navigate('/expert/dashboard')}
              >
                Join as Expert
                <span className="ml-2">⚡</span>
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-[#225599] to-[#fe913b] bg-clip-text text-transparent">SudhaarLo?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of home repairs with our cutting-edge platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 5.04M12 18h.01M2.986 21.01c-.596-.341-.986-.985-.986-1.747v-4.636a2 2 0 012-2h12a2 2 0 012 2v4.636c0 .762-.39 1.406-.986 1.747M12 22a10 10 0 100-20 10 10 0 000 20z",
                title: "Verified Professionals",
                description: "All experts are verified with valid IDs and subscriptions, ensuring authenticity and complete trust.",
                gradient: "from-green-400 to-[#225599]"
              },
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Flexible Booking",
                description: "Connect directly with experts via phone or book them instantly with our smart booking system.",
                gradient: "from-[#225599] to-purple-500"
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Transparent & Fair",
                description: "Zero hidden fees or commissions. You negotiate the price and pay the expert directly.",
                gradient: "from-[#fe913b] to-red-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 border border-white/20 hover:border-white/40"
              >
                <div className={`mb-6 w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#225599] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#225599] to-[#fe913b] py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust SudhaarLo for their home repair needs
            </p>
            <button
              className="px-8 py-4 bg-white text-[#225599] font-bold rounded-2xl shadow-2xl hover:bg-gray-50 transform hover:-translate-y-2 transition-all duration-300 text-lg"
              onClick={() => navigate('/login')}
            >
              Find Your Expert Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;