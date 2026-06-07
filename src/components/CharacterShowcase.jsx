// src/components/CharacterShowcase.jsx — visual showcase.
// Hero: full character render as backdrop, class-colored name, ilvl badge.
// Below: gear grid with real item icons, Mythic+, raid progress.
import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { classColor, factionTheme } from "../theme/wow";
import FactionEmblem from "./FactionEmblem";

const QUALITY_COLOR = {
  POOR: "#9d9d9d", COMMON: "#ffffff", UNCOMMON: "#1eff00",
  RARE: "#0070dd", EPIC: "#a335ee", LEGENDARY: "#ff8000", ARTIFACT: "#e6cc80",
};
const { width } = Dimensions.get("window");

export default function CharacterShowcase({ c }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  if (!c) return null;
  const fac = factionTheme(c.faction);
  const cc = classColor(c.class);

  return (
    <View style={{ gap: 16 }}>
      {/* HERO with character render */}
      <View style={[styles.hero, { borderColor: fac.glow, shadowColor: cc }]}>
        {c.render ? (
          <Image source={{ uri: c.render }} style={styles.render} resizeMode="cover" />
        ) : (
          <View style={[styles.render, { backgroundColor: fac.soft }]} />
        )}
        {/* gradient-ish scrim via stacked translucent layers */}
        <View style={styles.scrim} />
        <View style={styles.heroContent}>
          <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 12 }}>
            {c.avatar ? (
              <Image source={{ uri: c.avatar }} style={[styles.avatar, { borderColor: cc }]} />
            ) : (
              <FactionEmblem faction={c.faction} size={56} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: cc }]} numberOfLines={1}>{c.name}</Text>
              <Text style={styles.sub} numberOfLines={1}>
                {[c.spec, c.class, c.race].filter(Boolean).join(" · ")}
              </Text>
              {c.guild?.name ? (
                <Text style={styles.guild} numberOfLines={1}>{"<"}{c.guild.name}{">"}</Text>
              ) : null}
            </View>
            {c.ilvl ? (
              <View style={[styles.ilvl, { borderColor: cc }]}>
                <Text style={{ color: "#fff", fontWeight: "900", fontSize: 20 }}>{c.ilvl}</Text>
                <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, fontWeight: "700" }}>
                  {t("itemLevel").toUpperCase()}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>

      {/* quick stats */}
      <View style={[styles.statsStrip, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <Stat theme={theme} label={t("level")} value={c.level} />
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <Stat theme={theme} label={t("rating")} value={c.mythicPlus?.currentRating ?? "—"} />
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <Stat theme={theme} label={t("achievements")} value={c.achievementPoints ?? "—"} />
      </View>

      {/* GEAR grid with icons */}
      <Section theme={theme} icon="shield-half" title={t("gear")}>
        <View style={styles.gearGrid}>
          {(c.equipment ?? []).map((it, i) => (
            <View key={i} style={[styles.gearCell, { borderColor: QUALITY_COLOR[it.quality] ?? theme.border, backgroundColor: theme.bg }]}>
              {it.icon ? (
                <Image source={{ uri: it.icon }} style={styles.gearIcon} />
              ) : (
                <View style={[styles.gearIcon, { backgroundColor: theme.surfaceAlt }]} />
              )}
              {it.ilvl ? (
                <View style={styles.gearIlvl}>
                  <Text style={styles.gearIlvlText}>{it.ilvl}</Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </Section>

      {/* MYTHIC+ */}
      <Section theme={theme} icon="key" title={t("mythicPlus")}>
        {c.mythicPlus?.bestRuns?.length ? (
          c.mythicPlus.bestRuns.map((r, i) => (
            <View key={i} style={[styles.row, { borderBottomColor: theme.border }]}>
              <Text style={{ color: theme.text, flex: 1, fontWeight: "600" }} numberOfLines={1}>{r.dungeon}</Text>
              <Text style={{ color: r.completed ? theme.success : theme.textMuted, fontWeight: "800" }}>+{r.level}</Text>
            </View>
          ))
        ) : (
          <Text style={{ color: theme.textMuted }}>{t("noRuns")}</Text>
        )}
      </Section>

      {/* RAIDS */}
      {c.raids?.length ? (
        <Section theme={theme} icon="skull" title={t("raids")}>
          {c.raids.map((raid, i) => (
            <View key={i} style={{ paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: theme.border }}>
              <Text style={{ color: theme.text, fontWeight: "700" }}>{raid.name}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 4 }}>
                {(raid.modes ?? []).map((m, j) => (
                  <Text key={j} style={{ color: theme.textMuted, fontSize: 12 }}>
                    {m.difficulty}: {m.completed}/{m.total}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </Section>
      ) : null}
    </View>
  );
}

function Stat({ theme, label, value }) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ color: theme.text, fontWeight: "900", fontSize: 16 }}>{value ?? "—"}</Text>
      <Text style={{ color: theme.textMuted, fontSize: 10, fontWeight: "700", textTransform: "uppercase" }}>{label}</Text>
    </View>
  );
}
function Section({ theme, icon, title, children }) {
  return (
    <View style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Ionicons name={icon} size={16} color={theme.accent} />
        <Text style={{ color: theme.text, fontWeight: "800", fontSize: 15 }}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 380, borderRadius: 20, borderWidth: 1, overflow: "hidden", justifyContent: "flex-end",
    shadowOpacity: 0.5, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 8,
  },
  render: { ...StyleSheet.absoluteFillObject, width: "100%", height: "100%" },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  heroContent: { padding: 16, backgroundColor: "rgba(0,0,0,0.55)" },
  avatar: { width: 56, height: 56, borderRadius: 12, borderWidth: 2 },
  name: { fontSize: 26, fontWeight: "900", textShadowColor: "rgba(0,0,0,0.8)", textShadowRadius: 6 },
  sub: { color: "rgba(255,255,255,0.85)", fontWeight: "600", textShadowColor: "rgba(0,0,0,0.8)", textShadowRadius: 4 },
  guild: { color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 },
  ilvl: { borderWidth: 2, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6, alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)" },
  statsStrip: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 16, paddingVertical: 14 },
  divider: { width: 1, height: 28 },
  section: { borderWidth: 1, borderRadius: 16, padding: 16 },
  row: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 8, borderBottomWidth: 1 },
  gearGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  gearCell: { width: (width - 32 - 16 - 5 * 8) / 6, aspectRatio: 1, borderWidth: 2, borderRadius: 8, overflow: "hidden", justifyContent: "flex-end" },
  gearIcon: { ...StyleSheet.absoluteFillObject, width: "100%", height: "100%" },
  gearIlvl: { backgroundColor: "rgba(0,0,0,0.7)", paddingHorizontal: 2 },
  gearIlvlText: { color: "#fff", fontSize: 9, fontWeight: "800", textAlign: "center" },
});
