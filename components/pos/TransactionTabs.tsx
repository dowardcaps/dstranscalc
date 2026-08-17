"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/lib/AppContext";

export default function TransactionTabs() {
  const { transactions, activeTabIndex, switchTab, addNewTransaction, removeTab } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateFades = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    updateFades();
    const el = scrollRef.current;
    if (!el) return;

    // Most shop PCs use a plain mouse, not a trackpad — a vertical wheel
    // won't scroll a horizontal container by default. Translate vertical
    // wheel movement into horizontal scroll so the row is actually usable
    // without a visible scrollbar or a trackpad.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    const ro = new ResizeObserver(updateFades);
    ro.observe(el);

    return () => {
      el.removeEventListener("wheel", onWheel);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions.length]);

  return (
    <div className="relative">
      {canScrollLeft && (
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 rounded-l-xl bg-gradient-to-r from-paper to-transparent" />
      )}
      {canScrollRight && (
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 rounded-r-xl bg-gradient-to-l from-paper to-transparent" />
      )}

      <div
        ref={scrollRef}
        onScroll={updateFades}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar rounded-xl bg-ink-100/60 p-2"
      >
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
    </div>
  );
}
