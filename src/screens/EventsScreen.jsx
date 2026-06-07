// src/screens/EventsScreen.jsx — upcoming guild events + RSVP + create.
import React, { useState } from "react";
import { View, Text, Pressable, FlatList, TextInput, Modal, Platform, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useEvents, useCreateEvent, useRsvp } from "../hooks/useEvents";

const TYPE_ICON = { raid: "skull", mythicplus: "key", pvp: "flag", social: "beer", other: "calendar" };

function fmt(d) {
  try { return new Date(d).toLocaleString([], { weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }); }
  catch { return d; }
}

export default function EventsScreen({ route }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { region, realm, name } = route.params ?? {};
  const guild = { region, realmSlug: realm, name };
  const q = useEvents({ region, realm, name });
  const create = useCreateEvent();
  const rsvp = useRsvp();
  const [showForm, setShowForm] = useState(false);

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg }]} edges={["top"]}>
      <View style={styles.header}>
        <Text style={[styles.h1, { color: theme.text }]}>{t("events") || "Events"}</Text>
        <Pressable onPress={() => setShowForm(true)} style={[styles.newBtn, { backgroundColor: theme.accent }]}>
          <Ionicons name="add" size={18} color={theme.accentText} />
          <Text style={{ color: theme.accentText, fontWeight: "800" }}>{t("newEvent") || "New"}</Text>
        </Pressable>
      </View>

      {q.isLoading ? (
        <View style={styles.center}><ActivityIndicator color={theme.accent} /></View>
      ) : (
        <FlatList
          data={q.data ?? []}
          keyExtractor={(e) => e._id}
          contentContainerStyle={{ padding: 16, gap: 12 }}
          renderItem={({ item }) => {
            const counts = { yes: 0, maybe: 0, no: 0 };
            (item.rsvps ?? []).forEach((r) => { counts[r.status] = (counts[r.status] || 0) + 1; });
            return (
              <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Ionicons name={TYPE_ICON[item.type] || "calendar"} size={18} color={theme.accent} />
                  <Text style={{ color: theme.text, fontWeight: "800", fontSize: 16, flex: 1 }}>{item.title}</Text>
                </View>
                <Text style={{ color: theme.textMuted, marginTop: 4 }}>{fmt(item.startsAt)}</Text>
                {item.note ? <Text style={{ color: theme.textMuted, fontSize: 13, marginTop: 6 }}>{item.note}</Text> : null}

                <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
                  {["yes", "maybe", "no"].map((s) => (
                    <Pressable key={s} onPress={() => rsvp.mutate({ id: item._id, status: s })}
                      style={[styles.rsvpBtn, { borderColor: theme.border, backgroundColor: theme.bg }]}>
                      <Text style={{ color: s === "yes" ? theme.success : s === "no" ? theme.danger : theme.textMuted, fontWeight: "700", fontSize: 13 }}>
                        {(t(s) || s)} · {counts[s]}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            );
          }}
          ListEmptyComponent={<Text style={{ color: theme.textMuted, textAlign: "center", marginTop: 40 }}>{t("noEvents") || "No upcoming events"}</Text>}
        />
      )}

      <CreateEventModal visible={showForm} onClose={() => setShowForm(false)} guild={guild}
        theme={theme} t={t} create={create} />
    </SafeAreaView>
  );
}

function CreateEventModal({ visible, onClose, guild, theme, t, create }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("raid");
  const [when, setWhen] = useState("");  // simple ISO-ish text for v1
  const [note, setNote] = useState("");

  const submit = async () => {
    if (!title.trim() || !when.trim()) return;
    const startsAt = new Date(when).toISOString();
    await create.mutateAsync({ guild, title: title.trim(), type, startsAt, note: note.trim() });
    setTitle(""); setWhen(""); setNote(""); onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalWrap}>
        <View style={[styles.modal, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.h1, { color: theme.text, fontSize: 20 }]}>{t("newEvent") || "New event"}</Text>
          <TextInput value={title} onChangeText={setTitle} placeholder={t("eventTitle") || "Title (e.g. Mythic Raid)"}
            placeholderTextColor={theme.textMuted} style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.bg }]} />
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            {["raid", "mythicplus", "pvp", "social"].map((ty) => (
              <Pressable key={ty} onPress={() => setType(ty)}
                style={[styles.typeChip, { borderColor: type === ty ? theme.accent : theme.border, backgroundColor: type === ty ? theme.accentSoft : theme.bg }]}>
                <Text style={{ color: type === ty ? theme.accent : theme.text, fontWeight: "700", fontSize: 12 }}>{ty}</Text>
              </Pressable>
            ))}
          </View>
          <TextInput value={when} onChangeText={setWhen} placeholder="2026-06-10 20:00"
            placeholderTextColor={theme.textMuted} style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.bg }]} />
          <TextInput value={note} onChangeText={setNote} placeholder={t("note") || "Note (optional)"} multiline
            placeholderTextColor={theme.textMuted} style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.bg, height: 70 }]} />
          <View style={{ flexDirection: "row", gap: 10, marginTop: 6 }}>
            <Pressable onPress={onClose} style={[styles.modalBtn, { borderColor: theme.border }]}>
              <Text style={{ color: theme.text, fontWeight: "700" }}>{t("cancel") || "Cancel"}</Text>
            </Pressable>
            <Pressable onPress={submit} disabled={create.isPending} style={[styles.modalBtn, { backgroundColor: theme.accent, borderColor: theme.accent }]}>
              {create.isPending ? <ActivityIndicator color={theme.accentText} /> : <Text style={{ color: theme.accentText, fontWeight: "800" }}>{t("create") || "Create"}</Text>}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 },
  h1: { fontSize: 26, fontWeight: "900" },
  newBtn: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  card: { borderWidth: 1, borderRadius: 14, padding: 16 },
  rsvpBtn: { flex: 1, alignItems: "center", paddingVertical: 9, borderRadius: 10, borderWidth: 1 },
  modalWrap: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" },
  modal: { borderTopLeftRadius: 20, borderTopRightRadius: 20, borderWidth: 1, padding: 20, gap: 12 },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  typeChip: { borderWidth: 1, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 7 },
  modalBtn: { flex: 1, alignItems: "center", paddingVertical: 13, borderRadius: 12, borderWidth: 1 },
});
