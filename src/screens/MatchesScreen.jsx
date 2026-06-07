import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";

export default function MatchesScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <Text style={[styles.h1, { color: theme.text }]}>{t("yourMatches")}</Text>
      <View style={styles.center}>
        <Text style={{ color: theme.textMuted }}>{t("noMatchesYet")}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1 }, h1: { fontSize: 26, fontWeight: "800", padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
