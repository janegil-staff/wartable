// src/screens/ShareScreen.jsx — the share screen opened by the center FAB.
// Shares the character passed in route params, reusing the CodeTab UI.
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import CodeTab from "../components/CodeTab";

export default function ShareScreen({ route }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { region, realm, name } = route.params ?? {};
  const c = { region, realm, name };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={["top"]}>
      <CodeTab c={c} theme={theme} t={t} />
    </SafeAreaView>
  );
}
