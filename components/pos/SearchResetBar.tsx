"use client";

import { useApp } from "@/lib/AppContext";

export default function SearchResetBar() {
  const { activeTransaction, setSearchTerm, askConfirm, resetActiveCart } = useApp();

  const handleReset = () => {
    askConfirm({
      title: "Clear current order?",
      message: "All quantities in this transaction will be reset to zero.",
      confirmLabel: "Clear order",
      tone: "danger",
      onConfirm: resetActiveCart,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-1 min-w-[220px] items-center gap-2">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-900/30">
            🔍
          </span>
          <input
            type="text"
            value={activeTransaction.searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search (e.g. Xerox)..."
            className="w-full rounded-lg border-2 border-paper-line bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-ink-900 outline-none transition-colors focus:border-ink-400"
          />
        </div>
        <button
          onClick={() => setSearchTerm("")}
          className="rounded-lg border-2 border-paper-line bg-white px-4 py-2.5 text-sm font-bold text-ink-900/60 hover:bg-paper"
        >
          Clear
        </button>
      </div>
      <button
        onClick={handleReset}
        className="rounded-lg bg-danger px-5 py-2.5 text-sm font-bold text-white hover:bg-danger/90"
      >
        Reset
      </button>
    </div>
  );
}
