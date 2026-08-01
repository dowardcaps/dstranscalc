"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/lib/AppContext";
import { peso, toExcelBlock, toExcelRow } from "@/lib/format";
import { copyToClipboard } from "@/lib/clipboard";
import { DayLogEntry } from "@/lib/types";

function groupByDate(entries: DayLogEntry[]) {
  const map = new Map<string, DayLogEntry[]>();
  for (const e of entries) {
    const list = map.get(e.dateKey) || [];
    list.push(e);
    map.set(e.dateKey, list);
  }
  // most recent date first; entries within a date oldest-first (matches
  // the order they'd be typed into the Excel sheet through the day)
  return [...map.entries()]
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([dateKey, list]) => ({
      dateKey,
      dateLabel: list[0].dateLabel,
      entries: [...list].sort((a, b) => a.createdAt - b.createdAt),
      total: list.reduce((sum, e) => sum + e.amount, 0),
    }));
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const { showAlert } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } else {
      showAlert("Copy blocked by browser — select and copy manually.");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
        copied
          ? "border-success bg-success/10 text-success"
          : "border-paper-line text-ink-900/60 hover:bg-paper"
      }`}
    >
      {copied ? "✅ Copied!" : label}
    </button>
  );
}

export default function DayLogView() {
  const { dayLog, deleteDayLogEntry, clearDayLogForDate, askConfirm } = useApp();
  const groups = useMemo(() => groupByDate(dayLog), [dayLog]);

  if (groups.length === 0) {
    return (
      <div className="rounded-xl2 bg-paper-card p-10 text-center shadow-card">
        <p className="text-sm italic text-ink-900/40">
          No entries yet. Compute an order in POS, then tap{" "}
          <strong className="not-italic">Insert Summary to Day Log</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {groups.map((g) => {
        const allDetails = toExcelBlock(g.entries);
        return (
          <div key={g.dateKey} className="rounded-xl2 bg-paper-card p-5 shadow-card">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b-2 border-dashed border-paper-line pb-3">
              <div>
                <h3 className="font-display text-base font-bold text-ink-900">{g.dateLabel}</h3>
                <p className="text-xs font-semibold text-ink-900/45">
                  {g.entries.length} order{g.entries.length !== 1 ? "s" : ""} · Total{" "}
                  <span className="text-ink-600">{peso(g.total)}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <CopyButton text={allDetails} label="📋 Copy All Rows" />
                <button
                  onClick={() =>
                    askConfirm({
                      title: "Clear this day's log?",
                      message: `This removes all ${g.entries.length} entr${
                        g.entries.length !== 1 ? "ies" : "y"
                      } for ${g.dateLabel} from the Day Log. Make sure you've already copied them into Excel.`,
                      confirmLabel: "Clear",
                      tone: "danger",
                      onConfirm: () => clearDayLogForDate(g.dateKey),
                    })
                  }
                  className="rounded-lg border border-paper-line px-3 py-1.5 text-xs font-bold text-danger transition-colors hover:bg-danger-light"
                >
                  🗑️ Clear Day
                </button>
              </div>
            </div>

            <div className="flex flex-col divide-y divide-paper-line">
              {g.entries.map((e, i) => (
                <div key={e.id} className="flex items-start gap-3 py-3">
                  <span className="mt-1 w-5 shrink-0 text-xs font-bold text-ink-900/30">
                    {i + 1}
                  </span>
                  <pre className="flex-1 whitespace-pre-wrap break-words font-sans text-[13px] leading-snug text-ink-900/80">
                    {e.details}
                  </pre>
                  <span className="w-20 shrink-0 text-right font-mono text-sm font-bold text-ink-900">
                    {peso(e.amount)}
                  </span>
                  <CopyButton text={toExcelRow(e.details, e.amount)} />
                  <button
                    onClick={() =>
                      askConfirm({
                        title: "Delete this entry?",
                        message: "This removes it from the Day Log only.",
                        confirmLabel: "Delete",
                        tone: "danger",
                        onConfirm: () => deleteDayLogEntry(e.id),
                      })
                    }
                    className="shrink-0 rounded-lg border border-paper-line px-2.5 py-1.5 text-xs font-bold text-ink-900/40 transition-colors hover:bg-danger-light hover:text-danger"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
