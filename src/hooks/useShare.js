// src/hooks/useShare.js — create / view / list character share codes.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "../api/client";

export function useCreateShare() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ region = "eu", realmSlug, name, label }) => {
      const { data } = await client.post("/share", { region, realmSlug, name, label });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myCodes"] }),
  });
}

export function useViewShare(code, enabled) {
  return useQuery({
    queryKey: ["share", code],
    enabled: !!enabled && !!code,
    retry: false,
    queryFn: async () => {
      const { data } = await client.get(`/share/${encodeURIComponent(code)}`);
      return data; // { label, character, updatedAt }
    },
  });
}

export function useMyCodes() {
  return useQuery({
    queryKey: ["myCodes"],
    queryFn: async () => (await client.get("/share")).data,
  });
}
