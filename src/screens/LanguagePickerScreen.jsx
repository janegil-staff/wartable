// src/screens/LanguagePickerScreen.jsx — radio list of languages (flag + native
// + English name), current one selected. Tapping switches language + goes back.
import React from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { LANG_META, LANG_ORDER } from "../i18n/langMeta";

export default function LanguagePickerScreen({ navigation }) {
  const { theme } = useTheme();
  const { i18n } = useTranslation();
  const current = i18n.language;

  const choose = (code) => {
    i18n.changeLanguage(code);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <FlatList
        data={LANG_ORDER}
        keyExtractor={(c) => c}
        renderItem={({ item: code }) => {
          const m = LANG_META[code];
          const selected = current === code;
          return (
            <Pressable onPress={() => choose(code)}
              style={[styles.row, { borderBottomColor: theme.border, backgroundColor: theme.bg }]}>
              <View style={[styles.radioOuter, { borderColor: selected ? theme.accent : theme.border }]}>
                {selected ? <View style={[styles.radioInner, { backgroundColor: theme.accent }]} /> : null}
              </View>
              <Text style={{ fontSize: 26, marginHorizontal: 14 }}>{m.flag}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.text, fontSize: 18, fontWeight: "700" }}>{m.native}</Text>
                {m.native !== m.english ? <Text style={{ color: theme.textMuted, fontSize: 14 }}>{m.english}</Text> : null}
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 18, paddingHorizontal: 16, borderBottomWidth: 1 },
  radioOuter: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  radioInner: { width: 13, height: 13, borderRadius: 7 },
});
