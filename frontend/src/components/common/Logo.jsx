// src/components/common/Logo.jsx

import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2 group cursor-pointer">
      <div className="relative">
        <svg
          className="w-10 h-10 text-[#225599] group-hover:scale-110 transition-transform duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15.5V11h2v6.5h-2zm-1.5-9.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-xl md:text-2xl font-extrabold text-[#225599] group-hover:text-gray-900 transition-colors duration-300">
          Sudhaar Lo!
        </span>
        <span className="text-xs font-semibold text-[#fe913b] group-hover:text-gray-700 transition-colors duration-300">
          An Expert for every fix!
        </span>
      </div>
    </div>
  );
};

export default Logo;