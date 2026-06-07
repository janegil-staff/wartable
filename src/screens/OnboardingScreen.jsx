// src/screens/OnboardingScreen.jsx — pick side (player vs guild), then sign in.
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";

export default function OnboardingScreen({ navigation }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const setRole = useAuthStore((s) => s.setRole);

  const choose = (role) => {
    setRole(role);
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <View style={styles.center}>
        <Text style={[styles.app, { color: theme.accent }]}>{t("appName")}</Text>
        <Text style={[styles.tagline, { color: theme.text }]}>{t("tagline")}</Text>

        <View style={{ gap: 12, marginTop: 40, width: "100%" }}>
          <Pressable onPress={() => choose("player")} style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>{t("iAmPlayer")}</Text>
          </Pressable>
          <Pressable onPress={() => choose("guild")} style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>{t("iAmGuild")}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, justifyContent: "center", paddingHorizontal: 24 },
  app: { fontSize: 16, fontWeight: "800", letterSpacing: 2, textTransform: "uppercase" },
  tagline: { fontSize: 30, fontWeight: "800", marginTop: 12, lineHeight: 36 },
  card: { borderWidth: 1, borderRadius: 16, padding: 22 },
  cardTitle: { fontSize: 18, fontWeight: "700" },
});
