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
   { key: 'activeJobs', label: 'Active Jobs', value: 2, accent: 'from-blue-400 to-blue-600' },
   { key: 'completedThisMonth', label: 'Completed (30d)', value: 18, accent: 'from-green-400 to-green-600' },
   { key: 'cancellationRate', label: 'Cancellation Rate', value: '2.8%', accent: 'from-yellow-400 to-yellow-500' },
   { key: 'avgEarnings', label: 'Avg. Fee / Job', value: '₹850', accent: 'from-orange-400 to-red-500' },
 ]), []);


 const upcomingJobs = useMemo(() => ([
   { bookingId: 'BKG-10234', customerName: 'Aman Verma', serviceType: 'Ceiling Fan Replacement', scheduledAt: 'Today, 4:30 PM', location: 'Koregaon Park, Pune', status: 'Confirmed' },
   { bookingId: 'BKG-10212', customerName: 'Neha Patel', serviceType: 'Washing Machine Fix', scheduledAt: 'Tomorrow, 10:00 AM', location: 'Kothrud, Pune', status: 'Awaiting OTP' },
 ]), []);


 return (
   <div className="pt-24 pb-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-poppins">
     <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');`}</style>


     <div className="container mx-auto px-4 sm:px-6 lg:px-10 space-y-12">


       {/* Header */}
       <header className="mb-8">
         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
           <div>
             <h1
               className="text-3xl md:text-4xl font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
               onClick={() => navigate('/expert/profile')}
             >
               {expertProfile.expertName}
             </h1>
             <p className="mt-1 text-gray-600">{expertProfile.serviceCategories.join(' • ')} • {expertProfile.cityName}</p>
             <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
               <span className={`px-2 py-1 rounded-md text-sm ${expertProfile.isVerified ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                 {expertProfile.isVerified ? 'Verified' : 'Unverified'}
               </span>
               <span className="text-gray-500">Rating {expertProfile.ratingValue} ({expertProfile.totalReviews})</span>
               <span className="text-gray-500">Subscr. until {expertProfile.subscriptionExpiryDate}</span>
             </div>
           </div>


           <div className="flex flex-wrap gap-3">
             <button
               className="px-5 py-3 rounded-xl bg-white border border-blue-600 text-blue-700 font-medium hover:bg-blue-50 transition-all"
               onClick={() => navigate('/expert/history')}
             >
               View Work History
             </button>
             <button
               className="px-5 py-3 rounded-xl bg-blue-600 text-white font-medium shadow hover:shadow-lg hover:-translate-y-0.5 transition-all"
             >
               Start New Job
             </button>
           </div>
         </div>
       </header>


       {/* Dashboard Stats */}
       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
         {dashboardStats.map(item => (
           <div key={item.key} className="relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-md shadow hover:shadow-lg transition-all">
             <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-20 bg-gradient-to-br ${item.accent}`} />
             <div className="p-6">
               <p className="text-gray-700 text-sm">{item.label}</p>
               <p className="mt-2 text-3xl font-semibold text-gray-900">{item.value}</p>
             </div>
           </div>
         ))}
       </section>


       {/* Upcoming Jobs */}
       <section className="rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md shadow">
         <div className="p-6 border-b border-gray-100">
           <h2 className="text-xl font-semibold text-gray-900">Upcoming Jobs</h2>
         </div>
         <ul className="divide-y divide-gray-100">
           {upcomingJobs.map(job => (
             <li key={job.bookingId} className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-gray-50 transition-all rounded-xl">
               <div>
                 <p className="text-gray-900 font-medium">{job.serviceType}</p>
                 <p className="text-sm text-gray-600">{job.customerName} • {job.location}</p>
               </div>
               <div className="flex flex-wrap items-center gap-3 mt-2 sm:mt-0">
                 <span className="text-sm text-gray-700">{job.scheduledAt}</span>
                 <span className="px-2 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-700">{job.status}</span>
                 <button className="px-3 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50">Details</button>
               </div>
             </li>
           ))}
         </ul>
       </section>


     </div>
   </div>
 );
}
