import React, { createContext, useState, useEffect } from "react";
import standard from "../assets/standard.png";
import king from "../assets/king.png";
import single from "../assets/single.png";
import suite from "../assets/suite.png";
import api from "@/api"; // Adjust the path as needed

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/hotels/1/rooms");
      console.log("API Response:", res.data);

      const rawRooms = res.data.rooms.data;

      const cleanedRooms = rawRooms.map((room) => ({
        id: room.id,
        roomNum: room.roomNumber,
        roomType: room.type,
        bedType: room.bedType,
        numberOfBed: room.occupancy,
        roomStatus: room.status,
        pricePerNight: room.price,
        description: room.description,
        image:
          room.roomType === "Standard"
            ? standard
            : room.roomType === "King"
            ? king
            : room.roomType === "Single"
            ? single
            : suite,
      }));

      setRooms(cleanedRooms);
    } catch (err) {
      setError("Failed to load rooms.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      // Replace this with real API call when ready
      const mockBookings = [
        {
          bookingId: 1,
          roomId: 1,
          roomNum: 101,
          roomType: "Standard",
          checkIn: "2025-03-20",
          checkOut: "2025-03-25",
          status: "confirmed",
        },
        {
          bookingId: 2,
          roomId: 4,
          roomNum: 301,
          roomType: "Suite",
          checkIn: "2025-02-15",
          checkOut: "2025-02-20",
          status: "completed",
        },
      ];
      setBookings(mockBookings);
      const current = mockBookings.find(
        (booking) => booking.status.toLowerCase() === "confirmed"
      );
      setCurrentBooking(current || null);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const bookRoom = async (bookingData) => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const room = rooms.find((r) => r.id === bookingData.roomId);
      const newBooking = {
        bookingId: Math.max(0, ...bookings.map((b) => b.bookingId)) + 1,
        roomId: bookingData.roomId,
        roomNum: room.number,
        roomType: room.roomType,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        status: "confirmed",
      };

      const updatedBookings = [...bookings, newBooking];
      setBookings(updatedBookings);
      setCurrentBooking(newBooking);

      return { data: newBooking };
    } catch (err) {
      setError("Booking failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    setIsLoading(true);
    try {
      const updatedBookings = bookings.map((booking) =>
        booking.bookingId === bookingId
          ? { ...booking, status: "cancelled" }
          : booking
      );
      setBookings(updatedBookings);
      setCurrentBooking(null);
    } catch (err) {
      setError("Failed to cancel booking");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

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
