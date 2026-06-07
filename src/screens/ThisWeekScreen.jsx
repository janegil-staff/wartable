// src/screens/ThisWeekScreen.jsx — app-level dashboard: WoW Token + M+ affixes.
import React from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useThisWeek } from "../hooks/useThisWeek";

export default function ThisWeekScreen({ navigation }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const q = useThisWeek("eu");

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <Text style={[styles.h1, { color: theme.text }]}>{t("thisWeek") || "This Week"}</Text>

        {q.isLoading ? <ActivityIndicator color={theme.accent} style={{ marginTop: 24 }} /> : (
          <>
            {/* WoW Token */}
            <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Ionicons name="cash" size={20} color={theme.gold || theme.accent} />
                <Text style={{ color: theme.text, fontWeight: "800", fontSize: 16, flex: 1 }}>{t("wowToken") || "WoW Token"}</Text>
              </View>
              <Text style={{ color: theme.gold || theme.accent, fontSize: 30, fontWeight: "900", marginTop: 8 }}>
                {q.data?.token?.gold ? `${q.data.token.gold.toLocaleString()} g` : "—"}
              </Text>
            </View>

            {/* M+ affixes */}
            <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <Ionicons name="key" size={20} color={theme.accent} />
                <Text style={{ color: theme.text, fontWeight: "800", fontSize: 16 }}>{t("affixes") || "Mythic+ Affixes"}</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {(q.data?.affixes ?? []).map((a) => (
                  <View key={a.id} style={[styles.chip, { borderColor: theme.border, backgroundColor: theme.bg }]}>
                    <Text style={{ color: theme.text, fontSize: 13 }}>{a.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

            <Pressable onPress={() => navigation.navigate("Auctions")}
              style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border, flexDirection: "row", alignItems: "center", gap: 10 }]}>
              <Ionicons name="pricetags" size={20} color={theme.accent} />
              <Text style={{ color: theme.text, fontWeight: "800", fontSize: 16, flex: 1 }}>{t("auctionHouse") || "Auction House"}</Text>
              <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Leaderboards")}
              style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border, flexDirection: "row", alignItems: "center", gap: 10 }]}>
              <Ionicons name="trophy" size={20} color={theme.accent} />
              <Text style={{ color: theme.text, fontWeight: "800", fontSize: 16, flex: 1 }}>{t("leaderboards") || "Leaderboards"}</Text>
              <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
            </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  h1: { fontSize: 26, fontWeight: "900" },
  card: { borderWidth: 1, borderRadius: 16, padding: 18 },
  chip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
});
