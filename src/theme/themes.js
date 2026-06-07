<<<<<<< HEAD
// src/theme/themes.js — light + dark token sets. Dark is the "hero" theme:
// sleek modern game UI — near-black glass, neon accents, glow.
const shared = {
  alliance: "#1f6fd6",
  horde: "#c8302b",
  gold: "#e8c46a",
  radius: { sm: 8, md: 12, lg: 16, pill: 999 },
  space: (n) => n * 4,
  font: { display: undefined, body: undefined },
=======
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
>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076
};

export const lightTheme = {
  ...shared,
  mode: "light",
<<<<<<< HEAD
  bg: "#eef1f4",
  bgElev: "#ffffff",
  surface: "#ffffff",
  surfaceAlt: "#e7ebef",
  glass: "rgba(255,255,255,0.7)",
  text: "#161b22",
  textMuted: "#5b6770",
  border: "rgba(22,27,34,0.12)",
  accent: "#0aa6b8",
  accentText: "#ffffff",
  accentSoft: "rgba(10,166,184,0.12)",
  glow: "rgba(10,166,184,0.0)", // no glow in light
  danger: "#d23b3b",
  success: "#2fa564",
  warning: "#c8870f",
  shadow: "rgba(0,0,0,0.14)",
=======
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
>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076
};

export const darkTheme = {
  ...shared,
  mode: "dark",
<<<<<<< HEAD
  bg: "#070b10",          // near-black, slight blue
  bgElev: "#0d141c",
  surface: "#111a24",     // glassy panel
  surfaceAlt: "#16212d",
  glass: "rgba(17,26,36,0.72)",
  text: "#eaf2f8",
  textMuted: "#7e94a6",
  border: "rgba(120,180,220,0.16)",
  accent: "#2ee6d6",      // neon teal
  accentText: "#04161a",
  accentSoft: "rgba(46,230,214,0.14)",
  glow: "rgba(46,230,214,0.55)",
  danger: "#ff5d5d",
  success: "#46d98a",
  warning: "#ffce4a",
  shadow: "rgba(0,0,0,0.6)",
=======
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
>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076
};

export const THEMES = { light: lightTheme, dark: darkTheme };
