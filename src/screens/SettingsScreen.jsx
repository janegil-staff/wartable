<<<<<<< HEAD
// src/screens/SettingsScreen.jsx — Recover-style row list, Wartable dark/ember.
// Header (back + title + sign-out), then rows: Email, Personal, Language (flag),
// Theme, Terms, About.
import React from "react";
import { View, Text, Pressable, ScrollView, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";
import { LANG_META } from "../i18n/langMeta";

function Row({ theme, label, value, valueNode, onPress, last }) {
  return (
    <Pressable onPress={onPress} disabled={!onPress}
      style={[styles.row, !last && { borderBottomColor: theme.border, borderBottomWidth: 1 }]}>
      <Text style={[styles.rowLabel, { color: theme.text }]}>{label}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {valueNode ?? (value ? <Text style={{ color: theme.textMuted, fontSize: 15 }}>{value}</Text> : null)}
        {onPress ? <Ionicons name="chevron-forward" size={18} color={theme.textMuted} /> : null}
      </View>
    </Pressable>
  );
}

export default function SettingsScreen({ navigation }) {
  const { theme, mode, setMode } = useTheme();
  const { t, i18n } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const deleteAccount = useAuthStore((s) => s.deleteAccount);

  const confirmDelete = () => {
    Alert.alert(
      t("deleteAccount") || "Delete account",
      t("deleteConfirm") || "This permanently deletes your account and share codes. This cannot be undone.",
      [
        { text: t("cancel") || "Cancel", style: "cancel" },
        { text: t("delete") || "Delete", style: "destructive", onPress: () => deleteAccount() },
      ],
    );
  };

  const meta = LANG_META[i18n.language] ?? LANG_META.en;
  const nextTheme = mode === "dark" ? "light" : "dark";

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      {/* custom header */}
      <View style={[styles.header, { backgroundColor: theme.headerBg || theme.surface, borderBottomColor: theme.border }]}>
        <Pressable onPress={() => navigation.goBack()} style={[styles.circle, { borderColor: theme.border }]}>
          <Ionicons name="chevron-back" size={20} color={theme.text} />
        </Pressable>
        <Text style={[styles.title, { color: theme.text }]}>{t("settings") || "Settings"}</Text>
        <Pressable onPress={signOut} style={[styles.circle, { borderColor: theme.border }]}>
          <Ionicons name="log-out-outline" size={20} color={theme.text} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Email block */}
        <Text style={[styles.section, { color: theme.textMuted }]}>{t("email") || "Account"}</Text>
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Row theme={theme} label={user?.battletag || user?.email || t("signedIn") || "Signed in"} last />
        </View>

        {/* settings rows */}
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border, marginTop: 18 }]}>
          <Row theme={theme} label={t("language") || "Language"}
            valueNode={<Text style={{ color: theme.textMuted, fontSize: 15 }}>{meta.flag}  {meta.native}</Text>}
            onPress={() => navigation.navigate("LanguagePicker")} />
          <Row theme={theme} label={t("theme") || "Theme"}
            value={mode === "dark" ? (t("themeDark") || "Dark") : mode === "light" ? (t("themeLight") || "Light") : (t("themeSystem") || "System")}
            onPress={() => setMode(nextTheme)} />
          <Row theme={theme} label={t("terms") || "Terms & Conditions"} value={t("view") || "View"}
            onPress={() => navigation.navigate("Terms")} />
          <Row theme={theme} label={t("about") || "About"} value={t("readMore") || "Read more"}
            onPress={() => navigation.navigate("About")} last />
        </View>

        <Pressable onPress={confirmDelete}
          style={[styles.delete, { borderColor: theme.danger }]}>
          <Text style={{ color: theme.danger, fontWeight: "800" }}>{t("deleteAccount") || "Delete account"}</Text>
        </Pressable>
=======
// src/screens/SettingsScreen.jsx — language + theme controls.
import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { LANGS } from "../i18n";

export default function SettingsScreen() {
  const { theme, mode, setMode } = useTheme();
  const { t, i18n } = useTranslation();

  const themeOptions = [
    { key: "light", label: t("themeLight") },
    { key: "dark", label: t("themeDark") },
    { key: "system", label: t("themeSystem") },
  ];

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 24 }}>
        {/* Theme */}
        <View style={{ gap: 10 }}>
          <Text style={[styles.label, { color: theme.textMuted }]}>{t("theme")}</Text>
          <View style={styles.segment}>
            {themeOptions.map((opt) => {
              const active = mode === opt.key;
              return (
                <Pressable
                  key={opt.key}
                  onPress={() => setMode(opt.key)}
                  style={[
                    styles.segItem,
                    { borderColor: theme.border, backgroundColor: active ? theme.accent : theme.surface },
                  ]}
                >
                  <Text style={{ color: active ? theme.accentText : theme.text, fontWeight: "700", fontSize: 13 }}>
                    {opt.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Language */}
        <View style={{ gap: 10 }}>
          <Text style={[styles.label, { color: theme.textMuted }]}>{t("language")}</Text>
          <View style={styles.langGrid}>
            {LANGS.map((l) => {
              const active = i18n.language === l;
              return (
                <Pressable
                  key={l}
                  onPress={() => i18n.changeLanguage(l)}
                  style={[
                    styles.langChip,
                    { borderColor: active ? theme.accent : theme.border, backgroundColor: active ? theme.accentSoft : theme.surface },
                  ]}
                >
                  <Text style={{ color: active ? theme.accent : theme.text, fontWeight: "700" }}>
                    {l.toUpperCase()}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
<<<<<<< HEAD
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1 },
  circle: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "800" },
  section: { fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8, marginLeft: 4 },
  card: { borderWidth: 1, borderRadius: 16, paddingHorizontal: 16, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 18 },
  rowLabel: { fontSize: 16, fontWeight: "700", flex: 1 },
  delete: { marginTop: 28, padding: 16, borderRadius: 12, borderWidth: 1, alignItems: "center" },
=======
  label: { fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.8 },
  segment: { flexDirection: "row", gap: 8 },
  segItem: { flex: 1, alignItems: "center", paddingVertical: 12, borderRadius: 12, borderWidth: 1 },
  langGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  langChip: { width: 56, alignItems: "center", paddingVertical: 10, borderRadius: 10, borderWidth: 1 },
>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076
});
