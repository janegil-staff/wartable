// src/components/GuildMemberModal.jsx — full scorecard modal for a guild member.
// Leads with three co-equal headline stats (Mythic+ · Item Level · Raid), then
// best M+ runs, professions, and full per-raid/per-difficulty boss lists, then
// a soft "last seen" line. Opens instantly from roster data, fetches the full
// profile via useCharacter (React Query caches it, so re-taps are instant).
import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useCharacter } from "../hooks/useCharacter";
import { classColor, factionTheme } from "../theme/wow";
import FactionEmblem from "./FactionEmblem";

var DIFF_ORDER = ["RAID FINDER", "NORMAL", "HEROIC", "MYTHIC"];
var DIFF_SHORT = {
  "RAID FINDER": "RF",
  NORMAL: "N",
  HEROIC: "H",
  MYTHIC: "M",
  LFR: "RF",
};

function lastSeen(ts, t) {
  if (!ts) return null;
  var then = typeof ts === "number" ? ts : Date.parse(ts);
  if (!then || isNaN(then)) return null;
  var diff = Date.now() - then;
  if (diff < 0) diff = 0;
  var min = Math.floor(diff / 60000);
  if (min < 10) return t("activeNow") || "Active now";
  if (min < 60)
    return (t("lastSeenMinutes") || "Last seen {n} min ago").replace(
      "{n}",
      String(min),
    );
  var hr = Math.floor(min / 60);
  if (hr < 24)
    return (t("lastSeenHours") || "Last seen {n}h ago").replace(
      "{n}",
      String(hr),
    );
  var day = Math.floor(hr / 24);
  if (day < 30)
    return (t("lastSeenDays") || "Last seen {n}d ago").replace(
      "{n}",
      String(day),
    );
  var mon = Math.floor(day / 30);
  return (t("lastSeenMonths") || "Last seen {n}mo ago").replace(
    "{n}",
    String(mon),
  );
}

// Highest cleared difficulty + boss count, for the headline raid number.
// Backend shape: raids[].modes[] = { difficulty, completed, total, bosses[] }.
function topRaidProgress(raids) {
  if (!raids || !raids.length) return null;
  var best = null;
  raids.forEach(function (raid) {
    (raid.modes || []).forEach(function (m) {
      var rank = DIFF_ORDER.indexOf((m.difficulty || "").toUpperCase());
      if ((m.completed || 0) > 0 && rank >= 0) {
        if (!best || rank > best.rank) {
          best = {
            rank: rank,
            diff: (m.difficulty || "").toUpperCase(),
            completed: m.completed,
            total: m.total,
            raid: raid.name,
          };
        }
      }
    });
  });
  return best;
}

export default function GuildMemberModal({
  visible,
  member,
  region,
  realm,
  onClose,
}) {
  var { theme } = useTheme();
  var { t } = useTranslation();

  var q = useCharacter({
    region: region,
    realm: realm,
    name: member ? member.name : null,
    enabled: !!(visible && member && member.name),
  });

  var c = q.data;
  var cls = (c && c.class) || (member && member.class);
  var cc = classColor(cls);
  var fac = factionTheme(c && c.faction);
  var seen = c ? lastSeen(c.lastLogin, t) : null;

  var rating = c && c.mythicPlus ? c.mythicPlus.currentRating : null;
  var topRaid = c ? topRaidProgress(c.raids) : null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View
          style={[
            styles.sheet,
            { backgroundColor: theme.bg, borderColor: theme.border },
          ]}
        >
          <View style={styles.handleRow}>
            <View style={[styles.handle, { backgroundColor: theme.border }]} />
            <Pressable onPress={onClose} hitSlop={12} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color={theme.textMuted} />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 8 }}>
            {/* COMPACT HERO — render + name + class line */}
            <View
              style={[
                styles.hero,
                { borderColor: fac.glow, backgroundColor: fac.soft },
              ]}
            >
              {c && c.render ? (
                <Image
                  source={{ uri: c.render }}
                  style={styles.render}
                  resizeMode="contain"
                />
              ) : (
                <View
                  style={[
                    styles.render,
                    { alignItems: "center", justifyContent: "center" },
                  ]}
                >
                  {q.isLoading ? (
                    <ActivityIndicator color={theme.accent} />
                  ) : (
                    <FactionEmblem faction={c && c.faction} size={44} />
                  )}
                </View>
              )}
              <View style={styles.scrim} />
              <View style={styles.heroContent}>
                <Text style={[styles.name, { color: cc }]} numberOfLines={1}>
                  {member && member.rank === 0 ? "★ " : ""}
                  {member ? member.name : ""}
                </Text>
                <Text style={styles.sub} numberOfLines={1}>
                  {[c && c.spec, cls, c && c.race].filter(Boolean).join(" · ")}
                </Text>
              </View>
            </View>

            {/* THREE CO-EQUAL HEADLINE STATS */}
            <View style={styles.headlineRow}>
              <Headline
                theme={theme}
                color={theme.gold || "#f7a335"}
                value={rating != null ? rating : "—"}
                label={t("mythicPlus") || "Mythic+"}
              />
              <Headline
                theme={theme}
                color={cc}
                value={(c && c.ilvl) || (member && member.ilvl) || "—"}
                label={t("itemLevel") || "Item Level"}
              />
              <Headline
                theme={theme}
                color={theme.accent}
                value={topRaid ? topRaid.completed + "/" + topRaid.total : "—"}
                label={
                  topRaid
                    ? (DIFF_SHORT[topRaid.diff] || topRaid.diff) +
                      " " +
                      (t("raid") || "Raid")
                    : t("raid") || "Raid"
                }
              />
            </View>

            {q.isLoading ? (
              <View style={{ padding: 20, alignItems: "center" }}>
                <ActivityIndicator color={theme.accent} />
              </View>
            ) : q.isError ? (
              <Text
                style={{
                  color: theme.textMuted,
                  textAlign: "center",
                  padding: 16,
                }}
              >
                {t("couldntLoad") || "Couldn't load this character right now."}
              </Text>
            ) : (
              <>
                {/* MYTHIC+ best runs */}
                {c &&
                c.mythicPlus &&
                c.mythicPlus.bestRuns &&
                c.mythicPlus.bestRuns.length ? (
                  <View
                    style={[
                      styles.card,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <View style={styles.cardHead}>
                      <Ionicons name="key" size={15} color={theme.accent} />
                      <Text style={[styles.cardTitle, { color: theme.text }]}>
                        {t("mythicPlus") || "Mythic+"}
                      </Text>
                    </View>
                    {c.mythicPlus.bestRuns.map(function (r, i) {
                      return (
                        <View
                          key={i}
                          style={[
                            styles.runRow,
                            { borderBottomColor: theme.border },
                          ]}
                        >
                          <Text
                            style={{
                              color: theme.text,
                              flex: 1,
                              fontWeight: "600",
                            }}
                            numberOfLines={1}
                          >
                            {r.dungeon}
                          </Text>
                          <Text
                            style={{
                              color: r.completed
                                ? theme.success
                                : theme.textMuted,
                              fontWeight: "800",
                            }}
                          >
                            +{r.level}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ) : null}

                {/* PROFESSIONS — name + skill/max */}
                {c && c.professions && c.professions.length ? (
                  <View
                    style={[
                      styles.card,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <View style={styles.cardHead}>
                      <Ionicons name="hammer" size={15} color={theme.accent} />
                      <Text style={[styles.cardTitle, { color: theme.text }]}>
                        {t("professions") || "Professions"}
                      </Text>
                    </View>
                    {c.professions.map(function (p, i) {
                      if (!p.name) return null;
                      return (
                        <View
                          key={i}
                          style={[
                            styles.profRow,
                            { borderBottomColor: theme.border },
                          ]}
                        >
                          <Text
                            style={{
                              color: theme.text,
                              flex: 1,
                              fontWeight: "600",
                            }}
                            numberOfLines={1}
                          >
                            {p.name}
                          </Text>
                          {p.skill != null ? (
                            <Text
                              style={{
                                color: theme.textMuted,
                                fontWeight: "700",
                                fontSize: 13,
                              }}
                            >
                              {p.skill}
                              {p.max ? "/" + p.max : ""}
                            </Text>
                          ) : null}
                        </View>
                      );
                    })}
                  </View>
                ) : null}

                {/* RAIDS — per difficulty, with full boss list */}
                {c && c.raids && c.raids.length ? (
                  <View
                    style={[
                      styles.card,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <View style={styles.cardHead}>
                      <Ionicons name="skull" size={15} color={theme.accent} />
                      <Text style={[styles.cardTitle, { color: theme.text }]}>
                        {t("raids") || "Raids"}
                      </Text>
                    </View>
                    {c.raids.map(function (raid, ri) {
                      return (
                        <View key={ri} style={{ marginTop: ri ? 14 : 0 }}>
                          <Text
                            style={{
                              color: theme.text,
                              fontWeight: "800",
                              fontSize: 14,
                            }}
                            numberOfLines={1}
                          >
                            {raid.name}
                          </Text>
                          <View style={styles.pillRow}>
                            {(raid.modes || []).map(function (m, mi) {
                              var short =
                                DIFF_SHORT[
                                  (m.difficulty || "").toUpperCase()
                                ] || m.difficulty;
                              return (
                                <View
                                  key={mi}
                                  style={[
                                    styles.pill,
                                    {
                                      borderColor: theme.border,
                                      backgroundColor: theme.bg,
                                    },
                                  ]}
                                >
                                  <Text
                                    style={{
                                      color: theme.textMuted,
                                      fontSize: 11,
                                      fontWeight: "700",
                                    }}
                                  >
                                    {short} {m.completed}/{m.total}
                                  </Text>
                                </View>
                              );
                            })}
                          </View>
                          {/* bosses live inside each mode; show the highest difficulty
                              that has boss data so we don't repeat the same bosses */}
                          {(function () {
                            var modes = raid.modes || [];
                            var withBosses = modes.filter(function (m) {
                              return m.bosses && m.bosses.length;
                            });
                            if (!withBosses.length) return null;
                            // pick the highest-difficulty mode that has bosses
                            var topMode = withBosses.reduce(function (acc, m) {
                              var rank = DIFF_ORDER.indexOf(
                                (m.difficulty || "").toUpperCase(),
                              );
                              if (!acc || rank > acc.rank)
                                return { rank: rank, mode: m };
                              return acc;
                            }, null);
                            var m = topMode.mode;
                            return (
                              <View style={{ marginTop: 8 }}>
                                <Text
                                  style={{
                                    color: theme.textMuted,
                                    fontSize: 11,
                                    fontWeight: "700",
                                    textTransform: "uppercase",
                                    marginBottom: 4,
                                  }}
                                >
                                  {DIFF_SHORT[
                                    (m.difficulty || "").toUpperCase()
                                  ] || m.difficulty}
                                </Text>
                                {m.bosses.map(function (b, bi) {
                                  var killed = !!(
                                    b.killed ||
                                    (b.kills && b.kills > 0)
                                  );
                                  return (
                                    <View key={bi} style={styles.bossRow}>
                                      <Ionicons
                                        name={
                                          killed
                                            ? "checkmark-circle"
                                            : "ellipse-outline"
                                        }
                                        size={15}
                                        color={
                                          killed
                                            ? theme.success
                                            : theme.textMuted
                                        }
                                      />
                                      <Text
                                        style={{
                                          color: killed
                                            ? theme.text
                                            : theme.textMuted,
                                          flex: 1,
                                          fontSize: 13,
                                        }}
                                        numberOfLines={1}
                                      >
                                        {b.name}
                                      </Text>
                                      {b.kills && b.kills > 1 ? (
                                        <Text
                                          style={{
                                            color: theme.textMuted,
                                            fontSize: 11,
                                          }}
                                        >
                                          ×{b.kills}
                                        </Text>
                                      ) : null}
                                    </View>
                                  );
                                })}
                              </View>
                            );
                          })()}
                        </View>
                      );
                    })}
                  </View>
                ) : null}

                {/* secondary stats: level · achievements · last seen */}
                <View
                  style={[
                    styles.statsStrip,
                    {
                      backgroundColor: theme.surface,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <Stat
                    theme={theme}
                    label={t("level") || "Level"}
                    value={(c && c.level) || (member && member.level)}
                  />
                  <View
                    style={[styles.vdiv, { backgroundColor: theme.border }]}
                  />
                  <Stat
                    theme={theme}
                    label={t("achievements") || "Achv"}
                    value={(c && c.achievementPoints) ?? "—"}
                  />
                  {seen ? (
                    <View
                      style={[styles.vdiv, { backgroundColor: theme.border }]}
                    />
                  ) : null}
                  {seen ? (
                    <View style={{ flex: 1.4, alignItems: "center" }}>
                      <Text
                        style={{
                          color: theme.text,
                          fontWeight: "700",
                          fontSize: 12,
                          textAlign: "center",
                        }}
                        numberOfLines={1}
                      >
                        {seen}
                      </Text>
                      <Text
                        style={{
                          color: theme.textMuted,
                          fontSize: 10,
                          fontWeight: "700",
                          textTransform: "uppercase",
                        }}
                      >
                        {t("activity") || "Activity"}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function Headline({ theme, color, value, label }) {
  return (
    <View
      style={[
        styles.headline,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <Text
        style={{ color: color, fontWeight: "900", fontSize: 26 }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {value}
      </Text>
      <Text
        style={{
          color: theme.textMuted,
          fontSize: 10,
          fontWeight: "700",
          textTransform: "uppercase",
          textAlign: "center",
          marginTop: 2,
        }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

function Stat({ theme, label, value }) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={{ color: theme.text, fontWeight: "900", fontSize: 16 }}>
        {value ?? "—"}
      </Text>
      <Text
        style={{
          color: theme.textMuted,
          fontSize: 10,
          fontWeight: "700",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    maxHeight: "90%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  handleRow: { alignItems: "center", paddingTop: 10, paddingBottom: 8 },
  handle: { width: 40, height: 4, borderRadius: 2 },
  closeBtn: { position: "absolute", right: 4, top: 8 },
  hero: {
    height: 240,
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
    justifyContent: "flex-end",
    marginBottom: 12,
  },
  render: { ...StyleSheet.absoluteFillObject, width: "100%", height: "100%" },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  heroContent: { padding: 12, backgroundColor: "rgba(0,0,0,0.5)" },
  name: {
    fontSize: 20,
    fontWeight: "900",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowRadius: 6,
  },
  sub: {
    color: "rgba(255,255,255,0.85)",
    fontWeight: "600",
    fontSize: 12,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowRadius: 4,
  },
  headlineRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  headline: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: "center",
  },
  card: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 12 },
  cardHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 8,
  },
  cardTitle: { fontWeight: "800", fontSize: 14 },
  runRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 7,
    borderBottomWidth: 1,
  },
  profRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 7,
    borderBottomWidth: 1,
  },
  pillRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 },
  pill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  bossRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 5,
  },
  statsStrip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  vdiv: { width: 1, height: 26 },
});
