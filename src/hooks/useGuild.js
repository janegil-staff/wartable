// src/hooks/useGuild.js — full guild view (info + roster + activity).
import { useQuery } from "@tanstack/react-query";
import client from "../api/client";

export function useGuild({ region, realm, name, enabled = true }) {
  return useQuery({
    queryKey: ["guild", region, realm, name],
    enabled: enabled && !!region && !!realm && !!name,
    retry: false,
    queryFn: async () => {
      const { data } = await client.get(
        `/guild/${region}/${encodeURIComponent(realm)}/${encodeURIComponent(name)}`,
      );
      return data;
    },
  });
}
