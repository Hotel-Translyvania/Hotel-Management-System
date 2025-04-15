import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

export const useRoomStore = create((set, get) => ({
  rooms: [],
  isLoading: false,
  error: null,
  initialized: false,

  fetchRooms: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/hotels/1/rooms`);
      const roomsData = response?.data?.rooms?.data;
      set({
        rooms: roomsData,
        isLoading: false,
        initialized: true,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching rooms:", error);
      set({
        rooms: [],
        isLoading: false,
        error: "Failed to load rooms",
      });
    }
  },

  addRoom: async (data) => {
    const amenitiesArray = data.amenities
      .split(",")
      .filter((item) => item.trim() !== "")
      .map((item) => ({ amenityName: item.trim() }));

    const formData = new FormData();
    formData.append("type", data.roomType);
    formData.append("price", String(data.price));
    formData.append("occupancy", String(data.maxOccupancy));
    formData.append("bedType", data.bedType);
    formData.append("description", data.description);
    formData.append("size", String(data.size));
    formData.append("roomNumber", data.roomNumber);
    formData.append("amenities", JSON.stringify(amenitiesArray));
    formData.append("image", data.image);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/hms/hotels/1/rooms`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Room added successfully:", response, data);
      const newImage = response?.data?.image;

      const newRoom = {
        roomNumber: data.roomNumber,
        type: data.roomType,
        price: data.price,
        occupancy: data.maxOccupancy,
        bedType: data.bedType,
        image: newImage,
        description: data.description,
        size: data.size,
        status: data.status.toLowerCase(),
        amenities: amenitiesArray.map((item) => item.amenityName),
      };
      set((state) => ({
        rooms: [...state.rooms, newRoom],
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Error adding room:", error);
      set({ isLoading: false, error: "Failed to add room" });
      throw error;
    }
  },

  editRoom: async (data, roomId) => {
    const amenitiesArray = data.amenities
      .split(",")
      .filter((item) => item.trim() !== "")
      .map((item) => ({ amenityName: item.trim() }));

    const formData = new FormData();
    formData.append("price", String(data.price));
    formData.append("occupancy", String(data.maxOccupancy));
    formData.append("bedType", data.bedType);
    formData.append("description", data.description);
    formData.append("size", String(data.size));
    formData.append("roomNumber", data.roomNumber);
    // console.log(formData.get("type"));

    try {
      // localhost:3000/api/v1/hms/hotels/1/rooms/:roomId
      const response = await axios.patch(
        `${API_BASE_URL}/hms/hotels/1/rooms/${roomId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Room updated successfully:", response, data);

      const updatedRoom = {
        roomNumber: data.roomNumber,
        type: data.roomType,
        price: data.price,
        occupancy: data.maxOccupancy,
        bedType: data.bedType,
        description: data.description,
        size: data.size,
        status: data.status.toLowerCase(),
        amenities: amenitiesArray.map((item) => item.amenityName),
        image: data.picture,
      };
      set((state) => {
        const updatedRooms = state.rooms.map((room) =>
          room.id === roomId ? updatedRoom : room
        );
        return {
          rooms: updatedRooms,
          isLoading: false,
          error: null,
        };
      });
    } catch (error) {
      console.error("Error updating room:", error);
      set({ isLoading: false, error: "Failed to update room" });
      throw error;
    }
  },

  deleteRoom: async (roomId) => {
    try {
      await axios.delete(`${API_BASE_URL}/hms/hotels/1/rooms/${roomId}`);
      set((state) => ({
        rooms: state.rooms.filter((room) => room.id !== roomId),
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Error deleting room:", error);
      set({ isLoading: false, error: "Failed to delete room" });
    }
  },
}));
