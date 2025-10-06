// src/components/common/Header.jsx

import React, { useState } from 'react';
<<<<<<< HEAD
import { useNavigate, useLocation } from 'react-router-dom';

// --- MODAL COMPONENT ---
// The Modal component needs to be defined here for the file to be self-contained
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border border-gray-200">
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
// --- END MODAL COMPONENT ---


// Base64 string of the logo (move this to an assets file later)
const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUAAAfQAAAH0CAYAAADL1t+KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEuGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcX4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI1LTA4LTMwPC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjY3YmIxMGNiLTA2MDUtNDFhNy04OWVkLTQyYjYyNWVmZDAyNzwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5TdWRoYWFyTG8gTG9nbyAtIDI8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgPHBkZjpBdXRob3I+U3VkaGFhciBMbzwvcGRmOkF1dGhvcj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1zbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOkNyZWF0b3JUb29sPkNhbnZhIChSZW5kZXJlcikgZG9jPURBR3hpUFpkTXY4IHVzZXI9VUFHeGlCOWRHSUEgYnJhbmQ9QkFHeGlIVlpBRWcgdGVtcGxhdGU9PC94bXA6Q3JlYXRvclRvb2w+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0ncic/PiJVtKsAAK5QSURBVHic7J15rGdnd+b9/n1mR31l4w9MGCYjM2EogY5QGuJsGqpuGkQUCi2pWlqgRtKUSlWqobTSSKpSU1K0X6hQRKqQURoNxnDRkiqZpivGg7Tj+XyOnz32e36+7/f7nHOvQYPhnPl+pPFvO+95z3vO9b3f91nO5zV3d4QQQghxWtOdogghhBBidkg6IYQQYhJIgC6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEEBNAgi6EEEJMAAm6EEIIMQEk6EIIIcQEkKALIYQQE0CCLoQQQkwACboQQggxASToQgghxASQoAshhBATQIIuhBBCTAAJuhBCCDEBJOhCCCHEBJCgCyGEkBHw/wA6Sdgh/kzQYwAAAABJRU5ErkJggg==";

// Enhanced Logo Component with animation
const Logo = ({ showIcon = true }) => (
  <div className="flex items-center space-x-3 group cursor-pointer">
    {showIcon && (
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
      </div>
    )}
    <div className="flex flex-col">
      <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent group-hover:from-blue-800 group-hover:to-blue-600 transition-all duration-300">
        SudhaarLo
      </span>
      <span className="text-xs font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
        An Expert for every fix!
      </span>
    </div>
  </div>
);

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isExpertPath = location.pathname.startsWith('/expert');
  // We'll use a link-based approach with React Router instead of setCurrentPage
  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 py-4 px-6 md:px-12 fixed top-0 left-0 w-full z-40">
      <div className="container mx-auto flex justify-between items-center">
        {/* The Logo component */}
        <Logo showIcon={!isExpertPath} />

        {/* Primary navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="relative text-gray-700 hover:text-blue-600 transition-all duration-300 font-semibold px-3 py-2"
            onClick={() => navigate('/')}
          >
            Home
          </button>
        </div>
=======
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Modal from './Modal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Placeholder state for login status
  const navigate = useNavigate();

  // Function to handle the click on the profile icon
  const handleProfileClick = () => {
    // Navigate based on the isLoggedIn state
    if (isLoggedIn) {
      navigate('/dashboard'); // Direct to dashboard if logged in
    } else {
      navigate('/login'); // Direct to login page if not logged in
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-lg py-4 px-6 md:px-12 fixed top-0 left-0 w-full z-40 border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Left Section: Logo and Direct Links */}
        <div className="flex items-center space-x-8">
          <a href="/">
            <Logo />
          </a>
          <div className="hidden lg:flex items-center space-x-6 text-gray-700 font-medium">
            <a href="#" className="hover:text-[#225599] transition-colors">Services</a>
            <a href="#" className="hover:text-[#225599] transition-colors">Categories</a>
            <a href="#" className="hover:text-[#225599] transition-colors">Offers</a>
          </div>
        </div>
        
        {/* Center Section: Search Bar */}
        <div className="hidden lg:flex flex-grow max-w-2xl mx-12 border border-gray-200 rounded-lg">
          <div className="flex w-full">
            {/* Location Input */}
            <div className="relative flex items-center px-4 py-2 border-r border-gray-200 cursor-pointer group hover:bg-gray-50 transition-colors duration-300 rounded-l-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#225599] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            
            {/* Search Input */}
            <div className="relative flex flex-grow items-center px-4 py-2">
              <input
                type="text"
                placeholder="Search for a service..."
                className="bg-transparent flex-grow focus:outline-none placeholder-gray-500 text-gray-800 pr-4"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Section: Icons and Login */}
        <div className="hidden md:flex items-center space-x-6">

          {/* Profile Icon with conditional navigation */}
          <button 
            aria-label="Profile" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={handleProfileClick} // Attached the new function
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
>>>>>>> 7104c55a140adc9dffb1167e331ab384219d9f5a
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
<<<<<<< HEAD
        <div className="flex flex-col space-y-4 text-center pt-2">
          <button
            onClick={() => { setIsModalOpen(false); navigate('/'); }}
            className="text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg py-3 px-6 rounded-xl hover:bg-blue-50"
          >
            Home
=======
        <div className="flex flex-col space-y-6 text-center pt-4">
          <button
            onClick={() => { setIsModalOpen(false); navigate('/login'); }}
            className="text-gray-700 hover:text-[#225599] transition-colors font-semibold text-lg py-3 px-6 rounded-xl hover:bg-blue-50"
          >
            Login / Sign Up
          </button>
          <button
            onClick={() => { setIsModalOpen(false); navigate('/register/expert'); }}
            className="text-gray-700 hover:text-[#225599] transition-colors font-semibold text-lg py-3 px-6 rounded-xl hover:bg-blue-50"
          >
            SudhaarLo For Experts
>>>>>>> 7104c55a140adc9dffb1167e331ab384219d9f5a
          </button>
        </div>
      </Modal>
    </nav>
  );
};

export default Header;