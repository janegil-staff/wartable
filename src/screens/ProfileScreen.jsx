import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";

export default function ProfileScreen({ navigation }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const signOut = useAuthStore((s) => s.signOut);
  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <Text style={[styles.h1, { color: theme.text }]}>{t("tabProfile")}</Text>
      <View style={{ padding: 16, gap: 12 }}>
        <Pressable onPress={() => navigation.navigate("Settings")} style={[styles.row, { borderColor: theme.border, backgroundColor: theme.surface }]}>
          <Text style={{ color: theme.text, fontWeight: "700" }}>{t("settings")}</Text>
        </Pressable>
        <Pressable onPress={signOut} style={[styles.row, { borderColor: theme.border, backgroundColor: theme.surface }]}>
          <Text style={{ color: theme.danger, fontWeight: "700" }}>{t("signOut")}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1 }, h1: { fontSize: 26, fontWeight: "800", padding: 16 },
  row: { borderWidth: 1, borderRadius: 12, padding: 16 },
});
