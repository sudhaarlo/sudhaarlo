// src/components/common/Header.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo'; 
import Modal from './Modal'; 

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Placeholder state for login status, this should be global later
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  // Function to handle the click on the profile icon
  const handleProfileClick = () => {
    // Navigate based on the isLoggedIn state
    if (isLoggedIn) {
      // Assuming '/dashboard' will redirect to the correct user-specific dashboard
      // (e.g., /customer/dashboard or /expert/dashboard)
      navigate('/dashboard'); 
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
            <a href="/services" className="hover:text-[#225599] transition-colors">Services</a>
            <a href="/offers" className="hover:text-[#225599] transition-colors">Offers</a>
          </div>
        </div>
        
        {/* Center Section: Search Bar (Urban Company Style) */}
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

        {/* Right Section: Icons and Login/Profile */}
        <div className="hidden md:flex items-center space-x-6">
          
          {/* Profile Icon with conditional navigation */}
          <button 
            aria-label="Profile" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={handleProfileClick} 
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
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
          <button
            onClick={() => { setIsModalOpen(false); navigate('/register/expert'); }}
            className="text-gray-700 hover:text-[#225599] transition-colors font-semibold text-lg py-3 px-6 rounded-xl hover:bg-blue-50"
          >
            SudhaarLo For Experts
          </button>
        </div>
      </Modal>
    </nav>
  );
};

export default Header;