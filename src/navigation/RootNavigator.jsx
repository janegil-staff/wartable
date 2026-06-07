<<<<<<< HEAD
// src/navigation/RootNavigator.jsx — pick a character (Home, NO tabs) → the
// character view (Showcase) which has the bottom tabs + center share FAB.
import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../store/useAuthStore";
import { useTheme } from "../theme/ThemeContext";
import SignInScreen from "../screens/SignInScreen";
import HomeScreen from "../screens/HomeScreen";
import ShowcaseScreen from "../screens/ShowcaseScreen";
import ViewCodeScreen from "../screens/ViewCodeScreen";
import GuildScreen from "../screens/GuildScreen";
import EventsScreen from "../screens/EventsScreen";
import ThisWeekScreen from "../screens/ThisWeekScreen";
import SettingsScreen from "../screens/SettingsScreen";
import LanguagePickerScreen from "../screens/LanguagePickerScreen";
import TermsScreen from "../screens/TermsScreen";
import AboutScreen from "../screens/AboutScreen";

const Stack = createNativeStackNavigator();

function GearButton({ navigation, color }) {
  return (
    <Pressable onPress={() => navigation.navigate("Settings")} hitSlop={12} style={{ paddingHorizontal: 4 }}>
      <Ionicons name="settings-outline" size={22} color={color} />
    </Pressable>
=======
// src/navigation/RootNavigator.jsx
// Auth gate: not signed in → onboarding/sign-in stack; signed in → tabs.
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../theme/ThemeContext";
import { useAuthStore } from "../store/useAuthStore";

import OnboardingScreen from "../screens/OnboardingScreen";
import SignInScreen from "../screens/SignInScreen";
import BrowseScreen from "../screens/BrowseScreen";
import MatchesScreen from "../screens/MatchesScreen";
import PostScreen from "../screens/PostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ListingDetailScreen from "../screens/ListingDetailScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Simple text-glyph tab icons to avoid an icon dependency for now.
const TAB_GLYPH = { Browse: "⚔", Matches: "✦", Post: "✚", Profile: "☰" };

function MainTabs() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: { backgroundColor: theme.surface, borderTopColor: theme.border },
        tabBarIcon: ({ color }) => (
          <Text style={{ color, fontSize: 18 }}>{TAB_GLYPH[route.name] ?? "•"}</Text>
        ),
      })}
    >
      <Tab.Screen name="Browse" component={BrowseScreen} options={{ tabBarLabel: t("tabBrowse") }} />
      <Tab.Screen name="Matches" component={MatchesScreen} options={{ tabBarLabel: t("tabMatches") }} />
      <Tab.Screen name="Post" component={PostScreen} options={{ tabBarLabel: t("tabPost") }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: t("tabProfile") }} />
    </Tab.Navigator>
>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076
  );
}

export default function RootNavigator() {
  const { user, ready, hydrate } = useAuthStore();
<<<<<<< HEAD
  const { theme } = useTheme();
  useEffect(() => { hydrate(); }, []);
  if (!ready) return null;

  const withGear = ({ navigation }) => ({
    headerShown: true, title: "",
    headerStyle: { backgroundColor: theme.bg }, headerTintColor: theme.text, headerShadowVisible: false,
    headerRight: () => <GearButton navigation={navigation} color={theme.textMuted} />,
  });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Showcase" component={ShowcaseScreen} options={withGear} />
          <Stack.Screen name="ViewCode" component={ViewCodeScreen} options={withGear} />
          <Stack.Screen name="Guild" component={GuildScreen} options={withGear} />
          <Stack.Screen name="Events" component={EventsScreen} options={withGear} />
          <Stack.Screen name="ThisWeek" component={ThisWeekScreen} options={withGear} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LanguagePicker" component={LanguagePickerScreen} options={{ headerShown: true, title: "", headerStyle: { backgroundColor: theme.bg }, headerTintColor: theme.text, headerShadowVisible: false }} />
          <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: true, title: "", headerStyle: { backgroundColor: theme.bg }, headerTintColor: theme.text, headerShadowVisible: false }} />
          <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: true, title: "", headerStyle: { backgroundColor: theme.bg }, headerTintColor: theme.text, headerShadowVisible: false }} />
        </>
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} />
=======
  useEffect(() => { hydrate(); }, []);

  if (!ready) return null; // could render a splash here

  const signedIn = !!user;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {signedIn ? (
        <>
          <Stack.Screen name="Tabs" component={MainTabs} />
          <Stack.Screen name="ListingDetail" component={ListingDetailScreen} options={{ headerShown: true, title: "" }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true, title: "" }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: true, title: "" }} />
        </>
>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076
      )}
    </Stack.Navigator>
  );
}
