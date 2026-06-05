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
  );
}

export default function RootNavigator() {
  const { user, ready, hydrate } = useAuthStore();
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
      )}
    </Stack.Navigator>
  );
}
