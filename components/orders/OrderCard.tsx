"use client";

import { Order } from "@/lib/types";
import { peso } from "@/lib/format";

const STATUS_STYLE: Record<Order["status"], { border: string; badge: string }> = {
  "Not Started": { border: "border-l-danger", badge: "bg-danger-light text-danger" },
  Pending: { border: "border-l-press-amber", badge: "bg-press-amber/15 text-press-amber" },
  Completed: { border: "border-l-success", badge: "bg-success/15 text-success" },
};

export default function OrderCard({
  order,
  onEdit,
  onDelete,
}: {
  order: Order;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const style = STATUS_STYLE[order.status];
  const date = new Date(order.createdAt).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={`flex flex-col gap-2.5 rounded-xl2 border-l-4 bg-paper-card p-4 shadow-card ${style.border}`}>
      <div className="flex items-start justify-between gap-2">
        <p className="font-display font-bold text-ink-900">{order.customer || "Unnamed Customer"}</p>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${style.badge}`}>
          {order.status}
        </span>
      </div>
      {order.details && (
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-900/70">{order.details}</p>
      )}
      <div className="flex items-center justify-between">
        <span className="font-mono text-lg font-bold text-ink-600">
          {order.amount > 0 ? peso(order.amount) : "—"}
        </span>
        <span className="text-xs font-semibold text-ink-900/35">{date}</span>
      </div>
      {order.notes && (
        <p className="border-t border-dashed border-paper-line pt-2 text-xs italic text-ink-900/50">
          📝 {order.notes}
        </p>
      )}
      <div className="flex justify-end gap-2 border-t border-paper-line pt-2.5">
        <button
          onClick={onEdit}
          className="rounded-md border border-ink-200 bg-ink-50 px-3 py-1.5 text-xs font-bold text-ink-600 hover:bg-ink-100"
        >
          ✏️ Edit
        </button>
        <button
          onClick={onDelete}
          className="rounded-md border border-danger/25 bg-danger-light px-3 py-1.5 text-xs font-bold text-danger hover:bg-danger/15"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
