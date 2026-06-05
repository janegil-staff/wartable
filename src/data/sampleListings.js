// src/data/sampleListings.js
// Shapes + mock data for the two-sided model. Replace with API calls later;
// the field names here are the contract your backend should mirror.
//
// GuildListing — what a guild posts (browsed by players):
//   { id, type:"guild", guildName, realm, region, faction, version,
//     playstyle:[...], raidDays:[...], timezone, about, classNeeds:[...] }
//
// PlayerListing — what a player posts (browsed by guilds):
//   { id, type:"player", displayName, mainClass, mainSpec, ilvl, region,
//     faction, version, playstyle:[...], availability:[...], about }
//
// Enums:
//   region:   "EU" | "NA" | "OCE" | "any"
//   faction:  "alliance" | "horde" | "any"
//   version:  "retail" | "classic" | "any"
//   playstyle: "raiding" | "mythicPlus" | "pvp" | "casual" | "social"

export const SAMPLE_GUILDS = [
  {
    id: "g1", type: "guild",
    guildName: "The Norwegian Vikings", realm: "Silvermoon", region: "EU",
    faction: "alliance", version: "retail",
    playstyle: ["raiding", "social"],
    raidDays: ["Wed", "Sun"], timezone: "CET",
    about: "Semi-hardcore AOTC guild with a relaxed social core.",
    classNeeds: ["Healer", "Ranged DPS"],
  },
  {
    id: "g2", type: "guild",
    guildName: "Midnight Pull", realm: "Draenor", region: "EU",
    faction: "horde", version: "retail",
    playstyle: ["mythicPlus", "pvp"],
    raidDays: ["Tue", "Thu"], timezone: "CET",
    about: "Push-focused M+ and rated PvP community.",
    classNeeds: ["Tank", "Melee DPS"],
  },
];

export const SAMPLE_PLAYERS = [
  {
    id: "p1", type: "player",
    displayName: "Aelthas", mainClass: "Priest", mainSpec: "Holy",
    ilvl: 489, region: "EU", faction: "alliance", version: "retail",
    playstyle: ["raiding"], availability: ["Wed", "Sun"],
    about: "Returning healer, 6/8 M experience, looking for a stable team.",
  },
  {
    id: "p2", type: "player",
    displayName: "Grimfang", mainClass: "Warrior", mainSpec: "Protection",
    ilvl: 476, region: "EU", faction: "horde", version: "classic",
    playstyle: ["mythicPlus", "casual"], availability: ["weekends"],
    about: "Chill tank, weekends only, keys up to +18.",
  },
];
