"use client";

import { ReactNode, useEffect } from "react";

export default function Modal({
  open,
  onClose,
  children,
  maxWidth = "max-w-sm",
}: {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  maxWidth?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 backdrop-blur-sm p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div
        className={`w-full ${maxWidth} rounded-xl2 bg-paper-card shadow-pop animate-[fadeIn_0.15s_ease-out]`}
      >
        {children}
      </div>
    </div>
  );
}
