import { NextRequest, NextResponse } from "next/server";
import { ensureAppStateTable, sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// Only these keys may be read/written — prevents the route being used as an
// arbitrary key-value store from outside the app.
const ALLOWED_KEYS = new Set([
  "dsprints_services",
  "dsprints_group_colors",
  "dsprints_orders",
  "dsprints_day_log",
]);

function badKey(key: string) {
  return NextResponse.json({ error: `Unknown state key: ${key}` }, { status: 400 });
}

type RouteContext = { params: Promise<{ key: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { key } = await params;
  if (!ALLOWED_KEYS.has(key)) return badKey(key);
  try {
    await ensureAppStateTable();
    const rows = await sql`SELECT value FROM app_state WHERE key = ${key}`;
    if (rows.length === 0) {
      return NextResponse.json({ found: false, value: null });
    }
    return NextResponse.json({ found: true, value: rows[0].value });
  } catch (err) {
    console.error(`GET /api/state/${key} failed`, err);
    return NextResponse.json({ error: "Failed to load state" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { key } = await params;
  if (!ALLOWED_KEYS.has(key)) return badKey(key);
  try {
    const body = await req.json();
    await ensureAppStateTable();
    await sql`
      INSERT INTO app_state (key, value, updated_at)
      VALUES (${key}, ${JSON.stringify(body.value)}::jsonb, now())
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`PUT /api/state/${key} failed`, err);
    return NextResponse.json({ error: "Failed to save state" }, { status: 500 });
  }
}
