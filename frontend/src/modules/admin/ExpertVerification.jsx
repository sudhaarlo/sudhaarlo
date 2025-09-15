import React from 'react';


export default function ExpertPage() {
 return (
   <div className="pt-24 pb-8 min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 font-sans">
     <div className="container mx-auto px-6">
       <div className="text-center mb-12">
         <h1 className="text-5xl font-black mb-4">
           <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Expert</span>
           <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> Dashboard</span>
         </h1>
         <p className="text-gray-600 text-lg">Manage your profile, jobs, and grow your business</p>
       </div>


       {/* Stats Cards */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
         {[
           { title: "Active Jobs", value: "5", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "from-blue-500 to-blue-600" },
           { title: "Completed", value: "230", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", color: "from-green-500 to-green-600" },
           { title: "Rating", value: "4.8", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", color: "from-yellow-500 to-orange-500" },
           { title: "Earnings", value: "₹45K", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1", color: "from-purple-500 to-pink-500" }
         ].map((stat, index) => (
           <div key={index} className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20 group hover:shadow-2xl transition-all duration-300">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                 <p className="text-3xl font-black text-gray-900 group-hover:scale-110 transition-transform duration-300">{stat.value}</p>
               </div>
               <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                 </svg>
               </div>
             </div>
           </div>
         ))}
       </div>


       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {/* Profile Card */}
         <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 group hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
           <div className="text-center mb-6">
             <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl font-black text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
               A
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h3>
             <p className="text-gray-600">Update your services and availability</p>
           </div>
           <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300">
             Edit Profile
           </button>
         </div>


         {/* Pending Jobs Card */}
         <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 group hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
           <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
             <span className="w-3 h-3 bg-orange-500 rounded-full mr-3 animate-pulse"></span>
             Pending Jobs
           </h3>
           <div className="space-y-4">
             {[
               { id: "12345", customer: "Rajeev Sharma", service: "AC Repair", time: "Today 2:00 PM" },
               { id: "12346", customer: "Priya Singh", service: "Electrical Wiring", time: "Tomorrow 10:00 AM" }
             ].map((job, index) => (
               <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors duration-300">
                 <div className="flex justify-between items-start mb-2">
                   <p className="font-bold text-gray-900">#{job.id}</p>
                   <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">Pending</span>
                 </div>
                 <p className="text-sm text-gray-600 mb-1">Customer: {job.customer}</p>
                 <p className="text-sm text-gray-600 mb-1">Service: {job.service}</p>
                 <p className="text-xs text-blue-600 font-semibold">{job.time}</p>
               </div>
             ))}
           </div>
         </div>


         {/* Work History Card */}
         <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 group hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
           <div className="text-center mb-6">
             <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
               </svg>
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Work History</h3>
             <p className="text-gray-600">All completed jobs and earnings</p>
           </div>
           <button className="w-full py-3 px-6 bg-white text-blue-700 border-2 border-blue-600 font-bold rounded-xl shadow-lg hover:bg-blue-50 transform hover:-translate-y-1 transition-all duration-300">
             View History
           </button>
         </div>
       </div>
     </div>
   </div>
 );
}
