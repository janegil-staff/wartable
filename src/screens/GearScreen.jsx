import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import GearDetailModal from "../components/GearDetailModal"; // adjust path if needed

// ---- Blizzard quality -> color (shared with the modal) ----
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

function display(node) {
  if (node == null) return null;
  if (typeof node === "string") return node;
  if (node.display && node.display.display_string) return node.display.display_string;
  if (node.display_string) return node.display_string;
  if (node.name) return typeof node.name === "string" ? node.name : node.name.en_US || null;
  if (node.value != null) return String(node.value);
  return null;
}

// ---- Slot ordering so the list reads like the in-game paper doll ----
var SLOT_ORDER = [
  "HEAD",
  "NECK",
  "SHOULDER",
  "BACK",
  "CHEST",
  "SHIRT",
  "TABARD",
  "WRIST",
  "HANDS",
  "WAIST",
  "LEGS",
  "FEET",
  "FINGER_1",
  "FINGER_2",
  "TRINKET_1",
  "TRINKET_2",
  "MAIN_HAND",
  "OFF_HAND",
];

function sortBySlot(items) {
  var copy = (items || []).slice();
  copy.sort(function (a, b) {
    var sa = a.slot && a.slot.type ? SLOT_ORDER.indexOf(a.slot.type) : 999;
    var sb = b.slot && b.slot.type ? SLOT_ORDER.indexOf(b.slot.type) : 999;
    if (sa === -1) sa = 999;
    if (sb === -1) sb = 999;
    return sa - sb;
  });
  return copy;
}

// =================================================================
// DATA SEAM — replace this with your real authenticated fetch.
// It must hit:
//   /profile/wow/character/{realmSlug}/{characterName}/equipment
//   ?namespace=profile-{region}&locale=en_US
// and return the parsed JSON. The &locale matters — without it the
// stats/enchant display_string fields come back empty.
// =================================================================
async function fetchEquipment(params) {
  var region = params.region || "eu";
  var realmSlug = params.realmSlug;
  var characterName = String(params.characterName || "").toLowerCase();
  var token = params.token; // your Battle.net access token

  var host =
    region === "us"
      ? "https://us.api.blizzard.com"
      : region === "kr"
      ? "https://kr.api.blizzard.com"
      : region === "tw"
      ? "https://tw.api.blizzard.com"
      : "https://eu.api.blizzard.com";

  var url =
    host +
    "/profile/wow/character/" +
    encodeURIComponent(realmSlug) +
    "/" +
    encodeURIComponent(characterName) +
    "/equipment?namespace=profile-" +
    region +
    "&locale=en_US";

  var res = await fetch(url, {
    headers: { Authorization: "Bearer " + token },
  });
  if (!res.ok) {
    throw new Error("Equipment fetch failed (" + res.status + ")");
  }
  return res.json();
}

// =================================================================
// Single gear row
// =================================================================
function GearRow(props) {
  var item = props.item;
  var onPress = props.onPress;

  var color = qualityColor(item);
  var name = display(item.name) || "Unknown Item";
  var ilvl = item.level && item.level.value;
  var slotLabel = display(item.slot) || (item.slot && item.slot.type) || "";
  var enchantCount = (item.enchantments || []).length;
  var socketCount = (item.sockets || []).length;

  return (
    <Pressable
      onPress={onPress}
      style={function (state) {
        return [styles.row, state.pressed ? styles.rowPressed : null];
      }}
    >
      <View style={styles.rowLeft}>
        <Text style={[styles.itemName, { color: color }]} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.slotLabel}>{slotLabel}</Text>
      </View>
      <View style={styles.rowRight}>
        {ilvl != null ? <Text style={styles.ilvl}>{ilvl}</Text> : null}
        <View style={styles.badges}>
          {enchantCount > 0 ? <Text style={styles.badgeEnchant}>E</Text> : null}
          {socketCount > 0 ? <Text style={styles.badgeSocket}>◇{socketCount}</Text> : null}
        </View>
      </View>
    </Pressable>
  );
}

// =================================================================
// Screen
// =================================================================
export default function GearScreen(props) {
  // Route params from the character-select navigator.
  var route = props.route || {};
  var params = route.params || {};
  var realmSlug = params.realmSlug;
  var characterName = params.characterName;
  var region = params.region || "eu";
  var token = params.token; // pass your access token through, or read it here

  var [selectedItem, setSelectedItem] = React.useState(null);

  var query = useQuery({
    queryKey: ["equipment", region, realmSlug, characterName],
    queryFn: function () {
      return fetchEquipment({
        region: region,
        realmSlug: realmSlug,
        characterName: characterName,
        token: token,
      });
    },
    enabled: !!realmSlug && !!characterName,
    staleTime: 1000 * 60 * 5,
  });

  if (query.isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#c9893f" />
        <Text style={styles.muted}>Loading gear…</Text>
      </View>
    );
  }

  if (query.isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Couldn’t load equipment</Text>
        <Text style={styles.muted}>
          {query.error && query.error.message ? query.error.message : "Unknown error"}
        </Text>
        <Pressable style={styles.retryBtn} onPress={function () { query.refetch(); }}>
          <Text style={styles.retryTxt}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  var data = query.data || {};
  var items = sortBySlot(data.equipped_items || []);
  var avgIlvl =
    data.equipped_item_level != null ? data.equipped_item_level : null;

  return (
    <View style={styles.screen}>
      {avgIlvl != null ? (
        <View style={styles.headerBar}>
          <Text style={styles.headerLabel}>Average Item Level</Text>
          <Text style={styles.headerIlvl}>{avgIlvl}</Text>
        </View>
      ) : null}

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <Text style={styles.muted}>No equipped items found.</Text>
        ) : (
          items.map(function (item, i) {
            return (
              <GearRow
                key={(item.slot && item.slot.type ? item.slot.type : "slot") + "-" + i}
                item={item}
                onPress={function () {
                  setSelectedItem(item);
                }}
              />
            );
          })
        )}
      </ScrollView>

      <GearDetailModal
        visible={!!selectedItem}
        item={selectedItem}
        onClose={function () {
          setSelectedItem(null);
        }}
      />
    </View>
  );
}

var styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#120f0b" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#120f0b",
    padding: 24,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: "#1b1610",
    borderBottomWidth: 1,
    borderBottomColor: "#2a2119",
  },
  headerLabel: {
    color: "#9c8e78",
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  headerIlvl: { color: "#e6cc80", fontSize: 20, fontWeight: "700" },
  list: { flex: 1 },
  listContent: { padding: 12, paddingBottom: 32 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1b1610",
    borderWidth: 1,
    borderColor: "#2a2119",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  rowPressed: { backgroundColor: "#241c14", borderColor: "#3a2f24" },
  rowLeft: { flex: 1, paddingRight: 12 },
  rowRight: { alignItems: "flex-end" },
  itemName: { fontSize: 15, fontWeight: "600" },
  slotLabel: {
    color: "#9c8e78",
    fontSize: 12,
    marginTop: 2,
    textTransform: "capitalize",
  },
  ilvl: { color: "#e6cc80", fontSize: 15, fontWeight: "700" },
  badges: { flexDirection: "row", marginTop: 3 },
  badgeEnchant: {
    color: "#1eff00",
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 6,
  },
  badgeSocket: { color: "#00ccff", fontSize: 11, fontWeight: "700", marginLeft: 6 },
  muted: { color: "#9c8e78", fontSize: 14, marginTop: 8, textAlign: "center" },
  errorTitle: { color: "#ff6b6b", fontSize: 16, fontWeight: "700", marginBottom: 6 },
  retryBtn: {
    marginTop: 16,
    backgroundColor: "#c9893f",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryTxt: { color: "#120f0b", fontWeight: "700" },
});