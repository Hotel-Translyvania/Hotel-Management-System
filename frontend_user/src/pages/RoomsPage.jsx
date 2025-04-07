import React, { useState } from 'react';
import { useBooking } from '@/hooks/useBooking';
import RoomList from '@/components/Rooms/RoomList';
import BookingForm from '@/components/Rooms/BookingForm';
import Navbar from '@/components/Navbar/Navbar';

import "./Rooms_Booking.css";

const RoomsPage = () => {
  const { rooms, isLoading, error } = useBooking();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setShowBookingForm(true);
  };

  const handleCloseForm = () => {
    setShowBookingForm(false);
    setSelectedRoom(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
       <Navbar />
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded">Loading...</div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}      
      <RoomList 
        rooms={rooms} 
        onBookNow={handleBookNow} 
      />
      {showBookingForm && selectedRoom && (
        <BookingForm 
          room={selectedRoom} 
          onClose={handleCloseForm} 
        />
      )}
    </div>
  );
};
export default RoomsPage;