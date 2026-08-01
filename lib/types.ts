export type Service = {
  id: string;
  name: string;
  price: number;
  group: string;
};

export type GroupColors = Record<string, string>;

export type OrderStatus = "Not Started" | "Pending" | "Completed";

export type Order = {
  id: string;
  customer: string;
  details: string;
  amount: number;
  status: OrderStatus;
  notes: string;
  createdAt: number;
  updatedAt: number;
};

export type CartMap = Record<string, number>; // serviceId -> qty

export type Transaction = {
  id: number;
  name: string;
  cart: CartMap;
  searchTerm: string;
  currentPage: number;
};

export type DayLogEntry = {
  id: string;
  dateKey: string; // "2026-07-31" — for grouping/sorting
  dateLabel: string; // "07/31/2026 FRIDAY" — matches the Excel Date column
  details: string; // multi-line summary text, same format as Copy Summary
  amount: number;
  createdAt: number;
};

export type View = "pos" | "orders" | "services" | "daylog";
