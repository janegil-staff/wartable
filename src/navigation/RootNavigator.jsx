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
  );
}

export default function RootNavigator() {
  const { user, ready, hydrate } = useAuthStore();
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
      )}
    </Stack.Navigator>
  );
}
