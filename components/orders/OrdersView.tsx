"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/lib/AppContext";
import { Order, OrderStatus } from "@/lib/types";
import OrderCard from "./OrderCard";
import OrderModal from "./OrderModal";

const STATUS_ORDER: Record<OrderStatus, number> = { "Not Started": 0, Pending: 1, Completed: 2 };

export default function OrdersView() {
  const { orders, deleteOrder, askConfirm, showSuccess } = useApp();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return orders
      .filter((o) => {
        const matchesSearch =
          o.customer.toLowerCase().includes(term) ||
          o.details.toLowerCase().includes(term) ||
          (o.notes || "").toLowerCase().includes(term);
        const matchesFilter = filter === "all" || o.status === filter;
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || b.createdAt - a.createdAt);
  }, [orders, search, filter]);

  const openNew = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (o: Order) => {
    setEditing(o);
    setModalOpen(true);
  };
  const handleDelete = (o: Order) => {
    askConfirm({
      title: "Delete Order?",
      message: `"${o.customer || o.details.slice(0, 40) || "This order"}" will be permanently removed.`,
      confirmLabel: "Delete",
      tone: "danger",
      onConfirm: () => {
        deleteOrder(o.id);
        showSuccess("Order Deleted");
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 min-w-[220px] gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="app-input flex-1"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | OrderStatus)}
            className="app-input w-40 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="Not Started">Not Started</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          onClick={openNew}
          className="rounded-lg bg-ink-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-ink-700"
        >
          + New Order
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl2 bg-paper-card py-16 text-center shadow-card">
          <div className="mb-2 text-4xl">📋</div>
          <p className="font-semibold text-ink-900/50">No orders yet. Create your first order!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((o) => (
            <OrderCard key={o.id} order={o} onEdit={() => openEdit(o)} onDelete={() => handleDelete(o)} />
          ))}
        </div>
      )}

      <OrderModal open={modalOpen} onClose={() => setModalOpen(false)} editingOrder={editing} />
    </div>
  );
}
