import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authActions } from "./authActions";
import { profileActions } from "./profileActions";
import { introStore } from "./introStore";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      ...introStore(set, get),
      ...profileActions(set, get),
      ...authActions(set, get),
    }),
    {
      name: "social-media-storage",
      partialize: (state) => ({
        user: state.user,
        socials: state.socials,
        isAuthenticated: state.isAuthenticated,
        hasSeenIntro: state.hasSeenIntro,
      }),
    }
  )
);
