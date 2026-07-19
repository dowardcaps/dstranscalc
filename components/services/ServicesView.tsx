"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/lib/AppContext";
import { Service } from "@/lib/types";
import { peso } from "@/lib/format";
import ServiceModal from "./ServiceModal";
import GroupColorPanel from "./GroupColorPanel";

const PER_PAGE = 10;

export default function ServicesView() {
  const { services, groupColors, deleteService, resetServicesToDefault, askConfirm, showSuccess } =
    useApp();
  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState("all");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);

  const groups = useMemo(() => Array.from(new Set(services.map((s) => s.group))).sort(), [services]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return services.filter(
      (s) =>
        (filterGroup === "all" || s.group === filterGroup) &&
        (s.name.toLowerCase().includes(term) || s.group.toLowerCase().includes(term))
    );
  }, [services, search, filterGroup]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageData = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const openNew = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (s: Service) => {
    setEditing(s);
    setModalOpen(true);
  };
  const handleDelete = (s: Service) => {
    askConfirm({
      title: "Delete Service?",
      message: `"${s.name}" (${s.group}) will be permanently removed.`,
      confirmLabel: "Delete",
      tone: "danger",
      onConfirm: () => {
        deleteService(s.id);
        showSuccess("Service Deleted");
      },
    });
  };
  const handleResetDefaults = () => {
    askConfirm({
      title: "Reset all services?",
      message: "This restores the original defaults and clears any custom services you've added.",
      confirmLabel: "Reset Defaults",
      tone: "danger",
      onConfirm: () => {
        resetServicesToDefault();
        showSuccess("Services Reset");
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 min-w-[220px] gap-2">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search services..."
            className="app-input flex-1"
          />
          <select
            value={filterGroup}
            onChange={(e) => {
              setFilterGroup(e.target.value);
              setPage(1);
            }}
            className="app-input w-40 cursor-pointer"
          >
            <option value="all">All Groups</option>
            {groups.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span className="whitespace-nowrap text-xs font-bold text-ink-900/45">
            {filtered.length} service{filtered.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={openNew}
            className="rounded-lg bg-ink-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-ink-700"
          >
            + Add Service
          </button>
          <button
            onClick={handleResetDefaults}
            title="Reset all services to defaults"
            className="rounded-lg border-2 border-paper-line bg-white px-3.5 py-2.5 text-sm font-bold text-ink-900/60 hover:border-danger hover:text-danger"
          >
            ↺ Reset Defaults
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-xl2 bg-paper-card shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr className="bg-ink-900 text-white">
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                    Service / Item
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                    Group
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
                    Price
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageData.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-14 text-center italic text-ink-900/35">
                      No services found.
                    </td>
                  </tr>
                )}
                {pageData.map((s) => {
                  const color = groupColors[s.group] || "#5B5560";
                  return (
                    <tr key={s.id} className="border-b border-paper-line last:border-0 hover:bg-paper">
                      <td className="px-4 py-3 text-sm font-semibold text-ink-900">{s.name}</td>
                      <td className="px-4 py-3">
                        <span
                          className="rounded-md px-2 py-1 text-xs font-bold text-white"
                          style={{ backgroundColor: color }}
                        >
                          {s.group}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm font-semibold text-ink-900/80">
                        {peso(s.price)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => openEdit(s)}
                            className="rounded-md border border-ink-200 bg-ink-50 px-2.5 py-1.5 text-xs font-bold text-ink-600 hover:bg-ink-100"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(s)}
                            className="rounded-md border border-danger/25 bg-danger-light px-2.5 py-1.5 text-xs font-bold text-danger hover:bg-danger/15"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center gap-4 border-t border-paper-line px-4 py-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border-2 border-paper-line bg-white px-3.5 py-1.5 text-sm font-bold text-ink-900/70 disabled:opacity-40"
            >
              ‹‹
            </button>
            <span className="text-sm font-bold text-ink-900/60">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border-2 border-paper-line bg-white px-3.5 py-1.5 text-sm font-bold text-ink-900/70 disabled:opacity-40"
            >
              ››
            </button>
          </div>
        </div>

        <GroupColorPanel />
      </div>

      <ServiceModal open={modalOpen} onClose={() => setModalOpen(false)} editingService={editing} />
    </div>
  );
}
