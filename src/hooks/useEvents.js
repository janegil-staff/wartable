// src/hooks/useEvents.js — guild events: list, create, RSVP.
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../api/client";

export function useEvents({ region, realm, name, enabled = true }) {
  return useQuery({
    queryKey: ["events", region, realm, name],
    enabled: enabled && !!region && !!realm && !!name,
    queryFn: async () => {
      const { data } = await client.get(`/events/${region}/${encodeURIComponent(realm)}/${encodeURIComponent(name)}`);
      return data;
    },
  });
}

export function useCreateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => (await client.post("/events", payload)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useRsvp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...body }) => (await client.post(`/events/${id}/rsvp`, body)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}
