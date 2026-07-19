"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/shared/Modal";
import { Order, OrderStatus } from "@/lib/types";
import { useApp } from "@/lib/AppContext";

const EMPTY = { customer: "", details: "", amount: "", status: "Not Started" as OrderStatus, notes: "" };

export default function OrderModal({
  open,
  onClose,
  editingOrder,
}: {
  open: boolean;
  onClose: () => void;
  editingOrder: Order | null;
}) {
  const { upsertOrder, showSuccess, showAlert } = useApp();
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (!open) return;
    if (editingOrder) {
      setForm({
        customer: editingOrder.customer,
        details: editingOrder.details,
        amount: editingOrder.amount ? String(editingOrder.amount) : "",
        status: editingOrder.status,
        notes: editingOrder.notes,
      });
    } else {
      setForm(EMPTY);
    }
  }, [open, editingOrder]);

  const save = () => {
    const customer = form.customer.trim();
    const details = form.details.trim();
    if (!customer && !details) {
      showAlert("Please enter a customer name or order details.");
      return;
    }
    upsertOrder(
      {
        customer,
        details,
        amount: parseFloat(form.amount) || 0,
        status: form.status,
        notes: form.notes.trim(),
      },
      editingOrder?.id ?? null
    );
    showSuccess(editingOrder ? "Order Updated" : "Order Saved");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-md">
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between border-b border-paper-line pb-3">
          <h3 className="font-display text-lg font-bold text-ink-900">
            {editingOrder ? "Edit Order" : "New Order"}
          </h3>
          <button onClick={onClose} className="text-xl text-ink-900/40 hover:text-ink-900">
            ×
          </button>
        </div>

        <div className="space-y-4">
          <Field label="Customer Name">
            <input
              autoFocus
              value={form.customer}
              onChange={(e) => setForm((f) => ({ ...f, customer: e.target.value }))}
              placeholder="e.g. Juan dela Cruz"
              maxLength={80}
              className="app-input"
            />
          </Field>
          <Field label="Order Details">
            <textarea
              value={form.details}
              onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
              placeholder="e.g. 5x A4 B&W, 2x ID Photo Package P2..."
              rows={4}
              className="app-input resize-y"
            />
          </Field>
          <div className="flex gap-3">
            <Field label="Amount (₱)" className="flex-1">
              <input
                type="number"
                min={0}
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                placeholder="0.00"
                className="app-input"
              />
            </Field>
            <Field label="Status" className="flex-1">
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as OrderStatus }))}
                className="app-input"
              >
                <option value="Not Started">🔴 Not Started</option>
                <option value="Pending">🟡 Pending</option>
                <option value="Completed">🟢 Completed</option>
              </select>
            </Field>
          </div>
          <Field label="Notes (optional)">
            <input
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              placeholder="e.g. Pick up tomorrow..."
              maxLength={120}
              className="app-input"
            />
          </Field>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border border-paper-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-900/70 hover:bg-paper">
            Cancel
          </button>
          <button onClick={save} className="rounded-lg bg-ink-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-ink-700">
            Save Order
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-900/50">{label}</label>
      {children}
    </div>
  );
}
