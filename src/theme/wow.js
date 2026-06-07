// src/theme/wow.js — WoW game data for theming (colors are data, not Blizzard art).
//
// Official class colors (hex values are publicly documented game data).
// Used to tint cards, text, glows by a character's class.
export const CLASS_COLORS = {
  "Death Knight": "#C41E3A",
  "Demon Hunter": "#A330C9",
  Druid: "#FF7C0A",
  Evoker: "#33937F",
  Hunter: "#AAD372",
  Mage: "#3FC7EB",
  Monk: "#00FF98",
  Paladin: "#F48CBA",
  Priest: "#FFFFFF",
  Rogue: "#FFF468",
  Shaman: "#0070DD",
  Warlock: "#8788EE",
  Warrior: "#C69B6D",
};

export const classColor = (name) => CLASS_COLORS[name] ?? "#9aa7b0";

// Faction theming — evocative blues/reds, not Blizzard's exact crest art.
export const FACTION = {
  alliance: {
    primary: "#1f6fd6",
    glow: "rgba(31,111,214,0.45)",
    soft: "rgba(31,111,214,0.14)",
    label: "Alliance",
  },
  horde: {
    primary: "#c8302b",
    glow: "rgba(200,48,43,0.45)",
    soft: "rgba(200,48,43,0.14)",
    label: "Horde",
  },
  any: {
    primary: "#c8a24a",
    glow: "rgba(200,162,74,0.35)",
    soft: "rgba(200,162,74,0.12)",
    label: "Any",
  },
};

export const factionTheme = (f) => FACTION[f] ?? FACTION.any;

// Role/playstyle glyphs (ionicons names) for quick visual scanning.
export const PLAYSTYLE_ICON = {
  raiding: "skull",
  mythicPlus: "key",
  pvp: "flash",
  casual: "cafe",
  social: "people",
};
