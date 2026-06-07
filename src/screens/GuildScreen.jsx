// src/screens/GuildScreen.jsx — guild header + roster + recent activity.
// Search bar (name · class · rank) sits at the top of the scrollable header
// and filters the roster client-side. Tapping a member opens a quick-peek modal.
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { useGuild } from "../hooks/useGuild";
import { classColor, factionTheme } from "../theme/wow";
import FactionEmblem from "../components/FactionEmblem";
import GuildMemberModal from "../components/GuildMemberModal";

// Blizzard exposes only a rank NUMBER (0 = GM), not the guild's custom rank
// names. We map the common conventions; deeper ranks show as "Rank N".
function rankName(rank, t) {
  if (rank === 0) return t("guildMaster") || "Guild Master";
  if (rank === 1) return t("officer") || "Officer";
  if (rank == null) return "";
  return `${t("rank") || "Rank"} ${rank}`;
}

export default function GuildScreen({ route, navigation, guild: guildProp }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const params = route?.params ?? {};
  const region = guildProp?.region ?? params.region;
  const realm = guildProp?.realm ?? params.realm;
  const name = guildProp?.name ?? params.name;
  const nav = useNavigation();
  const q = useGuild({ region, realm, name });

  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  const openMember = (member) => {
    if (!member?.name) return;
    setSelected(member);
  };

  // Client-side filter: name + class + localized rank name. Roster is already
  // loaded, so this is instant and costs no API calls.
  const roster = q.data?.roster ?? [];
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return roster;
    return roster.filter((m) => {
      const hay = [m.name, m.class, rankName(m.rank, t)]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [roster, query, t]);

  if (q.isLoading)
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.bg }]}>
        <ActivityIndicator color={theme.accent} />
      </SafeAreaView>
    );
  if (q.isError || !q.data)
    return (
      <SafeAreaView style={[styles.center, { backgroundColor: theme.bg }]}>
        <Text style={{ color: theme.danger }}>{t("notFound")}</Text>
      </SafeAreaView>
    );

  const g = q.data;
  const fac = factionTheme(g.faction);

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.bg }]}
      edges={["top"]}
    >
      <FlatList
        data={filtered}
        keyExtractor={(m, i) => `${m.name}-${i}`}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 16,
        }}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={{ gap: 16, marginBottom: 12 }}>
            {/* search bar — top of the scrollable header */}
            <View
              style={[
                styles.searchBar,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <Ionicons name="search" size={16} color={theme.textMuted} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={t("searchRoster") || "Search name, class or rank"}
                placeholderTextColor={theme.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                style={{
                  flex: 1,
                  color: theme.text,
                  fontSize: 15,
                  paddingVertical: 0,
                }}
              />
              {query.length > 0 ? (
                <Pressable onPress={() => setQuery("")} hitSlop={10}>
                  <Ionicons
                    name="close-circle"
                    size={18}
                    color={theme.textMuted}
                  />
                </Pressable>
              ) : null}
            </View>

            {/* guild header */}
            <View
              style={[
                styles.header,
                { backgroundColor: theme.surface, borderColor: fac.glow },
              ]}
            >
              <View
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: fac.soft, borderRadius: 16 },
                ]}
              />
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <FactionEmblem faction={g.faction} size={32} />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: theme.text,
                      fontSize: 22,
                      fontWeight: "900",
                    }}
                    numberOfLines={1}
                  >
                    {g.name}
                  </Text>
                  <Text style={{ color: theme.textMuted }}>
                    {g.realmName} · {g.memberCount} {t("members") || "members"}
                  </Text>
                </View>
              </View>
            </View>

            {/* activity feed — hidden while searching to keep results focused */}
            {query.length === 0 && (g.activity ?? []).length > 0 && (
              <View
                style={[
                  styles.section,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <Text style={[styles.sectionTitle, { color: theme.accent }]}>
                  {t("recentActivity") || "Recent activity"}
                </Text>
                {g.activity.slice(0, 10).map((a, i) => (
                  <View
                    key={i}
                    style={[styles.actRow, { borderBottomColor: theme.border }]}
                  >
                    <Ionicons name="flash" size={13} color={theme.accent} />
                    <Text
                      style={{ color: theme.text, flex: 1, fontSize: 13 }}
                      numberOfLines={1}
                    >
                      {a.characterName ? `${a.characterName} — ` : ""}
                      {a.detail}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <Text
              style={[
                styles.sectionTitle,
                { color: theme.textMuted, paddingHorizontal: 2 },
              ]}
            >
              {t("roster") || "Roster"} · {filtered.length}
              {query.length > 0 ? ` / ${roster.length}` : ""}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text
            style={{
              color: theme.textMuted,
              textAlign: "center",
              paddingVertical: 24,
            }}
          >
            {t("noMatches") || "No members match your search."}
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => openMember(item)}
            style={[styles.memberRow, { borderBottomColor: theme.border }]}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: classColor(item.class), fontWeight: "700" }}
                numberOfLines={1}
              >
                {item.rank === 0 ? "★ " : ""}
                {item.name}
              </Text>
              <Text
                style={{ color: theme.textMuted, fontSize: 12 }}
                numberOfLines={1}
              >
                {rankName(item.rank, t)}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{ color: theme.text, fontSize: 13, fontWeight: "600" }}
                numberOfLines={1}
              >
                {[item.race, item.class].filter(Boolean).join(" ")}
              </Text>
              <Text style={{ color: theme.textMuted, fontSize: 12 }}>
                {t("level") || "Lv"} {item.level}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={theme.textMuted}
              style={{ marginLeft: 6 }}
            />
          </Pressable>
        )}
      />

      <GuildMemberModal
        visible={!!selected}
        member={selected}
        region={region}
        realm={realm}
        onClose={() => setSelected(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  header: { borderWidth: 1, borderRadius: 16, padding: 16, overflow: "hidden" },
  section: { borderWidth: 1, borderRadius: 14, padding: 14 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  actRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 7,
    borderBottomWidth: 1,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
});
