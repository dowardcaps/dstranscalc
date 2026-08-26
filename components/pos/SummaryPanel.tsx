// SummaryPanel.tsx
"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/lib/AppContext";
import { peso, toExcelRow } from "@/lib/format";
import { copyToClipboard } from "@/lib/clipboard";

function buildSummaryText(
  services: { id: string; name: string; price: number; group: string }[],
  cart: Record<string, number>
) {
  const groups: Record<string, string[]> = {};
  for (const s of services) {
    const q = cart[s.id] || 0;
    if (q > 0) {
      groups[s.group] = groups[s.group] || [];
      groups[s.group].push(`${s.name} - ${q} x ${peso(s.price)} = ${peso(s.price * q)}`);
    }
  }
  let txt = "";
  for (const g in groups) txt += `[${g}]\n${groups[g].join("\n")}\n\n`;
  return { text: txt.trim(), groups };
}

export default function SummaryPanel({ onPay }: { onPay: () => void }) {
  const {
    services,
    groupColors,
    activeTransaction,
    cartTotal,
    cartItemCount,
    showAlert,
    showSuccess,
    addDayLogEntry,
    resetActiveCart,
  } = useApp();
  const [copied, setCopied] = useState(false);
  const [logged, setLogged] = useState(false);
  const { text, groups } = useMemo(
    () => buildSummaryText(services, activeTransaction.cart),
    [services, activeTransaction.cart]
  );
  const hasItems = Object.keys(groups).length > 0;

  const copySummary = async () => {
    if (!hasItems) {
      showAlert("Cart is empty!");
      return;
    }
    const ok = await copyToClipboard(toExcelRow(text, cartTotal));
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } else {
      showAlert("Copy blocked by browser — select and copy manually.");
    }
  };

  const insertSummary = () => {
    if (!hasItems) {
      showAlert("Cart is empty!");
      return;
    }
    addDayLogEntry(text, cartTotal);
    resetActiveCart();
    setLogged(true);
    window.setTimeout(() => setLogged(false), 2000);
    showSuccess("Added to Day Log");
  };

  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-5 shadow-sm border border-gray-200">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-gray-500">
          Summary
        </h3>
        <button
          onClick={copySummary}
          className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
            copied
              ? "border-[#2d8f5e] bg-[#2d8f5e]/10 text-[#2d8f5e]"
              : "border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
        >
          {copied ? "✅ Copied!" : "Copy"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {!hasItems && (
          <p className="italic text-sm text-gray-400">No items added yet...</p>
        )}
        {Object.entries(groups).map(([g, lines]) => (
          <div key={g} className="mb-4">
            <p className="mb-1 text-sm font-bold" style={{ color: groupColors[g] || "#5B5560" }}>
              {g}
            </p>
            <ul className="space-y-0.5 text-[13px] leading-snug text-gray-600">
              {lines.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-col gap-3 border-t-2 border-dashed border-gray-200 pt-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-gray-400">
              {cartItemCount} item{cartItemCount !== 1 ? "s" : ""}
            </p>
            <p className="font-display text-xl font-bold text-[#1a2332]">{peso(cartTotal)}</p>
          </div>
          <button
            onClick={() => (cartTotal ? onPay() : showAlert("Cart is empty!"))}
            className="rounded-xl bg-[#2d8f5e] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_0_0_rgba(45,143,94,0.4)] transition active:translate-y-0.5 active:shadow-none"
          >
            💸 Pay
          </button>
        </div>

        <button
          onClick={insertSummary}
          className={`w-full rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-colors ${
            logged
              ? "border-[#2d8f5e] bg-[#2d8f5e]/10 text-[#2d8f5e]"
              : "border-gray-300 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {logged ? "✅ Added to Day Log" : "🗒️ Insert Summary to Day Log"}
        </button>
      </div>
    </div>
  );
}