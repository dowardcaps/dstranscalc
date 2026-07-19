"use client";

import { useMemo } from "react";
import { useApp } from "@/lib/AppContext";

export default function GroupColorPanel() {
  const { services, groupColors, updateGroupColor } = useApp();
  const groups = useMemo(() => Array.from(new Set(services.map((s) => s.group))).sort(), [services]);

  return (
    <div className="sticky top-4 rounded-xl2 bg-paper-card p-5 shadow-card">
      <h3 className="mb-1 font-display text-sm font-bold uppercase tracking-wide text-ink-900/70">
        Group Colors
      </h3>
      <p className="mb-4 text-xs leading-relaxed text-ink-900/40">
        Click a color swatch to change the badge color for that group.
      </p>
      <div className="space-y-2">
        {groups.map((g) => {
          const color = groupColors[g] || "#5B5560";
          return (
            <div
              key={g}
              className="flex items-center justify-between rounded-lg border border-paper-line bg-paper px-3 py-2"
            >
              <span className="text-sm font-bold text-ink-900">{g}</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => updateGroupColor(g, e.target.value)}
                  className="h-7 w-8 cursor-pointer rounded border-none bg-transparent p-0"
                  title={`Change color for ${g}`}
                />
                <span className="font-mono text-[11px] font-bold text-ink-900/50">{color}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
