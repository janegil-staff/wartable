// src/hooks/useCharacter.js — full showcase for a character (public endpoint).
import { useQuery } from "@tanstack/react-query";
import client from "../api/client";

export function useCharacter({ region, realm, name, enabled = true }) {
  return useQuery({
    queryKey: ["character", region, realm, name],
    enabled: enabled && !!region && !!realm && !!name,
    retry: false,
    queryFn: async () => {
      const { data } = await client.get(
        `/characters/${region}/${encodeURIComponent(realm)}/${encodeURIComponent(name)}`,
      );
      return data;
    },
  });
}
