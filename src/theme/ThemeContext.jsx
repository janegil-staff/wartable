// src/theme/ThemeContext.jsx
// Light/dark theme provider. Defaults to the device color scheme, lets the
// user override, and persists the choice with expo-secure-store. Read the
// active palette anywhere via useTheme().
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";
import { THEMES } from "./themes";

const KEY = "wartable_theme"; // "light" | "dark" | "system"
const ThemeCtx = createContext({
  theme: THEMES.light,
  mode: "system",
  setMode: () => {},
  toggle: () => {},
});

export function ThemeProvider({ children }) {
  const system = useColorScheme() ?? "light";
  const [mode, setModeState] = useState("system"); // user preference

  useEffect(() => {
    (async () => {
      try {
        const saved = await SecureStore.getItemAsync(KEY);
        if (saved === "light" || saved === "dark" || saved === "system") {
          setModeState(saved);
        }
      } catch {}
    })();
  }, []);

  const setMode = async (next) => {
    setModeState(next);
    try {
      await SecureStore.setItemAsync(KEY, next);
    } catch {}
  };

  const effective = mode === "system" ? system : mode;
  const theme = THEMES[effective] ?? THEMES.light;

  const toggle = () => setMode(effective === "dark" ? "light" : "dark");

  return (
    <ThemeCtx.Provider value={{ theme, mode, setMode, toggle }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
