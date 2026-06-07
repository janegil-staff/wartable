// src/theme/themes.js — light + dark token sets. Dark is the "hero" theme:
// sleek modern game UI — near-black glass, neon accents, glow.
const shared = {
  alliance: "#1f6fd6",
  horde: "#c8302b",
  gold: "#e8c46a",
  radius: { sm: 8, md: 12, lg: 16, pill: 999 },
  space: (n) => n * 4,
  font: { display: undefined, body: undefined },
};

export const lightTheme = {
  ...shared,
  mode: "light",
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
};

export const darkTheme = {
  ...shared,
  mode: "dark",
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
};

export const THEMES = { light: lightTheme, dark: darkTheme };
