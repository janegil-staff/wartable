// src/screens/AboutScreen.jsx — About / info (scaffold; replace copy).
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";

export default function AboutScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const P = ({ children, head }) => (
    <Text style={[head ? styles.head : styles.body, { color: head ? theme.text : theme.textMuted }]}>{children}</Text>
  );
  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
        <Text style={[styles.title, { color: theme.text }]}>{t("about") || "About"}</Text>
        <Text style={{ color: theme.accent, fontWeight: "800", fontSize: 16 }}>Wartable</Text>
        <P>Show off your World of Warcraft character — gear, Mythic+, raids, achievements — and share a live view with a temporary code.</P>

        <P head>How it works</P>
        <P>Sign in with Battle.net, pick a character, and Wartable pulls the latest data from Blizzard's official APIs. Generate a 6-digit code to let anyone view that character on the web for a short time.</P>

        <P head>Privacy & data</P>
        <P>Wartable stores your Battle.net account id and the characters on your account so it can show them to you. Share codes contain a snapshot of the shared character and expire automatically. You can delete your account and its data at any time from Settings.</P>

        <P head>Not affiliated with Blizzard</P>
        <P>Wartable is an independent fan project. World of Warcraft and related marks are trademarks of Blizzard Entertainment. Wartable is not endorsed by or affiliated with Blizzard.</P>

        <View style={{ marginTop: 16 }}>
          <P>Made by Qup DA, Bergen, Norway.</P>
          <P>Contact: jan.egil.staff@codelab.no</P>
          <P>Version 1.0.0</P>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1 },
  title: { fontSize: 24, fontWeight: "900", marginBottom: 4 },
  head: { fontSize: 16, fontWeight: "800", marginTop: 10 },
  body: { fontSize: 15, lineHeight: 22 },
});
