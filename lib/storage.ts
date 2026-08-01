"use client";

export const STORAGE_KEYS = {
  services: "dsprints_services",
  colors: "dsprints_group_colors",
  orders: "dsprints_orders",
  dayLog: "dsprints_day_log",
  transactions: "dsprints_transactions",
  activeTab: "dsprints_active_tab",
} as const;

export function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — silently ignore */
  }
}
