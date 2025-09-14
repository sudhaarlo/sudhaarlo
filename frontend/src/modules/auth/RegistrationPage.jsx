import React from 'react';

const RegistrationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Register</h2>
        {/* The registration form will go here */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <a href="/" className="text-blue-600 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;