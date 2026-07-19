"use client";

/** Lightweight replacement for window.alert() for validation messages. */
export default function AlertToast({ message }: { message: string | null }) {
  return (
    <div
      className={`fixed left-1/2 bottom-6 z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 transition-all duration-300 ${
        message ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <div className="flex items-center gap-2.5 rounded-xl bg-danger py-3 px-4 text-sm font-semibold text-white shadow-pop">
        <span>⚠️</span>
        {message}
      </div>
    </div>
  );
}
