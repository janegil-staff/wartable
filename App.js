<<<<<<< HEAD
import "react-native-gesture-handler";
=======

>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
=======

>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076
import "./src/i18n";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import RootNavigator from "./src/navigation/RootNavigator";

const queryClient = new QueryClient();

function NavWithTheme() {
  const { theme } = useTheme();
<<<<<<< HEAD
  const base = theme.mode === "dark" ? DarkTheme : DefaultTheme;
  const navTheme = { ...base, colors: { ...base.colors, background: theme.bg, card: theme.surface, text: theme.text, border: theme.border, primary: theme.accent } };
=======
  const navTheme = {
    ...(theme.mode === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme.mode === "dark" ? DarkTheme : DefaultTheme).colors,
      background: theme.bg,
      card: theme.surface,
      text: theme.text,
      border: theme.border,
      primary: theme.accent,
    },
  };
>>>>>>> 31a729d889a7d29a1b45562a6a1883bfdc545076
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NavWithTheme />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
