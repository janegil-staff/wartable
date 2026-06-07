// src/screens/GuildScreen.jsx — guild header + roster + recent activity.
import React from "react";
import { View, Text, FlatList, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useGuild } from "../hooks/useGuild";
import { classColor, factionTheme } from "../theme/wow";
import FactionEmblem from "../components/FactionEmblem";

export default function GuildScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { region, realm, name } = route.params ?? {};
  const q = useGuild({ region, realm, name });

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
                <Pressable
                  onPress={() => navigation.navigate("Events", { region, realm, name })}
                  style={{ flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, backgroundColor: theme.accent }}>
                  <Ionicons name="calendar" size={15} color={theme.accentText} />
                  <Text style={{ color: theme.accentText, fontWeight: "800", fontSize: 13 }}>{t("events") || "Events"}</Text>
                </Pressable>
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
          <View style={[styles.memberRow, { borderBottomColor: theme.border }]}>
            <Text style={{ color: classColor(item.class), fontWeight: "700", flex: 1 }} numberOfLines={1}>
              {item.rank === 0 ? "★ " : ""}{item.name}
            </Text>
            <Text style={{ color: theme.textMuted, fontSize: 12 }}>{item.class} · {item.level}</Text>
          </View>
        )}
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
