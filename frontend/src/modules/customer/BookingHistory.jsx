import React, { useMemo, useState } from 'react';

// Mock data for experts based on service category
const EXPERTS_DATA = {
  'AC Repair & Maintenance': [
    { id: 1, name: 'Ravi Kumar', rating: 4.8, jobs: 154, price: '₹750', skills: ['Split AC', 'Window AC', 'Gas Refill'] },
    { id: 2, name: 'Sonia Tech', rating: 4.5, jobs: 92, price: '₹800', skills: ['Duct AC', 'Commercial Units'] },
  ],
  'Plumbing & Waterworks': [
    { id: 3, name: 'Priya Patel', rating: 4.9, jobs: 210, price: '₹600', skills: ['Leak Fixes', 'Geyser', 'Faucet Repair'] },
    { id: 4, name: 'Gopal Services', rating: 4.2, jobs: 65, price: '₹550', skills: ['Drain Cleaning', 'Pipeline Installation'] },
  ],
  'Electrical Wiring & Fixes': [
    { id: 5, name: 'Amit Singh', rating: 4.7, jobs: 188, price: '₹700', skills: ['Wiring', 'Short Circuit', 'Meter Box'] },
  ],
  'Home Cleaning & Pest Control': [], // No experts available for this mock category
};

// The main BookingHistory component is the default export.
export default function BookingHistory() {
  // State for simple page navigation: 'history' or 'book'
  const [currentPage, setCurrentPage] = useState('history');

  // Hardcoded booking data for demonstration.
  const bookings = useMemo(
    () => [
      { id: 'CB-2101', service: 'AC Servicing', provider: 'Rahul Sharma', date: '2025-10-08', time: '11:00 AM', status: 'Completed', amount: '₹899' },
      { id: 'CB-2095', service: 'Geyser Installation', provider: 'Max Plumbing', date: '2025-10-01', time: '04:00 PM', status: 'Pending', amount: '₹1200' },
      { id: 'CB-2088', service: 'Washing Machine Repair', provider: 'Neha Appliances', date: '2025-09-20', time: '10:30 AM', status: 'Cancelled', amount: '₹0' },
      { id: 'CB-2055', service: 'Ceiling Fan Replacement', provider: 'Aman Services', date: '2025-09-03', time: '02:00 PM', status: 'Completed', amount: '₹750' },
      { id: 'CB-2001', service: 'Home Deep Cleaning', provider: 'Sparkle Services', date: '2025-08-15', time: '09:00 AM', status: 'Completed', amount: '₹2500' },
    ],
    []
  );

  /**
   * Helper function to determine Tailwind classes based on booking status.
   */
  const getStatusClasses = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 ring-green-500/10';
      case 'Cancelled':
      case 'Failed':
        return 'bg-red-100 text-red-700 ring-red-500/10';
      case 'Pending':
      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-700 ring-yellow-500/10';
      default:
        return 'bg-gray-100 text-gray-700 ring-gray-500/10';
    }
  };

  /**
   * Component for the fixed top application header with navigation.
   */
  const Header = () => (
    <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-10 shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-4 flex justify-between items-center">
        <h2 className="text-xl font-extrabold text-indigo-600 tracking-tight">ServiceHub</h2>

        {/* Navigation Tabs */}
        <nav className="flex space-x-4">
          <button
            onClick={() => setCurrentPage('history')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
              currentPage === 'history' ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            History
          </button>
          <button
            onClick={() => setCurrentPage('book')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
              currentPage === 'book' ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Book Service
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700 font-medium hidden sm:inline">User ID: U12345</span>
          <svg className="w-6 h-6 text-gray-500 cursor-pointer hover:text-indigo-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
      </div>
    </div>
  );

  /**
   * Component for a single booking card item (used in History View).
   */
  const BookingCard = ({ booking }) => (
    <li className="py-5 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition duration-200 hover:bg-indigo-50/50 rounded-xl">
      {/* Service and Provider Details */}
      <div className="flex flex-col flex-grow">
        <p className="font-extrabold text-lg text-gray-900 leading-snug">{booking.service}</p>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-medium text-gray-700">{booking.provider}</span> • ID: <span className="text-indigo-500 font-mono">{booking.id}</span>
        </p>
      </div>

      {/* Date, Time, Status, and Amount block (responsive layout) */}
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 w-full sm:w-auto mt-2 sm:mt-0">
        {/* Date/Time */}
        <div className="flex flex-col items-start sm:items-end text-sm min-w-[120px]">
          <p className="font-semibold text-gray-800">{booking.date}</p>
          <p className="text-gray-500">{booking.time}</p>
        </div>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 text-xs uppercase tracking-wider rounded-full font-bold shadow-sm ring-1 ring-inset whitespace-nowrap ${getStatusClasses(
            booking.status
          )}`}
        >
          {booking.status}
        </span>

        {/* Amount */}
        <span className="text-lg font-black text-gray-900 min-w-[70px] text-right">{booking.amount}</span>
      </div>
    </li>
  );

  /**
   * Component for the Booking History view.
   */
  const BookingHistoryView = () => (
    <>
      {/* Main Heading */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your Service Bookings</h1>
        <p className="mt-2 text-lg text-gray-600">Review your past, current, and cancelled service requests.</p>
      </header>

      {/* Booking List Container */}
      <div className="rounded-2xl bg-white p-2 shadow-2xl shadow-indigo-100/50 border border-gray-100/50">
        {bookings.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {bookings.map((b) => (
              <BookingCard key={b.id} booking={b} />
            ))}
          </ul>
        ) : (
          // Empty state message
          <div className="p-8 text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1 9 9 9-9-9-9z" />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No bookings found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by scheduling your first service request.</p>
          </div>
        )}
      </div>
    </>
  );

  /**
   * Component for the New Booking Page with expert selection logic.
   */
  const NewBookingView = () => {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState('');
    const [selectedExpert, setSelectedExpert] = useState(null);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    const availableExperts = useMemo(() => {
      return selectedService ? EXPERTS_DATA[selectedService] || [] : [];
    }, [selectedService]);

    const handleServiceSelect = (e) => {
      const service = e.target.value;
      setSelectedService(service);
      setSelectedExpert(null); // Reset expert when service changes
      setBookingConfirmed(false);
      if (service && service !== '') {
        setStep(2);
      } else {
        setStep(1);
      }
    };

    const handleExpertSelect = (expert) => {
      setSelectedExpert(expert);
      setBookingConfirmed(true);
      // In a real app, this is where an API call would be made
      setTimeout(() => {
        setStep(1); // Reset to start new booking flow
        setSelectedService('');
        setSelectedExpert(null);
        setBookingConfirmed(false);
        setCurrentPage('history'); // go back to history after confirmation
      }, 3000); // Confirmation message display time
    };

    const ServiceSelectionStep = () => (
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center space-x-2 text-sm text-indigo-600 font-bold">
          <span className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-500 text-white">1</span>
          <span>Choose Service Category</span>
        </div>
        <div className="mt-4">
          <label htmlFor="serviceType" className="block text-base font-semibold text-gray-700 mb-2">
            What service do you need?
          </label>
          <select
            id="serviceType"
            name="serviceType"
            required
            value={selectedService}
            onChange={handleServiceSelect}
            className="block w-full rounded-lg border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border text-lg"
          >
            <option value="">-- Select a service category --</option>
            {Object.keys(EXPERTS_DATA).map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          {selectedService && (
            <p>
              Service selected: <span className="font-semibold text-indigo-600">{selectedService}</span>. Please proceed to select an expert.
            </p>
          )}
        </div>
      </form>
    );

    const ExpertSelectionStep = () => (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-sm text-indigo-600 font-bold">
          <span className="flex items-center justify-center h-6 w-6 rounded-full bg-indigo-500 text-white">2</span>
          <span>Select an Expert Professional</span>
        </div>

        <button onClick={() => setStep(1)} className="text-sm text-indigo-500 hover:text-indigo-700 transition flex items-center mb-4 pt-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Change Service Category
        </button>

        {availableExperts.length > 0 ? (
          <div className="grid gap-6">
            {availableExperts.map((expert) => (
              <div key={expert.id} className="p-4 border border-gray-200 rounded-xl shadow-md flex justify-between items-center transition duration-200 hover:shadow-lg hover:border-indigo-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-600 text-lg shadow-inner">
                    {expert.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{expert.name}</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-indigo-600 mr-1">{expert.rating}</span> ({expert.jobs} jobs)
                    </p>
                    <p className="text-xs text-gray-400 mt-1 hidden sm:block">{expert.skills.join(', ')}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <p className="text-xl font-extrabold text-indigo-600 mb-2">
                    {expert.price}
                    <span className="text-sm font-normal text-gray-500">/visit*</span>
                  </p>
                  <button type="button" onClick={() => handleExpertSelect(expert)} className="py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-150">
                    Select & Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-lg font-semibold text-gray-800">No Experts Found</p>
            <p className="text-gray-500 mt-2">We are currently onboarding professionals for the {selectedService} category. Please try again later!</p>
          </div>
        )}
      </div>
    );

    // Confirmation message component
    const ConfirmationMessage = () => (
      <div className="p-6 text-center bg-green-50 border border-green-300 text-green-800 rounded-xl shadow-lg animate-pulse">
        <svg className="mx-auto h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-xl font-extrabold">Booking Confirmed!</h3>
        <p className="mt-1 text-sm">
          You have successfully booked {selectedExpert?.name} for your {selectedService} request.
          They will contact you shortly. Redirecting in a moment...
        </p>
      </div>
    );

    return (
      <>
        {/* Main Heading */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Book a Professional</h1>
          <p className="mt-2 text-lg text-gray-600">{bookingConfirmed ? 'Thank you for your booking!' : 'Follow the steps below to find and book your perfect service expert.'}</p>

          {/* Step indicator */}
          {!bookingConfirmed && (
            <div className="flex mt-4 items-center space-x-2 text-sm text-gray-500">
              <span className={`px-2 py-0.5 rounded-full font-bold ${step === 1 ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200'}`}>Step 1</span>
              <span className={`px-2 py-0.5 rounded-full font-bold ${step === 2 ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200'}`}>Step 2</span>
            </div>
          )}
        </header>

        {/* Main Booking Panel */}
        <div className="rounded-2xl bg-white p-6 shadow-2xl shadow-indigo-100/50 border border-gray-100/50 max-w-4xl mx-auto">
          {bookingConfirmed && selectedExpert ? (
            <ConfirmationMessage />
          ) : (
            <>
              <ServiceSelectionStep />
              {step === 2 && (
                <div className="mt-8 border-t pt-6 border-gray-100">
                  <ExpertSelectionStep />
                </div>
              )}
            </>
          )}
        </div>
      </>
    );
  };

  return (
    // Updated font for aesthetics and set the overall background
    <div className="font-['Poppins', 'sans-serif']">
      <Header />
      <div className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          {/* Conditional rendering of the current page view */}
          {currentPage === 'history' && <BookingHistoryView />}
          {currentPage === 'book' && <NewBookingView />}
        </div>
      </div>
    </div>
  );
}
