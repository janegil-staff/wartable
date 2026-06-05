// src/screens/BrowseScreen.jsx — players see guilds; guilds see players.
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";
import { SAMPLE_GUILDS, SAMPLE_PLAYERS } from "../data/sampleListings";
import ListingCard from "../components/ListingCard";

export default function BrowseScreen({ navigation }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const role = useAuthStore((s) => s.role);

  // Players browse guilds; guilds browse players.
  const showingGuilds = role !== "guild";
  const data = showingGuilds ? SAMPLE_GUILDS : SAMPLE_PLAYERS;
  const heading = showingGuilds ? t("browseGuilds") : t("browsePlayers");

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <View style={styles.header}>
        <Text style={[styles.h1, { color: theme.text }]}>{heading}</Text>
        <Text style={[styles.filterLink, { color: theme.accent }]}>{t("filters")}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        renderItem={({ item }) => (
          <ListingCard
            listing={item}
            onPress={() => navigation.navigate("ListingDetail", { listing: item })}
          />
        )}
        ListEmptyComponent={
          <Text style={{ color: theme.textMuted, textAlign: "center", marginTop: 40 }}>
            {t("noData")}
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", paddingHorizontal: 16, paddingTop: 8 },
  h1: { fontSize: 26, fontWeight: "800" },
  filterLink: { fontSize: 14, fontWeight: "700" },
});
