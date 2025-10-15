// src/modules/home/OffersPage.jsx

import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { useNavigate } from 'react-router-dom'; // Added navigate for the CTA

const OffersPage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-6">
                    <section className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-black text-[#fe913b] mb-4">
                            Exclusive Offers & Deals 🎉
                        </h1>
                        <p className="text-lg text-gray-600 mb-12">
                            Take advantage of these limited-time offers for both experts and customers!
                        </p>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            
                            {/* Offer 1: Expert Registration Fee Discount */}
                            <div className="border-4 border-[#225599] p-8 rounded-2xl bg-blue-50 relative overflow-hidden">
                                <span className="absolute top-0 right-0 bg-red-600 text-white text-sm font-bold px-3 py-1 transform rotate-45 translate-x-4 -translate-y-2 shadow-md">
                                    Limited Period!
                                </span>
                                <h3 className="text-3xl font-extrabold text-[#225599] mb-2">
                                    Launch Offer for Experts
                                </h3>
                                <p className="text-xl text-gray-700 font-semibold mb-4">
                                    Register now and save big on your annual subscription.
                                </p>
                                
                                <div className="flex justify-center items-baseline space-x-2 my-6">
                                    <span className="text-4xl font-black text-red-500 line-through">₹999</span>
                                    <span className="text-6xl font-black text-[#fe913b]">₹99</span>
                                    <span className="text-2xl text-gray-700">/ year</span>
                                </div>

                                <p className="text-sm text-red-500 font-bold mb-6">
                                    *Price valid only for the first year of subscription.
                                </p>

                                <button 
                                    onClick={() => navigate('/register/expert')}
                                    className="w-full py-3 bg-[#fe913b] text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-colors transform hover:-translate-y-0.5"
                                >
                                    Join as Expert Now
                                </button>
                            </div>
                            
                            {/* Offer 2: Refer & Earn Points/Cashback */}
                            <div className="border-4 border-[#fe913b] p-8 rounded-2xl bg-orange-50">
                                <h3 className="text-3xl font-extrabold text-[#225599] mb-2">
                                    Refer & Earn Rewards!
                                </h3>
                                <p className="text-xl text-gray-700 font-semibold mb-4">
                                    Share the Sudhaar Lo! love and earn points toward services or direct cashback.
                                </p>

                                <div className="text-left space-y-4 my-6">
                                    <div className="flex items-start space-x-3">
                                        <span className="text-3xl text-[#fe913b] font-extrabold">1.</span>
                                        <div>
                                            <p className="font-bold text-gray-800">For Customers (Points)</p>
                                            <p className="text-gray-600 text-sm">
                                                Refer a friend and get **500 Loyalty Points** once they complete their first service. Use points to discount your next booking!
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <span className="text-3xl text-[#fe913b] font-extrabold">2.</span>
                                        <div>
                                            <p className="font-bold text-gray-800">For Experts (Cashback)</p>
                                            <p className="text-gray-600 text-sm">
                                                Refer a fellow skilled professional. Receive **₹50 cashback** when your referred expert pays their annual subscription.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => alert('Feature coming soon! Check your dashboard for your referral code.')}
                                    className="w-full py-3 bg-[#225599] text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-colors transform hover:-translate-y-0.5"
                                >
                                    Get Your Referral Code
                                </button>
                            </div>

                        </div>
                        
                        <p className="mt-10 text-sm text-gray-500">
                            *T&C apply. Offers are subject to change and may vary by location.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default OffersPage;