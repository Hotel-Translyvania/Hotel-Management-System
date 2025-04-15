import React from "react";

const BookingDetails = () => {
  return (
    <div className="p-6 border border-gray-300 rounded-lg w-80 mx-auto text-center bg-gray-100 shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-3">Booking Details</h2>
      <p className="text-gray-600 mb-3">Here are your booking details.</p>
      <ul className="text-left space-y-2 mb-4">
        <li><strong>Room:</strong> Deluxe Suite</li>
        <li><strong>Check-in:</strong> March 20, 2025</li>
        <li><strong>Check-out:</strong> March 25, 2025</li>
        <li><strong>Guests:</strong> 2 Adults</li>
      </ul>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
        Confirm Booking
      </button>
    </div>
  );
};
export default BookingDetails;