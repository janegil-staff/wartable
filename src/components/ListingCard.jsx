// src/components/ListingCard.jsx — renders a guild OR player listing.
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";

const FACTION_COLOR = (theme, f) =>
  f === "alliance" ? theme.alliance : f === "horde" ? theme.horde : theme.textMuted;

export default function ListingCard({ listing, onPress }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isGuild = listing.type === "guild";
  const title = isGuild ? listing.guildName : listing.displayName;
  const subtitle = isGuild
    ? `${listing.realm} · ${listing.region}`
    : `${listing.mainSpec} ${listing.mainClass} · ${listing.ilvl}`;

  const tags = (listing.playstyle ?? []).map((p) => t(p));

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={[styles.dot, { backgroundColor: FACTION_COLOR(theme, listing.faction) }]} />
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>{title}</Text>
        <Text style={[styles.version, { color: theme.textMuted }]}>{t(listing.version)}</Text>
      </View>
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>{subtitle}</Text>
      <Text style={[styles.about, { color: theme.text }]} numberOfLines={2}>{listing.about}</Text>
      <View style={styles.tags}>
        {tags.map((tag) => (
          <View key={tag} style={[styles.tag, { backgroundColor: theme.accentSoft }]}>
            <Text style={[styles.tagText, { color: theme.accent }]}>{tag}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 16, padding: 16, marginBottom: 12, gap: 6 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  title: { flex: 1, fontSize: 17, fontWeight: "700" },
  version: { fontSize: 11, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.5 },
  subtitle: { fontSize: 13, fontWeight: "500" },
  about: { fontSize: 13, lineHeight: 18, marginTop: 2 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 },
  tag: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999 },
  tagText: { fontSize: 11, fontWeight: "700" },
});
