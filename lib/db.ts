import { neon } from "@neondatabase/serverless";

// DATABASE_URL is injected automatically once you add the Neon integration
// to your Vercel project (Storage tab -> Marketplace Database Providers ->
// Neon). For local dev, run `vercel env pull .env.local` to copy it down.
if (!process.env.DATABASE_URL) {
  console.warn(
    "DATABASE_URL is not set — the Day Log / Services / Orders API routes will fail until a Neon (or other Postgres) database is connected."
  );
} else {
  try {
    const host = new URL(process.env.DATABASE_URL).host;
    console.log(`[db] Connecting to Postgres host: ${host}`);
  } catch {
    console.warn("[db] DATABASE_URL is set but isn't a valid URL — double-check it was copied correctly.");
  }
}

export const sql = neon(process.env.DATABASE_URL || "");

// Simple key-value table: one row per STORAGE_KEYS entry (services, group
// colors, orders, day log), value stored as JSONB. This mirrors the shape
// the app already used in localStorage, so the client swap is a straight
// fetch()-instead-of-localStorage change rather than a data-model rewrite.
let tableReady: Promise<void> | null = null;

export function ensureAppStateTable(): Promise<void> {
  if (!tableReady) {
    tableReady = sql`
      CREATE TABLE IF NOT EXISTS app_state (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `
      .then(() => undefined)
      .catch((err) => {
        // let the next call retry instead of caching a failed attempt
        tableReady = null;
        throw err;
      });
  }
  return tableReady;
}
