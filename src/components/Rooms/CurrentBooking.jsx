import React from 'react';

const CurrentBooking = ({ booking }) => {
  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
    'in progress': 'bg-yellow-100 text-yellow-800'
  };

  if (!booking) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Booking</h2>
        <p className="text-gray-500">You don't have any active bookings.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Current Booking</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status.toLowerCase()] || 'bg-gray-100'}`}>
          {booking.status}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Room Number</p>
          <p className="font-medium">{booking.roomNum}</p>
        </div>
        <div>
          <p className="text-gray-600">Room Type</p>
          <p className="font-medium">{booking.roomType}</p>
        </div>
        <div>
          <p className="text-gray-600">Check-in Date</p>
          <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-gray-600">Check-out Date</p>
          <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default CurrentBooking;