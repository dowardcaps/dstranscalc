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
  DayLogEntry,
  GroupColors,
  Order,
  OrderStatus,
  Service,
  Transaction,
  View,
} from "./types";
import { DEFAULT_GROUP_COLORS, DEFAULT_SERVICES } from "./defaultData";
import { loadJSON, saveJSON, STORAGE_KEYS } from "./storage";
import { dateKeyToLabel, makeId, nextTransactionNumber, todayDateKey } from "./format";
import { fetchCloudState, saveCloudState } from "./cloudStorage";
import { ConfirmDialogState, CLOSED_CONFIRM } from "@/components/shared/ConfirmDialog";

type NewOrderInput = Omit<Order, "id" | "createdAt" | "updatedAt">;
type NewServiceInput = { name: string; price: number; group: string };
type CloudStatus = "loading" | "online" | "offline";

type AppContextValue = {
  // data
  services: Service[];
  groupColors: GroupColors;
  orders: Order[];
  dayLog: DayLogEntry[];
  cloudStatus: CloudStatus;
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
  // day log
  addDayLogEntry: (details: string, amount: number) => void;
  deleteDayLogEntry: (id: string) => void;
  clearDayLogForDate: (dateKey: string) => void;
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
  const [cloudStatus, setCloudStatus] = useState<CloudStatus>("loading");
  const [services, setServices] = useState<Service[]>([]);
  const [groupColors, setGroupColors] = useState<GroupColors>({});
  const [orders, setOrders] = useState<Order[]>([]);
  const [dayLog, setDayLog] = useState<DayLogEntry[]>([]);

  const [view, setView] = useState<View>("pos");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const [success, setSuccess] = useState<string | null>(null);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<ConfirmDialogState>(CLOSED_CONFIRM);

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

  // ---- initial hydrate: services / colors / orders / dayLog come from the
  // cloud (Postgres) with a localStorage cache as an offline fallback and as
  // the one-time seed if the cloud table is still empty. transactions and
  // the active tab are in-progress work state and stay local-only. ----
  useEffect(() => {
    let cancelled = false;

    async function loadCloudKey<T>(key: string, fallback: T): Promise<T> {
      const cached = loadJSON<T>(key, fallback);
      const res = await fetchCloudState<T>(key);
      if (res.found && res.value !== null) {
        saveJSON(key, res.value);
        return res.value;
      }
      // Cloud has nothing yet for this key — seed it with whatever's cached
      // locally (or the default) so the cloud becomes the source of truth
      // going forward.
      saveCloudState(key, cached).catch((err) => console.error(`seed ${key} failed`, err));
      return cached;
    }

    (async () => {
      let online = true;
      let loadedServices: Service[];
      let loadedColors: GroupColors;
      let loadedOrders: Order[];
      let loadedDayLog: DayLogEntry[];

      try {
        [loadedServices, loadedColors, loadedOrders, loadedDayLog] = await Promise.all([
          loadCloudKey<Service[]>(STORAGE_KEYS.services, seedServices()),
          loadCloudKey<GroupColors>(STORAGE_KEYS.colors, { ...DEFAULT_GROUP_COLORS }),
          loadCloudKey<Order[]>(STORAGE_KEYS.orders, []),
          loadCloudKey<DayLogEntry[]>(STORAGE_KEYS.dayLog, []),
        ]);
      } catch (err) {
        console.error("cloud hydrate failed, falling back to local cache", err);
        online = false;
        loadedServices = loadJSON<Service[]>(STORAGE_KEYS.services, seedServices());
        loadedColors = loadJSON<GroupColors>(STORAGE_KEYS.colors, { ...DEFAULT_GROUP_COLORS });
        loadedOrders = loadJSON<Order[]>(STORAGE_KEYS.orders, []);
        loadedDayLog = loadJSON<DayLogEntry[]>(STORAGE_KEYS.dayLog, []);
      }

      if (cancelled) return;

      setServices(loadedServices);
      setGroupColors(loadedColors);
      setOrders(loadedOrders);
      setDayLog(loadedDayLog);
      setCloudStatus(online ? "online" : "offline");
      if (!online) {
        showAlert("Can't reach the cloud database — showing the last saved copy on this computer.");
      }

      // ---- local-only: in-progress cart tabs ----
      const savedTx = loadJSON<Transaction[] | null>(STORAGE_KEYS.transactions, null);
      const restoredTx: Transaction[] =
        savedTx && savedTx.length
          ? savedTx.map((t) => ({
              id: t.id,
              name: t.name,
              cart: t.cart || {},
              searchTerm: t.searchTerm || "",
              currentPage: t.currentPage || 1,
            }))
          : [{ id: Date.now(), name: `Transaction ${nextTransactionNumber([])}`, cart: {}, searchTerm: "", currentPage: 1 }];
      setTransactions(restoredTx);

      const savedActiveTab = loadJSON<number>(STORAGE_KEYS.activeTab, 0);
      setActiveTabIndex(Math.min(Math.max(savedActiveTab, 0), restoredTx.length - 1));

      setHydrated(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [showAlert]);

  useEffect(() => {
    if (hydrated) saveJSON(STORAGE_KEYS.transactions, transactions);
  }, [transactions, hydrated]);
  useEffect(() => {
    if (hydrated) saveJSON(STORAGE_KEYS.activeTab, activeTabIndex);
  }, [activeTabIndex, hydrated]);

  // Persists a piece of cloud-backed state: caches it locally right away
  // (so a refresh never loses it, even offline) and pushes it to Postgres
  // in the background. A failed push just means "not synced yet" — the
  // local cache still has it, and the next successful save will catch up.
  const persist = useCallback(
    <T,>(key: string, value: T) => {
      saveJSON(key, value);
      saveCloudState(key, value)
        .then(() => setCloudStatus("online"))
        .catch((err) => {
          console.error(`cloud save failed for ${key}`, err);
          setCloudStatus("offline");
          showAlert("Couldn't sync to the cloud — saved on this computer only for now.");
        });
    },
    [showAlert]
  );

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
          name: `Transaction ${nextTransactionNumber(prev.map((t) => t.name))}`,
          cart: {},
          searchTerm: "",
          currentPage: 1,
        },
      ];
      setActiveTabIndex(next.length - 1);
      return next;
    });
  }, []);

  const removeTab = useCallback((i: number) => {
    setTransactions((prev) => {
      if (prev.length <= 1) return prev;
      const next = prev.filter((_, idx) => idx !== i);
      setActiveTabIndex((cur) => Math.min(cur >= next.length ? next.length - 1 : cur, next.length - 1));
      return next;
    });
  }, []);

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
  const upsertOrder = useCallback(
    (input: NewOrderInput, id?: string | null) => {
      setOrders((prev) => {
        const next = id
          ? prev.map((o) => (o.id === id ? { ...o, ...input, updatedAt: Date.now() } : o))
          : [...prev, { ...input, id: makeId("order"), createdAt: Date.now(), updatedAt: Date.now() }];
        persist(STORAGE_KEYS.orders, next);
        return next;
      });
    },
    [persist]
  );

  const deleteOrder = useCallback(
    (id: string) => {
      setOrders((prev) => {
        const next = prev.filter((o) => o.id !== id);
        persist(STORAGE_KEYS.orders, next);
        return next;
      });
    },
    [persist]
  );

  // ---- Day log ----
  const addDayLogEntry = useCallback(
    (details: string, amount: number) => {
      const dateKey = todayDateKey();
      setDayLog((prev) => {
        const next = [
          ...prev,
          {
            id: makeId("log"),
            dateKey,
            dateLabel: dateKeyToLabel(dateKey),
            details,
            amount,
            createdAt: Date.now(),
          },
        ];
        persist(STORAGE_KEYS.dayLog, next);
        return next;
      });
    },
    [persist]
  );

  const deleteDayLogEntry = useCallback(
    (id: string) => {
      setDayLog((prev) => {
        const next = prev.filter((e) => e.id !== id);
        persist(STORAGE_KEYS.dayLog, next);
        return next;
      });
    },
    [persist]
  );

  const clearDayLogForDate = useCallback(
    (dateKey: string) => {
      setDayLog((prev) => {
        const next = prev.filter((e) => e.dateKey !== dateKey);
        persist(STORAGE_KEYS.dayLog, next);
        return next;
      });
    },
    [persist]
  );

  // ---- Services manager ----
  const upsertService = useCallback(
    (input: NewServiceInput, id?: string | null) => {
      setServices((prev) => {
        const next = id
          ? prev.map((s) => (s.id === id ? { ...s, ...input } : s))
          : [...prev, { ...input, id: makeId("svc") }];
        persist(STORAGE_KEYS.services, next);
        return next;
      });
      setGroupColors((prev) => {
        if (prev[input.group]) return prev;
        const next = { ...prev, [input.group]: "#5B5560" };
        persist(STORAGE_KEYS.colors, next);
        return next;
      });
    },
    [persist]
  );

  const deleteService = useCallback(
    (id: string) => {
      setServices((prev) => {
        const next = prev.filter((s) => s.id !== id);
        persist(STORAGE_KEYS.services, next);
        return next;
      });
      setTransactions((prev) =>
        prev.map((t) => {
          if (!(id in t.cart)) return t;
          const cart = { ...t.cart };
          delete cart[id];
          return { ...t, cart };
        })
      );
    },
    [persist]
  );

  const updateGroupColor = useCallback(
    (group: string, color: string) => {
      setGroupColors((prev) => {
        const next = { ...prev, [group]: color };
        persist(STORAGE_KEYS.colors, next);
        return next;
      });
    },
    [persist]
  );

  const resetServicesToDefault = useCallback(() => {
    const nextServices = seedServices();
    const nextColors = { ...DEFAULT_GROUP_COLORS };
    setServices(nextServices);
    setGroupColors(nextColors);
    setTransactions((prev) => prev.map((t) => ({ ...t, cart: {} })));
    persist(STORAGE_KEYS.services, nextServices);
    persist(STORAGE_KEYS.colors, nextColors);
  }, [persist]);

  const value: AppContextValue = {
    services,
    groupColors,
    orders,
    dayLog,
    cloudStatus,
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
    addDayLogEntry,
    deleteDayLogEntry,
    clearDayLogForDate,
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

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-sm font-semibold text-ink-900/50">
        Loading DS Prints data…
      </div>
    );
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export type { OrderStatus };
