import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";
axios.defaults.withCredentials = true;

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      isCheckingAuth: true,
      message: null,
      lastAuthCheck: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post(
            `${API_BASE_URL}/auth/staff/login`,
            {
              email,
              password,
            }
          );
          set({
            user: response.data.user,
            role: response.data.user.role,
            isAuthenticated: true,
            loading: false,
            isCheckingAuth: false,
            lastAuthCheck: Date.now(),
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Login failed",
            loading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await axios.post(`${API_BASE_URL}/auth/staff/logout`);
          set({
            user: null,
            role: null,
            isAuthenticated: false,
            loading: false,
            lastAuthCheck: null,
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Logout failed",
            loading: false,
          });
          throw error;
        }
      },

      initializeAuth: async () => {
        set({ loading: true, isCheckingAuth: true, error: null });
        try {
          const res = await axios.get(`${API_BASE_URL}/auth/staff/checkAuth`);
          set({
            user: res.data?.user,
            role: res.data?.user?.role,
            isAuthenticated: true,
            loading: false,
            isCheckingAuth: false,
            lastAuthCheck: Date.now(),
          });
        } catch (error) {
          set({
            isAuthenticated: false,
            loading: false,
            isCheckingAuth: false,
            error: error.response?.data?.message,
            lastAuthCheck: Date.now(),
          });
        }
      },

      hasRole: (requiredRole) => {
        const { role } = get();
        if (!role) return false;
        return Array.isArray(requiredRole)
          ? requiredRole.includes(role)
          : role === requiredRole;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        lastAuthCheck: state.lastAuthCheck,
      }),
    }
  )
);
