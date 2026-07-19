"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/shared/Modal";
import { useApp } from "@/lib/AppContext";
import { peso } from "@/lib/format";

export default function PaymentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cartTotal, completePayment, showSuccess, showAlert } = useApp();
  const [cash, setCash] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) setCash("");
  }, [open]);

  const cashNum = parseFloat(cash) || 0;
  const change = Math.max(0, cashNum - cartTotal);
  const short = cashNum > 0 && cashNum < cartTotal;

  const handleDone = () => {
    if (cashNum < cartTotal) {
      showAlert("Insufficient cash provided!");
      return;
    }
    setSubmitting(true);
    showSuccess("Payment Complete");
    window.setTimeout(() => {
      completePayment(cashNum);
      setSubmitting(false);
      onClose();
    }, 900);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between border-b border-paper-line pb-3">
          <h3 className="font-display text-lg font-bold text-ink-900">Complete Transaction</h3>
          <button onClick={onClose} className="text-xl text-ink-900/40 hover:text-ink-900">
            ×
          </button>
        </div>

        <div className="mb-5 flex items-center justify-between border-b border-paper-line pb-4 text-lg">
          <span className="text-ink-900/60">Total Amount:</span>
          <strong className="font-mono text-ink-900">{peso(cartTotal)}</strong>
        </div>

        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink-900/50">
          Cash Received (₱)
        </label>
        <input
          type="number"
          autoFocus
          value={cash}
          onChange={(e) => setCash(e.target.value)}
          placeholder="Enter amount..."
          className={`w-full rounded-lg border-2 bg-white px-3.5 py-2.5 font-mono text-base outline-none transition-colors ${
            short ? "border-danger" : "border-paper-line focus:border-ink-400"
          }`}
        />

        <div className="mt-4 rounded-xl border-2 border-success/40 bg-success/10 p-4 text-center">
          <span className="text-xs font-bold uppercase tracking-wide text-ink-900/50">Change</span>
          <h2 className={`mt-1 font-display text-3xl font-bold ${short ? "text-danger" : "text-success"}`}>
            {peso(change)}
          </h2>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-paper-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-900/70 hover:bg-paper"
          >
            Back
          </button>
          <button
            onClick={handleDone}
            disabled={submitting}
            className="rounded-lg bg-ink-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-ink-700 disabled:opacity-60"
          >
            Done & Clear
          </button>
        </div>
      </div>
    </Modal>
  );
}
