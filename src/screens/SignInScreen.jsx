// src/screens/SignInScreen.jsx — Battle.net OAuth or continue manually.
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";

export default function SignInScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { role, continueManual } = useAuthStore();

  const startBattleNet = () => {
    // TODO: launch Battle.net OAuth via expo-auth-session / expo-web-browser,
    // exchange the code on your backend, then call signInWithToken(token,user).
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <View style={styles.center}>
        <Text style={[styles.h1, { color: theme.text }]}>{t("signIn")}</Text>

        <Pressable onPress={startBattleNet} style={[styles.primary, { backgroundColor: theme.accent }]}>
          <Text style={{ color: theme.accentText, fontWeight: "800", fontSize: 15 }}>
            {t("continueBattleNet")}
          </Text>
        </Pressable>

        <Pressable onPress={() => continueManual(role)} style={[styles.secondary, { borderColor: theme.border }]}>
          <Text style={{ color: theme.text, fontWeight: "700", fontSize: 14 }}>
            {t("continueManual")}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, justifyContent: "center", paddingHorizontal: 24, gap: 14 },
  h1: { fontSize: 28, fontWeight: "800", marginBottom: 16 },
  primary: { paddingVertical: 16, borderRadius: 14, alignItems: "center" },
  secondary: { paddingVertical: 16, borderRadius: 14, alignItems: "center", borderWidth: 1 },
});
