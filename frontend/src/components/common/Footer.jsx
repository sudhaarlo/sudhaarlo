import React from 'react';
import Logo from './Logo'; 

const Footer = () => {
  return (
    <footer className="bg-[#225599] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 border-b border-white/10 pb-12">

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#fe913b]">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
          
          {/* For Customers */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#fe913b]">For Customers</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Popular Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Categories near you</a></li>
            </ul>
          </div>
          
          {/* For Experts */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#fe913b]">For Experts</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Register new service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Refer and earn</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-[#fe913b]">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="mailto:sudhaar.lo.com@gmail.com" className="hover:text-white transition-colors">Contact us</a></li>
            <li><a href="/FAQ" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          {/* Contact and Social Media */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-lg mb-4 text-[#fe913b]">Connect With Us</h4>
            <div className="flex space-x-4">
             {/* Instagram Link */}
              <a href="https://www.instagram.com/sudhaar.lo" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gray-200 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8A3.6 3.6 0 007.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6A3.6 3.6 0 0016.4 4H7.6m.9 1.5a2.5 2.5 0 00-2.5 2.5 2.5 2.5 0 002.5 2.5 2.5 2.5 0 002.5-2.5 2.5 2.5 0 00-2.5-2.5zM12 9a6 6 0 00-6 6c0 3.32 2.68 6 6 6 3.32 0 6-2.68 6-6a6 6 0 00-6-6zm0 2.5a3.5 3.5 0 013.5 3.5A3.5 3.5 0 0112 18.5a3.5 3.5 0 01-3.5-3.5A3.5 3.5 0 0112 11.5z"/>
                </svg>
              </a>
              {/* Facebook Link */}
              <a href="https://www.facebook.com/sudhaar.lo" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gray-200 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35C.582 0 0 .582 0 1.325v21.35c0 .743.582 1.325 1.325 1.325H12v-9.33H9.13v-3.793H12V9.08c0-3.08 1.89-4.759 4.63-4.759 1.32 0 2.446.098 2.775.142v3.253h-1.921c-1.503 0-1.795.715-1.795 1.763V12h3.645l-.59 3.793h-3.056v9.33H22.675c.743 0 1.325-.582 1.325-1.325V1.325C24 .582 23.418 0 22.675 0z"/>
                </svg>
              </a>
              {/* Mail Link */}
              <a href="mailto:sudhaar.lo.com@gmail.com" aria-label="Email" className="hover:text-gray-200 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-1.042 2L12 12.596 5.042 6h13.916zM4 18V8.625l7.66 6.386a.997.997 0 00.68.293.997.997 0 00.68-.293L20 8.625V18H4z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 text-center text-sm text-gray-400 border-t border-white/10">
          <p>&copy; Sudhaar Lo! All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;