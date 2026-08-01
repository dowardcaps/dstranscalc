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
    loading: { dot: "bg-ink-900/30", label: "Connecting…" },
    online: { dot: "bg-success", label: "Synced to cloud" },
    offline: { dot: "bg-danger", label: "Offline — saved on this computer only" },
  }[cloudStatus];

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 py-1">
      <div className="reg-mark flex items-center gap-2.5 pl-1">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink-600 font-display text-base font-bold text-white">
          DS
        </span>
        <div className="leading-tight">
          <h1 className="font-display text-lg font-bold tracking-tight text-ink-900">
            DS Prints
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-900/40">
            Transaction Calculator
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          title={statusMeta.label}
          className="flex items-center gap-1.5 rounded-full bg-ink-100/60 px-2.5 py-1 text-[11px] font-bold text-ink-900/50"
        >
          <span className={`h-2 w-2 rounded-full ${statusMeta.dot}`} />
          {statusMeta.label}
        </span>

        <div className="flex gap-1 rounded-xl bg-ink-100/60 p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setView(t.id)}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                view === t.id
                  ? "bg-white text-ink-900 shadow-card"
                  : "text-ink-900/50 hover:text-ink-900/80"
              }`}
            >
              <span className="mr-1.5">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
