import React, { createContext, useState, useEffect } from 'react';
import standard from '../assets/standard.png/'
import king from '../assets/king.png/'
import single from '../assets/single.png/'
import suite from '../assets/suite.png/'
const BookingContext = createContext();
export const BookingProvider = ({ children }) => {
  // Mock room data
  const mockRooms = [
    {
      roomId: 1,
      roomNum: 101,
      roomType: 'Standard',
      bedType: 'Double',
      max_occupancy: 2,
      pricePerNight: 100,
      roomStatus: 'available',
      room_descripiton: 'Standard room with double bed',
      image: standard
    },
    {
      roomId: 2,
      roomNum: 201,
      roomType: 'Deluxe',
      bedType: 'King',
      max_occupancy: 2,
      pricePerNight: 150,
      roomStatus: 'available',
      room_descripiton: 'Deluxe room with king bed',
      image: king
    },
    {
      roomId: 3,
      roomNum: 102,
      roomType: 'Standard',
      bedType: 'Single',
      max_occupancy: 1,
      pricePerNight: 80,
      roomStatus: 'available',
      room_descripiton: 'Standard single room',
      image: single
    },
    {
      roomId: 4,
      roomNum: 301,
      roomType: 'Suite',
      bedType: 'King',
      max_occupancy: 4,
      pricePerNight: 250,
      roomStatus: 'occupied',
      room_descripiton: 'Luxury suite with king bed',
      image: suite
    }
  ];

  // Mock booking data
  const mockBookings = [
    {
      bookingId: 1,
      roomId: 1,
      roomNum: 101,
      roomType: 'Standard',
      checkIn: '2025-03-20',
      checkOut: '2025-03-25',
      status: 'confirmed'
    },
    {
      bookingId: 2,
      roomId: 4,
      roomNum: 301,
      roomType: 'Suite',
      checkIn: '2025-02-15',
      checkOut: '2025-02-20',
      status: 'completed'
    }
  ];

  const [rooms, setRooms] = useState(mockRooms);
  const [bookings, setBookings] = useState(mockBookings);
  const [currentBooking, setCurrentBooking] = useState(mockBookings[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock API functions
  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setRooms(mockRooms);
    } catch (err) {
      setError('Failed to load rooms');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setBookings(mockBookings);
      const current = mockBookings.find(
        booking => booking.status.toLowerCase() === 'confirmed'
      );
      setCurrentBooking(current || null);
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const bookRoom = async (bookingData) => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create new booking
      const room = mockRooms.find(r => r.roomId === bookingData.roomId);
      const newBooking = {
        bookingId: Math.max(...mockBookings.map(b => b.bookingId)) + 1,
        roomId: bookingData.roomId,
        roomNum: room.roomNum,
        roomType: room.roomType,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        status: 'confirmed'
      };
      
      // Update mock data
      const updatedBookings = [...mockBookings, newBooking];
      setBookings(updatedBookings);
      setCurrentBooking(newBooking);
      
      // Return the new booking
      return { data: newBooking };
    } catch (err) {
      setError('Booking failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update mock data
      const updatedBookings = mockBookings.map(booking => 
        booking.bookingId === bookingId 
          ? { ...booking, status: 'cancelled' } 
          : booking
      );
      
      setBookings(updatedBookings);
      setCurrentBooking(null);
    } catch (err) {
      setError('Failed to cancel booking');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize with mock data
  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        rooms,
        bookings,
        currentBooking,
        isLoading,
        error,
        fetchRooms,
        fetchBookings,
        bookRoom,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export { BookingContext };