// src/theme/themes.js
//
// Light + dark token sets. React Native has no CSS variables, so themes are
// plain objects consumed via the ThemeProvider / useTheme() hook. Every screen
// and component reads colors from the active theme — never hard-coded hex.
//
// WoW-flavoured but restrained: deep slate/parchment base, a gold accent
// (Alliance-neutral), faction spark colors available when needed.

const shared = {
  // Faction + class accents available regardless of light/dark.
  alliance: "#3f7fb0",
  horde: "#b03a2e",
  gold: "#c8a24a",
  radius: { sm: 8, md: 12, lg: 16, pill: 999 },
  space: (n) => n * 4, // 4-pt spacing scale: space(2) = 8
  font: {
    // System fonts by default; swap to a display face later if desired.
    display: undefined,
    body: undefined,
  },
};

export const lightTheme = {
  ...shared,
  mode: "light",
  bg: "#f4efe4",
  surface: "#ffffff",
  surfaceAlt: "#ece4d3",
  text: "#23282b",
  textMuted: "#6f7a72",
  border: "rgba(35,40,43,0.12)",
  accent: "#1f7a73",
  accentText: "#ffffff",
  accentSoft: "rgba(31,122,115,0.12)",
  danger: "#c0392b",
  success: "#3e8e5a",
  warning: "#c8870f",
  shadow: "rgba(0,0,0,0.12)",
};

export const darkTheme = {
  ...shared,
  mode: "dark",
  bg: "#14181a",
  surface: "#1d2326",
  surfaceAlt: "#232a2d",
  text: "#ece6da",
  textMuted: "#93a098",
  border: "rgba(236,230,218,0.14)",
  accent: "#41b8ad",
  accentText: "#08110f",
  accentSoft: "rgba(65,184,173,0.16)",
  danger: "#e06a5c",
  success: "#5cba85",
  warning: "#e0b04a",
  shadow: "rgba(0,0,0,0.5)",
};

export const THEMES = { light: lightTheme, dark: darkTheme };
