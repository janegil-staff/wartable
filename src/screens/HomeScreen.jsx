// src/screens/HomeScreen.jsx — pick one of your characters, or look one up.
import React, { useState } from "react";
import { View, Text, Pressable, TextInput, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/useAuthStore";
import { classColor } from "../theme/wow";

const REGIONS = ["eu", "us", "kr", "tw"];

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  // Select the raw value; default OUTSIDE the selector. Returning `?? []` from
  // the selector creates a new array each render → Zustand sees a "change" every
  // time → infinite render loop ("Maximum update depth exceeded").
  const user = useAuthStore((s) => s.user);
  const characters = user?.characters ?? [];

  const [region, setRegion] = useState("eu");
  const [realm, setRealm] = useState("");
  const [name, setName] = useState("");

  const open = (region, realm, name) =>
    navigation.navigate("Showcase", { region, realm, name });

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <View style={styles.header}>
        <Text style={[styles.app, { color: theme.accent }]}>{t("appName")}</Text>
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={22} color={theme.textMuted} />
        </Pressable>
      </View>
      <Text style={[styles.tagline, { color: theme.text }]}>{t("tagline")}</Text>

      <FlatList
        data={characters}
        keyExtractor={(c, i) => `${c.name}-${i}`}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        ListHeaderComponent={
          <View style={{ gap: 12, marginBottom: 8 }}>
            {/* manual lookup */}
            <Text style={[styles.label, { color: theme.textMuted }]}>{t("lookup")}</Text>
            <View style={styles.segment}>
              {REGIONS.map((r) => (
                <Pressable key={r} onPress={() => setRegion(r)}
                  style={[styles.seg, { borderColor: theme.border, backgroundColor: region===r?theme.accent:theme.surface }]}>
                  <Text style={{ color: region===r?theme.accentText:theme.text, fontWeight:"800", fontSize:12 }}>{r.toUpperCase()}</Text>
                </Pressable>
              ))}
            </View>
            <View style={[styles.field, { borderColor: theme.border, backgroundColor: theme.surface }]}>
              <TextInput value={realm} onChangeText={setRealm} placeholder={t("realm")}
                placeholderTextColor={theme.textMuted} autoCapitalize="none"
                style={{ flex:1, color: theme.text }} />
            </View>
            <View style={[styles.field, { borderColor: theme.border, backgroundColor: theme.surface }]}>
              <TextInput value={name} onChangeText={setName} placeholder={t("enterCharacter")}
                placeholderTextColor={theme.textMuted}
                style={{ flex:1, color: theme.text }} />
            </View>
            <Pressable
              disabled={!realm.trim() || !name.trim()}
              onPress={() => open(region, realm.trim().toLowerCase(), name.trim())}
              style={[styles.cta, { backgroundColor: (realm.trim()&&name.trim())?theme.accent:theme.surfaceAlt }]}>
              <Ionicons name="search" size={16} color={(realm.trim()&&name.trim())?theme.accentText:theme.textMuted} />
              <Text style={{ color:(realm.trim()&&name.trim())?theme.accentText:theme.textMuted, fontWeight:"800" }}>{t("search")}</Text>
            </Pressable>

            {characters.length > 0 && (
              <Text style={[styles.label, { color: theme.textMuted, marginTop: 8 }]}>{t("myCharacters")}</Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => open(item.region ?? "eu", item.realmSlug, item.name)}
            style={[styles.charRow, { borderColor: theme.border, backgroundColor: theme.surface }]}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: classColor(item.class), fontWeight: "800" }}>{item.name}</Text>
              <Text style={{ color: theme.textMuted, fontSize: 12 }}>
                {item.class ?? ""}{item.level?` · ${item.level}`:""}{item.realmName?` · ${item.realmName}`:""}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingHorizontal:16, paddingTop:8 },
  app: { fontSize:14, fontWeight:"900", letterSpacing:3, textTransform:"uppercase" },
  tagline: { fontSize:24, fontWeight:"900", paddingHorizontal:16, paddingTop:6 },
  label: { fontSize:12, fontWeight:"700", textTransform:"uppercase", letterSpacing:0.6 },
  segment: { flexDirection:"row", gap:8 },
  seg: { flex:1, alignItems:"center", paddingVertical:10, borderRadius:10, borderWidth:1 },
  field: { flexDirection:"row", alignItems:"center", borderWidth:1, borderRadius:12, paddingHorizontal:14, height:48 },
  cta: { flexDirection:"row", alignItems:"center", justifyContent:"center", gap:8, height:48, borderRadius:12 },
  charRow: { flexDirection:"row", alignItems:"center", gap:12, borderWidth:1, borderRadius:12, padding:14 },
  viewCode: { flexDirection:"row", alignItems:"center", justifyContent:"center", gap:8, marginTop:16, padding:14, borderRadius:12, borderWidth:1 },
});
