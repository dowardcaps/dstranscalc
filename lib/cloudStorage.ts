"use client";

export type CloudResult<T> = { found: boolean; value: T | null };

export async function fetchCloudState<T>(key: string): Promise<CloudResult<T>> {
  const res = await fetch(`/api/state/${key}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${key} (${res.status})`);
  return res.json();
}

export async function saveCloudState<T>(key: string, value: T): Promise<void> {
  const res = await fetch(`/api/state/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value }),
  });
  if (!res.ok) throw new Error(`Failed to save ${key} (${res.status})`);
}
