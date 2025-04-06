import React, { useState } from 'react';
import { useBooking } from '@/hooks/useBooking';
import RoomList from '@/components/Rooms/RoomList';
import BookingForm from '@/components/Rooms/BookingForm';
import Navbar from '@/components/Navbar/Navbar';
import { useEffect } from 'react';
import "./Rooms_Booking.css";

const RoomsPage = () => {

  const { isLoading, error } = useBooking();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [rooms, setRooms] = useState([]); 
 
  //  handle API call to get rooms
    useEffect(() => {
      const fetchRooms = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/v1/hotels/1/rooms');
 
          const data = await response.json();
          const { rooms: { data: rooms } } = data;
          console.log('Rooms data:', rooms);
          setRooms(rooms);
        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      };
  
      fetchRooms();
  
    }, [rooms]);
  const handleCloseForm = () => {
    setShowBookingForm(false);
    setSelectedRoom(null);
  };
  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setShowBookingForm(true);
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