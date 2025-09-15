import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
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
            <span className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 bg-clip-text text-transparent">
              Reliable Home Repair,
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Just a Click Away.
            </span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Sudhaar Lo! connects you with <span className="font-bold text-blue-700">verified, skilled professionals</span> for all your home repair and maintenance needs.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-2 transition-all duration-300 text-lg"
              onClick={() => navigate('/login')} // Navigate to the login page
            >
              Get Started as Customer
              <span className="ml-2">→</span>
            </button>
            <button
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-blue-700 border-2 border-blue-600 font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/25 hover:bg-blue-50 transform hover:-translate-y-2 transition-all duration-300 text-lg"
              onClick={() => navigate('/login')} // Navigate to the login page
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
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">SudhaarLo?</span>
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
              gradient: "from-green-400 to-blue-500"
            },
            {
              icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
              title: "Flexible Booking",
              description: "Connect directly with experts via phone or book them instantly with our smart booking system.",
              gradient: "from-blue-400 to-purple-500"
            },
            {
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
              title: "Transparent & Fair",
              description: "Zero hidden fees or commissions. You negotiate the price and pay the expert directly.",
              gradient: "from-orange-400 to-red-500"
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
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
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust SudhaarLo for their home repair needs
          </p>
          <button
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-2xl hover:bg-gray-50 transform hover:-translate-y-2 transition-all duration-300 text-lg"
            onClick={() => navigate('/login')}
          >
            Find Your Expert Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;