// src/screens/ViewCodeScreen.jsx — enter a code, see the shared character.
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useViewShare } from "../hooks/useShare";
import CharacterShowcase from "../components/CharacterShowcase";

export default function ViewCodeScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [code, setCode] = useState(null);
  const q = useViewShare(code, !!code);

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }}>
        <Text style={[styles.h1, { color: theme.text }]}>{t("viewCode")}</Text>
        <View style={styles.entry}>
          <TextInput value={input} onChangeText={setInput} placeholder={t("enterCode")}
            placeholderTextColor={theme.textMuted} autoCapitalize="characters" autoCorrect={false}
            style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]} />
          <Pressable onPress={() => setCode(input.trim().toUpperCase())} style={[styles.go, { backgroundColor: theme.accent }]}>
            <Ionicons name="arrow-forward" size={20} color={theme.accentText} />
          </Pressable>
        </View>
        {code && q.isLoading && <View style={styles.center}><ActivityIndicator color={theme.accent} /></View>}
        {code && q.isError && <Text style={{ color: theme.danger, textAlign:"center", marginTop:20 }}>{t("notFound")}</Text>}
        {q.data?.character && <CharacterShowcase c={q.data.character} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  h1: { fontSize: 26, fontWeight: "900" },
  entry: { flexDirection: "row", gap: 10 },
  input: { flex:1, borderWidth:1, borderRadius:12, paddingHorizontal:14, height:50, fontSize:18, fontWeight:"800", letterSpacing:3 },
  go: { width:50, height:50, borderRadius:12, alignItems:"center", justifyContent:"center" },
  center: { alignItems: "center", marginTop: 24 },
});
