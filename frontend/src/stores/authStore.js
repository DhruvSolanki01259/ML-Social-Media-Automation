import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;

axios.defaults.withCredentials = true;

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // ✅ SIGNUP
      signup: async (username, email, password, gender) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axios.post(`${API_URL}/signup`, {
            username,
            email,
            password,
            gender,
          });

          set({
            user: res.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (err) {
          set({
            user: null,
            isAuthenticated: false,
            error: err.response?.data?.message || "Error signing up",
            isLoading: false,
          });
          localStorage.removeItem("social-media-storage"); // clear persisted data
        }
      },

      // ✅ LOGIN inside authStore
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axios.post(`${API_URL}/login`, { email, password });
          set({
            user: res.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return true; // ✅ success
        } catch (err) {
          set({
            user: null,
            isAuthenticated: false,
            error: err.response?.data?.message || "Error logging in",
            isLoading: false,
          });
          localStorage.removeItem("social-media-storage");
          return false; // ❌ failure
        }
      },

      // ✅ LOGOUT
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await axios.post(`${API_URL}/logout`);
        } catch (err) {
          console.error("Logout request failed:", err);
        } finally {
          // Clear state & storage regardless of backend response
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          localStorage.removeItem("social-media-storage");
        }
      },

      // ✅ VALIDATE EXISTING SESSION (run on app start)
      validateSession: async () => {
        try {
          const res = await axios.get(`${API_URL}/me`); // endpoint to verify current user
          if (res.data?.user) {
            set({ user: res.data.user, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false });
            localStorage.removeItem("social-media-storage");
          }
        } catch {
          set({ user: null, isAuthenticated: false });
          localStorage.removeItem("social-media-storage");
        }
      },

      // ✅ CLEAR ERROR MANUALLY
      clearError: () => set({ error: null }),
    }),
    {
      name: "social-media-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
