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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  label: { fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.8 },
  segment: { flexDirection: "row", gap: 8 },
  segItem: { flex: 1, alignItems: "center", paddingVertical: 12, borderRadius: 12, borderWidth: 1 },
  langGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  langChip: { width: 56, alignItems: "center", paddingVertical: 10, borderRadius: 10, borderWidth: 1 },
});
