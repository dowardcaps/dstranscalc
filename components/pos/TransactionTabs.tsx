"use client";

import { useApp } from "@/lib/AppContext";

export default function TransactionTabs() {
  const { transactions, activeTabIndex, switchTab, addNewTransaction, removeTab } = useApp();

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar rounded-xl bg-ink-100/60 p-2">
      <div className="flex gap-2">
        {transactions.map((t, i) => (
          <button
            key={t.id}
            onClick={() => switchTab(i)}
            className={`group flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-bold transition-colors ${
              i === activeTabIndex
                ? "bg-ink-600 text-white"
                : "border border-paper-line bg-white text-ink-900/70 hover:border-ink-300"
            }`}
          >
            {t.name}
            {transactions.length > 1 && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(i);
                }}
                className={`leading-none opacity-70 hover:opacity-100 ${
                  i === activeTabIndex ? "text-white" : "text-ink-900/40"
                }`}
              >
                ×
              </span>
            )}
          </button>
        ))}
      </div>
      <button
        onClick={addNewTransaction}
        className="shrink-0 rounded-lg bg-success px-3.5 py-2 text-sm font-bold text-white hover:bg-success/90 whitespace-nowrap"
      >
        + New Transaction
      </button>
    </div>
  );
}
