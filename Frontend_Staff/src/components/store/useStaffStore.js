import { create } from "zustand";
import axios from "axios";
import { api } from "@/lib/api";

export const useStaffStore = create((set, get) => ({
  staffs: [],
  isLoading: false,
  error: null,
  initialized: false,

  fetchStaff: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/hms/hotels/1/staff`);
      const data = response.data?.data;
      console.log("Staff data:", data); // Log the fetched data
      const formattedStaff = data.map((staff) => ({
        id: staff.staffId,
        staffName: staff.staffName,
        email: staff.email,
        phonenumber: staff.phonenumber,
        profilePic: staff.profilePic,
        staffRole: staff.staffRole,
        staffPosition: staff.staffPosition,
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

  editStaff: async (id, staff) => {
    try {
      const staffFormattedData = {
        email: staff.email,
        phonenumber: staff.phone,
        salary: staff.salary,
        position: staff.position,
        employedAt: staff.employed_at,
        status: staff.status,
        firstname: staff.fname,
        lastname: staff.lname,
      };
      console.log(staffFormattedData);
      const response = await api.patch(
        `/hms/hotels/1/staff/update/${id}`,
        staffFormattedData
      );
    } catch (error) {
      console.error("Error fetching food items:", error);
      set({
        staff: [],
        isLoading: false,
        error: "Failed to fetch food items",
      });
      throw error;
    }
  },

  deleteStaff: async (id) => {
    try {
    } catch (error) {}
  },

  assignStaff: async (staffData, staff_id) => {
    try {
      const staffFormattedData = {
        roomNumber: staffData.roomId,
        task: staffData.serviceType,
        description: staffData.description,
        startTime: staffData.startTime,
        endTime: staffData.endTime,
      };
      console.log(staffFormattedData);
      const response = await api.patch(
        `/hms/hotels/1/staff/${staff_id}`,
        staffFormattedData
      );
      const data = response.data;
      alert(data.message);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  },
}));
