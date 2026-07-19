"use client";

import { useState } from "react";
import TransactionTabs from "./TransactionTabs";
import SearchResetBar from "./SearchResetBar";
import ServiceTable from "./ServiceTable";
import SummaryPanel from "./SummaryPanel";
import PaymentModal from "./PaymentModal";

export default function POSView() {
  const [payOpen, setPayOpen] = useState(false);
  return (
    <div className="space-y-4">
      <TransactionTabs />
      <SearchResetBar />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
        <ServiceTable />
        <div className="lg:h-[600px]">
          <SummaryPanel onPay={() => setPayOpen(true)} />
        </div>
      </div>
      <PaymentModal open={payOpen} onClose={() => setPayOpen(false)} />
    </div>
  );
}
