import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ExpertDashboard() {
  const navigate = useNavigate();

  const expertProfile = useMemo(() => ({
    expertName: 'Rahul Sharma',
    serviceCategories: ['Electrical', 'Appliance Repair'],
    cityName: 'Pune',
    ratingValue: 4.7,
    totalReviews: 128,
    isVerified: true,
    subscriptionExpiryDate: '2026-01-15',
  }), []);

  const dashboardStats = useMemo(() => ([
    { key: 'activeJobs', label: 'Active Jobs', value: 2, accent: 'from-blue-500 to-blue-700' },
    { key: 'completedThisMonth', label: 'Completed (30d)', value: 18, accent: 'from-green-500 to-emerald-600' },
    { key: 'cancellationRate', label: 'Cancellation Rate', value: '2.8%', accent: 'from-yellow-500 to-amber-600' },
    { key: 'avgEarnings', label: 'Avg. Fee / Job', value: '₹850', accent: 'from-orange-500 to-red-500' },
  ]), []);

  const upcomingJobs = useMemo(() => ([
    {
      bookingId: 'BKG-10234',
      customerName: 'Aman Verma',
      serviceType: 'Ceiling Fan Replacement',
      scheduledAt: 'Today, 4:30 PM',
      location: 'Koregaon Park, Pune',
      status: 'Confirmed',
    },
    {
      bookingId: 'BKG-10212',
      customerName: 'Neha Patel',
      serviceType: 'Washing Machine Fix',
      scheduledAt: 'Tomorrow, 10:00 AM',
      location: 'Kothrud, Pune',
      status: 'Awaiting OTP',
    },
  ]), []);

  return (
    <div className="pt-24 pb-10 min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                Welcome, {expertProfile.expertName}
              </h1>
              <p className="mt-2 text-gray-600">
                {expertProfile.serviceCategories.join(' • ')} • {expertProfile.cityName}
              </p>
              <div className="mt-2 flex items-center gap-3 text-sm">
                <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 font-semibold">
                  {expertProfile.isVerified ? 'Verified' : 'Unverified'}
                </span>
                <span className="text-gray-500">Rating {expertProfile.ratingValue} ({expertProfile.totalReviews})</span>
                <span className="text-gray-500">Subscr. until {expertProfile.subscriptionExpiryDate}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                className="px-5 py-3 rounded-xl bg-white border-2 border-blue-600 text-blue-700 font-bold hover:bg-blue-50 transition-all"
                onClick={() => navigate('/expert/history')}
              >
                View Work History
              </button>
              <button
                className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold shadow hover:shadow-blue-400/30 hover:-translate-y-0.5 transition-all"
                onClick={() => { /* placeholder for new booking flow */ }}
              >
                Start New Job
              </button>
            </div>
          </div>
        </header>

        <section aria-label="Key stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {dashboardStats.map((item) => (
            <div
              key={item.key}
              className="group relative overflow-hidden rounded-2xl border border-white/50 bg-white/70 backdrop-blur-md shadow hover:shadow-lg transition-all"
            >
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 bg-gradient-to-br ${item.accent}`} />
              <div className="p-6">
                <p className="text-gray-600 font-medium">{item.label}</p>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </section>

        <section aria-label="Upcoming jobs" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md shadow">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Jobs</h2>
              </div>
              <ul className="divide-y divide-gray-100">
                {upcomingJobs.map((job) => (
                  <li key={job.bookingId} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">{job.serviceType}</p>
                      <p className="text-sm text-gray-600">{job.customerName} • {job.location}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-gray-700">{job.scheduledAt}</span>
                      <span className="px-2 py-1 rounded-md text-sm font-semibold bg-blue-100 text-blue-700">{job.status}</span>
                      <button
                        className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50"
                        onClick={() => { /* placeholder details */ }}
                      >
                        Details
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/50 bg-white/80 backdrop-blur-md shadow p-6">
              <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold transition-all">Mark Available</button>
                <button className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold transition-all">Update Pricing</button>
                <button className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold transition-all">Manage Slots</button>
                <button className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold transition-all">Edit Profile</button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/50 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow p-6">
              <h3 className="text-lg font-bold">Pro Tip</h3>
              <p className="mt-2 text-blue-50">
                Completing jobs on time and asking customers for ratings improves your visibility.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


