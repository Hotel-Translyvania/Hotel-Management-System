import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

export const useGuestStore = create((set, get) => ({
  guests: [],
  isLoading: false,
  error: null,
  initialized: false,

  fetchGuests: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/hotels/1/guests`);
      const data = response.data?.data;
      const formatted = data.map((guest) => ({
        id: guest.id,
        firstName: guest.firstName,
        lastName: guest.lastName,
        gender: guest.gender,
        email: guest.email,
        phone: guest.phone,
        address: guest.address,
        nationality: guest.nationality,
        idType: guest.identificationType,
        idNumber: guest.idNumber,
      }));

      set({
        guests: formatted,
        initialized: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching guests:", error);
      set({
        guests: [],
        isLoading: false,
        error: "Failed to load guests",
      });
    }
  },

  deleteGuest: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/hotels/1/guest/${id}`);
      set((state) => ({
        guests: state.guests.filter((guest) => guest.id !== id),
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Error deleting guest:", error);
      set({
        isLoading: false,
        error: "Failed to delete guest",
      });
    }
  },

  addGuest: async (guestFormData, selectedRoom, bookingFormData) => {
    try {
      const guestData = {
        firstName: guestFormData.firstName,
        lastName: guestFormData.lastName,
        dateOfBirth: guestFormData.dob,
        email: guestFormData.email || "",
        address: guestFormData.address,
        gender: guestFormData.gender,
        phone: guestFormData.phone,
        nationality: guestFormData.nationality,
        identificationType: guestFormData.idType,
        identificationNumber: guestFormData.idNumber,
      };

      const createGuestResponse = await axios.post(
        `${API_BASE_URL}/hotels/1/guest`,
        guestData
      );

      const guestId = createGuestResponse.data.guestId;
      const response = await axios.post(
        `${API_BASE_URL}/hotels/1/rooms/${selectedRoom.id}/bookings`,
        {
          guestId: guestId,
          checkIn: bookingFormData.checkIn,
          checkOut: bookingFormData.checkOut,
        }
      );

      const newGuestData = {
        id: guestId,
        firstName: guestFormData.firstName,
        lastName: guestFormData.lastName,
        gender: guestFormData.gender,
        email: guestFormData.email,
        phone: guestFormData.phone,
        address: guestFormData.address,
        nationality: guestFormData.nationality,
        idType: guestFormData.idType,
        idNumber: guestFormData.idNumber,
      };

      const updatedGuestData = {
        ...newGuestData,
      };

      set((state) => ({
        guests: [...state.guests, updatedGuestData],
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Error booking room:", error);
    }
  },

  editGuest: async (data, id) => {
    try {
      const guestData = {
        firstName: data.fname,
        lastName: data.lname,
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        nationality: data.nationality,
        identificationType: data.idType,
        idNumber: data.idNumber,
      };
      console.log("Guest Data:", guestData);

      const response = await axios.patch(
        `${API_BASE_URL}/hotels/1/guest/${id}`,
        guestData
      );

      set((state) => ({
        guests: state.guests.map((guest) =>
          guest.id === id ? { ...guest, ...guestData } : guest
        ),
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Error updating guest:", error);
      set({
        isLoading: false,
        error: "Failed to update guest",
      });
    }
  },
}));
