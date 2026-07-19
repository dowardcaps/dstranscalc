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
