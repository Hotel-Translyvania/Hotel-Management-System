import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-700">
            Hotel Booking System
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              to="/rooms" 
              className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              Rooms
            </Link>
            
            <Link 
              to="/bookings" 
              className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              My Bookings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;