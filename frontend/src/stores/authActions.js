import axios from "axios";
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;

axios.defaults.withCredentials = true;

export const authActions = (set, get) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // 🔹 SIGNUP
  signup: async (username, email, password, gender) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
        gender,
      });
      set({
        user: response.data.user,
        socials: response.data.user?.socials || get().socials,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
    }
  },

  // 🔹 LOGIN
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        socials: response.data.user?.socials || get().socials,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
    }
  },

  // 🔹 LOGOUT
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        socials: {
          linkedin: "",
          instagram: "",
          facebook: "",
          twitter: "",
        },
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: "Error logging out",
        isLoading: false,
      });
    }
  },
});
