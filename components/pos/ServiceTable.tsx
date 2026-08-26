// ServiceTable.tsx
"use client";

import { useMemo } from "react";
import { useApp } from "@/lib/AppContext";
import { peso } from "@/lib/format";

const ITEMS_PER_PAGE = 8;

export default function ServiceTable() {
  const { services, groupColors, activeTransaction, setCartQty, changeQty, setCurrentPage } =
    useApp();
  const { searchTerm, currentPage, cart } = activeTransaction;

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return services.filter(
      (s) => s.name.toLowerCase().includes(term) || s.group.toLowerCase().includes(term)
    );
  }, [services, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const pageData = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="bg-[#0745b0] text-white">
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                Service / Item
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                Price
              </th>
              <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wide">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-14 text-center italic text-gray-400">
                  No services match your search.
                </td>
              </tr>
            )}
            {pageData.map((s) => {
              const qty = cart[s.id] || 0;
              const color = groupColors[s.group] || "#5B5560";
              return (
                <tr
                  key={s.id}
                  className={`border-b border-gray-100 last:border-0 ${
                    qty > 0 ? "bg-gray-50" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 text-sm font-semibold text-[#1a2332]">{s.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className="rounded-md px-2 py-1 text-xs font-bold text-white"
                      style={{ backgroundColor: color }}
                    >
                      {s.group}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm font-semibold text-gray-700">
                    {peso(s.price)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => changeQty(s.id, -1)}
                        disabled={qty === 0}
                        className="grid h-8 w-8 place-items-center rounded-lg bg-red-50 font-bold text-[#8f2d2d] hover:text-[#581313] active:text-[#e50a0a] disabled:opacity-30"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={0}
                        value={qty}
                        onChange={(e) => setCartQty(s.id, parseInt(e.target.value) || 0)}
                        className="h-8 w-12 rounded-lg border-2 border-gray-200 text-center text-sm font-bold text-[#1a2332] outline-none focus:border-gray-400"
                      />
                      <button
                        onClick={() => changeQty(s.id, 1)}
                        className="grid h-8 w-8 place-items-center rounded-lg bg-[#2d8f5e]/15 font-bold text-[#2d8f5e] hover:text-[#135836] active:text-[#0ae577]"
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-4 border-t border-gray-200 px-4 py-3">
        <button
          onClick={() => setCurrentPage(page - 1)}
          disabled={page === 1}
          className="rounded-lg border-2 border-gray-200 bg-white px-3.5 py-1.5 text-sm font-bold text-gray-600 disabled:opacity-40"
        >
          ‹‹
        </button>
        <span className="text-sm font-bold text-gray-500">
          {page} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(page + 1)}
          disabled={page === totalPages}
          className="rounded-lg border-2 border-gray-200 bg-white px-3.5 py-1.5 text-sm font-bold text-gray-600 disabled:opacity-40"
        >
          ››
        </button>
      </div>
    </div>
  );
}