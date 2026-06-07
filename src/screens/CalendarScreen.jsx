// src/screens/CalendarScreen.jsx — Recover-styled month calendar for the
// selected character. Cells fill by play/progress and light up for dated
// history. Tap a day for its activity digest.
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import client from "../api/client";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useCalendar } from "../hooks/useCalendar";

function pad(n) {
  return String(n).padStart(2, "0");
}
function ymd(y, m, d) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}
function daysInMonth(y, m) {
  return new Date(y, m + 1, 0).getDate();
}
function firstDow(y, m) {
  return (new Date(y, m, 1).getDay() + 6) % 7;
}
function bossTotal(s) {
  let n = 0;
  (s?.raids ?? []).forEach((r) =>
    (r.modes ?? []).forEach((m) => {
      n += m.completed ?? 0;
    }),
  );
  return n;
}

export default function CalendarScreen({ route }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const params = route?.params ?? {};
  const { region = "eu", realm, name, guildRealm, guildName } = params;

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [modalDate, setModalDate] = useState(null);

  const from = ymd(year, month, 1);
  const to = ymd(year, month, daysInMonth(year, month));
  const q = useCalendar({
    region,
    realm,
    name,
    from,
    to,
    guildRealm,
    guildName,
  });

  const digestQ = useQuery({
    queryKey: ["digest", region, realm, name, modalDate],
    enabled: !!modalDate && !!realm && !!name,
    retry: false,
    queryFn: async () => {
      const { data } = await client.get(
        `/progress/${region}/${encodeURIComponent(realm)}/${encodeURIComponent(name)}/day/${modalDate}`,
      );
      return data;
    },
  });

  const byDay = useMemo(() => {
    const map = {};
    const snaps = q.data?.progress?.snapshots ?? [];
    snaps.forEach((s, i) => {
      const prev = snaps[i - 1];
      const ilvlUp = prev ? (s.ilvl ?? 0) - (prev.ilvl ?? 0) : 0;
      const newKills = prev ? Math.max(0, bossTotal(s) - bossTotal(prev)) : 0;
      const ratingUp = prev
        ? (s.mythicRating ?? 0) - (prev.mythicRating ?? 0)
        : 0;
      map[s.date] = {
        snap: s,
        ilvlUp,
        newKills,
        ratingUp,
        played: s.played,
        events: [],
      };
    });
    (q.data?.charEvents ?? []).forEach((e) => {
      if (!map[e.date])
        map[e.date] = {
          snap: null,
          ilvlUp: 0,
          newKills: 0,
          ratingUp: 0,
          played: false,
          events: [],
        };
      map[e.date].events.push(e);
    });
    return map;
  }, [q.data]);

  const resetSet = useMemo(
    () => new Set(q.data?.schedule?.resets ?? []),
    [q.data],
  );
  const affixes = q.data?.schedule?.affixes ?? [];

  const PRIMARY = theme.accent;
  const CARD = theme.surface;
  const TEXT = theme.text;
  const MUTED = theme.textMuted;
  const BORDER = theme.border;
  const GOLD = theme.gold || "#f7a335";
  const PURPLE = theme.purple || "#a78bfa";
  const SOFT = theme.accentSoft || "rgba(78,122,181,0.22)";

  const months = t.months ?? [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const weekdays = t.weekdays ?? ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const todayStr = ymd(now.getFullYear(), now.getMonth(), now.getDate());

  const goBack = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else setMonth((m) => m - 1);
  };
  const goFwd = () => {
    if (year === now.getFullYear() && month === now.getMonth()) return;
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else setMonth((m) => m + 1);
  };
  const isCurrent = year === now.getFullYear() && month === now.getMonth();

  const total = daysInMonth(year, month);
  const offset = firstDow(year, month);
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {affixes.length > 0 && (
          <View
            style={[
              cal.card,
              {
                backgroundColor: CARD,
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              },
            ]}
          >
            <Ionicons name="key" size={14} color={PRIMARY} />
            <Text
              style={{ color: MUTED, fontSize: 12, flex: 1 }}
              numberOfLines={1}
            >
              {affixes.join(" · ")}
            </Text>
          </View>
        )}

        <View style={cal.monthNav}>
          <Pressable onPress={goBack} style={cal.navBtn}>
            <Text style={[cal.navArrow, { color: TEXT }]}>‹</Text>
          </Pressable>
          <Text style={[cal.monthTitle, { color: TEXT }]}>
            {(months[month] ?? "").toUpperCase()} {year}
          </Text>
          <Pressable
            onPress={goFwd}
            style={[cal.navBtn, isCurrent && { opacity: 0.3 }]}
            disabled={isCurrent}
          >
            <Text style={[cal.navArrow, { color: isCurrent ? MUTED : TEXT }]}>
              ›
            </Text>
          </Pressable>
        </View>

        <View style={[cal.card, { backgroundColor: CARD }]}>
          <View style={cal.weekdayRow}>
            {weekdays.map((d, i) => (
              <Text key={i} style={[cal.weekdayLabel, { color: MUTED }]}>
                {d}
              </Text>
            ))}
          </View>
          {q.isLoading ? (
            <ActivityIndicator color={PRIMARY} style={{ marginVertical: 24 }} />
          ) : (
            Array.from({ length: Math.ceil(cells.length / 7) }).map((_, wi) => (
              <View key={`w${wi}`} style={cal.weekRow}>
                {cells.slice(wi * 7, wi * 7 + 7).map((day, i) => {
                  if (!day) return <View key={`e${i}`} style={cal.cell} />;
                  const ds = ymd(year, month, day);
                  const info = byDay[ds];
                  const isToday = ds === todayStr;
                  const isReset = resetSet.has(ds);
                  const played = info?.played;
                  const hasEvents = (info?.events?.length ?? 0) > 0;
                  const hasMplus = info?.events?.some(
                    (e) => e.kind === "mplusRun",
                  );
                  const hasAchv = info?.events?.some(
                    (e) => e.kind === "achievement",
                  );
                  const hasProgress =
                    info &&
                    (info.ilvlUp > 0 ||
                      info.newKills > 0 ||
                      info.ratingUp > 0 ||
                      hasMplus);
                  const clickable = !!info?.snap || hasEvents || isReset;
                  return (
                    <Pressable
                      key={ds}
                      style={cal.cell}
                      onPress={() => clickable && setModalDate(ds)}
                    >
                      <View
                        style={[
                          cal.cellInner,
                          { borderColor: BORDER },
                          (played || hasEvents) &&
                            !hasProgress && {
                              backgroundColor: SOFT,
                              borderColor: BORDER,
                            },
                          hasProgress && {
                            backgroundColor: PRIMARY,
                            borderColor: PRIMARY,
                          },
                          isToday &&
                            !hasProgress &&
                            !played &&
                            !hasEvents && {
                              borderColor: PRIMARY,
                              borderWidth: 2,
                            },
                        ]}
                      >
                        <Text
                          style={[
                            cal.cellText,
                            { color: hasProgress ? "#fff" : TEXT },
                            isToday &&
                              !hasProgress && {
                                color: PRIMARY,
                                fontWeight: "800",
                              },
                          ]}
                        >
                          {day}
                        </Text>
                        <View style={cal.markers}>
                          {info?.newKills > 0 || hasMplus ? (
                            <View
                              style={[cal.dot, { backgroundColor: GOLD }]}
                            />
                          ) : null}
                          {hasAchv ? (
                            <View
                              style={[cal.dot, { backgroundColor: PURPLE }]}
                            />
                          ) : null}
                          {isReset ? (
                            <View
                              style={[cal.dot, { backgroundColor: MUTED }]}
                            />
                          ) : null}
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            ))
          )}
        </View>

        <View
          style={[cal.card, { backgroundColor: CARD, paddingVertical: 10 }]}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <Legend
              swatch={PRIMARY}
              label={t("progress") || "Progress"}
              muted={MUTED}
            />
            <Legend
              swatch={SOFT}
              label={t("played") || "Played"}
              muted={MUTED}
            />
            <Legend
              dot={GOLD}
              label={t("mythicPlus") || "M+ run"}
              muted={MUTED}
            />
            <Legend
              dot={PURPLE}
              label={t("achievement") || "Achievement"}
              muted={MUTED}
            />
            <Legend dot={MUTED} label={t("reset") || "Reset"} muted={MUTED} />
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={!!modalDate}
        transparent
        animationType="fade"
        onRequestClose={() => setModalDate(null)}
      >
        <Pressable style={cal.backdrop} onPress={() => setModalDate(null)}>
          <Pressable
            style={[cal.modal, { backgroundColor: CARD }]}
            onPress={(e) => e.stopPropagation()}
          >
            <Text
              style={{
                color: TEXT,
                fontSize: 20,
                fontWeight: "900",
                marginBottom: 2,
              }}
            >
              {prettyDate(modalDate)}
            </Text>
            <Text style={{ color: MUTED, fontSize: 12, marginBottom: 16 }}>
              {modalDate === todayStr
                ? tr(t, "today", "Today")
                : weekdayName(modalDate)}
            </Text>

            <ScrollView style={{ maxHeight: 360 }}>
              {digestQ.isLoading ? (
                <ActivityIndicator
                  color={PRIMARY}
                  style={{ marginVertical: 24 }}
                />
              ) : digestQ.data?.events?.length ? (
                digestQ.data.events.map((ev, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      paddingVertical: 9,
                      borderBottomWidth: 1,
                      borderBottomColor: BORDER,
                    }}
                  >
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: digestColor(ev.type, theme) + "22",
                      }}
                    >
                      <Ionicons
                        name={digestIcon(ev.type)}
                        size={16}
                        color={digestColor(ev.type, theme)}
                      />
                    </View>
                    <Text style={{ color: TEXT, fontSize: 14, flex: 1 }}>
                      {ev.label}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={{ alignItems: "center", paddingVertical: 28 }}>
                  <View
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: SOFT,
                      marginBottom: 12,
                    }}
                  >
                    <Ionicons
                      name={
                        digestQ.data?.played
                          ? "game-controller-outline"
                          : "moon-outline"
                      }
                      size={26}
                      color={PRIMARY}
                    />
                  </View>
                  <Text
                    style={{
                      color: TEXT,
                      fontSize: 15,
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    {digestQ.data?.played
                      ? tr(t, "playedTitle", "You played")
                      : tr(t, "quietDayTitle", "A quiet day")}
                  </Text>
                  <Text
                    style={{
                      color: MUTED,
                      fontSize: 13,
                      textAlign: "center",
                      marginTop: 4,
                      paddingHorizontal: 12,
                    }}
                  >
                    {digestQ.data?.played
                      ? tr(
                          t,
                          "playedNoChange",
                          "Logged in, but nothing tracked changed.",
                        )
                      : tr(
                          t,
                          "nothingThisDay",
                          "No recorded activity for this day.",
                        )}
                  </Text>
                </View>
              )}

              {resetSet.has(modalDate) && (
                <View
                  style={{
                    marginTop: 14,
                    paddingTop: 14,
                    borderTopWidth: 1,
                    borderTopColor: BORDER,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Ionicons name="refresh-circle" size={18} color={GOLD} />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{ color: GOLD, fontWeight: "800", fontSize: 13 }}
                    >
                      {tr(t, "weeklyReset", "Weekly reset")}
                    </Text>
                    {affixes.length > 0 ? (
                      <Text
                        style={{ color: MUTED, fontSize: 12, marginTop: 1 }}
                      >
                        {affixes.join(" · ")}
                      </Text>
                    ) : null}
                  </View>
                </View>
              )}
            </ScrollView>

            <Pressable
              onPress={() => setModalDate(null)}
              style={[cal.closeBtn, { backgroundColor: PRIMARY }]}
            >
              <Text
                style={{ color: theme.accentText || "#fff", fontWeight: "700" }}
              >
                {tr(t, "close", "Close")}
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function Legend({ swatch, dot, label, muted }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      {swatch ? (
        <View
          style={{
            width: 11,
            height: 11,
            borderRadius: 3,
            backgroundColor: swatch,
          }}
        />
      ) : (
        <View
          style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: dot }}
        />
      )}
      <Text style={{ fontSize: 11, color: muted }}>{label}</Text>
    </View>
  );
}

function tr(t, key, fallback) {
  const v = t(key);
  return !v || v === key ? fallback : v;
}

function prettyDate(ds) {
  if (!ds) return "";
  const [y, m, d] = ds.split("-").map(Number);
  const MON = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${MON[m - 1]} ${d}, ${y}`;
}

function weekdayName(ds) {
  if (!ds) return "";
  const dt = new Date(ds + "T00:00:00");
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][dt.getDay()];
}

function digestIcon(type) {
  return (
    {
      ilvl: "arrow-up",
      level: "star",
      mplusRating: "key",
      mplusRun: "key",
      bosses: "skull",
      achievement: "trophy",
      achvPoints: "trophy",
      quests: "checkmark-done",
    }[type] || "ellipse"
  );
}

function digestColor(type, theme) {
  if (type === "bosses" || type === "mplusRun" || type === "mplusRating")
    return theme.accent;
  if (type === "achievement" || type === "achvPoints")
    return theme.gold || "#f7a335";
  return theme.success || "#22C55E";
}

const cal = StyleSheet.create({
  monthNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navBtn: { padding: 8 },
  navArrow: { fontSize: 28, fontWeight: "300" },
  monthTitle: { fontSize: 16, fontWeight: "800", letterSpacing: 1 },
  card: {
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  weekdayRow: { flexDirection: "row", marginBottom: 6 },
  weekdayLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "700",
  },
  weekRow: { flexDirection: "row" },
  cell: { flex: 1, aspectRatio: 1, paddingHorizontal: 4, paddingVertical: 4 },
  cellInner: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1.5,
    overflow: "visible",
  },
  cellText: { fontSize: 13, fontWeight: "600" },
  markers: { flexDirection: "row", gap: 2, position: "absolute", bottom: -5 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modal: { borderRadius: 20, padding: 20, maxHeight: "80%" },
  closeBtn: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
});
