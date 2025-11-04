export const introStore = (set) => ({
  hasSeenIntro: false,

  // ✅ Mark intro as seen
  setHasSeenIntro: (value) => {
    set({ hasSeenIntro: value });
  },
});
