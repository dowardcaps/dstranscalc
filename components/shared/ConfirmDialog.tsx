"use client";

import Modal from "./Modal";

export type ConfirmDialogState = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  tone?: "default" | "danger";
  onConfirm: () => void;
};

export const CLOSED_CONFIRM: ConfirmDialogState = {
  open: false,
  title: "",
  message: "",
  onConfirm: () => {},
};

/**
 * Custom in-app confirmation dialog.
 * Replaces window.confirm(), which browsers deprecate/block inside
 * cross-origin iframes (e.g. when this app is embedded in the
 * DS Prints App Tools hub).
 */
export default function ConfirmDialog({
  state,
  onClose,
}: {
  state: ConfirmDialogState;
  onClose: () => void;
}) {
  const danger = state.tone === "danger";
  return (
    <Modal open={state.open} onClose={onClose}>
      <div className="p-6 text-center">
        <div
          className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl ${
            danger ? "bg-danger-light text-danger" : "bg-ink-50 text-ink-600"
          }`}
        >
          {danger ? "🗑️" : "❓"}
        </div>
        <h3 className="font-display text-lg font-semibold text-ink-900">{state.title}</h3>
        {state.message && (
          <p className="mt-1.5 text-sm text-ink-900/60">{state.message}</p>
        )}
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-paper-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-900/70 hover:bg-paper transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              state.onConfirm();
              onClose();
            }}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors ${
              danger ? "bg-danger hover:bg-danger/90" : "bg-ink-600 hover:bg-ink-700"
            }`}
          >
            {state.confirmLabel || "Confirm"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
