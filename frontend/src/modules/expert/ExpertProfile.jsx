import React, { useState } from 'react';


export default function ExpertProfile() {
 const [profile, setProfile] = useState({
   name: 'Rahul Sharma',
   city: 'Pune',
   services: ['Electrical', 'Appliance Repair'],
   rating: 4.7,
   totalReviews: 128,
   phone: '+91 9876543210',
   email: 'rahul@example.com',
   bio: 'Experienced electrical and appliance repair expert with 5+ years of experience.',
   isVerified: true,
 });


 return (
   <div className="pt-24 pb-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-poppins">
     <div className="container mx-auto px-4 sm:px-6 lg:px-10 space-y-8">
       <div className="bg-white rounded-xl shadow p-6 space-y-4">
         <h1 className="text-3xl font-semibold text-gray-900">{profile.name}</h1>
         <p className="text-gray-600">{profile.city}</p>
         <div className="flex flex-wrap gap-2 items-center">
           <span className={`px-2 py-1 rounded-md text-sm ${profile.isVerified ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
             {profile.isVerified ? 'Verified' : 'Unverified'}
           </span>
           <span className="text-gray-500">Rating: {profile.rating} ({profile.totalReviews} reviews)</span>
         </div>
         <p className="text-gray-700">Services: {profile.services.join(', ')}</p>
         <p className="text-gray-700">Phone: {profile.phone}</p>
         <p className="text-gray-700">Email: {profile.email}</p>
         <p className="text-gray-700">Bio: {profile.bio}</p>
       </div>
     </div>
   </div>
 );
}
