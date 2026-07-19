"use client";

export default function SuccessToast({ message }: { message: string | null }) {
  return (
    <div
      className={`fixed left-1/2 top-6 z-[60] -translate-x-1/2 transition-all duration-300 ${
        message ? "opacity-100 translate-y-0" : "pointer-events-none -translate-y-2 opacity-0"
      }`}
    >
      <div className="flex items-center gap-2.5 rounded-full bg-ink-900 py-2.5 pl-2.5 pr-5 text-sm font-semibold text-white shadow-pop">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success text-xs">
          ✓
        </span>
        {message}
      </div>
    </div>
  );
}
