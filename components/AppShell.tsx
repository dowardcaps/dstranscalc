"use client";

import { useApp } from "@/lib/AppContext";
import Header from "./Header";
import POSView from "./pos/POSView";
import OrdersView from "./orders/OrdersView";
import ServicesView from "./services/ServicesView";
import DayLogView from "./daylog/DayLogView";
import ConfirmDialog from "./shared/ConfirmDialog";
import SuccessToast from "./shared/SuccessToast";
import AlertToast from "./shared/AlertToast";

export default function AppShell() {
  const { view, success, alertMsg, confirmState, closeConfirm } = useApp();

  return (
    <div className="mx-auto max-w-[1400px] px-3 py-4 sm:px-6 sm:py-6">
      <Header />
      <main className="mt-5 pb-16">
        {view === "pos" && <POSView />}
        {view === "orders" && <OrdersView />}
        {view === "daylog" && <DayLogView />}
        {view === "services" && <ServicesView />}
      </main>

      <SuccessToast message={success} />
      <AlertToast message={alertMsg} />
      <ConfirmDialog state={confirmState} onClose={closeConfirm} />
    </div>
  );
}
