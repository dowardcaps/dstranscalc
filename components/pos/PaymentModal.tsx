// PaymentModal.tsx
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
        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
          <h3 className="font-display text-lg font-bold text-[#1a2332]">Complete Transaction</h3>
          <button onClick={onClose} className="text-xl text-gray-400 hover:text-[#1a2332]">
            ×
          </button>
        </div>

        <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-4 text-lg">
          <span className="text-gray-500">Total Amount:</span>
          <strong className="font-mono text-[#1a2332]">{peso(cartTotal)}</strong>
        </div>

        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-400">
          Cash Received (₱)
        </label>
        <input
          type="number"
          autoFocus
          value={cash}
          onChange={(e) => setCash(e.target.value)}
          placeholder="Enter amount..."
          className={`w-full rounded-lg border-2 bg-white px-3.5 py-2.5 font-mono text-base outline-none transition-colors ${
            short ? "border-red-500" : "border-gray-200 focus:border-gray-400"
          }`}
        />

        <div className="mt-4 rounded-xl border-2 border-[#2d8f5e]/40 bg-[#2d8f5e]/10 p-4 text-center">
          <span className="text-xs font-bold uppercase tracking-wide text-gray-400">Change</span>
          <h2 className={`mt-1 font-display text-3xl font-bold ${short ? "text-red-500" : "text-[#2d8f5e]"}`}>
            {peso(change)}
          </h2>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={handleDone}
            disabled={submitting}
            className="rounded-lg bg-[#1a2332] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#2a3a4f] disabled:opacity-60"
          >
            Done & Clear
          </button>
        </div>
      </div>
    </Modal>
  );
}