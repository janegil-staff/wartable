// src/api/bnetAuth.js — drive Battle.net OAuth from the app.
// Opens the backend's /auth/bnet/login in an in-app browser; the backend
// redirects to Battle.net, then back to wartable://auth?token=<jwt>, which
// expo-web-browser hands back to us.
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { API_BASE_URL } from "./client";

WebBrowser.maybeCompleteAuthSession();
const RETURN_URL = "wartable://auth";

export async function loginWithBattleNet(region = "eu") {
  const authUrl = `${API_BASE_URL}/auth/bnet/login?region=${encodeURIComponent(region)}`;
  const result = await WebBrowser.openAuthSessionAsync(authUrl, RETURN_URL);
  if (result.type !== "success" || !result.url) return { ok: false, reason: result.type };
  const { queryParams } = Linking.parse(result.url);
  const token = queryParams?.token;
  if (!token) return { ok: false, reason: "no_token" };
  return { ok: true, token: String(token) };
}
