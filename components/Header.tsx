// Header.tsx
"use client";

import { useApp } from "@/lib/AppContext";
import { View } from "@/lib/types";

const TABS: { id: View; label: string; icon: string }[] = [
  { id: "pos", label: "POS", icon: "🖨️" },
  { id: "orders", label: "Orders", icon: "📋" },
  { id: "daylog", label: "Day Log", icon: "🗒️" },
  { id: "services", label: "Services", icon: "⚙️" },
];

export default function Header() {
  const { view, setView, cloudStatus } = useApp();
  const statusMeta = {
    loading: { dot: "bg-gray-400", label: "Connecting…" },
    online: { dot: "bg-[#2d8f5e]", label: "Synced to cloud" },
    offline: { dot: "bg-red-500", label: "Offline — saved on this computer only" },
  }[cloudStatus];

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" }).catch(() => {});
    window.location.href = "/login";
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 py-2 border-b border-gray-200">
      <div className="reg-mark flex items-center gap-2.5 pl-1">
        <div className="leading-tight">
          <h1 className="font-display text-lg font-bold tracking-tight text-[#1a2332]">
            DS Prints
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
            Transaction Calculator
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          title={statusMeta.label}
          className="flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-500"
        >
          <span className={`h-2 w-2 rounded-full ${statusMeta.dot}`} />
          {statusMeta.label}
        </span>

        <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                view === t.id
                  ? "bg-white text-[#1a2332] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="mr-1.5">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleLogout}
          title="Log out"
          className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          🔒 Log Out
        </button>
      </div>
    </header>
  );
}