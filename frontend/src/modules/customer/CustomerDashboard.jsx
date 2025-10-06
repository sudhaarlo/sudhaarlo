import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const customer = useMemo(
    () => ({
      name: 'Priya Singh',
      city: 'Pune',
      recentBookingCount: 6,
    }),
    []
  );

  const quickStats = useMemo(
    () => [
      { key: 'upcoming', label: 'Upcoming Bookings', value: 1, accent: 'from-blue-500 to-blue-700' },
      { key: 'past30', label: 'Completed (30d)', value: 4, accent: 'from-green-500 to-emerald-600' },
      { key: 'savedExperts', label: 'Saved Experts', value: 3, accent: 'from-amber-500 to-yellow-600' },
    ],
    []
  );

  const upcoming = useMemo(
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

  return (
    <div className="font-poppins pt-24 pb-10 min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap'); .font-poppins{font-family:'Poppins',sans-serif}`}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900">Hello, {customer.name}</h1>
              <p className="mt-2 text-gray-600 font-medium">
                {customer.city} • {customer.recentBookingCount} bookings
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/customer/book')}
                className="flex items-center px-5 py-3 rounded-xl bg-blue-600 text-white font-bold shadow hover:shadow-lg transition"
              >
                Book a Service
              </button>

              <button
                onClick={() => navigate('/customer/history')}
                className="hidden sm:flex items-center px-5 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 font-semibold hover:bg-gray-50 transition"
              >
                View Bookings
              </button>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {quickStats.map((s) => (
            <div key={s.key} className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md shadow p-6">
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 bg-gradient-to-br ${s.accent}`} />
              <p className="text-sm text-gray-700 uppercase tracking-wider font-medium">{s.label}</p>
              <p className="mt-2 text-4xl font-black text-gray-900">{s.value}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Upcoming</h2>
              <button className="text-sm text-blue-600 font-semibold" onClick={() => navigate('/customer/history')}>
                See all
              </button>
            </div>

            <ul className="divide-y divide-gray-100">
              {upcoming.map((item) => (
                <li key={item.id} className="py-4 flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{item.service}</p>
                    <p className="text-sm text-gray-600">{item.provider} • {item.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-700">{item.scheduled}</p>
                    <span className="mt-2 inline-block px-2 py-1 rounded-md text-sm font-semibold bg-blue-100 text-blue-700">{item.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-white/50 bg-white/80 p-6 shadow">
              <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
              <div className="mt-4 grid grid-cols-1 gap-3">
                <button onClick={() => navigate('/customer/book')} className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold">New Booking</button>
                <button onClick={() => navigate('/support')} className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold">Contact Support</button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/50 bg-gradient-to-br from-green-600 to-emerald-600 text-white p-6 shadow">
              <h3 className="text-lg font-bold">Tip</h3>
              <p className="mt-2 text-green-50">Rate services after completion to help experts grow and maintain quality.</p>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
