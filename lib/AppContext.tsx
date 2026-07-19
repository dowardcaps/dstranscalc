"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CartMap,
  GroupColors,
  Order,
  OrderStatus,
  Service,
  Transaction,
  View,
} from "./types";
import { DEFAULT_GROUP_COLORS, DEFAULT_SERVICES } from "./defaultData";
import { loadJSON, saveJSON, STORAGE_KEYS } from "./storage";
import { getTransactionLabel, makeId } from "./format";
import { ConfirmDialogState, CLOSED_CONFIRM } from "@/components/shared/ConfirmDialog";

type NewOrderInput = Omit<Order, "id" | "createdAt" | "updatedAt">;
type NewServiceInput = { name: string; price: number; group: string };

type AppContextValue = {
  // data
  services: Service[];
  groupColors: GroupColors;
  orders: Order[];
  // pos
  view: View;
  setView: (v: View) => void;
  transactions: Transaction[];
  activeTabIndex: number;
  activeTransaction: Transaction;
  switchTab: (i: number) => void;
  addNewTransaction: () => void;
  removeTab: (i: number) => void;
  setCartQty: (serviceId: string, qty: number) => void;
  changeQty: (serviceId: string, delta: number) => void;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  resetActiveCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  completePayment: (cash: number) => boolean;
  // orders
  upsertOrder: (input: NewOrderInput, id?: string | null) => void;
  deleteOrder: (id: string) => void;
  // services manager
  upsertService: (input: NewServiceInput, id?: string | null) => void;
  deleteService: (id: string) => void;
  updateGroupColor: (group: string, color: string) => void;
  resetServicesToDefault: () => void;
  // ui feedback
  success: string | null;
  showSuccess: (msg: string) => void;
  alertMsg: string | null;
  showAlert: (msg: string) => void;
  confirmState: ConfirmDialogState;
  askConfirm: (state: Omit<ConfirmDialogState, "open">) => void;
  closeConfirm: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function seedServices(): Service[] {
  return DEFAULT_SERVICES.map((s, i) => ({ ...s, id: `svc_${Date.now()}_${i}` }));
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [groupColors, setGroupColors] = useState<GroupColors>({});
  const [orders, setOrders] = useState<Order[]>([]);

  const [view, setView] = useState<View>("pos");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [success, setSuccess] = useState<string | null>(null);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<ConfirmDialogState>(CLOSED_CONFIRM);

  // ---- initial hydrate from localStorage ----
  useEffect(() => {
    const sv = loadJSON<Service[] | null>(STORAGE_KEYS.services, null);
    let loadedServices: Service[];
    if (sv && sv.length) {
      loadedServices = sv;
    } else {
      loadedServices = seedServices();
      saveJSON(STORAGE_KEYS.services, loadedServices);
    }
    setServices(loadedServices);

    const gc = loadJSON<GroupColors | null>(STORAGE_KEYS.colors, null);
    const loadedColors = gc || { ...DEFAULT_GROUP_COLORS };
    if (!gc) saveJSON(STORAGE_KEYS.colors, loadedColors);
    setGroupColors(loadedColors);

    setOrders(loadJSON<Order[]>(STORAGE_KEYS.orders, []));

    setTransactions([
      { id: Date.now(), name: `Transaction ${getTransactionLabel(0)}`, cart: {}, searchTerm: "", currentPage: 1 },
    ]);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveJSON(STORAGE_KEYS.services, services);
  }, [services, hydrated]);
  useEffect(() => {
    if (hydrated) saveJSON(STORAGE_KEYS.colors, groupColors);
  }, [groupColors, hydrated]);
  useEffect(() => {
    if (hydrated) saveJSON(STORAGE_KEYS.orders, orders);
  }, [orders, hydrated]);

  const showSuccess = useCallback((msg: string) => {
    setSuccess(msg);
    window.setTimeout(() => setSuccess(null), 1500);
  }, []);

  const showAlert = useCallback((msg: string) => {
    setAlertMsg(msg);
    window.setTimeout(() => setAlertMsg(null), 2400);
  }, []);

  const askConfirm = useCallback((s: Omit<ConfirmDialogState, "open">) => {
    setConfirmState({ ...s, open: true });
  }, []);
  const closeConfirm = useCallback(() => {
    setConfirmState((s) => ({ ...s, open: false }));
  }, []);

  const activeTransaction = transactions[activeTabIndex] || {
    id: 0,
    name: "Transaction A",
    cart: {},
    searchTerm: "",
    currentPage: 1,
  };

  const updateActiveTransaction = useCallback(
    (patch: Partial<Transaction>) => {
      setTransactions((prev) =>
        prev.map((t, i) => (i === activeTabIndex ? { ...t, ...patch } : t))
      );
    },
    [activeTabIndex]
  );

  const switchTab = useCallback((i: number) => setActiveTabIndex(i), []);

  const addNewTransaction = useCallback(() => {
    setTransactions((prev) => {
      const next = [
        ...prev,
        {
          id: Date.now(),
          name: `Transaction ${getTransactionLabel(prev.length)}`,
          cart: {},
          searchTerm: "",
          currentPage: 1,
        },
      ];
      setActiveTabIndex(next.length - 1);
      return next;
    });
  }, []);

  const removeTab = useCallback(
    (i: number) => {
      setTransactions((prev) => {
        if (prev.length <= 1) return prev;
        const next = prev.filter((_, idx) => idx !== i);
        setActiveTabIndex((cur) => Math.min(cur >= next.length ? next.length - 1 : cur, next.length - 1));
        return next;
      });
    },
    []
  );

  const setCartQty = useCallback(
    (serviceId: string, qty: number) => {
      const cart: CartMap = { ...activeTransaction.cart };
      if (qty <= 0) delete cart[serviceId];
      else cart[serviceId] = qty;
      updateActiveTransaction({ cart });
    },
    [activeTransaction.cart, updateActiveTransaction]
  );

  const changeQty = useCallback(
    (serviceId: string, delta: number) => {
      const current = activeTransaction.cart[serviceId] || 0;
      setCartQty(serviceId, Math.max(0, current + delta));
    },
    [activeTransaction.cart, setCartQty]
  );

  const setSearchTerm = useCallback(
    (term: string) => updateActiveTransaction({ searchTerm: term, currentPage: 1 }),
    [updateActiveTransaction]
  );
  const setCurrentPage = useCallback(
    (page: number) => updateActiveTransaction({ currentPage: page }),
    [updateActiveTransaction]
  );

  const resetActiveCart = useCallback(() => {
    updateActiveTransaction({ cart: {}, searchTerm: "", currentPage: 1 });
  }, [updateActiveTransaction]);

  const { cartTotal, cartItemCount } = useMemo(() => {
    let total = 0;
    let items = 0;
    for (const s of services) {
      const q = activeTransaction.cart[s.id] || 0;
      total += s.price * q;
      items += q;
    }
    return { cartTotal: total, cartItemCount: items };
  }, [services, activeTransaction.cart]);

  const completePayment = useCallback(
    (cash: number) => {
      if (cash < cartTotal) return false;
      resetActiveCart();
      return true;
    },
    [cartTotal, resetActiveCart]
  );

  // ---- Orders ----
  const upsertOrder = useCallback((input: NewOrderInput, id?: string | null) => {
    setOrders((prev) => {
      if (id) {
        return prev.map((o) => (o.id === id ? { ...o, ...input, updatedAt: Date.now() } : o));
      }
      return [
        ...prev,
        { ...input, id: makeId("order"), createdAt: Date.now(), updatedAt: Date.now() },
      ];
    });
  }, []);

  const deleteOrder = useCallback((id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }, []);

  // ---- Services manager ----
  const upsertService = useCallback(
    (input: NewServiceInput, id?: string | null) => {
      setServices((prev) => {
        if (id) return prev.map((s) => (s.id === id ? { ...s, ...input } : s));
        return [...prev, { ...input, id: makeId("svc") }];
      });
      setGroupColors((prev) =>
        prev[input.group] ? prev : { ...prev, [input.group]: "#5B5560" }
      );
    },
    []
  );

  const deleteService = useCallback((id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    setTransactions((prev) =>
      prev.map((t) => {
        if (!(id in t.cart)) return t;
        const cart = { ...t.cart };
        delete cart[id];
        return { ...t, cart };
      })
    );
  }, []);

  const updateGroupColor = useCallback((group: string, color: string) => {
    setGroupColors((prev) => ({ ...prev, [group]: color }));
  }, []);

  const resetServicesToDefault = useCallback(() => {
    setServices(seedServices());
    setGroupColors({ ...DEFAULT_GROUP_COLORS });
    setTransactions((prev) => prev.map((t) => ({ ...t, cart: {} })));
  }, []);

  const value: AppContextValue = {
    services,
    groupColors,
    orders,
    view,
    setView,
    transactions,
    activeTabIndex,
    activeTransaction,
    switchTab,
    addNewTransaction,
    removeTab,
    setCartQty,
    changeQty,
    setSearchTerm,
    setCurrentPage,
    resetActiveCart,
    cartTotal,
    cartItemCount,
    completePayment,
    upsertOrder,
    deleteOrder,
    upsertService,
    deleteService,
    updateGroupColor,
    resetServicesToDefault,
    success,
    showSuccess,
    alertMsg,
    showAlert,
    confirmState,
    askConfirm,
    closeConfirm,
  };

  if (!hydrated) return null;

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export type { OrderStatus };
