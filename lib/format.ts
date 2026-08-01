export function peso(amount: number): string {
  return `\u20B1${amount.toFixed(2)}`;
}

export function makeId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

export function getTransactionLabel(index: number): string {
  let label = "";
  let i = index;
  while (i >= 0) {
    label = String.fromCharCode((i % 26) + 65) + label;
    i = Math.floor(i / 26) - 1;
  }
  return label;
}

const DAY_NAMES = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

/** Sortable key for "today", e.g. "2026-07-31". */
export function todayDateKey(): string {
  return dateToKey(new Date());
}

export function dateToKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Matches the "07/31/2026 FRIDAY" format used in the DS Prints Excel log. */
export function dateKeyToLabel(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const mm = String(m).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${mm}/${dd}/${y} ${DAY_NAMES[date.getDay()]}`;
}

/** Raw amount with no ₱ symbol, e.g. 206 or 206.5 — for pasting into an Excel amount column. */
export function plainAmount(amount: number): string {
  return String(Math.round(amount * 100) / 100);
}

/**
 * Builds one "Details <tab> Amount" row for pasting directly into Excel as
 * two columns. The details cell is wrapped in double quotes (CSV/TSV
 * convention) so its internal line breaks stay inside that one cell instead
 * of turning into extra rows, and the amount lands in the next column over.
 */
export function toExcelRow(details: string, amount: number): string {
  const escaped = details.replace(/"/g, '""');
  return `"${escaped}"\t${plainAmount(amount)}`;
}

/** Joins multiple entries into a multi-row, 2-column Excel-paste block. */
export function toExcelBlock(entries: { details: string; amount: number }[]): string {
  return entries.map((e) => toExcelRow(e.details, e.amount)).join("\r\n");
}
