export const SESSION_COOKIE = "ds_session";
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

const SESSION_SECRET = process.env.SESSION_SECRET || process.env.SHOP_PASSWORD || "";

const encoder = new TextEncoder();

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return toHex(sig);
}

/** Builds a new signed session token, valid for SESSION_MAX_AGE_MS from now. */
export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE_MS;
  const sig = await sign(String(expires));
  return `${expires}.${sig}`;
}

/** Checks a session token's signature and expiry. Never throws. */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || !SESSION_SECRET) return false;
  const [expiresStr, sig] = token.split(".");
  if (!expiresStr || !sig) return false;
  const expected = await sign(expiresStr);
  if (expected !== sig) return false;
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;
  return true;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    // SameSite=None is required for the cookie to work inside the App
    // Tools hub's iframe preview (a cross-origin embed). Secure is
    // mandatory whenever SameSite=None is used — modern browsers still
    // treat http://localhost as a secure context, so local dev is fine.
    secure: true,
    sameSite: "none" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_MS / 1000,
  };
}
