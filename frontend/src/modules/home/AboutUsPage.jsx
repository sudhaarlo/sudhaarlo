// src/modules/home/AboutUsPage.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <section className="text-center py-16">
            <h1 className="text-5xl md:text-6xl font-black text-[#225599] leading-tight mb-4">
              Connecting India, <br /> One Fix at a Time.
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sudhaar Lo! is on a mission to revolutionize the home repair industry in India by bridging the gap between skilled professionals and homeowners.
            </p>
          </section>

          {/* Our Story Section */}
          <section className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-4xl font-bold text-[#fe913b] mb-6 text-center">Our Story</h2>
            <div className="text-gray-700 leading-relaxed text-lg space-y-4 max-w-4xl mx-auto">
              <p>
                The idea for Sudhaar Lo! was born out of a common frustration shared by millions of homeowners in India: the challenge of finding a reliable, trustworthy, and fairly-priced professional for day-to-day repairs. We saw a fragmented market, where skilled workers lacked a digital presence, and customers were left with no way to verify their expertise or authenticity.
              </p>
              <p>
                We decided to build a solution from the ground up—a platform that prioritizes **transparency, trust, and simplicity**. By creating a system where professionals are verified, their work is logged, and payment is handled directly, we empower both the customer and the expert. Our goal is to make hiring for home repairs as easy and reliable as ordering a meal.
              </p>
            </div>
          </section>

          {/* Our Mission & Values Section */}
          <section className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-[#225599] mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To create India’s most trusted digital platform for home services, where every homeowner can find a skilled professional with confidence, and every expert can build a sustainable business based on quality work.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-[#225599] mb-4">Our Values</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
                <li><strong className="text-[#fe913b]">Trust:</strong> We verify every expert to ensure your safety and peace of mind.</li>
                <li><strong className="text-[#fe913b]">Transparency:</strong> Our platform has no hidden fees. You see the expert’s profile and history upfront.</li>
                <li><strong className="text-[#fe913b]">Empowerment:</strong> We give skilled workers a digital identity and a way to grow their business.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutUsPage;