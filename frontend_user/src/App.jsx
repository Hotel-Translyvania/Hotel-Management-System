import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import RoomsPage from './pages/RoomsPage';
import BookingPage from './pages/BookingPage';
import Navbar from './components/Navbar';
import BookingDetails from './Components/Rooms/BookingDetails';
import './room_booking.css';

const App = () => {
  return (
    <Router>
      <BookingProvider>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<RoomsPage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/bookings" element={<BookingPage />} />
              <Route path="/bookings/:id" element={<BookingDetails />} />
            </Routes>
          </main>
        </div>
      </BookingProvider>
    </Router>
  );
};
export default App;