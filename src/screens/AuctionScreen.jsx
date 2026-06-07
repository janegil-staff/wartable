// src/screens/AuctionScreen.jsx — browse auction house for a connected realm.
// v1: enter a connected-realm id + optional item id, paged list of listings.
import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useAuctions } from "../hooks/useGameData";

// gold/silver/copper formatting (Blizzard prices are in copper)
function money(copper) {
  if (copper == null) return "—";
  const g = Math.floor(copper / 10000);
  const s = Math.floor((copper % 10000) / 100);
  return `${g.toLocaleString()}g ${s}s`;
}

export default function AuctionScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [crId, setCrId] = useState("");
  const [itemId, setItemId] = useState("");
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(null); // {crId, itemId}

  const q = useAuctions({
    region: "eu",
    crId: active?.crId,
    itemId: active?.itemId || undefined,
    page,
    enabled: !!active?.crId,
  });

  const search = () => { setPage(1); setActive({ crId: crId.trim(), itemId: itemId.trim() }); };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <View style={{ padding: 16, gap: 10 }}>
        <Text style={[styles.h1, { color: theme.text }]}>{t("auctionHouse") || "Auction House"}</Text>
        <TextInput value={crId} onChangeText={setCrId} placeholder={t("realmId") || "Connected realm id (e.g. 1305)"}
          placeholderTextColor={theme.textMuted} keyboardType="number-pad"
          style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]} />
        <TextInput value={itemId} onChangeText={setItemId} placeholder={t("itemIdOpt") || "Item id (optional filter)"}
          placeholderTextColor={theme.textMuted} keyboardType="number-pad"
          style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]} />
        <Pressable onPress={search} style={[styles.btn, { backgroundColor: theme.accent }]}>
          <Ionicons name="search" size={16} color={theme.accentText} />
          <Text style={{ color: theme.accentText, fontWeight: "800" }}>{t("search") || "Search"}</Text>
        </Pressable>
      </View>

      {q.isLoading ? (
        <View style={styles.center}><ActivityIndicator color={theme.accent} /></View>
      ) : active?.crId ? (
        <FlatList
          data={q.data?.auctions ?? []}
          keyExtractor={(a) => String(a.id)}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={[styles.row, { borderBottomColor: theme.border }]}>
              <Text style={{ color: theme.text, flex: 1 }}>#{item.itemId} ×{item.quantity}</Text>
              <Text style={{ color: theme.gold || theme.accent, fontWeight: "700" }}>{money(item.buyout)}</Text>
            </View>
          )}
          ListHeaderComponent={
            q.data ? <Text style={{ color: theme.textMuted, marginBottom: 8 }}>{q.data.total} {t("listings") || "listings"}</Text> : null
          }
          ListFooterComponent={
            (q.data?.total ?? 0) > (q.data?.perPage ?? 50) ? (
              <View style={{ flexDirection: "row", justifyContent: "center", gap: 16, marginTop: 16 }}>
                <Pressable disabled={page <= 1} onPress={() => setPage((p) => Math.max(1, p - 1))}>
                  <Text style={{ color: page <= 1 ? theme.textMuted : theme.accent, fontWeight: "700" }}>‹ {t("prev") || "Prev"}</Text>
                </Pressable>
                <Text style={{ color: theme.text }}>{page}</Text>
                <Pressable onPress={() => setPage((p) => p + 1)}>
                  <Text style={{ color: theme.accent, fontWeight: "700" }}>{t("next") || "Next"} ›</Text>
                </Pressable>
              </View>
            ) : null
          }
          ListEmptyComponent={<Text style={{ color: theme.textMuted, textAlign: "center", marginTop: 30 }}>{t("noData") || "No listings"}</Text>}
        />
      ) : (
        <Text style={{ color: theme.textMuted, textAlign: "center", marginTop: 30, paddingHorizontal: 32 }}>
          {t("auctionHint") || "Enter a connected-realm id to browse auctions."}
        </Text>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1 },
  h1: { fontSize: 26, fontWeight: "900" },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  btn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 13, borderRadius: 12 },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 11, borderBottomWidth: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
