import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
  updateUser: (updates) =>
    set((state) => ({ user: { ...state.user, ...updates } })),
}));

export default useUserStore;
