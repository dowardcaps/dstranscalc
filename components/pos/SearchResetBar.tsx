// SearchResetBar.tsx
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
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">
            🔍
          </span>
          <input
            type="text"
            value={activeTransaction.searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search (e.g. Xerox)..."
            className="w-full rounded-lg border-2 border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-[#1a2332] outline-none transition-colors focus:border-gray-400"
          />
        </div>
        <button
          onClick={() => setSearchTerm("")}
          className="rounded-lg border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-50"
        >
          Clear
        </button>
      </div>
      <button
        onClick={handleReset}
        className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-600"
      >
        Reset
      </button>
    </div>
  );
}