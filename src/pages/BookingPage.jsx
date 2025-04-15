function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
    </div>
  );
}
import React from 'react';
import { useBooking } from '@/hooks/useBooking';
import Navbar from '@/components/Navbar/Navbar';
import CurrentBooking from '@/components/Rooms/CurrentBooking';
import BookingHistory from '@/components/Rooms/BookingHistory';
//import Navbar from '@/components/Rooms/Navbar';
import "./Rooms_Booking.css";

const BookingPage = () => {
  const { currentBooking, bookings, isLoading, error, cancelBooking } = useBooking();
  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(bookingId);
      } catch (err) {
        console.error('Cancellation failed:', err);
      }
    }
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
      
      <div className="container mx-auto px-4 py-8">
        {currentBooking && (
          <CurrentBooking 
            booking={currentBooking} 
            onCancel={() => handleCancelBooking(currentBooking.bookingId)} 
          />
        )}
        
        <BookingHistory bookings={bookings} />
      </div>
    </div>
  );
};

export default BookingPage;