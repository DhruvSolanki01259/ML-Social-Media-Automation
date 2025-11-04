import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;

export const profileActions = (set, get) => ({
  socials: {
    linkedin: "",
    instagram: "",
    facebook: "",
    twitter: "",
  },

  // ✅ UPDATE LOCAL SOCIAL LINKS
  setSocials: (field, value) => {
    set((state) => ({
      socials: { ...state.socials, [field]: value },
      user: {
        ...state.user,
        socials: { ...state.user?.socials, [field]: value },
      },
    }));
  },

  // ✅ SAVE / UPDATE USER INFO LOCALLY
  updateUser: (updatedData) => {
    set((state) => ({
      user: {
        ...state.user,
        ...updatedData,
      },
    }));
  },

  // ✅ DELETE USER FIELD LOCALLY
  deleteUserField: (field) => {
    set((state) => ({
      user: {
        ...state.user,
        [field]: "",
      },
    }));
  },

  // ✅ RESET PROFILE LOCALLY
  resetProfile: () => {
    set({
      user: null,
      socials: {
        linkedin: "",
        instagram: "",
        facebook: "",
        twitter: "",
      },
      isAuthenticated: false,
    });
  },

  // ✅ SYNC PROFILE WITH BACKEND
  saveProfileToBackend: async () => {
    const { user } = get();
    if (!user?._id) return;

    try {
      await axios.put(`${API_URL}/update-profile/${user._id}`, user, {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Failed to sync profile:", err);
    }
  },

  // ✅ UPDATE SOCIAL LINKS IN BACKEND + STORE
  updateSocialsInBackend: async (updatedSocials) => {
    const { user } = get();
    if (!user?._id) {
      console.error("No user ID found. Cannot update socials.");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/update-socials/${user._id}`,
        { socials: updatedSocials },
        { withCredentials: true }
      );

      // ✅ Update store after successful backend sync
      set((state) => ({
        socials: response.data.socials,
        user: {
          ...state.user,
          socials: response.data.socials,
        },
      }));

      console.log("Socials updated successfully in backend.");
    } catch (err) {
      console.error("Failed to update socials:", err.response?.data || err);
    }
  },
});
