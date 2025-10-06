// src/modules/home/TermsPage.jsx

import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const TermsPage = () => {
  return (
    <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-6">
          <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-black text-[#225599] mb-6 text-center">
              Terms & Conditions
            </h1>
            <p className="text-sm text-gray-500 text-center mb-8">
              Last updated: September 18, 2025
            </p>

            <div className="text-gray-700 leading-relaxed space-y-8">
              <p>
                Welcome to Sudhaar Lo! These terms and conditions outline the rules and regulations for the use of Sudhaar Lo!'s Website. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Sudhaar Lo! if you do not agree to all of the terms and conditions stated on this page.
              </p>

              <div>
                <h2 className="text-2xl font-bold text-[#fe913b] mb-2">1. The Services</h2>
                <p>
                  Sudhaar Lo! is a platform that connects customers with skilled professionals for home repair and maintenance services. We do not employ the professionals; we act solely as a marketplace to facilitate connections. Any agreement for services is directly between the customer and the expert.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#fe913b] mb-2">2. User Accounts</h2>
                <p>
                  To use certain features of the platform, you must register for an account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>You must provide accurate and complete information during registration.</li>
                  <li>You must be at least 18 years of age to use the services.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#fe913b] mb-2">3. Payments and Fees</h2>
                <p>
                  Sudhaar Lo! does not handle payments for services. All payments for work completed are made directly from the customer to the expert, outside of the platform. We are not responsible for any disputes related to payments.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#fe913b] mb-2">4. Disclaimer of Warranties</h2>
                <p>
                  The services provided by professionals are offered "as is." Sudhaar Lo! makes no representations or warranties of any kind, express or implied, as to the operation of the services or the information, content, or materials included.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#fe913b] mb-2">5. Limitation of Liability</h2>
                <p>
                  In no event shall Sudhaar Lo!, its directors, employees, or partners, be liable for any damages arising out of or in connection with the use of this website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#fe913b] mb-2">6. Changes to Terms</h2>
                <p>
                  Sudhaar Lo! reserves the right to modify these terms and conditions at any time. We will provide notice of any changes by updating the "Last updated" date at the top of this page.
                </p>
              </div>

              <p>
                If you have any questions about these Terms and Conditions, please contact us.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;