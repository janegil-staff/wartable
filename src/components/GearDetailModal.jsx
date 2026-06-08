import React from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";

// Blizzard quality -> color
var QUALITY_COLORS = {
  POOR: "#9d9d9d",
  COMMON: "#ffffff",
  UNCOMMON: "#1eff00",
  RARE: "#0070dd",
  EPIC: "#a335ee",
  LEGENDARY: "#ff8000",
  ARTIFACT: "#e6cc80",
  HEIRLOOM: "#00ccff",
};

function qualityColor(item) {
  var q = item && item.quality && item.quality.type;
  return QUALITY_COLORS[q] || "#ffffff";
}

// Pulls a display string out of Blizzard's {value, display:{display_string}} shapes
function display(node) {
  if (node == null) return null;
  if (typeof node === "string") return node;
  if (node.display && node.display.display_string) return node.display.display_string;
  if (node.display_string) return node.display_string;
  if (node.name) return typeof node.name === "string" ? node.name : node.name.en_US || null;
  if (node.value != null) return String(node.value);
  return null;
}

function Row(props) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, props.color ? { color: props.color } : null]}>
        {props.label}
      </Text>
      {props.value != null ? (
        <Text style={[styles.rowValue, props.color ? { color: props.color } : null]}>
          {props.value}
        </Text>
      ) : null}
    </View>
  );
}

function Section(props) {
  return (
    <View style={styles.section}>
      {props.title ? <Text style={styles.sectionTitle}>{props.title}</Text> : null}
      {props.children}
    </View>
  );
}

export default function GearDetailModal(props) {
  var visible = props.visible;
  var onClose = props.onClose;
  var item = props.item || {};

  var color = qualityColor(item);
  var name = display(item.name) || "Unknown Item";
  var ilvl = item.level && item.level.value;
  var binding = display(item.binding);
  var slot = display(item.slot);
  var itemSubclass = display(item.item_subclass);
  var inventoryType = display(item.inventory_type);
  var armor = item.armor && display(item.armor);

  var stats = item.stats || [];
  var spells = item.spells || [];
  var enchants = item.enchantments || [];
  var sockets = item.sockets || [];
  var setInfo = item.set;
  var requirements = item.requirements;
  var durability = item.durability && display(item.durability);
  var sellPrice = item.sell_price && display(item.sell_price);
  var nameDescription = display(item.name_description);
  var description = display(item.description);
  var transmog = item.transmog && display(item.transmog);
  var azerite = item.azerite_details;

  return (
    <Modal
      visible={!!visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.card} onPress={function () {}}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.itemName, { color: color }]} numberOfLines={3}>
              {name}
            </Text>
            <Pressable hitSlop={12} onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeTxt}>✕</Text>
            </Pressable>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
            {/* Top line block: ilvl, binding, type */}
            <Section>
              {ilvl != null ? (
                <Text style={styles.ilvl}>Item Level {ilvl}</Text>
              ) : null}
              {binding ? <Text style={styles.muted}>{binding}</Text> : null}
              <View style={styles.slotLine}>
                {inventoryType ? <Text style={styles.white}>{inventoryType}</Text> : null}
                {itemSubclass ? (
                  <Text style={styles.mutedRight}>{itemSubclass}</Text>
                ) : null}
              </View>
              {armor ? <Text style={styles.white}>{armor}</Text> : null}
            </Section>

            {/* Stats */}
            {stats.length > 0 ? (
              <Section title="Stats">
                {stats.map(function (s, i) {
                  var label = display(s);
                  var isPositive = s.is_negated !== true;
                  return (
                    <Text
                      key={"stat-" + i}
                      style={[styles.statLine, isPositive ? styles.statGood : styles.statBad]}
                    >
                      {label}
                    </Text>
                  );
                })}
              </Section>
            ) : null}

            {/* Sockets / gems */}
            {sockets.length > 0 ? (
              <Section title="Sockets">
                {sockets.map(function (sk, i) {
                  var socketType = display(sk.socket_type) || "Socket";
                  var gem = sk.item ? display(sk.item.name) : null;
                  var effect = display(sk.display_string);
                  return (
                    <View key={"sock-" + i} style={styles.socketRow}>
                      <Text style={styles.socketType}>◇ {socketType}</Text>
                      {gem ? <Text style={styles.gemGood}>{gem}</Text> : null}
                      {effect && !gem ? (
                        <Text style={styles.muted}>{effect}</Text>
                      ) : null}
                    </View>
                  );
                })}
              </Section>
            ) : null}

            {/* Enchantments */}
            {enchants.length > 0 ? (
              <Section title="Enchantments">
                {enchants.map(function (e, i) {
                  var label = display(e.display_string) || display(e);
                  return (
                    <Text key={"ench-" + i} style={styles.enchant}>
                      {label}
                    </Text>
                  );
                })}
              </Section>
            ) : null}

            {/* Spells / procs / equip effects */}
            {spells.length > 0 ? (
              <Section title="Effects">
                {spells.map(function (sp, i) {
                  var txt =
                    display(sp.description) ||
                    (sp.spell ? display(sp.spell.name) : null) ||
                    display(sp);
                  return (
                    <Text key={"spell-" + i} style={styles.spell}>
                      {txt}
                    </Text>
                  );
                })}
              </Section>
            ) : null}

            {/* Azerite (if present) */}
            {azerite && azerite.selected_powers ? (
              <Section title="Azerite Powers">
                {azerite.selected_powers.map(function (p, i) {
                  var txt = p.spell_tooltip
                    ? display(p.spell_tooltip.description)
                    : p.name
                    ? display(p.name)
                    : null;
                  return txt ? (
                    <Text key={"az-" + i} style={styles.spell}>
                      {txt}
                    </Text>
                  ) : null;
                })}
              </Section>
            ) : null}

            {/* Set */}
            {setInfo ? (
              <Section title={display(setInfo.set_name) || "Set"}>
                {setInfo.items
                  ? setInfo.items.map(function (si, i) {
                      var equipped = si.is_equipped === true;
                      return (
                        <Text
                          key={"setitem-" + i}
                          style={equipped ? styles.setEquipped : styles.setMissing}
                        >
                          {display(si.item ? si.item.name : si)}
                        </Text>
                      );
                    })
                  : null}
                {setInfo.effects
                  ? setInfo.effects.map(function (ef, i) {
                      var active = ef.is_active === true;
                      return (
                        <Text
                          key={"seteff-" + i}
                          style={active ? styles.setBonusActive : styles.setBonusInactive}
                        >
                          {display(ef.display_string)}
                        </Text>
                      );
                    })
                  : null}
              </Section>
            ) : null}

            {/* Requirements / durability / misc */}
            {requirements || durability || transmog ? (
              <Section>
                {transmog ? <Text style={styles.transmog}>{transmog}</Text> : null}
                {durability ? <Text style={styles.muted}>{durability}</Text> : null}
                {requirements && requirements.level ? (
                  <Text style={styles.muted}>
                    {display(requirements.level) ||
                      "Requires Level " + requirements.level.value}
                  </Text>
                ) : null}
                {requirements && requirements.playable_classes ? (
                  <Text style={styles.muted}>
                    {display(requirements.playable_classes)}
                  </Text>
                ) : null}
              </Section>
            ) : null}

            {/* Flavor text */}
            {nameDescription ? (
              <Text style={styles.flavor}>{nameDescription}</Text>
            ) : null}
            {description ? <Text style={styles.flavor}>{description}</Text> : null}
            {sellPrice ? <Text style={styles.muted}>Sell: {sellPrice}</Text> : null}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

var styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.72)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#181410",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderWidth: 1,
    borderColor: "#3a2f24",
    maxHeight: "88%",
    paddingBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2119",
  },
  itemName: { flex: 1, fontSize: 19, fontWeight: "700", paddingRight: 12 },
  closeBtn: { padding: 4 },
  closeTxt: { color: "#b8a98f", fontSize: 18, fontWeight: "600" },
  body: { paddingHorizontal: 18 },
  bodyContent: { paddingVertical: 14, paddingBottom: 28 },
  section: {
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#241c14",
    paddingBottom: 12,
  },
  sectionTitle: {
    color: "#c9893f",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  ilvl: { color: "#e6cc80", fontSize: 15, fontWeight: "600", marginBottom: 2 },
  white: { color: "#f2ece2", fontSize: 14, marginBottom: 2 },
  muted: { color: "#9c8e78", fontSize: 13, marginBottom: 2 },
  mutedRight: { color: "#9c8e78", fontSize: 13 },
  slotLine: { flexDirection: "row", justifyContent: "space-between", marginVertical: 2 },
  statLine: { fontSize: 14, marginBottom: 2 },
  statGood: { color: "#1eff00" },
  statBad: { color: "#ff6b6b" },
  socketRow: { marginBottom: 4 },
  socketType: { color: "#b8a98f", fontSize: 13 },
  gemGood: { color: "#1eff00", fontSize: 14, marginLeft: 14 },
  enchant: { color: "#1eff00", fontSize: 14, marginBottom: 2 },
  spell: { color: "#1eff00", fontSize: 13, marginBottom: 4, lineHeight: 18 },
  setEquipped: { color: "#f2ece2", fontSize: 13, marginBottom: 1 },
  setMissing: { color: "#6b5e4c", fontSize: 13, marginBottom: 1 },
  setBonusActive: { color: "#1eff00", fontSize: 13, marginTop: 4 },
  setBonusInactive: { color: "#6b5e4c", fontSize: 13, marginTop: 4 },
  transmog: { color: "#ff80ff", fontSize: 13, marginBottom: 2 },
  flavor: { color: "#c9a35f", fontSize: 13, fontStyle: "italic", marginTop: 6, lineHeight: 18 },
});