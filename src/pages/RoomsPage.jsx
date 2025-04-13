import React, { useState } from 'react';
import { useBooking } from '@/hooks/useBooking';
import RoomList from '@/components/Rooms/RoomList';
import BookingForm from '@/components/Rooms/BookingForm';
import Navbar from '@/components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import restaurantImage from '@/assets/restaurant.jpg';
import servicesImage from '@/assets/services.jpg'; // Add your services image
//import "./Rooms_Booking.css";

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

      <div className="container mx-auto px-4 py-6">
        <RoomList 
          rooms={rooms} 
          onBookNow={handleBookNow} 
        />

        {/* Services Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Restaurants</h2>
          
          {/* Restaurant Card */}
          <div className="w-full max-w-3xl mr-auto mb-8">
            <Link 
              to="/restaurant/Menu" 
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-56 overflow-hidden">
                  <img 
                    src={restaurantImage} 
                    alt="Our Restaurant" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Restaurant & Dining</h3>
                    <p className="text-gray-600 mb-4">
                    Explore our delicious menu and make reservation.
                    Casual Dining, Extraordinary Flavor!
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-6 w-6 text-amber-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Fine Dining</span>
                    </div>
                    <div className="flex items-center text-blue-600 group-hover:text-blue-800 transition-colors">
                      <span className="font-medium mr-1">View Menu</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Other Services Card */}
          
          <div className="w-full max-w-3xl mr-auto">
            <Link 
              to="/Services" 
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 h-48 md:h-56 overflow-hidden">
                  <img 
                    src={servicesImage} 
                    alt="Other Services" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Additional Services</h3>
                    <p className="text-gray-600 mb-4">
                      Discover our additional services including spa treatments, Gym services and more.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-6 w-6 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Spa   Gym   More</span>
                    </div>
                    <div className="flex items-center text-blue-600 group-hover:text-blue-800 transition-colors">
                      <span className="font-medium mr-1">Explore Services</span>
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
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