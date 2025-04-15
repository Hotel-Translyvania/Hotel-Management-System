import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

export const useReservationStore = create((set, get) => ({
  reservations: [],
  isLoading: false,
  error: null,
  initialized: false,

  fetchReservations: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_BASE_URL}/hms/hotels/1/reservations/bookings`
      );
      const data = response.data?.data;
      const formatted = data.map((reservation) => ({
        bookingId: reservation.bookingId,
        guestId: reservation.guestId,
        guestFirstName: reservation.guestFirstName,
        guestLastName: reservation.guestLastName,
        roomNum: reservation.roomNum,
        roomType: reservation.roomType,
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
        bookingStatus: reservation.bookingStatus,
        createdAt: reservation.createdAt,
      }));

      set({
        reservations: formatted,
        initialized: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching reservations:", error);
      set({
        reservations: [],
        isLoading: false,
        error: "Failed to load reservations",
      });
    }
  },

  deleteReservation: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/hotels/1/bookings/${id}`);
      set((state) => ({
        reservations: state.reservations.filter(
          (reservation) => reservation.bookingId !== id
        ),
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Error deleting reservation:", error);
      set({
        isLoading: false,
        error: "Failed to delete reservation",
      });
    }
  },

  addReservation: async (selectedGuest, selectedRoom, bookingFormData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/hotels/1/rooms/${selectedRoom.id}/bookings`,
        {
          guestId: selectedGuest.id,
          checkIn: bookingFormData.checkIn,
          checkOut: bookingFormData.checkOut,
        }
      );
      console.log(response.data, "response data in add reservation");
      const newReservation = {
        bookingId: response.data.bookingId,
        guestId: selectedGuest.id,
        guestFirstName: selectedGuest.firstName,
        guestLastName: selectedGuest.lastName,
        roomNum: selectedRoom.roomNumber,
        roomType: selectedRoom.roomType,
        checkIn: bookingFormData.checkIn,
        checkOut: bookingFormData.checkOut,
        bookingStatus: "confirmed",
        createdAt: new Date().toISOString(),
      };
      set((state) => ({
        reservations: [...state.reservations, newReservation],
        isLoading: false,
        error: null,
      }));
      console.log(newReservation, "new reservation");
    } catch (error) {
      console.error("Error adding reservation:", error);
      set({
        isLoading: false,
        error: "Failed to add reservation",
      });
    }
  },
}));
