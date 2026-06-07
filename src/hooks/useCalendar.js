// src/hooks/useCalendar.js — one month of calendar data (progress + schedule +
// events) for the selected character.
import { useQuery } from "@tanstack/react-query";
import client from "../api/client";

export function useCalendar({ region, realm, name, from, to, guildRealm, guildName, enabled = true }) {
  return useQuery({
    queryKey: ["calendar", region, realm, name, from, to, guildRealm, guildName],
    enabled: enabled && !!region && !!from && !!to,
    retry: false,
    queryFn: async () => {
      const { data } = await client.get("/calendar", {
        params: { region, realm, name, from, to, guildRealm, guildName },
      });
      return data;
    },
  });
}