// src/navigation/ShowcaseTabBar.jsx — custom bottom bar for the character view.
// Four tabs (Overview · Gear / Progress · Code) flank an elevated center SHARE
// FAB; tapping the FAB jumps to the Code tab (which is the share screen).
import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext";

const ICONS = { Overview: "person", Gear: "shield-half", Progress: "trending-up", Code: "card" };

export default function ShowcaseTabBar({ state, descriptors, navigation }) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const routes = state.routes;
  const mid = Math.ceil(routes.length / 2);
  const left = routes.slice(0, mid);
  const right = routes.slice(mid);

  const renderTab = (route) => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel ?? options.title ?? route.name;
    const isFocused = state.routes[state.index].key === route.key;
    const onPress = () => {
      const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
      if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
    };
    const color = isFocused ? theme.accent : theme.textMuted;
    return (
      <Pressable key={route.key} onPress={onPress} style={styles.tab}>
        <Ionicons name={ICONS[route.name] ?? "ellipse"} size={22} color={color} />
        <Text style={{ color, fontSize: 10, fontWeight: "700", marginTop: 2 }} numberOfLines={1}>{label}</Text>
      </Pressable>
    );
  };

  const goShare = () => navigation.navigate("Code");

  return (
    <View style={[styles.wrap, { backgroundColor: theme.surface, borderTopColor: theme.border, paddingBottom: insets.bottom }]}>
      <View style={styles.row}>
        {left.map(renderTab)}
        <View style={styles.fabSlot} />
        {right.map(renderTab)}
      </View>
      <Pressable onPress={goShare} style={[styles.fab, { backgroundColor: theme.accent, shadowColor: theme.accent, borderColor: theme.bg }]}>
        <Ionicons name="share-social" size={26} color={theme.accentText} />
      </Pressable>
    </View>
  );
}

const FAB = 64;
const styles = StyleSheet.create({
  wrap: { borderTopWidth: 1 },
  row: { flexDirection: "row", height: 60, alignItems: "center" },
  tab: { flex: 1, alignItems: "center", justifyContent: "center" },
  fabSlot: { width: FAB + 16 },
  fab: {
    position: "absolute", alignSelf: "center", top: -FAB / 2,
    width: FAB, height: FAB, borderRadius: FAB / 2, borderWidth: 4,
    alignItems: "center", justifyContent: "center",
    shadowOpacity: 0.5, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 8,
  },
});
