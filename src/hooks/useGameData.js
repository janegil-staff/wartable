// src/hooks/useGameData.js — auction house + leaderboards hooks.
import { useQuery } from "@tanstack/react-query";
import client from "../api/client";

export function useAuctionRealms(region = "eu") {
  return useQuery({
    queryKey: ["auction-realms", region],
    staleTime: 60 * 60 * 1000,
    queryFn: async () => (await client.get(`/auctions/realms?region=${region}`)).data,
  });
}
export function useAuctions({ region = "eu", crId, itemId, page = 1, enabled = true }) {
  return useQuery({
    queryKey: ["auctions", region, crId, itemId, page],
    enabled: enabled && !!crId,
    queryFn: async () => {
      const q = new URLSearchParams({ page: String(page) });
      if (itemId) q.set("itemId", String(itemId));
      return (await client.get(`/auctions/${region}/${crId}?${q.toString()}`)).data;
    },
  });
}
export function useRaidLeaderboard({ region = "eu", raid, faction = "alliance", enabled = true }) {
  return useQuery({
    queryKey: ["lb-raid", region, raid, faction],
    enabled: enabled && !!raid,
    staleTime: 10 * 60 * 1000,
    queryFn: async () => (await client.get(`/leaderboards/raid/${raid}/${faction}?region=${region}`)).data,
  });
}
export function usePvpLeaderboard({ region = "eu", bracket = "3v3" }) {
  return useQuery({
    queryKey: ["lb-pvp", region, bracket],
    staleTime: 10 * 60 * 1000,
    queryFn: async () => (await client.get(`/leaderboards/pvp/${bracket}?region=${region}`)).data,
  });
}
