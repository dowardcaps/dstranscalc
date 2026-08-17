"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/lib/AppContext";

export default function TransactionTabs() {
  const { transactions, activeTabIndex, switchTab, addNewTransaction, removeTab } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Click-and-drag state. Kept in refs (not state) so the mousemove
  // listener always reads the latest values without re-subscribing.
  const dragState = useRef({ dragging: false, startX: 0, startScrollLeft: 0, moved: false });
  const [isDragging, setIsDragging] = useState(false);

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

    // Vertical mouse wheel -> horizontal scroll, for mice without a
    // horizontal scroll wheel.
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

  // Click-and-drag-to-scroll: grab anywhere on the strip and drag with the
  // mouse cursor, like dragging a slider. A small movement threshold keeps
  // ordinary clicks on a tab from being swallowed as a drag.
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = { dragging: true, startX: e.pageX, startScrollLeft: el.scrollLeft, moved: false };
    setIsDragging(true);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const ds = dragState.current;
      if (!ds.dragging) return;
      const delta = e.pageX - ds.startX;
      if (Math.abs(delta) > 3) ds.moved = true;
      el.scrollLeft = ds.startScrollLeft - delta;
    };
    const onMouseUp = () => {
      dragState.current.dragging = false;
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  // If the mouse genuinely dragged (not just clicked), swallow the click
  // that would otherwise fire on mouseup so it doesn't switch tabs.
  const handleTabClick = (i: number) => {
    if (dragState.current.moved) return;
    switchTab(i);
  };

  return (
    <div className="flex items-center gap-2 rounded-xl bg-ink-100/60 p-2">
      {/* Scrollable region: only the existing tabs live in here, so the
          Add button below never scrolls out of view no matter how many
          transactions are open. */}
      <div className="relative min-w-0 flex-1">
        {canScrollLeft && (
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-ink-100 to-transparent" />
        )}
        {canScrollRight && (
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-ink-100 to-transparent" />
        )}

        <div
          ref={scrollRef}
          onScroll={updateFades}
          onMouseDown={handleMouseDown}
          className={`thin-scrollbar flex gap-2 overflow-x-auto pb-3 ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
        >
          {transactions.map((t, i) => (
            <button
              key={t.id}
              onClick={() => handleTabClick(i)}
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
      </div>

      {/* Pinned outside the scroll area — always reachable, like the "+"
          new-tab button in a browser. */}
      <button
        onClick={addNewTransaction}
        title="New transaction"
        className="flex shrink-0 items-center justify-center gap-1.5 self-stretch rounded-lg bg-success px-3.5 text-sm font-bold text-white transition-colors hover:bg-success/90"
      >
        <span className="text-base leading-none">+</span>
        <span className="hidden sm:inline">New Transaction</span>
      </button>
    </div>
  );
}
