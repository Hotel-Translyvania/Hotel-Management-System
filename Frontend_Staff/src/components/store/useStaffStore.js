import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

export const useStaffStore = create((set, get) => ({
  staffs: [],
  isLoading: false,
  error: null,
  initialized: false,

  fetchStaff: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/hms/hotels/1/staff`)
      const data = response.data?.data;
      console.log("Staff data:", data); // Log the fetched data
      const formattedStaff = data.map((staff) => ({
        id: staff.staffId,
        staffName: staff.staffName,
        email: staff.email,
        phonenumber: staff.phonenumber,
        profilePic: staff.profilePic,
        staffRole: staff.staffRole,
        staffStatus: staff.status,
        employedAt: staff.employedAt,
        staffSalary: staff.staffSalary,
        assignedRoomId: staff.assignedRoomId,
      }));
      set({
        staffs: formattedStaff,
        isLoading: false,
        error: null,
        initialized: true,
      });
    } catch (error) {
      console.error("Error fetching food items:", error);
      set({
        staff: [],
        isLoading: false,
        error: "Failed to fetch food items",
      });
    }
  },

  addStaff: async (staff) => {
    try {
    } catch (error) {}
  },

  deleteStaff: async (id) => {
    try {
    } catch (error) {}
  },
}));
