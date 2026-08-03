"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Incorrect password");
        setLoading(false);
        return;
      }
      // Hard navigation (not router.push) — guarantees the browser actually
      // sends the freshly-set cookie on the next request and the page
      // fully reloads, instead of relying on the client-side router.
      const next = searchParams.get("next") || "/";
      window.location.href = next;
    } catch {
      setError("Something went wrong — check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl2 bg-paper-card p-8 shadow-card"
      >
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-ink-600 font-display text-xl font-bold text-white">
            DS
          </span>
          <h1 className="font-display text-lg font-bold text-ink-900">DS Prints</h1>
          <p className="text-xs font-semibold text-ink-900/45">
            Enter the shop password to continue
          </p>
        </div>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Shop password"
          className="mb-3 w-full rounded-lg border border-paper-line bg-white px-4 py-3 text-sm outline-none focus:border-ink-600"
        />

        {error && <p className="mb-3 text-sm font-semibold text-danger">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded-xl bg-ink-600 px-4 py-3 text-sm font-bold text-white shadow-[0_4px_0_0_rgba(0,0,0,0.15)] transition active:translate-y-0.5 active:shadow-none disabled:opacity-50"
        >
          {loading ? "Checking…" : "Unlock"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
