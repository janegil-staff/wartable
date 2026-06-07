// src/components/FactionEmblem.jsx — original SVG emblems (not Blizzard art).
// Alliance = upward chevron/wings motif; Horde = angular spike motif; Any = rune.
// Uses react-native-svg.
import React from "react";
import Svg, { Path, Circle, G } from "react-native-svg";
import { factionTheme } from "../theme/wow";

export default function FactionEmblem({ faction = "any", size = 22 }) {
  const c = factionTheme(faction).primary;

  if (faction === "alliance") {
    // Stylised wings/anchor chevron.
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <G stroke={c} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M12 3 L12 21" />
          <Path d="M5 9 C8 7 10 7 12 10 C14 7 16 7 19 9" />
          <Path d="M6 14 L12 11 L18 14" />
        </G>
      </Svg>
    );
  }

  if (faction === "horde") {
    // Angular spiked emblem.
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <G stroke={c} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M12 2 L15 8 L22 9 L17 14 L18 21 L12 18 L6 21 L7 14 L2 9 L9 8 Z" />
        </G>
      </Svg>
    );
  }

  // Any → neutral rune circle.
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="9" stroke={c} strokeWidth={2} fill="none" />
      <Path d="M12 6 L12 18 M8 9 L16 15 M16 9 L8 15" stroke={c} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}
