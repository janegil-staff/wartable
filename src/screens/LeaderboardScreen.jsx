// src/screens/LeaderboardScreen.jsx — raid Hall of Fame + PvP leaderboards.
import React, { useState } from "react";
import { View, Text, FlatList, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useRaidLeaderboard, usePvpLeaderboard } from "../hooks/useGameData";

const RAID = "manaforge-omega"; // current raid slug

export default function LeaderboardScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [tab, setTab] = useState("raid"); // raid | pvp
  const [bracket, setBracket] = useState("3v3");

  const raidQ = useRaidLeaderboard({ region: "eu", raid: RAID, faction: "alliance", enabled: tab === "raid" });
  const pvpQ = usePvpLeaderboard({ region: "eu", bracket });

  const Seg = ({ value, label, onPress, active }) => (
    <Pressable onPress={onPress} style={[styles.seg, { borderColor: active ? theme.accent : theme.border, backgroundColor: active ? theme.accentSoft : theme.surface }]}>
      <Text style={{ color: active ? theme.accent : theme.text, fontWeight: "700", fontSize: 13 }}>{label}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <View style={{ padding: 16, gap: 12 }}>
        <Text style={[styles.h1, { color: theme.text }]}>{t("leaderboards") || "Leaderboards"}</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Seg label={t("raids") || "Raid"} active={tab === "raid"} onPress={() => setTab("raid")} />
          <Seg label="PvP" active={tab === "pvp"} onPress={() => setTab("pvp")} />
        </View>
        {tab === "pvp" ? (
          <View style={{ flexDirection: "row", gap: 8 }}>
            {["2v2", "3v3", "rbg"].map((b) => (
              <Seg key={b} label={b.toUpperCase()} active={bracket === b} onPress={() => setBracket(b)} />
            ))}
          </View>
        ) : null}
      </View>

      {tab === "raid" ? (
        raidQ.isLoading ? <Loading theme={theme} /> :
        <FlatList
          data={raidQ.data?.entries ?? []}
          keyExtractor={(e, i) => `${e.rank}-${i}`}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={[styles.row, { borderBottomColor: theme.border }]}>
              <Text style={{ color: theme.accent, fontWeight: "900", width: 36 }}>#{item.rank}</Text>
              <Text style={{ color: theme.text, flex: 1, fontWeight: "700" }} numberOfLines={1}>{item.guild}</Text>
              <Text style={{ color: theme.textMuted, fontSize: 12 }}>{item.realm}</Text>
            </View>
          )}
          ListEmptyComponent={<Empty theme={theme} t={t} />}
        />
      ) : (
        pvpQ.isLoading ? <Loading theme={theme} /> :
        <FlatList
          data={pvpQ.data?.entries ?? []}
          keyExtractor={(e, i) => `${e.rank}-${i}`}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={[styles.row, { borderBottomColor: theme.border }]}>
              <Text style={{ color: theme.accent, fontWeight: "900", width: 36 }}>#{item.rank}</Text>
              <Text style={{ color: theme.text, flex: 1, fontWeight: "700" }} numberOfLines={1}>{item.name}</Text>
              <Text style={{ color: theme.gold || theme.accent, fontWeight: "800" }}>{item.rating}</Text>
            </View>
          )}
          ListEmptyComponent={<Empty theme={theme} t={t} />}
        />
      )}
    </SafeAreaView>
  );
}
const Loading = ({ theme }) => <View style={styles.center}><ActivityIndicator color={theme.accent} /></View>;
const Empty = ({ theme, t }) => <Text style={{ color: theme.textMuted, textAlign: "center", marginTop: 30 }}>{t("noData") || "No data"}</Text>;

const styles = StyleSheet.create({
  root: { flex: 1 },
  h1: { fontSize: 26, fontWeight: "900" },
  seg: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 10, borderWidth: 1 },
  row: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 11, borderBottomWidth: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
