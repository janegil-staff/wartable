// src/screens/ShowcaseScreen.jsx — character view with 4 bottom tabs:
// Overview · Gear · Progress · Code. Fetches once, feeds all tabs.
import React from "react";
import { View, Text, ActivityIndicator, Pressable, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useCharacter } from "../hooks/useCharacter";
import { OverviewTab, GearTab, ProgressTab } from "../components/showcaseParts";
import CodeTab from "../components/CodeTab";
import ShowcaseTabBar from "../navigation/ShowcaseTabBar";

const Tab = createBottomTabNavigator();

export default function ShowcaseScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { region, realm, name } = route.params ?? {};
  const q = useCharacter({ region, realm, name });

  if (q.isLoading) {
    return <SafeAreaView style={[styles.center, { backgroundColor: theme.bg }]}><ActivityIndicator color={theme.accent} /></SafeAreaView>;
  }
  if (q.isError || !q.data) {
    return <SafeAreaView style={[styles.center, { backgroundColor: theme.bg }]}><Text style={{ color: theme.danger }}>{t("notFound")}</Text></SafeAreaView>;
  }

  const c = q.data;
  const openGuild = () => {
    const g = c.guild;
    if (!g?.name) return;
    navigation.navigate("Guild", {
      region: c.region, realm: g.realm || c.realm, name: g.name,
    });
  };
  const panel = (Comp) => () => (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Comp c={c} theme={theme} t={t} onOpenGuild={openGuild} />
    </View>
  );

  return (
    <Tab.Navigator
      tabBar={(props) => <ShowcaseTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Tab.Screen name="Overview" options={{ title: t("appName") }} component={panel(OverviewTab)} />
      <Tab.Screen name="Gear" options={{ title: t("gear") }} component={panel(GearTab)} />
      <Tab.Screen name="Progress" options={{ title: t("mythicPlus") }} component={panel(ProgressTab)} />
      <Tab.Screen name="Code" options={{ title: t("shareCode") || "Code" }} component={panel(CodeTab)} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  fab: { position: "absolute", right: 16, bottom: 16, width: 56, height: 56, borderRadius: 28,
    alignItems: "center", justifyContent: "center",
    shadowOpacity: 0.5, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 6 },
});
