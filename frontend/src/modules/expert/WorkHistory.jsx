import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WorkHistory() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [month, setMonth] = useState('this');

  const jobs = useMemo(() => ([
    {
      bookingId: 'BKG-10101',
      date: '2025-09-09',
      customerName: 'Priya Nair',
      serviceType: 'Mixer Grinder Repair',
      location: 'Baner, Pune',
      status: 'Completed',
      fee: 700,
      rating: 5,
    },
    {
      bookingId: 'BKG-10145',
      date: '2025-09-11',
      customerName: 'Rohit Kulkarni',
      serviceType: 'Geyser Installation',
      location: 'Viman Nagar, Pune',
      status: 'Completed',
      fee: 1200,
      rating: 4,
    },
    {
      bookingId: 'BKG-10180',
      date: '2025-09-15',
      customerName: 'Sneha Desai',
      serviceType: 'Ceiling Fan Repair',
      location: 'Kothrud, Pune',
      status: 'Cancelled',
      fee: 0,
      rating: null,
    },
  ]), []);

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchesQuery = [j.bookingId, j.customerName, j.serviceType, j.location]
        .join(' ')?.toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus = status === 'all' ? true : j.status.toLowerCase() === status;
      // month filter mocked for now
      const matchesMonth = month === 'this' ? true : true;
      return matchesQuery && matchesStatus && matchesMonth;
    });
  }, [jobs, query, status, month]);

  const totalEarnings = useMemo(() => filtered.reduce((sum, j) => sum + (j.fee || 0), 0), [filtered]);

  return (
    <div className="pt-24 pb-10 min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900">Work History</h1>
            <p className="mt-2 text-gray-600">View and filter your past jobs, earnings, and ratings</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="px-5 py-3 rounded-xl bg-white border-2 border-blue-600 text-blue-700 font-bold hover:bg-blue-50 transition-all"
              onClick={() => navigate('/expert/dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md shadow p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Search</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find by name, service, location, booking ID"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="this">This Month</option>
                <option value="last">Last Month</option>
                <option value="custom">Custom (coming soon)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md shadow">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Jobs ({filtered.length})</h2>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-extrabold text-gray-900">₹{totalEarnings}</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-600 text-sm">
                  <th className="px-6 py-4">Booking</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Fee</th>
                  <th className="px-6 py-4">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((job) => (
                  <tr key={job.bookingId} className="text-sm text-gray-900">
                    <td className="px-6 py-4 font-semibold">{job.bookingId}</td>
                    <td className="px-6 py-4">{job.date}</td>
                    <td className="px-6 py-4">{job.customerName}</td>
                    <td className="px-6 py-4">{job.serviceType}</td>
                    <td className="px-6 py-4">{job.location}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${job.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">₹{job.fee}</td>
                    <td className="px-6 py-4">
                      {job.rating ? (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${i < job.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 00-1.175 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <button
            className="px-5 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all"
            onClick={() => window.print()}
          >
            Export / Print
          </button>
        </div>
      </div>
    </div>
  );
}


