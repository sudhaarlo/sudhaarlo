// src/modules/home/HomePage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

// Data for the services section
const services = [
  {
    name: 'Plumbing',
    icon: (
      <svg className="w-12 h-12 text-[#225599]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zM8 12h8m-4 4v-8"/>
      </svg>
    ),
  },
  {
    name: 'Electrical Work',
    icon: (
      <svg className="w-12 h-12 text-[#225599]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'Carpentry',
    icon: (
      <svg className="w-12 h-12 text-[#225599]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 3v18h12V3H6zM6 9h12M6 15h12"/>
      </svg>
    ),
  },
  {
    name: 'Renovation',
    icon: (
      <svg className="w-12 h-12 text-[#225599]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11h.01M12 16h.01M16 11h.01M16 16h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/>
      </svg>
    ),
  },
  {
    name: 'Housekeeping',
    icon: (
      <svg className="w-12 h-12 text-[#225599]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 8a4 4 0 100 8 4 4 0 000-8z"/>
      </svg>
    ),
  },
];

// Data for testimonials
const testimonials = [
  {
    quote: "Finding a reliable electrician was always a headache. Sudhaar Lo! made it incredibly easy. The expert was on time, professional, and the price was fair. Highly recommend!",
    name: "Aarti Sharma",
    location: "Pune",
  },
  {
    quote: "I needed a plumber urgently, and Sudhaar Lo! connected me with a verified professional within minutes. The service was excellent, and I love that there are no hidden fees.",
    name: "Rohit Singh",
    location: "Mumbai",
  },
  {
    quote: "As a carpenter, this platform has changed my business. I get consistent, verified leads and can showcase my work to new customers. It’s a win-win for everyone.",
    name: "Prakash Varma",
    location: "Bengaluru",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-16">
          <div className="container mx-auto px-6 text-center relative">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
              <div className="absolute top-40 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#225599] leading-tight mb-4">
              <span className="bg-gradient-to-r from-[#225599] via-blue-800 to-blue-900 bg-clip-text text-transparent">
                Sudhaar Lo!
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#fe913b] to-orange-600 bg-clip-text text-transparent">
                An Expert for Every Fix.
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sudhaar Lo! connects you with <span className="font-bold text-[#225599]">verified, skilled professionals</span> for all your home repair and maintenance needs. Reliable home repair just a click away!
            </p>
            <div className="mt-8">
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-3 bg-[#fe913b] text-white font-bold rounded-lg shadow-lg hover:bg-orange-500 transition-colors"
              >
                Find an Expert
              </button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#225599] mb-8">Why Sudhaar Lo!</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-[#fe913b]">Verified Experts</h3>
                <p className="text-gray-600">All professionals undergo a strict ID and background verification process for your safety.</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-[#fe913b]">Transparent Pricing</h3>
                <p className="text-gray-600">Discuss and agree on the price directly with the expert. No hidden fees or commissions.</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-[#fe913b]">Secure & Simple</h3>
                <p className="text-gray-600">Book in minutes and use our OTP verification system to ensure the right expert arrives.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#225599] mb-8">Popular Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 cursor-pointer"
                >
                  <div className="flex justify-center items-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">{service.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#225599] mb-8 text-center">What Our Customers Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold text-[#fe913b]">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="text-center py-12 bg-gradient-to-r from-[#225599] to-[#fe913b] text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-lg mb-6">Whether you're a homeowner or a skilled professional, Sudhaar Lo! is for you.</p>
          <button
            onClick={() => navigate('/register/expert')}
            className="px-8 py-3 bg-white text-[#225599] font-bold rounded-lg shadow-md hover:bg-gray-100 transition-colors"
          >
            Become an Expert
          </button>
        </section>
      </main>
    </div>
  );
};

export default HomePage;