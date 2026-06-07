// src/components/CodeTab.jsx — "Code" tab inside the character Showcase.
// Auto-generates a 10-SECOND share code on open, with a clock-like ring that
// sweeps smoothly as the code's lifetime drains, then regenerates.
import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, ScrollView, ActivityIndicator, StyleSheet, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
import { useTranslation } from "react-i18next";
import { useCreateShare } from "../hooks/useShare";

const WEB_URL = "https://wartable.app"; // ← change to your real domain
const TTL = 10 * 60; // seconds (10 minutes)

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const fmt = (s) => `${String(Math.floor(Math.max(0,s)/60)).padStart(2,"0")}:${String(Math.max(0,s)%60).padStart(2,"0")}`;

export default function CodeTab({ c, theme, t }) {
  const create = useCreateShare();
  const [code, setCode] = useState(null);
  const [remaining, setRemaining] = useState(TTL);
  const sweep = useRef(new Animated.Value(1)).current; // 1 → 0 over TTL
  const tick = useRef(null);

  const SIZE = 200, STROKE = 12, R = (SIZE - STROKE) / 2, C = 2 * Math.PI * R;

  const generate = async () => {
    try {
      const res = await create.mutateAsync({
        region: c.region ?? "eu", realmSlug: c.realm, name: c.name,
      });
      const ttl = res.ttlSeconds ?? TTL;
      setCode(res.code);
      setRemaining(ttl);

      // smooth ring sweep from full → empty over the lifetime (clock-like)
      sweep.setValue(1);
      Animated.timing(sweep, {
        toValue: 0, duration: ttl * 1000, easing: Easing.linear, useNativeDriver: true,
      }).start();

      // numeric countdown (1s steps)
      clearInterval(tick.current);
      let left = ttl;
      tick.current = setInterval(() => {
        left -= 1;
        setRemaining(left);
        if (left <= 0) clearInterval(tick.current);
      }, 1000);
    } catch {}
  };

  useEffect(() => {
    generate();
    return () => clearInterval(tick.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dashOffset = sweep.interpolate({ inputRange: [0, 1], outputRange: [C, 0] });
  const expired = remaining <= 0;

  return (
    <ScrollView style={{ backgroundColor: theme.bg }} contentContainerStyle={{ padding: 20, gap: 18 }}>
      <View style={[styles.codeCard, { borderColor: code && !expired ? theme.accent : theme.border, backgroundColor: theme.surface }]}>
        {code ? (
          <>
            <Text style={[styles.code, { color: expired ? theme.textMuted : theme.accent }]}>{code.split("").join(" ")}</Text>
            <Text style={{ color: theme.textMuted, fontWeight: "700", marginTop: 6 }}>{c.name}</Text>
          </>
        ) : create.isPending ? (
          <ActivityIndicator color={theme.accent} />
        ) : (
          <Text style={{ color: theme.textMuted }}>{t("tapGenerate") || "Generate a code to share"}</Text>
        )}
      </View>

      <View style={[styles.linkCard, { backgroundColor: theme.surfaceAlt || theme.surface, borderColor: theme.border }]}>
        <Text style={{ color: theme.textMuted, textAlign: "center" }}>{t("viewOnWeb") || "View this character on the web:"}</Text>
        <Text style={{ color: theme.accent, textAlign: "center", fontWeight: "700", marginTop: 2 }}>
          {WEB_URL}
        </Text>
      </View>

      <View style={[styles.timerCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start" }}>
          <Ionicons name="time-outline" size={16} color={theme.accent} />
          <Text style={{ color: theme.accent, fontWeight: "700" }}>{t("validFor") || "Valid for 10 minutes"}</Text>
        </View>

        <View style={{ alignItems: "center", justifyContent: "center", marginVertical: 18 }}>
          <Svg width={SIZE} height={SIZE}>
            <Circle cx={SIZE/2} cy={SIZE/2} r={R} stroke={theme.border} strokeWidth={STROKE} fill="none" />
            <AnimatedCircle
              cx={SIZE/2} cy={SIZE/2} r={R} stroke={theme.accent} strokeWidth={STROKE} fill="none"
              strokeLinecap="round" strokeDasharray={C} strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${SIZE/2} ${SIZE/2})`}
            />
          </Svg>
          <Text style={{ position: "absolute", fontSize: 44, fontWeight: "900", color: expired ? theme.textMuted : theme.text }}>
            {code ? fmt(remaining) : "--:--"}
          </Text>
        </View>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        <Pressable onPress={generate} disabled={create.isPending} style={{ paddingVertical: 14 }}>
          {create.isPending
            ? <ActivityIndicator color={theme.accent} />
            : <Text style={{ color: theme.accent, fontWeight: "800", letterSpacing: 1, textTransform: "uppercase" }}>
                {t("regenerate") || "Generate new code"}
              </Text>}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  codeCard: { borderWidth: 2, borderRadius: 18, paddingVertical: 22, alignItems: "center" },
  code: { fontSize: 38, fontWeight: "900", letterSpacing: 4 },
  linkCard: { borderWidth: 1, borderRadius: 14, padding: 14 },
  timerCard: { borderWidth: 1, borderRadius: 18, padding: 18, alignItems: "center" },
  divider: { height: 1, alignSelf: "stretch", marginTop: 4 },
});
