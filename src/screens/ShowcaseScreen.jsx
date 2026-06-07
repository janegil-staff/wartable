// src/screens/ShowcaseScreen.jsx — character view with 4 bottom tabs:
// Overview · Calendar · Progress · Guild. Fetches once, feeds all tabs.
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useCharacter } from "../hooks/useCharacter";
import { OverviewTab, ProgressTab } from "../components/showcaseParts";
import GuildScreen from "../screens/GuildScreen";
import CalendarScreen from "../screens/CalendarScreen";
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
  const charKey = `${c.region}-${c.realm}-${c.name}`;

  const openGuild = () => {
    const g = c.guild;
    if (!g?.name) return;
    navigation.navigate("Guild", {
      region: c.region, realm: g.realm || c.realm, name: g.name,
    });
  };
  const panel = (Comp) => () => (
    <View key={charKey} style={{ flex: 1, backgroundColor: theme.bg }}>
      <Comp c={c} theme={theme} t={t} onOpenGuild={openGuild} />
    </View>
  );

  return (
    <Tab.Navigator
      tabBar={(props) => <ShowcaseTabBar {...props} shareTarget={{ region: c.region ?? region, realm: c.realm ?? realm, name: c.name ?? name }} parentNav={navigation} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Overview" options={{ title: t("appName") }} component={panel(OverviewTab)} />
      <Tab.Screen name="Calendar" options={{ title: t("calendar") || "Calendar" }}>
        {() => (
          <View key={charKey} style={{ flex: 1, backgroundColor: theme.bg }}>
            <CalendarScreen route={{ params: {
              region: c.region ?? region,
              realm: c.realm ?? realm,
              name: c.name ?? name,
              guildRealm: c.guild?.realm || c.realm,
              guildName: c.guild?.name,
            } }} />
          </View>
        )}
      </Tab.Screen>
      <Tab.Screen name="Progress" options={{ title: t("mythicPlus") }} component={panel(ProgressTab)} />
      <Tab.Screen name="Guild" options={{ title: t("guild") || "Guild" }}>
        {() => (
          <View key={charKey} style={{ flex: 1, backgroundColor: theme.bg }}>
            <GuildScreen guild={{ region: c.region, realm: c.guild?.realm || c.realm, name: c.guild?.name }} />
          </View>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});