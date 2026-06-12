const services = [
  // PRINTING
  { name: "A4 (B&W)", price: 5, group: "Printing" },
  { name: "A4 (Partial)", price: 7, group: "Printing" },
  { name: "A4 (Full Color)", price: 10, group: "Printing" },
  { name: "A4 on vellum (B&W)", price: 10, group: "Printing" },
  { name: "A4 on vellum (Partial)", price: 15, group: "Printing" },
  { name: "A4 on vellum (Full Color)", price: 20, group: "Printing" },
  { name: "Letter (B&W)", price: 5, group: "Printing" },
  { name: "Letter (Partial)", price: 7, group: "Printing" },
  { name: "Letter (Full Color)", price: 10, group: "Printing" },
  { name: "Long (B&W)", price: 6, group: "Printing" },
  { name: "Long (Partial)", price: 8, group: "Printing" },
  { name: "Long (Full Color)", price: 12, group: "Printing" },
  { name: "Back to back Add (B&W/Partial)", price: 2, group: "Printing" },
  { name: "Back to back Add (Full)", price: 5, group: "Printing" },

  // XEROX
  { name: "A4 (B&W)", price: 4, group: "Xerox" },
  { name: "A4 (Partial)", price: 6, group: "Xerox" },
  { name: "A4 (Full Color)", price: 8, group: "Xerox" },
  { name: "Letter (B&W)", price: 4, group: "Xerox" },
  { name: "Letter (Partial)", price: 6, group: "Xerox" },
  { name: "Letter (Full Color)", price: 8, group: "Xerox" },
  { name: "Long (B&W)", price: 5, group: "Xerox" },
  { name: "Long (Partial)", price: 7, group: "Xerox" },
  { name: "Long (Full Color)", price: 10, group: "Xerox" },
  { name: "Back to back Add (B&W/Partial)", price: 2, group: "Xerox" },
  { name: "Back to back Add (Full)", price: 5, group: "Xerox" },

  // RUSH ID PACKAGES
  { name: "P1 - 9pcs 1x1", price: 50, group: "Rush ID" },
  { name: "P2 - 9pcs 2x2", price: 50, group: "Rush ID" },
  { name: "P3 - 6pcs Passport", price: 50, group: "Rush ID" },
  { name: "P4 - 4pcs 2x2 & 6pcs 1x1", price: 60, group: "Rush ID" },
  { name: "P5 - 3pcs 2x2, Passport, & 4pcs 1x1", price: 70, group: "Rush ID" },
  { name: "P6 - 2pcs 2x2 & 4pcs 1x1", price: 40, group: "Rush ID" },
  { name: "P7 - 2pcs 2x3", price: 30, group: "Rush ID" },
  { name: "Add-on: Change Attire", price: 10, group: "Rush ID" },
  { name: "Add-on: Get Soft copy", price: 10, group: "Rush ID" },

  // PHOTO PRINT
  { name: "2R / Wallet Size", price: 15, group: "Photo" },
  { name: '3R (3.5" x 5")', price: 20, group: "Photo" },
  { name: '4R (4" x 6")', price: 30, group: "Photo" },
  { name: '5R (5" x 7")', price: 40, group: "Photo" },
  { name: '6R (6" x 8")', price: 50, group: "Photo" },
  { name: '8R (8" x 10")', price: 50, group: "Photo" },
  { name: "S8R / A4", price: 50, group: "Photo" },

  // LAMINATION
  { name: "Laminate: 2R / Wallet", price: 20, group: "Laminate" },
  { name: "Laminate: 3R", price: 30, group: "Laminate" },
  { name: "Laminate: 4R", price: 40, group: "Laminate" },
  { name: "Laminate: 5R", price: 50, group: "Laminate" },
  { name: "Laminate: 6R", price: 60, group: "Laminate" },
  { name: "Laminate: 8R", price: 60, group: "Laminate" },
  { name: "Laminate: S8R / A4", price: 60, group: "Laminate" },

  // ASSISTANCE
  { name: "PSA Online Appointment", price: 30, group: "Assistance" },
  { name: "PhilHealth Online Appointment", price: 30, group: "Assistance" },
  { name: "PAG_IBIG New Member", price: 50, group: "Assistance" },
  { name: "PAG_IBIG Generate and Print PRN", price: 30, group: "Assistance" },

  // STATIONERY
  { name: "Brown Envelope (Short)", price: 6, group: "Stationery" },
  { name: "Brown Envelope (Long)", price: 8, group: "Stationery" },
  { name: "Plastic Envelope (Short)", price: 12, group: "Stationery" },
  { name: "Plastic Envelope (Long)", price: 15, group: "Stationery" },
  { name: "White Folder (Short)", price: 7, group: "Stationery" },
  { name: "White Folder (Long)", price: 10, group: "Stationery" },
  { name: "1/8 Illustration Board", price: 10, group: "Stationery" },
  { name: "Manila Paper", price: 8, group: "Stationery" },
  { name: "Intermediate Pad", price: 30, group: "Stationery" },
  { name: "Yellow Pad", price: 50, group: "Stationery" },
  { name: "Glue", price: 20, group: "Stationery" },
  { name: "Ballpen", price: 10, group: "Stationery" },
  { name: "Monggol 2 Pencil", price: 12, group: "Stationery" },
  { name: "HBW Marker Permanent", price: 20, group: "Stationery" },
  { name: "Sharpener", price: 5, group: "Stationery" },
  { name: "Fastener", price: 1, group: "Stationery" },
  { name: "Paper Clip 1 box", price: 18, group: "Stationery" },
  { name: "Double Sided tape", price: 26, group: "Stationery" },
  { name: "Scatch Tape 12mm", price: 10, group: "Stationery" },
  { name: "Scatch Tape 12mm", price: 26, group: "Stationery" },
  { name: "Scatch Tape 24mm", price: 30, group: "Stationery" },
  { name: "Scissors", price: 20, group: "Stationery" },
  { name: "HBW Correction Tape", price: 25, group: "Stationery" },
  { name: "Index Card 1/8 2pcs.", price: 1, group: "Stationery" },
  { name: "Index Card 1/4 1pc.", price: 1, group: "Stationery" },
  { name: "Index Card 1/2 1pc.", price: 2, group: "Stationery" },
  { name: "Assorted Colored Paper", price: 10, group: "Stationery" },
  { name: "Bond Paper (Short) 20pcs.", price: 10, group: "Stationery" },
  { name: "Bond Paper (A4) 20pcs.", price: 12, group: "Stationery" },
  { name: "Bond Paper (Long) 20pcs.", price: 15, group: "Stationery" },
  { name: "Oslo Paper 10pcs.", price: 10, group: "Stationery" },
  { name: "Clear Sliding Folder (Short)", price: 10, group: "Stationery" },
  { name: "Clear Sliding Folder (Long)", price: 12, group: "Stationery" },
  { name: "Bio-Data 1pc.", price: 2, group: "Stationery" },
  { name: "Quaff A4 Photo Paper 1pc.", price: 5, group: "Stationery" },
  { name: "Quaff A4 Photo Paper 1pack", price: 85, group: "Stationery" },
  { name: "ID lace", price: 15, group: "Stationery" },
  { name: "Ruler", price: 10, group: "Stationery" },

  // SCAN & OTHERS
  { name: "Scan (Any size)", price: 10, group: "Scan" },
  { name: "Resume Typing Job", price: 50, group: "Other" },
  { name: "Name Tag", price: 50, group: "Other" },
  { name: "Name Tag with lace", price: 60, group: "Other" },
  { name: "A4 Name/Subjects Sticker label", price: 50, group: "Other" },
  { name: "Photo Editing Minor Enhancement", price: 30, group: "Other" },
  { name: "A4 1pc Laminating Film", price: 10, group: "Other" },
];

const groupColors = {
  "Printing": "#002c8a",
  "Xerox": "#ff6e6e",
  "Rush ID": "#8b5cf6",
  "Photo": "#bd7800",
  "Laminate": "#10b981",
  "Scan": "#64748b"
};

// =====================
// POS Global State
// =====================
let transactions = [];
let transactionCounter = 0;
let activeTabIndex = 0;
let cart = [];
let currentPage = 1;
const itemsPerPage = 7;
let filteredData = [...services];
let currentTransactionTotal = 0;

// =====================
// ORDERS Global State
// =====================
const ORDERS_STORAGE_KEY = "dsprints_orders";
let orders = [];          // array of order objects
let editingOrderId = null; // null = new, string = editing id
let deletingOrderId = null;

// =====================
// View Switcher
// =====================
function switchView(view) {
  const posView = document.getElementById("pos-view");
  const ordersView = document.getElementById("orders-view");
  const btnPos = document.getElementById("btn-pos-view");
  const btnOrders = document.getElementById("btn-orders-view");
  const resetBtn = document.querySelector(".mobile-reset");

  if (view === "pos") {
    posView.style.display = "";
    ordersView.style.display = "none";
    btnPos.classList.add("active");
    btnOrders.classList.remove("active");
    resetBtn.style.display = "";
  } else {
    posView.style.display = "none";
    ordersView.style.display = "";
    btnPos.classList.remove("active");
    btnOrders.classList.add("active");
    resetBtn.style.display = "none";
    renderOrders();
  }
}

// =====================
// Application Setup
// =====================
function init() {
  loadOrdersFromStorage();
  if (transactions.length === 0) {
    addNewTransaction();
  }
}

// =====================
// Transaction Tabs Management
// =====================
function getTransactionLabel(index) {
  let label = "";
  while (index >= 0) {
    label = String.fromCharCode((index % 26) + 65) + label;
    index = Math.floor(index / 26) - 1;
  }
  return label;
}

function addNewTransaction() {
  const newId = Date.now();
  const letterLabel = getTransactionLabel(transactionCounter);
  transactions.push({
    id: newId,
    name: `Transaction ${letterLabel}`,
    cart: Array(services.length).fill(0),
    searchTerm: "",
    currentPage: 1
  });
  transactionCounter++;
  switchTab(transactions.length - 1);
}

function switchTab(index) {
  activeTabIndex = index;
  syncGlobalState();
  renderTabs();
  const searchInput = document.getElementById("serviceSearch");
  if (searchInput) searchInput.value = transactions[activeTabIndex].searchTerm;
  filterServices();
  updateTotals();
  updateSummary();
}

function syncGlobalState() {
  cart = transactions[activeTabIndex].cart;
  currentPage = transactions[activeTabIndex].currentPage;
}

function renderTabs() {
  const tabsList = document.getElementById("tabs-list");
  tabsList.innerHTML = "";
  transactions.forEach((tab, index) => {
    const tabEl = document.createElement("button");
    tabEl.className = `tab-item ${index === activeTabIndex ? "active" : ""}`;
    tabEl.innerHTML = `
      ${tab.name}
      ${transactions.length > 1 ? `<span class="close-tab" onclick="removeTab(event, ${index})">×</span>` : ""}
    `;
    tabEl.onclick = () => switchTab(index);
    tabsList.appendChild(tabEl);
  });
}

function removeTab(event, index) {
  event.stopPropagation();
  if (transactions.length <= 1) return;
  transactions.splice(index, 1);
  if (activeTabIndex >= transactions.length) {
    activeTabIndex = transactions.length - 1;
  }
  switchTab(activeTabIndex);
}

// =====================
// Table & Content
// =====================
function renderTable() {
  const tbody = document.getElementById("service-rows");
  tbody.innerHTML = "";
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = filteredData.slice(startIndex, endIndex);

  pageData.forEach((s) => {
    const originalIndex = services.indexOf(s);
    const badgeColor = groupColors[s.group] || "#64748b";
    const row = document.createElement("tr");
    if (cart[originalIndex] > 0) row.className = "active-row";
    row.innerHTML = `
      <td data-label="Item"><strong>${s.name}</strong></td>
      <td data-label="Category">
        <span class="badge" style="background-color:${badgeColor}; color:white; padding:4px 8px; border-radius:6px; font-size:1rem; font-weight:700;">
          ${s.group}
        </span>
      </td>
      <td data-label="Price" class="price-cell">₱${s.price.toFixed(2)}</td>
      <td data-label="Action">
        <div class="controls">
          <button class="btn-ctrl btn-minus" onclick="changeQty(${originalIndex}, -1)" ${cart[originalIndex] === 0 ? "disabled" : ""}>-</button>
          <input type="number" class="qty-input" value="${cart[originalIndex]}" min="0" onchange="updateQtyInput(${originalIndex}, this.value)">
          <button class="btn-ctrl btn-plus" onclick="changeQty(${originalIndex}, 1)">+</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
  updatePaginationUI();
}

function filterServices() {
  const searchInput = document.getElementById("serviceSearch");
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  transactions[activeTabIndex].searchTerm = searchTerm;
  filteredData = services.filter((s) =>
    s.name.toLowerCase().includes(searchTerm) ||
    s.group.toLowerCase().includes(searchTerm)
  );
  transactions[activeTabIndex].currentPage = 1;
  currentPage = 1;
  renderTable();
}

function changeQty(index, delta) {
  cart[index] = Math.max(0, cart[index] + delta);
  updateTotals();
  updateSummary();
  renderTable();
}

function updateQtyInput(index, value) {
  const newQty = parseInt(value);
  cart[index] = (isNaN(newQty) || newQty < 0) ? 0 : newQty;
  updateTotals();
  updateSummary();
  renderTable();
}

function resetAll() {
  if (confirm("Clear current order?")) {
    cart.fill(0);
    const searchInput = document.getElementById("serviceSearch");
    if (searchInput) searchInput.value = "";
    filterServices();
    updateTotals();
    updateSummary();
  }
}

function resetSearch() {
  const searchInput = document.getElementById("serviceSearch");
  if (searchInput) searchInput.value = "";
  filterServices();
  updateTotals();
  updateSummary();
  renderTable();
}

function updateTotals() {
  let grandTotal = 0;
  let totalItems = 0;
  services.forEach((s, i) => {
    grandTotal += s.price * cart[i];
    totalItems += cart[i];
  });
  document.getElementById("grand-total").innerText = `₱${grandTotal.toFixed(2)}`;
  document.getElementById("item-count").innerText = `${totalItems} items`;
}

function updateSummary() {
  const summaryContainer = document.getElementById("order-summary-container");
  const summaryItems = document.getElementById("summary-items");
  summaryItems.innerHTML = "";
  let detailsText = "";
  let hasItems = false;
  const groups = {};

  services.forEach((s, index) => {
    if (cart[index] > 0) {
      hasItems = true;
      if (!groups[s.group]) groups[s.group] = [];
      groups[s.group].push(`${s.name} - ${cart[index]} x ₱${s.price} = ₱${s.price * cart[index]}`);
    }
  });

  summaryContainer.style.display = "block";
  if (hasItems) {
    for (const group in groups) {
      const headerColor = groupColors[group] || "#000";
      detailsText += `<strong style="color:${headerColor}">${group}</strong>\n`;
      detailsText += groups[group].join(",\n") + "\n\n";
    }
    const row = document.createElement("tr");
    row.innerHTML = `<td class="details-content">${detailsText}</td>`;
    summaryItems.appendChild(row);
  } else {
    const row = document.createElement("tr");
    row.innerHTML = `<td class="details-content" style="color:#94a3b8; font-style:italic;">No items added yet...</td>`;
    summaryItems.appendChild(row);
  }
}

function copySummary() {
  const groups = {};
  services.forEach((s, index) => {
    if (cart[index] > 0) {
      if (!groups[s.group]) groups[s.group] = [];
      groups[s.group].push(`${s.name} - ${cart[index]} x ₱${s.price} = ₱${s.price * cart[index]}`);
    }
  });
  if (Object.keys(groups).length === 0) return alert("Cart is empty!");
  let textToCopy = "";
  for (const group in groups) {
    textToCopy += `[${group}]\n${groups[group].join("\n")}\n`;
  }
  navigator.clipboard.writeText(textToCopy).then(() => {
    const btn = document.querySelector(".copy-btn");
    btn.innerText = "✅ Copied!";
    btn.style.background = "#22c55e";
    setTimeout(() => { btn.innerText = "Copy"; btn.style.background = "white"; }, 2000);
  }).catch((err) => console.error("Failed to copy: ", err));
}

// =====================
// Payment Modal
// =====================
function openPaymentModal() {
  currentTransactionTotal = services.reduce((total, s, i) => total + (s.price * cart[i]), 0);
  if (currentTransactionTotal === 0) return alert("Cart is empty!");
  document.getElementById("pay-total-display").innerText = `₱${currentTransactionTotal.toFixed(2)}`;
  document.getElementById("cashReceived").value = "";
  document.getElementById("change-amount").innerText = "₱0.00";
  document.getElementById("payment-modal").style.display = "flex";
  setTimeout(() => document.getElementById("cashReceived").focus(), 100);
}

function closePaymentModal() {
  document.getElementById("payment-modal").style.display = "none";
}

function calculateChange() {
  const cash = parseFloat(document.getElementById("cashReceived").value) || 0;
  const change = cash - currentTransactionTotal;
  const display = document.getElementById("change-amount");
  display.innerText = `₱${Math.max(0, change).toFixed(2)}`;
  display.style.color = change < 0 ? "var(--danger)" : "var(--success)";
}

function completePayment() {
  const cash = parseFloat(document.getElementById("cashReceived").value) || 0;
  if (cash < currentTransactionTotal) return alert("Insufficient cash provided!");
  const btn = document.getElementById("btn-done-payment");
  btn.disabled = true;
  showSuccessModal("Payment Complete");
  setTimeout(() => {
    closePaymentModal();
    cart.fill(0);
    filterServices();
    updateTotals();
    updateSummary();
    btn.disabled = false;
  }, 1000);
}

function showSuccessModal(message) {
  const modal = document.getElementById("success-modal");
  document.getElementById("success-message").innerText = message;
  modal.style.display = "flex";
  setTimeout(() => { modal.style.display = "none"; }, 1500);
}

function changePage(direction) {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const nextStep = currentPage + direction;
  if (nextStep >= 1 && nextStep <= totalPages) {
    currentPage = nextStep;
    transactions[activeTabIndex].currentPage = currentPage;
    renderTable();
  }
}

function updatePaginationUI() {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  document.getElementById("pageInfo").innerText = `${currentPage} of ${totalPages}`;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

// =====================
// ORDERS – localStorage
// =====================
function loadOrdersFromStorage() {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    orders = stored ? JSON.parse(stored) : [];
  } catch (e) {
    orders = [];
  }
}

function saveOrdersToStorage() {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error("Failed to save orders:", e);
  }
}

// =====================
// ORDERS – Render
// =====================
function renderOrders() {
  const searchTerm = (document.getElementById("ordersSearch")?.value || "").toLowerCase();
  const filterStatus = document.getElementById("ordersFilter")?.value || "all";
  const list = document.getElementById("orders-list");
  const empty = document.getElementById("orders-empty");

  let filtered = orders.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(searchTerm) ||
      o.details.toLowerCase().includes(searchTerm) ||
      (o.notes || "").toLowerCase().includes(searchTerm);
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Sort: Not Started first, then Pending, then Completed, then by date desc
  const statusOrder = { "Not Started": 0, "Pending": 1, "Completed": 2 };
  filtered.sort((a, b) => {
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return b.createdAt - a.createdAt;
  });

  list.innerHTML = "";

  if (filtered.length === 0) {
    list.style.display = "none";
    empty.style.display = "";
    return;
  }

  list.style.display = "grid";
  empty.style.display = "none";

  filtered.forEach((order) => {
    const card = document.createElement("div");
    const statusClass = "status-" + order.status.toLowerCase().replace(" ", "-");
    const badgeClass = "badge-" + order.status.toLowerCase().replace(" ", "-");
    const amountDisplay = order.amount > 0 ? `₱${parseFloat(order.amount).toFixed(2)}` : "—";
    const dateStr = new Date(order.createdAt).toLocaleDateString("en-PH", {
      month: "short", day: "numeric", year: "numeric"
    });

    card.className = `order-card ${statusClass}`;
    card.innerHTML = `
      <div class="order-card-header">
        <div class="order-customer">${escapeHtml(order.customer) || "Unnamed Customer"}</div>
        <span class="status-badge ${badgeClass}">${order.status}</span>
      </div>
      ${order.details ? `<div class="order-details-text">${escapeHtml(order.details)}</div>` : ""}
      <div class="order-meta">
        <span class="order-amount">${amountDisplay}</span>
        <span class="order-date">${dateStr}</span>
      </div>
      ${order.notes ? `<div class="order-notes-text">📝 ${escapeHtml(order.notes)}</div>` : ""}
      <div class="order-card-actions">
        <button class="btn-order-edit" onclick="openOrderModal('${order.id}')">✏️ Edit</button>
        <button class="btn-order-delete" onclick="openDeleteModal('${order.id}')">🗑️ Delete</button>
      </div>
    `;
    list.appendChild(card);
  });
}

// =====================
// ORDERS – Create / Edit Modal
// =====================
function openOrderModal(orderId = null) {
  editingOrderId = orderId;
  const modal = document.getElementById("order-modal");
  const title = document.getElementById("order-modal-title");

  if (orderId) {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    title.textContent = "Edit Order";
    document.getElementById("order-customer").value = order.customer;
    document.getElementById("order-details").value = order.details;
    document.getElementById("order-amount").value = order.amount || "";
    document.getElementById("order-status").value = order.status;
    document.getElementById("order-notes").value = order.notes || "";
  } else {
    title.textContent = "New Order";
    document.getElementById("order-customer").value = "";
    document.getElementById("order-details").value = "";
    document.getElementById("order-amount").value = "";
    document.getElementById("order-status").value = "Not Started";
    document.getElementById("order-notes").value = "";
  }

  modal.style.display = "flex";
  setTimeout(() => document.getElementById("order-customer").focus(), 100);
}

function closeOrderModal() {
  document.getElementById("order-modal").style.display = "none";
  editingOrderId = null;
}

function saveOrder() {
  const customer = document.getElementById("order-customer").value.trim();
  const details = document.getElementById("order-details").value.trim();
  const amount = parseFloat(document.getElementById("order-amount").value) || 0;
  const status = document.getElementById("order-status").value;
  const notes = document.getElementById("order-notes").value.trim();

  if (!customer && !details) {
    alert("Please enter a customer name or order details.");
    return;
  }

  if (editingOrderId) {
    // Update existing
    const idx = orders.findIndex((o) => o.id === editingOrderId);
    if (idx !== -1) {
      orders[idx] = { ...orders[idx], customer, details, amount, status, notes, updatedAt: Date.now() };
    }
  } else {
    // Create new
    orders.push({
      id: "order_" + Date.now(),
      customer,
      details,
      amount,
      status,
      notes,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  saveOrdersToStorage();
  closeOrderModal();
  renderOrders();
  showSuccessModal(editingOrderId ? "Order Updated" : "Order Saved");
}

// =====================
// ORDERS – Delete
// =====================
function openDeleteModal(orderId) {
  deletingOrderId = orderId;
  const order = orders.find((o) => o.id === orderId);
  const nameEl = document.getElementById("delete-modal-name");
  nameEl.textContent = order
    ? `"${order.customer || order.details.slice(0, 40) || "this order"}" will be permanently removed.`
    : "This will permanently remove the order.";
  document.getElementById("delete-modal").style.display = "flex";
}

function closeDeleteModal() {
  document.getElementById("delete-modal").style.display = "none";
  deletingOrderId = null;
}

function confirmDeleteOrder() {
  if (!deletingOrderId) return;
  orders = orders.filter((o) => o.id !== deletingOrderId);
  saveOrdersToStorage();
  closeDeleteModal();
  renderOrders();
  showSuccessModal("Order Deleted");
}

// =====================
// Utility
// =====================
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Close modals on overlay click
document.addEventListener("click", (e) => {
  if (e.target.id === "order-modal") closeOrderModal();
  if (e.target.id === "delete-modal") closeDeleteModal();
  if (e.target.id === "payment-modal") closePaymentModal();
});

// =====================
// Boot
// =====================
init();
