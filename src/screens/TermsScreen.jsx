// src/screens/TermsScreen.jsx — Terms & Conditions (scaffold text; replace copy).
import React from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";

export default function TermsScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const P = ({ children, head }) => (
    <Text style={[head ? styles.head : styles.body, { color: head ? theme.text : theme.textMuted }]}>{children}</Text>
  );
  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
        <Text style={[styles.title, { color: theme.text }]}>{t("terms") || "Terms & Conditions"}</Text>
        <P>Last updated: [DATE]. These are placeholder terms — replace with your own.</P>

        <P head>1. Acceptance</P>
        <P>By using Wartable you agree to these terms. If you do not agree, do not use the app.</P>

        <P head>2. The service</P>
        <P>Wartable displays World of Warcraft character data retrieved from Blizzard's public APIs and lets you share a read-only view of a character via a temporary code. Wartable is not affiliated with or endorsed by Blizzard Entertainment.</P>

        <P head>3. Your account</P>
        <P>You sign in with your Battle.net account. You are responsible for activity under your account. You can delete your Wartable account at any time from Settings.</P>

        <P head>4. Acceptable use</P>
        <P>Do not misuse the service, attempt to disrupt it, or use it to violate Blizzard's terms or any applicable law.</P>

        <P head>5. Data</P>
        <P>See the About screen for how data is handled. Share codes expire automatically.</P>

        <P head>6. Disclaimer</P>
        <P>The service is provided "as is" without warranties. Character data accuracy depends on Blizzard's APIs.</P>

        <P head>7. Changes</P>
        <P>These terms may be updated. Continued use after changes means you accept them.</P>

        <P head>8. Contact</P>
        <P>Questions: jan.egil.staff@codelab.no</P>
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
