// src/api/client.js — Axios instance with auth + base URL. House style:
// token from expo-secure-store injected via request interceptor; 401 handling
// in the response interceptor.
import axios from "axios";
import * as SecureStore from "expo-secure-store";

// TODO: point at your backend (DigitalOcean / Render). Use an env/app.config
// value in production rather than hard-coding.
export const API_BASE_URL = "https://api.wartable.app";

export const TOKEN_KEY = "wartable_token";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

client.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {}
  return config;
});

let onUnauthorized = null;
export const setUnauthorizedHandler = (fn) => { onUnauthorized = fn; };

client.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error?.response?.status === 401) {
      try { await SecureStore.deleteItemAsync(TOKEN_KEY); } catch {}
      onUnauthorized?.();
    }
    return Promise.reject(error);
  },
);

export default client;
