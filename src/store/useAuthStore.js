// src/store/useAuthStore.js — Zustand auth state. Supports both flows:
// Battle.net OAuth (token from the backend callback) and manual/anonymous.
import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import { TOKEN_KEY } from "../api/client";

export const useAuthStore = create((set) => ({
  user: null,            // { id, displayName, role: "player" | "guild" } | null
  token: null,
  ready: false,          // becomes true after the initial token load
  role: null,            // "player" | "guild" — chosen at onboarding

  hydrate: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      set({ token: token ?? null, ready: true });
    } catch {
      set({ ready: true });
    }
  },

  signInWithToken: async (token, user) => {
    try { await SecureStore.setItemAsync(TOKEN_KEY, token); } catch {}
    set({ token, user, role: user?.role ?? null });
  },

  continueManual: (role) => set({ user: { id: "guest", role }, role }),

  setRole: (role) => set({ role }),

  signOut: async () => {
    try { await SecureStore.deleteItemAsync(TOKEN_KEY); } catch {}
    set({ user: null, token: null, role: null });
  },
}));
