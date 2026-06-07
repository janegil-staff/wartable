import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";

export default function PostScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <Text style={[styles.h1, { color: theme.text }]}>{t("createListing")}</Text>
      <View style={styles.center}>
        <Text style={{ color: theme.textMuted, paddingHorizontal: 24, textAlign: "center" }}>
          {/* TODO: listing form — fields from sampleListings.js shapes */}
          {t("createListing")}
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1 }, h1: { fontSize: 26, fontWeight: "800", padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
