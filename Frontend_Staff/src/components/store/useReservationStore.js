import { create } from "zustand";
import axios from "axios";
import { api } from "@/lib/api";

export const useReservationStore = create((set, get) => ({
  reservations: [],
  isLoading: false,
  error: null,
  initialized: false,

  fetchReservations: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/hms/hotels/1/reservations/bookings`);
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
      await api.delete(`/hotels/1/bookings/${id}`);
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
      const response = await api.post(
        `/hotels/1/rooms/${selectedRoom.id}/bookings`,
        {
          guestId: selectedGuest.id,
          checkIn: bookingFormData.checkIn,
          checkOut: bookingFormData.checkOut,
        }
      );
      // console.log(response.data, "response data in add reservation");
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

  editReservation: async (id, updatedData) => {
    // localhost:3000/api/v1/hms/hotels/1/reservations/bookings/4b482ea3-8bca-430d-a7a3-f0f8dcb492cd
    try {
      const response = await api.patch(
        `/hms/hotels/1/reservations/bookings/${id}`,
        {
          checkIn: updatedData.checkIn,
          checkOut: updatedData.checkOut,
          bookingStatus: updatedData.status,
          room: {
            id: updatedData?.room?.id,
          },
        }
      );

      set((state) => ({
        reservations: state.reservations.map((reservation) =>
          reservation.bookingId === id
            ? {
                ...reservation,
                checkIn: updatedData.checkIn,
                checkOut: updatedData.checkOut,
                bookingStatus: updatedData.status,
                roomNum: updatedData?.room?.roomNumber || reservation.roomNum,
                roomType: updatedData?.room?.roomType || reservation.roomType,
              }
            : reservation
        ),
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Error updating reservation:", error);
      set({
        isLoading: false,
        error: "Failed to update reservation",
      });
    }
  },
}));
