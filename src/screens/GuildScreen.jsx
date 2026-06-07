// src/screens/GuildScreen.jsx — guild header + roster + recent activity.
// Tapping a member opens a quick-peek modal; "View full showcase" navigates.
import React, { useState } from "react";
import { View, Text, FlatList, Pressable, ActivityIndicator, StyleSheet } from "react-native";
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

  // Modal state: which member is being peeked at.
  const [selected, setSelected] = useState(null);

  const openMember = (member) => {
    if (!member?.name) return;
    setSelected(member);
  };

  const openShowcase = (member) => {
    setSelected(null);
    if (!member?.name) return;
    // members are on the guild's realm; push a fresh Showcase for them
    nav.push?.("Showcase", { region, realm, name: member.name })
      ?? nav.navigate("Showcase", { region, realm, name: member.name });
  };

  if (q.isLoading) return <SafeAreaView style={[styles.center, { backgroundColor: theme.bg }]}><ActivityIndicator color={theme.accent} /></SafeAreaView>;
  if (q.isError || !q.data) return <SafeAreaView style={[styles.center, { backgroundColor: theme.bg }]}><Text style={{ color: theme.danger }}>{t("notFound")}</Text></SafeAreaView>;

  const g = q.data;
  const fac = factionTheme(g.faction);

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <FlatList
        data={g.roster ?? []}
        keyExtractor={(m, i) => `${m.name}-${i}`}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <View style={{ gap: 16, marginBottom: 12 }}>
            {/* guild header */}
            <View style={[styles.header, { backgroundColor: theme.surface, borderColor: fac.glow }]}>
              <View style={[StyleSheet.absoluteFill, { backgroundColor: fac.soft, borderRadius: 16 }]} />
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <FactionEmblem faction={g.faction} size={32} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.text, fontSize: 22, fontWeight: "900" }} numberOfLines={1}>{g.name}</Text>
                  <Text style={{ color: theme.textMuted }}>{g.realmName} · {g.memberCount} {t("members") || "members"}</Text>
                </View>
              </View>
            </View>

            {/* activity feed */}
            {(g.activity ?? []).length > 0 && (
              <View style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <Text style={[styles.sectionTitle, { color: theme.accent }]}>{t("recentActivity") || "Recent activity"}</Text>
                {g.activity.slice(0, 10).map((a, i) => (
                  <View key={i} style={[styles.actRow, { borderBottomColor: theme.border }]}>
                    <Ionicons name="flash" size={13} color={theme.accent} />
                    <Text style={{ color: theme.text, flex: 1, fontSize: 13 }} numberOfLines={1}>
                      {a.characterName ? `${a.characterName} — ` : ""}{a.detail}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <Text style={[styles.sectionTitle, { color: theme.textMuted, paddingHorizontal: 2 }]}>
              {t("roster") || "Roster"} · {g.roster?.length ?? 0}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => openMember(item)} style={[styles.memberRow, { borderBottomColor: theme.border }]}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: classColor(item.class), fontWeight: "700" }} numberOfLines={1}>
                {item.rank === 0 ? "★ " : ""}{item.name}
              </Text>
              <Text style={{ color: theme.textMuted, fontSize: 12 }} numberOfLines={1}>
                {rankName(item.rank, t)}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ color: theme.text, fontSize: 13, fontWeight: "600" }} numberOfLines={1}>
                {[item.race, item.class].filter(Boolean).join(" ")}
              </Text>
              <Text style={{ color: theme.textMuted, fontSize: 12 }}>{t("level") || "Lv"} {item.level}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.textMuted} style={{ marginLeft: 6 }} />
          </Pressable>
        )}
      />

      <GuildMemberModal
        visible={!!selected}
        member={selected}
        region={region}
        realm={realm}
        onClose={() => setSelected(null)}
        onOpenShowcase={openShowcase}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: { borderWidth: 1, borderRadius: 16, padding: 16, overflow: "hidden" },
  section: { borderWidth: 1, borderRadius: 14, padding: 14 },
  sectionTitle: { fontSize: 12, fontWeight: "800", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 },
  actRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 7, borderBottomWidth: 1 },
  memberRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10, borderBottomWidth: 1 },
});