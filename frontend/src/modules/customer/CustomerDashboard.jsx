import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const navigate = useNavigate();

  // ------------------------------
  // Customer Info
  // ------------------------------
  const customer = useMemo(
    () => ({
      name: 'Priya Singh',
      city: 'Pune',
      recentBookingCount: 6,
    }),
    []
  );

  // ------------------------------
  // Quick Stats
  // ------------------------------
  const quickStats = useMemo(
    () => [
      { key: 'upcoming', label: 'Upcoming Bookings', value: 1, accent: 'from-blue-400 to-blue-600' },
      { key: 'past30', label: 'Completed (30d)', value: 4, accent: 'from-green-400 to-green-600' },
      { key: 'savedExperts', label: 'Saved Experts', value: 3, accent: 'from-yellow-400 to-yellow-500' },
    ],
    []
  );

  // ------------------------------
  // Upcoming Bookings (Data remains the same)
  // ------------------------------
  const upcomingBookings = useMemo( // RENAMED: from 'upcoming' to 'upcomingBookings' for clarity
    () => [
      {
        id: 'CB-2101',
        service: 'AC Servicing',
        scheduled: 'Tomorrow, 11:00 AM',
        provider: 'Rahul Sharma',
        location: 'Viman Nagar, Pune',
        status: 'Confirmed',
      },
    ],
    []
  );

  // ------------------------------
  // Categories
  // ------------------------------
  const categories = useMemo(() => [
    { name: 'AC Servicing', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z' },
    { name: 'Plumbing', icon: 'M19 9h-4V3H9v6H5l7 7 7-7z' },
    { name: 'Electrical Repair', icon: 'M13 14h-2v-4h2v4zm0-6h-2V4h2v4zm1-8H9v2h5V0z' },
    { name: 'Appliance Repair', icon: 'M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z' },
    { name: 'Home Cleaning', icon: 'M12 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-2-5h4v-2h-4v2zM5 13H3v-2h2v2zm14 0h-2v-2h2v2zM15 9H9V4h6v5z' },
    { name: 'Pest Control', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8-8-3.58-8-8z' },
  ], []);

  const [selectedService, setSelectedService] = useState(null);

  // FIX: Implement actual navigation instead of a console log and timeout
  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
    // Simulate a brief loading time for better UX
    setTimeout(() => {
      // Navigate to the generic booking route, passing the selected service in the state
      navigate('/customer/book', { state: { service: serviceName } });
      setSelectedService(null);
    }, 1000); // Reduced timeout for better responsiveness
  };

  // ------------------------------
  // Addresses
  // ------------------------------
  const addresses = useMemo(
    () => [
      { id: 'A-101', label: 'Home', details: '123, MG Road, Pune, Maharashtra' },
      { id: 'A-102', label: 'Office', details: 'Tower B, Hinjewadi, Pune, Maharashtra' },
    ],
    []
  );

  // ------------------------------
  // Render
  // ------------------------------
  return (
    <div className="font-poppins pt-24 pb-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 space-y-12">

        {/* ------------------------------ */}
        {/* Welcome */}
        {/* ------------------------------ */}
        <header>
          <h1 className="text-4xl font-bold text-gray-900">Welcome, {customer.name} </h1>
          <p className="mt-2 text-gray-600">{customer.city} • {customer.recentBookingCount} bookings</p>
        </header>

        {/* ------------------------------ */}
        {/* Booking Status */}
        {/* ------------------------------ */}
        <section>
          {/* FIX: Revert to more specific title for Quick Stats */}
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Current Booking Status</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {quickStats.map((s) => (
              <div key={s.key} className="relative overflow-hidden rounded-xl bg-white shadow-md p-6 hover:scale-105 transition transform">
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 bg-gradient-to-br ${s.accent}`} />
                <p className="text-sm text-gray-700 uppercase tracking-wider">{s.label}</p>
                <p className="mt-2 text-4xl text-gray-900">{s.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------ */}
        {/* Book New Services */}
        {/* ------------------------------ */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Book New Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleSelectService(cat.name)}
                disabled={!!selectedService}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md border border-gray-100 text-gray-800 transition transform hover:scale-105 hover:bg-blue-50 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <svg className="w-10 h-10 mb-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d={cat.icon} />
                </svg>
                <span className="text-lg text-center">{cat.name}</span>
                <span className="text-xs mt-1 text-gray-500">Find experts now</span>
              </button>
            ))}
          </div>
          {selectedService && (
            <div className="mt-6 p-4 bg-blue-600/90 rounded-xl text-white flex items-center justify-center">
              Redirecting to booking for: {selectedService}...
            </div>
          )}
        </section>

        {/* ------------------------------ */}
        {/* Upcoming Bookings (FIXED SECTION TITLE AND DATA USAGE) */}
        {/* ------------------------------ */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Bookings</h2>
            <button
              onClick={() => navigate('/customer/history')}
              className="text-sm text-blue-600 hover:underline"
            >
              View All
            </button>
          </div>
          <div className="rounded-xl bg-white shadow-md p-6">
            {upcomingBookings.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {upcomingBookings.map((item) => ( // FIXED: Using upcomingBookings data
                  <li key={item.id} className="py-4 flex items-start justify-between">
                    <div>
                      <p className="text-gray-900">{item.service}</p>
                      <p className="text-sm text-gray-600">{item.provider} • {item.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-700">{item.scheduled}</p>
                      <span className="mt-2 inline-block px-2 py-1 rounded-md text-sm bg-blue-100 text-blue-700">{item.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No upcoming bookings.</p> 
            )}
          </div>
        </section>

        {/* ------------------------------ */}
        {/* Addresses */}
        {/* ------------------------------ */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Your Addresses</h2>
            <button
              onClick={() => navigate('/customer/addresses')}
              className="text-sm text-blue-600 hover:underline"
            >
              Manage
            </button>
          </div>
          <div className="rounded-xl bg-white shadow-md p-6">
            {addresses.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {addresses.map((addr) => (
                  <li key={addr.id} className="py-4 flex items-start justify-between">
                    <div>
                      <p className="text-gray-900">{addr.label}</p>
                      <p className="text-sm text-gray-600">{addr.details}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No saved addresses yet.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}