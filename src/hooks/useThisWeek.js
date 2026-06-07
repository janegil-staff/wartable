import { useQuery } from "@tanstack/react-query";
import client from "../api/client";

export function useThisWeek(region = "eu") {
  return useQuery({
    queryKey: ["thisweek", region],
    staleTime: 10 * 60 * 1000,
    queryFn: async () => (await client.get(`/thisweek?region=${region}`)).data,
  });
}
