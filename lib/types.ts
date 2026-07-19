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

export type View = "pos" | "orders" | "services";
