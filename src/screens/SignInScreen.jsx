<<<<<<< HEAD
import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";
import { loginWithBattleNet } from "../api/bnetAuth";
=======
// src/screens/SignInScreen.jsx — Battle.net OAuth or continue manually.
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";
>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076

export default function SignInScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
<<<<<<< HEAD
  const { continueManual, signInWithToken } = useAuthStore();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  const onBattleNet = async () => {
    setErr(null); setBusy(true);
    try {
      const res = await loginWithBattleNet("eu");
      if (!res.ok) {
        if (res.reason !== "cancel" && res.reason !== "dismiss") setErr(t("retry"));
        return;
      }
      await signInWithToken(res.token, {});
    } catch {
      setErr(t("retry"));
    } finally {
      setBusy(false);
    }
=======
  const { role, continueManual } = useAuthStore();

  const startBattleNet = () => {
    // TODO: launch Battle.net OAuth via expo-auth-session / expo-web-browser,
    // exchange the code on your backend, then call signInWithToken(token,user).
>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <View style={styles.center}>
<<<<<<< HEAD
        <Text style={[styles.app, { color: theme.accent }]}>{t("appName")}</Text>
        <Text style={[styles.tag, { color: theme.text }]}>{t("tagline")}</Text>

        <Pressable disabled={busy} onPress={onBattleNet}
          style={[styles.primary, { backgroundColor: theme.accent, shadowColor: theme.accent, opacity: busy ? 0.85 : 1 }]}>
          {busy ? <ActivityIndicator color={theme.accentText} />
            : <><Ionicons name="game-controller" size={18} color={theme.accentText} />
                <Text style={{ color: theme.accentText, fontWeight: "800" }}>{t("continueBattleNet")}</Text></>}
        </Pressable>

        <Pressable disabled={busy} onPress={() => continueManual("player")}
          style={[styles.secondary, { borderColor: theme.border }]}>
          <Text style={{ color: theme.text, fontWeight: "700" }}>{t("continueManual")}</Text>
        </Pressable>

        {err ? <Text style={{ color: theme.danger, marginTop: 6 }}>{err}</Text> : null}
=======
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
>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076
      </View>
    </SafeAreaView>
  );
}
<<<<<<< HEAD
const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex:1, justifyContent:"center", paddingHorizontal:24, gap:14 },
  app: { fontSize:14, fontWeight:"900", letterSpacing:4, textTransform:"uppercase" },
  tag: { fontSize:30, fontWeight:"900", marginBottom:24 },
  primary: { flexDirection:"row", alignItems:"center", justifyContent:"center", gap:8, height:54, borderRadius:14,
    shadowOpacity:0.5, shadowRadius:14, shadowOffset:{width:0,height:4}, elevation:6 },
  secondary: { height:54, borderRadius:14, alignItems:"center", justifyContent:"center", borderWidth:1 },
=======

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex: 1, justifyContent: "center", paddingHorizontal: 24, gap: 14 },
  h1: { fontSize: 28, fontWeight: "800", marginBottom: 16 },
  primary: { paddingVertical: 16, borderRadius: 14, alignItems: "center" },
  secondary: { paddingVertical: 16, borderRadius: 14, alignItems: "center", borderWidth: 1 },
>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076
});
