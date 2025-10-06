import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const faqData = [
  {
    question: "How do I book an expert?",
    answer: "You can find an expert by using the search bar on the homepage. Filter by service, location, or rating. Once you find the right professional, you can either call them directly or use the 'Direct Booking' option."
  },
  {
    question: "How are experts on the platform verified?",
    answer: "Every professional who registers with Sudhaar Lo! must upload valid identity documents, which are verified by our admin team. This ensures that all experts are authentic and trustworthy."
  },
  {
    question: "Do I have to pay a commission or platform fee?",
    answer: "No, currently Sudhaar Lo! does not charge any commission or platform fees per booking. You pay the expert directly the amount you both agreed upon."
  },
  {
    question: "What if there is a dispute with an expert?",
    answer: "Since payments are handled directly between the customer and the expert, we encourage direct communication to resolve any issues. Our platform logs all service records for your reference. For serious issues, you can contact our support team via email."
  },
  {
    question: "Is my personal information safe?",
    answer: "Yes, we take your privacy seriously. Your personal information is protected and will not be shared without your consent. For more details, please refer to our Privacy Policy."
  }
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-6">
          <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-black text-[#225599] mb-8 text-center">
              Frequently Asked Questions
            </h1>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 py-4">
                  <button 
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center text-left text-lg font-semibold text-[#225599] hover:text-[#fe913b] transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <svg 
                      className={`w-6 h-6 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
                  >
                    <p className="mt-4 text-gray-700 leading-relaxed pr-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center text-gray-600">
              <p>Still have questions? Feel free to <a href="mailto:sudhaar.lo.com@gmail.com" className="text-[#fe913b] font-bold hover:underline transition-colors">contact our support team.</a></p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default FaqPage;