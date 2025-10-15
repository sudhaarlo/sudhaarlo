import React, { useState } from 'react';


export default function CustomerProfile() {
 // ------------------------------
 // Customer Info
 // ------------------------------
 const [customer, setCustomer] = useState({
   name: 'Aashika',
   city: 'Abad',
   email: 'aashika@example.com',
   phone: '12121212',
 });


 const [isEditingCustomer, setIsEditingCustomer] = useState(false);
 const [editedCustomer, setEditedCustomer] = useState({ ...customer });


 // ------------------------------
 // Addresses
 // ------------------------------
 const [addresses, setAddresses] = useState([
   { id: 'A-101', label: 'Home', details: 'bypaas, Maharashtra' },
   
 ]);
 const [isEditingAddresses, setIsEditingAddresses] = useState(false);


 const addAddress = () => {
   const newAddress = {
     id: `A-${addresses.length + 101}`,
     label: 'New Address',
     details: 'Enter details...',
   };
   setAddresses([...addresses, newAddress]);
 };


 const editAddress = (id, field, value) => {
   setAddresses(addresses.map(a => a.id === id ? { ...a, [field]: value } : a));
 };


 const removeAddress = (id) => {
   setAddresses(addresses.filter(a => a.id !== id));
 };


 // ------------------------------
 // Payment Methods
 // ------------------------------
 const [paymentMethods, setPaymentMethods] = useState([
   { id: 'P-101', type: 'Credit Card', details: '**** **** **** 1234' },
   { id: 'P-102', type: 'PayPal', details: 'priya@example.com' },
 ]);
 const [isEditingPayments, setIsEditingPayments] = useState(false);


 const addPayment = () => {
   const newPayment = {
     id: `P-${paymentMethods.length + 101}`,
     type: 'New Method',
     details: 'Enter details...',
   };
   setPaymentMethods([...paymentMethods, newPayment]);
 };


 const editPayment = (id, field, value) => {
   setPaymentMethods(paymentMethods.map(p => p.id === id ? { ...p, [field]: value } : p));
 };


 const removePayment = (id) => {
   setPaymentMethods(paymentMethods.filter(p => p.id !== id));
 };


 // ------------------------------
 // Previous Bookings
 // ------------------------------
 const [bookings] = useState([
   {
     id: 'CB-2101',
     service: 'AC Servicing',
     scheduled: 'Tomorrow, 11:00 AM',
     provider: 'Rahul Sharma',
     location: 'Viman Nagar, Pune',
     status: 'Confirmed',
     rating: 4,
     review: 'Very professional and on time!',
   },
   {
     id: 'CB-2102',
     service: 'Plumbing',
     scheduled: 'Yesterday, 3:00 PM',
     provider: 'Anita Joshi',
     location: 'Koregaon Park, Pune',
     status: 'Completed',
     rating: 5,
     review: 'Fixed the issue quickly!',
   },
 ]);


 // ------------------------------
 // Render
 // ------------------------------
 return (
   <div className="font-poppins pt-24 pb-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
     <div className="container mx-auto px-4 sm:px-6 lg:px-10 space-y-12">


       {/* Customer Info */}
       <section>
         <div className="flex items-center justify-between">
           <h2 className="text-3xl font-bold text-gray-900">Your Profile</h2>
           <button
             onClick={() => { setIsEditingCustomer(true); setEditedCustomer({ ...customer }); }}
             className="text-sm text-blue-600 hover:underline"
           >
             Edit Info
           </button>
         </div>


         {isEditingCustomer ? (
           <div className="mt-4 p-4 bg-white rounded-xl shadow-md space-y-2">
             <input
               className="border p-2 rounded w-full"
               value={editedCustomer.name}
               onChange={(e) => setEditedCustomer({ ...editedCustomer, name: e.target.value })}
               placeholder="Name"
             />
             <input
               className="border p-2 rounded w-full"
               value={editedCustomer.city}
               onChange={(e) => setEditedCustomer({ ...editedCustomer, city: e.target.value })}
               placeholder="City"
             />
             <input
               className="border p-2 rounded w-full"
               value={editedCustomer.email}
               onChange={(e) => setEditedCustomer({ ...editedCustomer, email: e.target.value })}
               placeholder="Email"
             />
             <input
               className="border p-2 rounded w-full"
               value={editedCustomer.phone}
               onChange={(e) => setEditedCustomer({ ...editedCustomer, phone: e.target.value })}
               placeholder="Phone"
             />
             <div className="flex justify-end space-x-2">
               <button onClick={() => setIsEditingCustomer(false)} className="px-3 py-1 rounded bg-gray-200">Cancel</button>
               <button onClick={() => { setCustomer(editedCustomer); setIsEditingCustomer(false); }} className="px-3 py-1 rounded bg-blue-600 text-white">Save</button>
             </div>
           </div>
         ) : (
           <div className="mt-4 p-4 bg-white rounded-xl shadow-md space-y-1">
             <p><strong>Name:</strong> {customer.name}</p>
             <p><strong>City:</strong> {customer.city}</p>
             <p><strong>Email:</strong> {customer.email}</p>
             <p><strong>Phone:</strong> {customer.phone}</p>
           </div>
         )}
       </section>


       {/* Addresses */}
       <section>
         <div className="flex items-center justify-between mb-2">
           <h2 className="text-2xl font-bold text-gray-900">Your Addresses</h2>
           <button
             onClick={() => setIsEditingAddresses(!isEditingAddresses)}
             className="text-sm text-blue-600 hover:underline"
           >
             {isEditingAddresses ? 'Done' : 'Edit / Add New'}
           </button>
         </div>
         <div className="p-4 bg-white rounded-xl shadow-md space-y-2">
           {addresses.map(addr => (
             <div key={addr.id} className="flex justify-between items-center">
               {isEditingAddresses ? (
                 <div className="flex items-center w-full space-x-2">
                   <div className="flex flex-col w-full space-y-1">
                     <input
                       className="border p-1 rounded"
                       value={addr.label}
                       onChange={(e) => editAddress(addr.id, 'label', e.target.value)}
                     />
                     <input
                       className="border p-1 rounded"
                       value={addr.details}
                       onChange={(e) => editAddress(addr.id, 'details', e.target.value)}
                     />
                   </div>
                   <button onClick={() => removeAddress(addr.id)} className="px-2 py-1 rounded bg-red-500 text-white">Delete</button>
                 </div>
               ) : (
                 <p><span className="font-semibold">{addr.label}:</span> {addr.details}</p>
               )}
             </div>
           ))}
           {isEditingAddresses && (
             <button onClick={addAddress} className="mt-2 text-sm text-blue-600 hover:underline">+ Add New Address</button>
           )}
         </div>
       </section>


       {/* Payment Methods */}
       <section>
         <div className="flex items-center justify-between mb-2">
           <h2 className="text-2xl font-bold text-gray-900">Saved Payment Methods</h2>
           <button
             onClick={() => setIsEditingPayments(!isEditingPayments)}
             className="text-sm text-blue-600 hover:underline"
           >
             {isEditingPayments ? 'Done' : 'Edit / Add New'}
           </button>
         </div>
         <div className="p-4 bg-white rounded-xl shadow-md space-y-2">
           {paymentMethods.map(pm => (
             <div key={pm.id} className="flex justify-between items-center">
               {isEditingPayments ? (
                 <div className="flex items-center w-full space-x-2">
                   <div className="flex flex-col w-full space-y-1">
                     <input
                       className="border p-1 rounded"
                       value={pm.type}
                       onChange={(e) => editPayment(pm.id, 'type', e.target.value)}
                     />
                     <input
                       className="border p-1 rounded"
                       value={pm.details}
                       onChange={(e) => editPayment(pm.id, 'details', e.target.value)}
                     />
                   </div>
                   <button onClick={() => removePayment(pm.id)} className="px-2 py-1 rounded bg-red-500 text-white">Delete</button>
                 </div>
               ) : (
                 <p><span className="font-semibold">{pm.type}:</span> {pm.details}</p>
               )}
             </div>
           ))}
           {isEditingPayments && (
             <button onClick={addPayment} className="mt-2 text-sm text-blue-600 hover:underline">+ Add New Payment Method</button>
           )}
         </div>
       </section>


       {/* Previous Bookings */}
       <section>
         <h2 className="text-2xl font-bold mb-2 text-gray-900">Previous Bookings & Reviews</h2>
         <div className="space-y-2">
           {bookings.map(b => (
             <div key={b.id} className="flex justify-between items-start p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
               <div>
                 <p className="font-semibold text-gray-800">{b.service}</p>
                 <p className="text-sm text-gray-500">{b.provider} • {b.location}</p>
                 <p className="text-sm text-yellow-600">Rating: {b.rating} ⭐</p>
                 <p className="text-sm text-gray-700">"{b.review}"</p>
               </div>
               <div className="text-right">
                 <p className="text-sm text-gray-500">{b.scheduled}</p>
                 <span className="mt-1 inline-block px-2 py-1 rounded-lg text-sm bg-blue-100 text-blue-700">{b.status}</span>
               </div>
             </div>
           ))}
         </div>
       </section>


     </div>
   </div>
 );
}
