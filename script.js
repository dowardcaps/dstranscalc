// =====================
// DEFAULT SEED DATA
// =====================
const DEFAULT_SERVICES = [
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
  { name: "P1 - 9pcs 1x1", price: 50, group: "Rush ID" },
  { name: "P2 - 9pcs 2x2", price: 50, group: "Rush ID" },
  { name: "P3 - 6pcs Passport", price: 50, group: "Rush ID" },
  { name: "P4 - 4pcs 2x2 & 6pcs 1x1", price: 60, group: "Rush ID" },
  { name: "P5 - 3pcs 2x2, Passport, & 4pcs 1x1", price: 70, group: "Rush ID" },
  { name: "P6 - 2pcs 2x2 & 4pcs 1x1", price: 40, group: "Rush ID" },
  { name: "P7 - 2pcs 2x3", price: 30, group: "Rush ID" },
  { name: "Add-on: Change Attire", price: 10, group: "Rush ID" },
  { name: "Add-on: Get Soft copy", price: 10, group: "Rush ID" },
  { name: "2R / Wallet Size", price: 15, group: "Photo" },
  { name: '3R (3.5" x 5")', price: 20, group: "Photo" },
  { name: '4R (4" x 6")', price: 30, group: "Photo" },
  { name: '5R (5" x 7")', price: 40, group: "Photo" },
  { name: '6R (6" x 8")', price: 50, group: "Photo" },
  { name: '8R (8" x 10")', price: 50, group: "Photo" },
  { name: "S8R / A4", price: 50, group: "Photo" },
  { name: "Laminate: 2R / Wallet", price: 20, group: "Laminate" },
  { name: "Laminate: 3R", price: 30, group: "Laminate" },
  { name: "Laminate: 4R", price: 40, group: "Laminate" },
  { name: "Laminate: 5R", price: 50, group: "Laminate" },
  { name: "Laminate: 6R", price: 60, group: "Laminate" },
  { name: "Laminate: 8R", price: 60, group: "Laminate" },
  { name: "Laminate: S8R / A4", price: 60, group: "Laminate" },
  { name: "PSA Online Appointment", price: 30, group: "Assistance" },
  { name: "PhilHealth Online Appointment", price: 30, group: "Assistance" },
  { name: "PAG_IBIG New Member", price: 50, group: "Assistance" },
  { name: "PAG_IBIG Generate and Print PRN", price: 30, group: "Assistance" },
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
  { name: "Scatch Tape 12mm (Big)", price: 26, group: "Stationery" },
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
  { name: "Scan (Any size)", price: 10, group: "Scan" },
  { name: "Resume Typing Job", price: 50, group: "Other" },
  { name: "Name Tag", price: 50, group: "Other" },
  { name: "Name Tag with lace", price: 60, group: "Other" },
  { name: "A4 Name/Subjects Sticker label", price: 50, group: "Other" },
  { name: "Photo Editing Minor Enhancement", price: 30, group: "Other" },
  { name: "A4 1pc Laminating Film", price: 10, group: "Other" },
];

const DEFAULT_GROUP_COLORS = {
  "Printing": "#002c8a",
  "Xerox": "#ff6e6e",
  "Rush ID": "#8b5cf6",
  "Photo": "#bd7800",
  "Laminate": "#10b981",
  "Scan": "#64748b",
  "Assistance": "#0891b2",
  "Stationery": "#b45309",
  "Other": "#475569"
};

// =====================
// STORAGE KEYS
// =====================
const SERVICES_KEY    = "dsprints_services";
const COLORS_KEY      = "dsprints_group_colors";
const ORDERS_KEY      = "dsprints_orders";

// =====================
// LIVE DATA (from localStorage)
// =====================
let services    = [];
let groupColors = {};
let orders      = [];

// =====================
// POS Global State
// =====================
let transactions       = [];
let transactionCounter = 0;
let activeTabIndex     = 0;
let cart               = {};   // { serviceId: qty } — id-based, index-free
let currentPage        = 1;
const itemsPerPage     = 7;
let filteredData       = [];
let currentTransactionTotal = 0;

// =====================
// Services/Orders editing state
// =====================
let editingServiceId = null;
let deletingServiceId = null;
let editingOrderId   = null;
let deletingOrderId  = null;

// =====================
// Services Manager state
// =====================
let smPage       = 1;
const smPerPage  = 10;
let smFiltered   = [];
let smFilterGroup = "all";
let smSearch      = "";

// =============================================
// STORAGE HELPERS
// =============================================
function loadFromStorage() {
  try {
    const sv = localStorage.getItem(SERVICES_KEY);
    if (sv) {
      services = JSON.parse(sv);
    } else {
      // First run: seed with defaults, assign IDs
      services = DEFAULT_SERVICES.map((s, i) => ({ ...s, id: "svc_" + (Date.now() + i) }));
      saveServicesToStorage();
    }
  } catch(e) { services = DEFAULT_SERVICES.map((s,i)=>({...s,id:"svc_"+(Date.now()+i)})); }

  try {
    const gc = localStorage.getItem(COLORS_KEY);
    groupColors = gc ? JSON.parse(gc) : { ...DEFAULT_GROUP_COLORS };
    if (!gc) saveColorsToStorage();
  } catch(e) { groupColors = { ...DEFAULT_GROUP_COLORS }; }

  try {
    const or = localStorage.getItem(ORDERS_KEY);
    orders = or ? JSON.parse(or) : [];
  } catch(e) { orders = []; }
}

function saveServicesToStorage() {
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
}
function saveColorsToStorage() {
  localStorage.setItem(COLORS_KEY, JSON.stringify(groupColors));
}
function saveOrdersToStorage() {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

// =============================================
// VIEW SWITCHER
// =============================================
function switchView(view) {
  const views    = ["pos", "orders", "services"];
  const ids      = { pos: "pos-view", orders: "orders-view", services: "services-view" };
  const btnIds   = { pos: "btn-pos-view", orders: "btn-orders-view", services: "btn-services-view" };
  const resetBtn = document.querySelector(".mobile-reset");

  views.forEach(v => {
    document.getElementById(ids[v]).style.display    = v === view ? "" : "none";
    document.getElementById(btnIds[v]).classList.toggle("active", v === view);
  });

  resetBtn.style.display = view === "pos" ? "" : "none";

  if (view === "orders")   renderOrders();
  if (view === "services") renderServicesManager();
}

// =============================================
// INIT
// =============================================
function init() {
  loadFromStorage();
  filteredData = [...services];
  if (transactions.length === 0) addNewTransaction();
}

// =============================================
// TRANSACTION TABS
// =============================================
function getTransactionLabel(index) {
  let label = "";
  while (index >= 0) {
    label = String.fromCharCode((index % 26) + 65) + label;
    index = Math.floor(index / 26) - 1;
  }
  return label;
}

function addNewTransaction() {
  transactions.push({
    id: Date.now(),
    name: `Transaction ${getTransactionLabel(transactionCounter)}`,
    cart: {},
    searchTerm: "",
    currentPage: 1
  });
  transactionCounter++;
  switchTab(transactions.length - 1);
}

function switchTab(index) {
  activeTabIndex = index;
  cart        = transactions[activeTabIndex].cart;
  currentPage = transactions[activeTabIndex].currentPage;
  renderTabs();
  const si = document.getElementById("serviceSearch");
  if (si) si.value = transactions[activeTabIndex].searchTerm;
  filterServices();
  updateTotals();
  updateSummary();
}

function renderTabs() {
  const tabsList = document.getElementById("tabs-list");
  tabsList.innerHTML = "";
  transactions.forEach((tab, index) => {
    const el = document.createElement("button");
    el.className = `tab-item ${index === activeTabIndex ? "active" : ""}`;
    el.innerHTML = `${tab.name}${transactions.length > 1 ? `<span class="close-tab" onclick="removeTab(event,${index})">×</span>` : ""}`;
    el.onclick = () => switchTab(index);
    tabsList.appendChild(el);
  });
}

function removeTab(event, index) {
  event.stopPropagation();
  if (transactions.length <= 1) return;
  transactions.splice(index, 1);
  if (activeTabIndex >= transactions.length) activeTabIndex = transactions.length - 1;
  switchTab(activeTabIndex);
}

// =============================================
// POS TABLE
// =============================================
function renderTable() {
  const tbody = document.getElementById("service-rows");
  tbody.innerHTML = "";
  const start    = (currentPage - 1) * itemsPerPage;
  const pageData = filteredData.slice(start, start + itemsPerPage);

  pageData.forEach((s) => {
    const qty        = cart[s.id] || 0;
    const badgeColor = groupColors[s.group] || "#64748b";
    const row        = document.createElement("tr");
    if (qty > 0) row.className = "active-row";
    row.innerHTML = `
      <td data-label="Item"><strong>${escapeHtml(s.name)}</strong></td>
      <td data-label="Category">
        <span class="badge" style="background:${badgeColor};color:white;padding:4px 8px;border-radius:6px;font-size:.9rem;font-weight:700;">${escapeHtml(s.group)}</span>
      </td>
      <td data-label="Price" class="price-cell">₱${Number(s.price).toFixed(2)}</td>
      <td data-label="Action">
        <div class="controls">
          <button class="btn-ctrl btn-minus" onclick="changeQty('${s.id}',-1)" ${qty===0?"disabled":""}>-</button>
          <input type="number" class="qty-input" value="${qty}" min="0" onchange="updateQtyInput('${s.id}',this.value)">
          <button class="btn-ctrl btn-plus"  onclick="changeQty('${s.id}',1)">+</button>
        </div>
      </td>`;
    tbody.appendChild(row);
  });
  updatePaginationUI();
}

function filterServices() {
  const si         = document.getElementById("serviceSearch");
  const searchTerm = si ? si.value.toLowerCase() : "";
  transactions[activeTabIndex].searchTerm = searchTerm;
  filteredData = services.filter(s =>
    s.name.toLowerCase().includes(searchTerm) ||
    s.group.toLowerCase().includes(searchTerm)
  );
  transactions[activeTabIndex].currentPage = 1;
  currentPage = 1;
  renderTable();
}

function changeQty(id, delta) {
  cart[id] = Math.max(0, (cart[id] || 0) + delta);
  if (cart[id] === 0) delete cart[id];
  updateTotals(); updateSummary(); renderTable();
}

function updateQtyInput(id, value) {
  const n = parseInt(value);
  if (isNaN(n) || n <= 0) delete cart[id];
  else cart[id] = n;
  updateTotals(); updateSummary(); renderTable();
}

function resetAll() {
  if (!confirm("Clear current order?")) return;
  transactions[activeTabIndex].cart = {};
  cart = transactions[activeTabIndex].cart;
  const si = document.getElementById("serviceSearch");
  if (si) si.value = "";
  filterServices(); updateTotals(); updateSummary();
}

function resetSearch() {
  const si = document.getElementById("serviceSearch");
  if (si) si.value = "";
  filterServices(); updateTotals(); updateSummary(); renderTable();
}

function updateTotals() {
  let total = 0, items = 0;
  services.forEach(s => {
    const q = cart[s.id] || 0;
    total += s.price * q;
    items += q;
  });
  document.getElementById("grand-total").innerText = `₱${total.toFixed(2)}`;
  document.getElementById("item-count").innerText  = `${items} item${items !== 1 ? "s" : ""}`;
}

function updateSummary() {
  const summaryItems = document.getElementById("summary-items");
  summaryItems.innerHTML = "";
  const groups = {};
  let hasItems = false;

  services.forEach(s => {
    const q = cart[s.id] || 0;
    if (q > 0) {
      hasItems = true;
      if (!groups[s.group]) groups[s.group] = [];
      groups[s.group].push(`${s.name} - ${q} x ₱${s.price} = ₱${s.price * q}`);
    }
  });

  if (hasItems) {
    let html = "";
    for (const g in groups) {
      html += `<strong style="color:${groupColors[g]||"#000"}">${g}</strong>\n`;
      html += groups[g].join(",\n") + "\n\n";
    }
    summaryItems.innerHTML = `<tr><td class="details-content">${html}</td></tr>`;
  } else {
    summaryItems.innerHTML = `<tr><td class="details-content" style="color:#94a3b8;font-style:italic;">No items added yet...</td></tr>`;
  }
}

function copySummary() {
  const groups = {};
  services.forEach(s => {
    const q = cart[s.id] || 0;
    if (q > 0) {
      if (!groups[s.group]) groups[s.group] = [];
      groups[s.group].push(`${s.name} - ${q} x ₱${s.price} = ₱${s.price * q}`);
    }
  });
  if (!Object.keys(groups).length) return alert("Cart is empty!");
  let txt = "";
  for (const g in groups) txt += `[${g}]\n${groups[g].join("\n")}\n`;
  navigator.clipboard.writeText(txt).then(() => {
    const btn = document.querySelector(".copy-btn");
    btn.innerText = "✅ Copied!"; btn.style.background = "#22c55e";
    setTimeout(() => { btn.innerText = "Copy"; btn.style.background = "white"; }, 2000);
  });
}

function changePage(dir) {
  const total = Math.ceil(filteredData.length / itemsPerPage);
  const next  = currentPage + dir;
  if (next >= 1 && next <= total) {
    currentPage = next;
    transactions[activeTabIndex].currentPage = currentPage;
    renderTable();
  }
}

function updatePaginationUI() {
  const total = Math.ceil(filteredData.length / itemsPerPage) || 1;
  document.getElementById("pageInfo").innerText       = `${currentPage} of ${total}`;
  document.getElementById("prevPage").disabled        = currentPage === 1;
  document.getElementById("nextPage").disabled        = currentPage === total;
}

// =============================================
// PAYMENT MODAL
// =============================================
function openPaymentModal() {
  currentTransactionTotal = services.reduce((t, s) => t + s.price * (cart[s.id] || 0), 0);
  if (!currentTransactionTotal) return alert("Cart is empty!");
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
  const cash   = parseFloat(document.getElementById("cashReceived").value) || 0;
  const change = cash - currentTransactionTotal;
  const el     = document.getElementById("change-amount");
  el.innerText   = `₱${Math.max(0, change).toFixed(2)}`;
  el.style.color = change < 0 ? "var(--danger)" : "var(--success)";
}

function completePayment() {
  const cash = parseFloat(document.getElementById("cashReceived").value) || 0;
  if (cash < currentTransactionTotal) return alert("Insufficient cash provided!");
  const btn = document.getElementById("btn-done-payment");
  btn.disabled = true;
  showSuccessModal("Payment Complete");
  setTimeout(() => {
    closePaymentModal();
    transactions[activeTabIndex].cart = {};
    cart = transactions[activeTabIndex].cart;
    filterServices(); updateTotals(); updateSummary();
    btn.disabled = false;
  }, 1000);
}

// =============================================
// ORDERS
// =============================================
function renderOrders() {
  const searchTerm   = (document.getElementById("ordersSearch")?.value || "").toLowerCase();
  const filterStatus = document.getElementById("ordersFilter")?.value || "all";
  const list         = document.getElementById("orders-list");
  const empty        = document.getElementById("orders-empty");

  let filtered = orders.filter(o => {
    const ms = o.customer.toLowerCase().includes(searchTerm) ||
               o.details.toLowerCase().includes(searchTerm) ||
               (o.notes||"").toLowerCase().includes(searchTerm);
    const mf = filterStatus === "all" || o.status === filterStatus;
    return ms && mf;
  });

  const so = { "Not Started": 0, "Pending": 1, "Completed": 2 };
  filtered.sort((a,b) => so[a.status] - so[b.status] || b.createdAt - a.createdAt);

  list.innerHTML = "";
  if (!filtered.length) { list.style.display = "none"; empty.style.display = ""; return; }
  list.style.display = "grid"; empty.style.display = "none";

  filtered.forEach(o => {
    const sc  = "status-" + o.status.toLowerCase().replace(" ", "-");
    const bc  = "badge-"  + o.status.toLowerCase().replace(" ", "-");
    const amt = o.amount > 0 ? `₱${parseFloat(o.amount).toFixed(2)}` : "—";
    const dt  = new Date(o.createdAt).toLocaleDateString("en-PH",{month:"short",day:"numeric",year:"numeric"});
    const card = document.createElement("div");
    card.className = `order-card ${sc}`;
    card.innerHTML = `
      <div class="order-card-header">
        <div class="order-customer">${escapeHtml(o.customer)||"Unnamed Customer"}</div>
        <span class="status-badge ${bc}">${o.status}</span>
      </div>
      ${o.details ? `<div class="order-details-text">${escapeHtml(o.details)}</div>` : ""}
      <div class="order-meta">
        <span class="order-amount">${amt}</span>
        <span class="order-date">${dt}</span>
      </div>
      ${o.notes ? `<div class="order-notes-text">📝 ${escapeHtml(o.notes)}</div>` : ""}
      <div class="order-card-actions">
        <button class="btn-order-edit"   onclick="openOrderModal('${o.id}')">✏️ Edit</button>
        <button class="btn-order-delete" onclick="openDeleteOrderModal('${o.id}')">🗑️ Delete</button>
      </div>`;
    list.appendChild(card);
  });
}

function openOrderModal(orderId = null) {
  editingOrderId = orderId;
  document.getElementById("order-modal-title").textContent = orderId ? "Edit Order" : "New Order";
  if (orderId) {
    const o = orders.find(x => x.id === orderId);
    if (!o) return;
    document.getElementById("order-customer").value = o.customer;
    document.getElementById("order-details").value  = o.details;
    document.getElementById("order-amount").value   = o.amount || "";
    document.getElementById("order-status").value   = o.status;
    document.getElementById("order-notes").value    = o.notes || "";
  } else {
    ["order-customer","order-details","order-amount","order-notes"].forEach(id => document.getElementById(id).value = "");
    document.getElementById("order-status").value = "Not Started";
  }
  document.getElementById("order-modal").style.display = "flex";
  setTimeout(() => document.getElementById("order-customer").focus(), 100);
}

function closeOrderModal() {
  document.getElementById("order-modal").style.display = "none";
  editingOrderId = null;
}

function saveOrder() {
  const customer = document.getElementById("order-customer").value.trim();
  const details  = document.getElementById("order-details").value.trim();
  const amount   = parseFloat(document.getElementById("order-amount").value) || 0;
  const status   = document.getElementById("order-status").value;
  const notes    = document.getElementById("order-notes").value.trim();
  if (!customer && !details) return alert("Please enter a customer name or order details.");

  if (editingOrderId) {
    const idx = orders.findIndex(o => o.id === editingOrderId);
    if (idx !== -1) orders[idx] = { ...orders[idx], customer, details, amount, status, notes, updatedAt: Date.now() };
  } else {
    orders.push({ id: "order_" + Date.now(), customer, details, amount, status, notes, createdAt: Date.now(), updatedAt: Date.now() });
  }
  saveOrdersToStorage();
  closeOrderModal();
  renderOrders();
  showSuccessModal(editingOrderId ? "Order Updated" : "Order Saved");
}

function openDeleteOrderModal(id) {
  deletingOrderId = id;
  const o = orders.find(x => x.id === id);
  document.getElementById("delete-modal-name").textContent =
    o ? `"${o.customer || o.details.slice(0,40) || "this order"}" will be permanently removed.`
      : "This will permanently remove the order.";
  document.getElementById("delete-modal-title").textContent = "Delete Order?";
  document.getElementById("delete-modal").style.display = "flex";
}

function closeDeleteModal() {
  document.getElementById("delete-modal").style.display = "none";
  deletingOrderId = null;
  deletingServiceId = null;
}

function confirmDelete() {
  if (deletingOrderId) {
    orders = orders.filter(o => o.id !== deletingOrderId);
    saveOrdersToStorage();
    closeDeleteModal();
    renderOrders();
    showSuccessModal("Order Deleted");
  } else if (deletingServiceId) {
    services = services.filter(s => s.id !== deletingServiceId);
    saveServicesToStorage();
    // clear from all carts
    transactions.forEach(t => delete t.cart[deletingServiceId]);
    delete cart[deletingServiceId];
    closeDeleteModal();
    renderServicesManager();
    filterServices();
    updateTotals();
    updateSummary();
    showSuccessModal("Service Deleted");
  }
}

// =============================================
// SERVICES MANAGER
// =============================================
function getUniqueGroups() {
  const set = new Set(services.map(s => s.group));
  return Array.from(set).sort();
}

function renderServicesManager() {
  smSearch = (document.getElementById("sm-search")?.value || "").toLowerCase();
  smFilterGroup = document.getElementById("sm-filter-group")?.value || "all";

  // Rebuild group filter dropdown
  const gf = document.getElementById("sm-filter-group");
  if (gf) {
    const prev = gf.value;
    gf.innerHTML = `<option value="all">All Groups</option>` +
      getUniqueGroups().map(g => `<option value="${escapeHtml(g)}" ${g===prev?"selected":""}>${escapeHtml(g)}</option>`).join("");
  }

  smFiltered = services.filter(s =>
    (smFilterGroup === "all" || s.group === smFilterGroup) &&
    (s.name.toLowerCase().includes(smSearch) || s.group.toLowerCase().includes(smSearch))
  );

  const totalPages = Math.ceil(smFiltered.length / smPerPage) || 1;
  if (smPage > totalPages) smPage = totalPages;

  const start    = (smPage - 1) * smPerPage;
  const pageData = smFiltered.slice(start, start + smPerPage);

  const tbody = document.getElementById("sm-tbody");
  tbody.innerHTML = "";

  if (!pageData.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#94a3b8;padding:30px;font-style:italic;">No services found.</td></tr>`;
  } else {
    pageData.forEach(s => {
      const color = groupColors[s.group] || "#64748b";
      const row   = document.createElement("tr");
      row.innerHTML = `
        <td><strong>${escapeHtml(s.name)}</strong></td>
        <td><span class="badge" style="background:${color};color:white;padding:3px 8px;border-radius:5px;font-size:.8rem;font-weight:700;">${escapeHtml(s.group)}</span></td>
        <td><strong>₱${Number(s.price).toFixed(2)}</strong></td>
        <td>
          <div class="sm-actions">
            <button class="btn-sm-edit"   onclick="openServiceModal('${s.id}')">✏️ Edit</button>
            <button class="btn-sm-delete" onclick="openDeleteServiceModal('${s.id}')">🗑️</button>
          </div>
        </td>`;
      tbody.appendChild(row);
    });
  }

  document.getElementById("sm-page-info").innerText = `${smPage} of ${totalPages}`;
  document.getElementById("sm-prev").disabled = smPage === 1;
  document.getElementById("sm-next").disabled = smPage === totalPages;
  document.getElementById("sm-count").innerText = `${smFiltered.length} service${smFiltered.length!==1?"s":""}`;

  renderGroupColorManager();
}

function smChangePage(dir) {
  const total = Math.ceil(smFiltered.length / smPerPage) || 1;
  const next  = smPage + dir;
  if (next >= 1 && next <= total) { smPage = next; renderServicesManager(); }
}

function renderGroupColorManager() {
  const container = document.getElementById("group-colors-list");
  if (!container) return;
  const groups = getUniqueGroups();
  container.innerHTML = groups.map(g => {
    const c = groupColors[g] || "#64748b";
    return `
      <div class="gc-row">
        <span class="gc-label">${escapeHtml(g)}</span>
        <div class="gc-right">
          <input type="color" class="gc-color-input" value="${c}" onchange="updateGroupColor('${escapeHtml(g)}',this.value)" title="Change color for ${escapeHtml(g)}">
          <span class="gc-hex">${c}</span>
        </div>
      </div>`;
  }).join("");
}

function updateGroupColor(group, color) {
  groupColors[group] = color;
  saveColorsToStorage();
  renderServicesManager();
  filterServices();
  updateSummary();
  // update hex label live
  const rows = document.querySelectorAll(".gc-row");
  rows.forEach(r => {
    const lbl = r.querySelector(".gc-label");
    if (lbl && lbl.textContent === group) {
      const hex = r.querySelector(".gc-hex");
      if (hex) hex.textContent = color;
    }
  });
}

// =============================================
// SERVICE MODAL (Create / Edit)
// =============================================
function openServiceModal(serviceId = null) {
  editingServiceId = serviceId;
  const modal  = document.getElementById("service-modal");
  const title  = document.getElementById("service-modal-title");
  const groups = getUniqueGroups();

  // Rebuild group datalist
  const dl = document.getElementById("service-group-list");
  if (dl) dl.innerHTML = groups.map(g => `<option value="${escapeHtml(g)}">`).join("");

  if (serviceId) {
    const s = services.find(x => x.id === serviceId);
    if (!s) return;
    title.textContent = "Edit Service";
    document.getElementById("svc-name").value  = s.name;
    document.getElementById("svc-price").value = s.price;
    document.getElementById("svc-group").value = s.group;
  } else {
    title.textContent = "New Service";
    document.getElementById("svc-name").value  = "";
    document.getElementById("svc-price").value = "";
    document.getElementById("svc-group").value = "";
  }
  modal.style.display = "flex";
  setTimeout(() => document.getElementById("svc-name").focus(), 100);
}

function closeServiceModal() {
  document.getElementById("service-modal").style.display = "none";
  editingServiceId = null;
}

function saveService() {
  const name  = document.getElementById("svc-name").value.trim();
  const price = parseFloat(document.getElementById("svc-price").value);
  const group = document.getElementById("svc-group").value.trim();

  if (!name)        return alert("Please enter a service name.");
  if (isNaN(price) || price < 0) return alert("Please enter a valid price.");
  if (!group)       return alert("Please enter or select a group.");

  if (editingServiceId) {
    const idx = services.findIndex(s => s.id === editingServiceId);
    if (idx !== -1) services[idx] = { ...services[idx], name, price, group };
  } else {
    services.push({ id: "svc_" + Date.now(), name, price, group });
  }

  // Ensure new group has a color
  if (!groupColors[group]) {
    groupColors[group] = "#64748b";
    saveColorsToStorage();
  }

  saveServicesToStorage();
  closeServiceModal();
  renderServicesManager();
  filterServices();
  showSuccessModal(editingServiceId ? "Service Updated" : "Service Added");
}

function openDeleteServiceModal(id) {
  deletingServiceId = id;
  const s = services.find(x => x.id === id);
  document.getElementById("delete-modal-name").textContent =
    s ? `"${s.name}" (${s.group}) will be permanently removed.`
      : "This will permanently remove the service.";
  document.getElementById("delete-modal-title").textContent = "Delete Service?";
  document.getElementById("delete-modal").style.display = "flex";
}

function resetServicesToDefault() {
  if (!confirm("This will RESET all services back to the original defaults and clear any custom services. Continue?")) return;
  services = DEFAULT_SERVICES.map((s, i) => ({ ...s, id: "svc_" + (Date.now() + i) }));
  groupColors = { ...DEFAULT_GROUP_COLORS };
  saveServicesToStorage();
  saveColorsToStorage();
  // Clear all carts
  transactions.forEach(t => t.cart = {});
  cart = transactions[activeTabIndex]?.cart || {};
  renderServicesManager();
  filterServices();
  updateTotals();
  updateSummary();
  showSuccessModal("Services Reset");
}

// =============================================
// SHARED UTILITIES
// =============================================
function showSuccessModal(message) {
  const m = document.getElementById("success-modal");
  document.getElementById("success-message").innerText = message;
  m.style.display = "flex";
  setTimeout(() => m.style.display = "none", 1500);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

document.addEventListener("click", e => {
  if (e.target.id === "order-modal")   closeOrderModal();
  if (e.target.id === "delete-modal")  closeDeleteModal();
  if (e.target.id === "payment-modal") closePaymentModal();
  if (e.target.id === "service-modal") closeServiceModal();
});

// =============================================
// BOOT
// =============================================
init();
