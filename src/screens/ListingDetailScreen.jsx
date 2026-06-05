import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";

export default function ListingDetailScreen({ route }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const listing = route.params?.listing ?? {};
  const isGuild = listing.type === "guild";
  const title = isGuild ? listing.guildName : listing.displayName;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 14 }}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Text style={{ color: theme.textMuted }}>
          {isGuild ? `${listing.realm} · ${listing.region}` : `${listing.mainSpec} ${listing.mainClass}`}
        </Text>
        <Text style={{ color: theme.text, lineHeight: 20 }}>{listing.about}</Text>

        <Pressable style={[styles.cta, { backgroundColor: theme.accent }]}>
          <Text style={{ color: theme.accentText, fontWeight: "800" }}>
            {isGuild ? t("apply") : t("interested")}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1 },
  title: { fontSize: 28, fontWeight: "800" },
  cta: { marginTop: 10, paddingVertical: 15, borderRadius: 14, alignItems: "center" },
});
