"use client";

import { useEffect, useMemo, useState } from "react";
import Modal from "@/components/shared/Modal";
import { Service } from "@/lib/types";
import { useApp } from "@/lib/AppContext";

const EMPTY = { name: "", price: "", group: "" };

export default function ServiceModal({
  open,
  onClose,
  editingService,
}: {
  open: boolean;
  onClose: () => void;
  editingService: Service | null;
}) {
  const { services, upsertService, showSuccess, showAlert } = useApp();
  const [form, setForm] = useState(EMPTY);

  const groups = useMemo(
    () => Array.from(new Set(services.map((s) => s.group))).sort(),
    [services]
  );

  useEffect(() => {
    if (!open) return;
    if (editingService) {
      setForm({
        name: editingService.name,
        price: String(editingService.price),
        group: editingService.group,
      });
    } else {
      setForm(EMPTY);
    }
  }, [open, editingService]);

  const save = () => {
    const name = form.name.trim();
    const price = parseFloat(form.price);
    const group = form.group.trim();
    if (!name) return showAlert("Please enter a service name.");
    if (isNaN(price) || price < 0) return showAlert("Please enter a valid price.");
    if (!group) return showAlert("Please enter or select a group.");

    upsertService({ name, price, group }, editingService?.id ?? null);
    showSuccess(editingService ? "Service Updated" : "Service Added");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between border-b border-paper-line pb-3">
          <h3 className="font-display text-lg font-bold text-ink-900">
            {editingService ? "Edit Service" : "New Service"}
          </h3>
          <button onClick={onClose} className="text-xl text-ink-900/40 hover:text-ink-900">
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-900/50">
              Service Name
            </label>
            <input
              autoFocus
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. A4 (B&W)"
              maxLength={100}
              className="app-input"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-900/50">
                Price (₱)
              </label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="0"
                className="app-input"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-900/50">
                Group / Category
              </label>
              <input
                list="service-group-list"
                value={form.group}
                onChange={(e) => setForm((f) => ({ ...f, group: e.target.value }))}
                placeholder="e.g. Printing"
                maxLength={40}
                className="app-input"
              />
              <datalist id="service-group-list">
                {groups.map((g) => (
                  <option key={g} value={g} />
                ))}
              </datalist>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-ink-900/40">
            Tip: Type an existing group name or create a new one. New groups get a default gray
            color — update it in Group Colors.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-paper-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-900/70 hover:bg-paper"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="rounded-lg bg-ink-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-ink-700"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
