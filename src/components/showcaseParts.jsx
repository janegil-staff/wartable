// src/components/showcaseParts.jsx — the four tab panels + shared bits.
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { classColor, factionTheme } from "../theme/wow";
import FactionEmblem from "./FactionEmblem";

const QUALITY_COLOR = {
  POOR: "#9d9d9d",
  COMMON: "#ffffff",
  UNCOMMON: "#1eff00",
  RARE: "#0070dd",
  EPIC: "#a335ee",
  LEGENDARY: "#ff8000",
  ARTIFACT: "#e6cc80",
};
const { width } = Dimensions.get("window");

function Section({ theme, icon, title, children }) {
  return (
    <View
      style={[
        styles.section,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <Ionicons name={icon} size={16} color={theme.accent} />
        <Text style={{ color: theme.text, fontWeight: "800", fontSize: 15 }}>
          {title}
        </Text>
      </View>
      {children}
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

// ── ITEM DETAIL MODAL ── (app card style)
function ItemDetailModal({ item, theme, t, onClose }) {
  if (!item) return null;
  const qc = QUALITY_COLOR[item.quality] ?? theme.text;
  const primaries = (item.stats ?? []).filter((s) => s.isPrimary);
  const secondaries = (item.stats ?? []).filter((s) => !s.isPrimary);

  const StatLine = ({ s }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
      }}
    >
      <Text style={{ color: theme.textMuted, fontSize: 13 }}>{s.name}</Text>
      <Text style={{ color: theme.text, fontSize: 13, fontWeight: "700" }}>
        {s.display || (s.value != null ? `+${s.value}` : "")}
      </Text>
    </View>
  );

  return (
    <Modal
      visible={!!item}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[
            styles.itemModal,
            { backgroundColor: theme.surface, borderColor: qc },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          <ScrollView style={{ maxHeight: 480 }}>
            {/* header: icon + name + slot */}
            <View style={{ flexDirection: "row", gap: 12, marginBottom: 14 }}>
              {item.icon ? (
                <Image
                  source={{ uri: item.icon }}
                  style={[styles.itemModalIcon, { borderColor: qc }]}
                />
              ) : (
                <View
                  style={[
                    styles.itemModalIcon,
                    { borderColor: qc, backgroundColor: theme.bg },
                  ]}
                />
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ color: qc, fontWeight: "900", fontSize: 17 }}>
                  {item.name}
                </Text>
                <Text
                  style={{ color: theme.textMuted, fontSize: 12, marginTop: 2 }}
                >
                  {[item.slotName, item.itemType].filter(Boolean).join(" · ")}
                </Text>
                {item.ilvl ? (
                  <Text
                    style={{
                      color: theme.accent,
                      fontSize: 13,
                      fontWeight: "800",
                      marginTop: 2,
                    }}
                  >
                    {t("itemLevel") || "Item Level"} {item.ilvl}
                  </Text>
                ) : null}
              </View>
            </View>

            {item.binding ? (
              <Text
                style={{
                  color: theme.textMuted,
                  fontSize: 12,
                  marginBottom: 8,
                }}
              >
                {item.binding}
              </Text>
            ) : null}

            {/* primary stats */}
            {primaries.length ? (
              <View style={[styles.itemBlock, { borderColor: theme.border }]}>
                {primaries.map((s, i) => (
                  <StatLine key={i} s={s} />
                ))}
              </View>
            ) : null}

            {/* secondary stats */}
            {secondaries.length ? (
              <View style={[styles.itemBlock, { borderColor: theme.border }]}>
                {secondaries.map((s, i) => (
                  <StatLine key={i} s={s} />
                ))}
              </View>
            ) : null}

            {/* sockets / gems */}
            {item.sockets?.length ? (
              <View style={[styles.itemBlock, { borderColor: theme.border }]}>
                <Text style={styles.itemBlockLabel(theme)}>
                  {t("sockets") || "Sockets"}
                </Text>
                {item.sockets.map((sk, i) => (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      paddingVertical: 3,
                    }}
                  >
                    <Ionicons
                      name="ellipse"
                      size={12}
                      color={sk.item ? theme.accent : theme.textMuted}
                    />
                    <Text
                      style={{
                        color: sk.item ? theme.text : theme.textMuted,
                        fontSize: 13,
                        flex: 1,
                      }}
                      numberOfLines={1}
                    >
                      {sk.item ||
                        sk.display ||
                        sk.type ||
                        t("emptySocket") ||
                        "Empty socket"}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}

            {/* enchants */}
            {item.enchant?.length ? (
              <View style={[styles.itemBlock, { borderColor: theme.border }]}>
                <Text style={styles.itemBlockLabel(theme)}>
                  {t("enchantments") || "Enchantments"}
                </Text>
                {item.enchant.map((e, i) => (
                  <Text
                    key={i}
                    style={{
                      color: theme.success || "#1eff00",
                      fontSize: 13,
                      paddingVertical: 2,
                    }}
                  >
                    {e}
                  </Text>
                ))}
              </View>
            ) : null}

            {/* equip/use effects */}
            {item.effects?.length ? (
              <View style={[styles.itemBlock, { borderColor: theme.border }]}>
                {item.effects.map((ef, i) => (
                  <Text
                    key={i}
                    style={{
                      color: theme.success || "#1eff00",
                      fontSize: 13,
                      paddingVertical: 3,
                    }}
                  >
                    {ef.description || ef.name}
                  </Text>
                ))}
              </View>
            ) : null}

            {/* footer detail */}
            {item.requirement || item.durability || item.sellPrice ? (
              <View style={{ marginTop: 4 }}>
                {item.requirement ? (
                  <Text style={styles.itemFoot(theme)}>{item.requirement}</Text>
                ) : null}
                {item.durability ? (
                  <Text style={styles.itemFoot(theme)}>{item.durability}</Text>
                ) : null}
                {item.sellPrice ? (
                  <Text style={styles.itemFoot(theme)}>{item.sellPrice}</Text>
                ) : null}
              </View>
            ) : null}
          </ScrollView>

          <Pressable
            onPress={onClose}
            style={[styles.closeBtn, { backgroundColor: theme.accent }]}
          >
            <Text
              style={{ color: theme.accentText || "#fff", fontWeight: "700" }}
            >
              {t("close") || "Close"}
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// Gear grid + item list, each item tappable. Shared by Overview and GearTab.
export function GearContent({ c, theme, t }) {
  const [selected, setSelected] = React.useState(null);
  const items = c.equipment ?? [];
  return (
    <>
      <View style={styles.gearGrid}>
        {items.map((it, i) => (
          <Pressable
            key={i}
            onPress={() => setSelected(it)}
            style={[
              styles.gearCell,
              {
                borderColor: QUALITY_COLOR[it.quality] ?? theme.border,
                backgroundColor: theme.bg,
              },
            ]}
          >
            {it.icon ? (
              <Image source={{ uri: it.icon }} style={styles.gearIcon} />
            ) : (
              <View
                style={[styles.gearIcon, { backgroundColor: theme.surfaceAlt }]}
              />
            )}
            {it.ilvl ? (
              <View style={styles.gearIlvl}>
                <Text style={styles.gearIlvlText}>{it.ilvl}</Text>
              </View>
            ) : null}
          </Pressable>
        ))}
      </View>
      <View style={{ marginTop: 12, gap: 6 }}>
        {items.map((it, i) => (
          <Pressable
            key={i}
            onPress={() => setSelected(it)}
            style={[styles.row, { borderBottomColor: theme.border }]}
          >
            <Text
              style={{
                color: QUALITY_COLOR[it.quality] ?? theme.text,
                flex: 1,
                fontWeight: "600",
              }}
              numberOfLines={1}
            >
              {it.name}
            </Text>
            {it.ilvl ? (
              <Text style={{ color: theme.textMuted, fontWeight: "700" }}>
                {it.ilvl}
              </Text>
            ) : null}
            <Ionicons
              name="chevron-forward"
              size={14}
              color={theme.textMuted}
            />
          </Pressable>
        ))}
      </View>
      <ItemDetailModal
        item={selected}
        theme={theme}
        t={t}
        onClose={() => setSelected(null)}
      />
    </>
  );
}

// ── OVERVIEW ──
export function OverviewTab({ c, theme, t, onOpenGuild }) {
  const fac = factionTheme(c.faction);
  const cc = classColor(c.class);
  return (
    <ScrollView
      style={{ backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <View style={[styles.hero, { borderColor: fac.glow, shadowColor: cc }]}>
        {c.render ? (
          <Image
            source={{ uri: c.render }}
            style={styles.render}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.render, { backgroundColor: fac.soft }]} />
        )}
        <View style={styles.scrim} />
        <View style={styles.heroContent}>
          <View
            style={{ flexDirection: "row", alignItems: "flex-end", gap: 12 }}
          >
            {c.avatar ? (
              <Image
                source={{ uri: c.avatar }}
                style={[styles.avatar, { borderColor: cc }]}
              />
            ) : (
              <FactionEmblem faction={c.faction} size={56} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: cc }]} numberOfLines={1}>
                {c.name}
              </Text>
              <Text style={styles.sub} numberOfLines={1}>
                {[c.spec, c.class, c.race].filter(Boolean).join(" · ")}
              </Text>
              {c.guild?.name ? (
                <Pressable
                  onPress={onOpenGuild}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 2,
                  }}
                >
                  <Text style={styles.guild} numberOfLines={1}>
                    {"<"}
                    {c.guild.name}
                    {">"}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={12}
                    color="rgba(255,255,255,0.7)"
                  />
                </Pressable>
              ) : null}
            </View>
            {c.ilvl ? (
              <View style={[styles.ilvl, { borderColor: cc }]}>
                <Text
                  style={{ color: "#fff", fontWeight: "900", fontSize: 20 }}
                >
                  {c.ilvl}
                </Text>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 9,
                    fontWeight: "700",
                  }}
                >
                  {t("itemLevel").toUpperCase()}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
      <View
        style={[
          styles.statsStrip,
          { backgroundColor: theme.surface, borderColor: theme.border },
        ]}
      >
        <Stat theme={theme} label={t("level")} value={c.level} />
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <Stat
          theme={theme}
          label={t("rating")}
          value={c.mythicPlus?.currentRating ?? "—"}
        />
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <Stat
          theme={theme}
          label={t("achievements")}
          value={c.achievementPoints ?? "—"}
        />
      </View>

      {c.stats ? (
        <Section
          theme={theme}
          icon="stats-chart"
          title={t("statistics") || "Statistics"}
        >
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {[
              ["Crit", c.stats.crit],
              ["Haste", c.stats.haste],
              ["Mastery", c.stats.mastery],
              ["Vers", c.stats.versatility],
              ["Health", c.stats.health],
              ["Stamina", c.stats.stamina],
            ]
              .filter(([, v]) => v != null)
              .map(([k, v]) => (
                <View key={k} style={{ width: "33%", paddingVertical: 6 }}>
                  <Text style={{ color: theme.text, fontWeight: "800" }}>
                    {typeof v === "number" ? Math.round(v) : v}
                  </Text>
                  <Text style={{ color: theme.textMuted, fontSize: 11 }}>
                    {k}
                  </Text>
                </View>
              ))}
          </View>
        </Section>
      ) : null}

      {c.professions?.length ? (
        <Section
          theme={theme}
          icon="hammer"
          title={t("professions") || "Professions"}
        >
          {c.professions.map((p, i) => (
            <View
              key={i}
              style={[styles.row, { borderBottomColor: theme.border }]}
            >
              <Text style={{ color: theme.text, flex: 1, fontWeight: "600" }}>
                {p.name}
              </Text>
              {p.skill != null ? (
                <Text style={{ color: theme.textMuted }}>
                  {p.skill}/{p.max}
                </Text>
              ) : null}
            </View>
          ))}
        </Section>
      ) : null}

      {c.collections ? (
        <Section
          theme={theme}
          icon="ribbon"
          title={t("collections") || "Collections"}
        >
          <View style={{ flexDirection: "row" }}>
            {[
              ["mounts", c.collections.mounts],
              ["pets", c.collections.pets],
              ["toys", c.collections.toys],
            ].map(([k, v]) => (
              <View key={k} style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{ color: theme.text, fontWeight: "900", fontSize: 20 }}
                >
                  {v}
                </Text>
                <Text
                  style={{
                    color: theme.textMuted,
                    fontSize: 11,
                    textTransform: "uppercase",
                  }}
                >
                  {t(k) || k}
                </Text>
              </View>
            ))}
          </View>
        </Section>
      ) : null}

      {c.titles?.length ? (
        <Section
          theme={theme}
          icon="star"
          title={`${t("titles") || "Titles"} · ${c.titles.length}`}
        >
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
            {c.titles.slice(0, 30).map((tt, i) => (
              <View
                key={i}
                style={[
                  styles.chip,
                  { borderColor: theme.border, backgroundColor: theme.bg },
                ]}
              >
                <Text style={{ color: theme.text, fontSize: 12 }}>{tt}</Text>
              </View>
            ))}
          </View>
        </Section>
      ) : null}

      {/* GEAR — inline, tappable items, placed right before reputations */}
      {c.equipment?.length ? (
        <Section
          theme={theme}
          icon="shield-half"
          title={`${t("gear")} · ${c.equipment.length}`}
        >
          <GearContent c={c} theme={theme} t={t} />
        </Section>
      ) : null}

      {c.reputations?.length ? (
        <Section
          theme={theme}
          icon="people"
          title={`${t("reputations") || "Reputations"} · ${c.reputations.length}`}
        >
          {c.reputations.slice(0, 12).map((rp, i) => (
            <View
              key={i}
              style={[styles.row, { borderBottomColor: theme.border }]}
            >
              <Text
                style={{ color: theme.text, flex: 1, fontWeight: "600" }}
                numberOfLines={1}
              >
                {rp.faction}
              </Text>
              <Text style={{ color: theme.textMuted, fontSize: 12 }}>
                {rp.standing}
              </Text>
            </View>
          ))}
        </Section>
      ) : null}
    </ScrollView>
  );
}

// ── GEAR (kept for compatibility; no longer a tab) ──
export function GearTab({ c, theme, t }) {
  return (
    <ScrollView
      style={{ backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Section theme={theme} icon="shield-half" title={t("gear")}>
        <GearContent c={c} theme={theme} t={t} />
      </Section>
    </ScrollView>
  );
}

// ── PROGRESS (M+ & raids) ──
export function ProgressTab({ c, theme, t }) {
  const fmtTime = (ms) => {
    if (!ms) return null;
    const s = Math.floor(ms / 1000),
      m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, "0")}`;
  };
  return (
    <ScrollView
      style={{ backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 16, gap: 16 }}
    >
      <Section theme={theme} icon="key" title={t("mythicPlus")}>
        {c.mythicPlus?.currentRating ? (
          <Text
            style={{
              color: c.mythicPlus.ratingColor || theme.accent,
              fontSize: 28,
              fontWeight: "900",
              marginBottom: 8,
            }}
          >
            {Math.round(c.mythicPlus.currentRating)}
          </Text>
        ) : null}
        {c.mythicPlus?.bestRuns?.length ? (
          c.mythicPlus.bestRuns.map((r, i) => (
            <View
              key={i}
              style={[
                styles.row,
                { borderBottomColor: theme.border, alignItems: "flex-start" },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{ color: theme.text, fontWeight: "600" }}
                  numberOfLines={1}
                >
                  {r.dungeon}
                </Text>
                <Text
                  style={{ color: theme.textMuted, fontSize: 11 }}
                  numberOfLines={1}
                >
                  {[
                    fmtTime(r.duration) && `${fmtTime(r.duration)}`,
                    (r.affixes ?? []).join(", "),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </Text>
              </View>
              <Text
                style={{
                  color: r.completed ? theme.success : theme.textMuted,
                  fontWeight: "800",
                }}
              >
                +{r.level}
                {r.completed ? "" : " ✗"}
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ color: theme.textMuted }}>{t("noRuns")}</Text>
        )}

        {c.mythicPlus?.perDungeon?.length ? (
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                color: theme.textMuted,
                fontSize: 11,
                fontWeight: "700",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              {t("perDungeon") || "Per dungeon"}
            </Text>
            {c.mythicPlus.perDungeon.map((d, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 3,
                }}
              >
                <Text
                  style={{ color: theme.text, fontSize: 13 }}
                  numberOfLines={1}
                >
                  {d.dungeon}
                </Text>
                <Text
                  style={{
                    color: theme.textMuted,
                    fontSize: 13,
                    fontWeight: "700",
                  }}
                >
                  {Math.round(d.rating)}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </Section>

      {c.pvp ? (
        <Section theme={theme} icon="flag" title={t("pvp") || "PvP"}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Object.entries(c.pvp).map(([bracket, rating]) => (
              <View key={bracket} style={{ width: "33%", paddingVertical: 6 }}>
                <Text
                  style={{
                    color: theme.gold || theme.accent,
                    fontWeight: "900",
                    fontSize: 18,
                  }}
                >
                  {rating}
                </Text>
                <Text
                  style={{
                    color: theme.textMuted,
                    fontSize: 11,
                    textTransform: "uppercase",
                  }}
                >
                  {bracket}
                </Text>
              </View>
            ))}
          </View>
        </Section>
      ) : null}

      {c.raids?.length ? (
        <Section theme={theme} icon="skull" title={t("raids")}>
          {c.raids.map((raid, i) => (
            <RaidInstance key={i} raid={raid} theme={theme} t={t} />
          ))}
        </Section>
      ) : null}
    </ScrollView>
  );
}

function RaidInstance({ raid, theme, t }) {
  const [open, setOpen] = React.useState(false);
  const modes = raid.modes ?? [];
  const detailMode =
    [...modes].reverse().find((m) => (m.bosses ?? []).length) ??
    modes[modes.length - 1];

  return (
    <View
      style={{
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
      }}
    >
      <Pressable
        onPress={() => setOpen((o) => !o)}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Text style={{ color: theme.text, fontWeight: "700", flex: 1 }}>
          {raid.name}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={16}
          color={theme.textMuted}
        />
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 4,
        }}
      >
        {modes.map((m, j) => (
          <Text key={j} style={{ color: theme.textMuted, fontSize: 12 }}>
            {m.difficulty}: {m.completed}/{m.total}
          </Text>
        ))}
      </View>

      {open && detailMode ? (
        <View style={{ marginTop: 8, gap: 4 }}>
          <Text
            style={{
              color: theme.textMuted,
              fontSize: 11,
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            {detailMode.difficulty}
          </Text>
          {(detailMode.bosses ?? []).map((b, k) => (
            <View
              key={k}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingVertical: 3,
              }}
            >
              <Ionicons
                name={b.killed ? "checkmark-circle" : "ellipse-outline"}
                size={15}
                color={b.killed ? theme.success : theme.textMuted}
              />
              <Text
                style={{
                  color: b.killed ? theme.text : theme.textMuted,
                  flex: 1,
                  fontSize: 13,
                }}
                numberOfLines={1}
              >
                {b.name}
              </Text>
              {b.kills ? (
                <Text style={{ color: theme.textMuted, fontSize: 11 }}>
                  ×{b.kills}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

// ── ACHIEVEMENTS (full list) ──
export function AchievementsTab({ c, theme, t }) {
  const list = c.achievementsList ?? [];
  return (
    <ScrollView
      style={{ backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Section
        theme={theme}
        icon="trophy"
        title={`${t("achievements")} · ${c.achievementPoints ?? 0}`}
      >
        {list.length ? (
          list.map((a, i) => (
            <View
              key={a.id ?? i}
              style={[styles.row, { borderBottomColor: theme.border }]}
            >
              <Ionicons name="ribbon-outline" size={14} color={theme.accent} />
              <Text
                style={{ color: theme.text, flex: 1, fontWeight: "600" }}
                numberOfLines={1}
              >
                {a.name}
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ color: theme.textMuted }}>—</Text>
        )}
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 380,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    justifyContent: "flex-end",
    shadowOpacity: 0.5,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  render: { ...StyleSheet.absoluteFillObject, width: "100%", height: "100%" },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  heroContent: { padding: 16, backgroundColor: "rgba(0,0,0,0.55)" },
  avatar: { width: 56, height: 56, borderRadius: 12, borderWidth: 2 },
  name: {
    fontSize: 26,
    fontWeight: "900",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowRadius: 6,
  },
  sub: { color: "rgba(255,255,255,0.85)", fontWeight: "600" },
  guild: { color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 },
  ilvl: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  statsStrip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 14,
  },
  divider: { width: 1, height: 28 },
  section: { borderWidth: 1, borderRadius: 16, padding: 16 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  gearGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  gearCell: {
    width: (width - 32 - 32 - 5 * 8) / 6,
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  gearIcon: { ...StyleSheet.absoluteFillObject, width: "100%", height: "100%" },
  gearIlvl: { backgroundColor: "rgba(0,0,0,0.7)", paddingHorizontal: 2 },
  gearIlvlText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "800",
    textAlign: "center",
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  itemModal: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 20,
    maxHeight: "82%",
  },
  itemModalIcon: { width: 54, height: 54, borderRadius: 10, borderWidth: 2 },
  itemBlock: {
    borderTopWidth: 1,
    paddingTop: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  closeBtn: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 14,
  },
});

// helper style factories (need theme at call time)
styles.itemBlockLabel = (theme) => ({
  color: theme.textMuted,
  fontSize: 11,
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: 0.5,
  marginBottom: 4,
});
styles.itemFoot = (theme) => ({
  color: theme.textMuted,
  fontSize: 12,
  paddingVertical: 1,
});
