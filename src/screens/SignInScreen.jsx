import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";
import { loginWithBattleNet } from "../api/bnetAuth";

export default function SignInScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
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
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]}>
      <View style={styles.center}>
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
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1 },
  center: { flex:1, justifyContent:"center", paddingHorizontal:24, gap:14 },
  app: { fontSize:14, fontWeight:"900", letterSpacing:4, textTransform:"uppercase" },
  tag: { fontSize:30, fontWeight:"900", marginBottom:24 },
  primary: { flexDirection:"row", alignItems:"center", justifyContent:"center", gap:8, height:54, borderRadius:14,
    shadowOpacity:0.5, shadowRadius:14, shadowOffset:{width:0,height:4}, elevation:6 },
  secondary: { height:54, borderRadius:14, alignItems:"center", justifyContent:"center", borderWidth:1 },
});
