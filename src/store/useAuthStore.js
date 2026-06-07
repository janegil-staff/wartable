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
      set({ token: token ?? null });
      if (token) {
        try {
          const { default: client } = await import("../api/client");
          const { data } = await client.get("/auth/me");
          if (data) set({ user: data, role: data.role ?? null });
        } catch {}
      }
    } catch {}
    set({ ready: true });
  },

  signInWithToken: async (token, user) => {
    try { await SecureStore.setItemAsync(TOKEN_KEY, token); } catch {}
    set({ token, user, role: user?.role ?? null });
    // Best-effort: pull the real account (battletag, characters) from /auth/me.
    try {
      const { default: client } = await import("../api/client");
      const { data } = await client.get("/auth/me");
      if (data) set({ user: data, role: data.role ?? user?.role ?? null });
    } catch {}
  },

  // Guest / manual: hit the backend /auth/manual to get a REAL token so
  // auth-protected actions (sharing, etc.) work. Falls back to a local-only
  // guest if the backend is unreachable (browse still works; sharing won't).
  continueManual: async (role) => {
    try {
      const { default: client } = await import("../api/client");
      const { data } = await client.post("/auth/manual", { displayName: "Guest" });
      if (data?.token) {
        try { await SecureStore.setItemAsync(TOKEN_KEY, data.token); } catch {}
        set({ token: data.token, user: { id: data.user?.id ?? "guest", role, characters: [] }, role });
        return;
      }
    } catch {}
    // offline / backend down — local guest only
    set({ user: { id: "guest", role, characters: [] }, role });
  },

  setRole: (role) => set({ role }),

  signOut: async () => {
    try { await SecureStore.deleteItemAsync(TOKEN_KEY); } catch {}
    set({ user: null, token: null, role: null });
  },

  // Permanently delete the account on the backend, then sign out locally.
  deleteAccount: async () => {
    try {
      const { default: client } = await import("../api/client");
      await client.delete("/auth/me");
    } catch {}
    try { await SecureStore.deleteItemAsync(TOKEN_KEY); } catch {}
    set({ user: null, token: null, role: null });
  },
}));
