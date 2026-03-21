let services = [];
let cart = [];
let filteredData = [];
let adminPassword = "";
let isAddMode = false;
let isDeleteMode = false;
let isEditMode = false;
let itemsToDelete = new Set();
let transactionCounter = 1;
let activeTabIndex = 0;

let transactions = [
  { id: Date.now(), name: "Transaction A", cart: [], searchTerm: "", currentPage: 1 }
];

const groupColors = {
  Printing: "#002c8a", Xerox: "#ff6e6e", "Rush ID": "#8b5cf6",
  Photo: "#bd7800", Laminate: "#089b6a", Scan: "#004100", Stationery: "#663600"
};

let currentPage = 1;
const itemsPerPage = 9;

// --- INITIALIZATION & SESSION ---
async function init() {
  renderTable(); 
  await checkExistingSession(); 
  await loadServicesFromDB(); 
}

async function checkExistingSession() {
  const savedPass = localStorage.getItem("ds_admin_pass");
  if (savedPass) {
    try {
      const response = await fetch("/api/auth", { headers: { "x-admin-password": savedPass } });
      if (response.ok) { adminPassword = savedPass; showAdminUI(); } 
      else { localStorage.removeItem("ds_admin_pass"); }
    } catch (err) { console.error("Session restoration failed."); }
  }
}

function showAdminUI() {
  document.getElementById("admin-secondary-actions").style.display = "flex";
  const mainBtn = document.getElementById("btn-manage-toggle");
  mainBtn.innerText = "🔓 Lock Admin Session";
  mainBtn.style.background = "#64748b";
}

async function unlockAdmin() {
  if (adminPassword) {
    localStorage.removeItem("ds_admin_pass");
    location.reload();
    return;
  }
  const pass = prompt("Enter Admin Password:");
  if (!pass) return;

  try {
    const response = await fetch("/api/auth", { headers: { "x-admin-password": pass } });
    if (response.ok) {
      adminPassword = pass;
      localStorage.setItem("ds_admin_pass", pass);
      showAdminUI();
    } else { alert("Access Denied."); }
  } catch (err) { alert("Connection Error."); }
}

// --- SUCCESS MODAL ---
function showSuccessModal(message) {
  const modal = document.getElementById("success-modal");
  document.getElementById("success-message").innerText = message;
  modal.style.display = "flex";
  setTimeout(() => { modal.style.display = "none"; }, 1500);
}

// --- DATABASE LOAD ---
async function loadServicesFromDB() {
  try {
    const response = await fetch("/api/items");
    const data = await response.json();

    services = data.map((item) => ({
      id: item.id, name: item.name, price: parseFloat(item.price), group: item.category,
    }));

    transactions.forEach((tab) => {
      if (tab.cart.length !== services.length) {
        const newCart = Array(services.length).fill(0);
        tab.cart.forEach((qty, i) => { if (i < newCart.length) newCart[i] = qty; });
        tab.cart = newCart;
      }
    });

    syncGlobalState();
    filterServices();
    updateTotals();
    updateSummary();
  } catch (err) { console.error("Failed to load inventory:", err); }
}

// --- MODES: EDIT & DELETE ---
function toggleDeleteMode() {
  isDeleteMode = !isDeleteMode;
  isEditMode = false; // Turn off edit mode
  isAddMode = false; // Turn off add mode
  document.getElementById("admin-panel").style.display = "none";
  document.getElementById("btn-delete-mode").innerText = isDeleteMode ? "Cancel Delete" : "🗑️ Delete Items";
  document.getElementById("btn-confirm-delete").style.display = isDeleteMode ? "inline-block" : "none";
  document.getElementById("btn-edit-mode").innerText = "✏️ Edit Items";
  document.getElementById("btn-add-mode").innerText = "+ Add Items";
  if (!isDeleteMode) itemsToDelete.clear();
  renderTable();
}

function toggleEditMode() {
  isEditMode = !isEditMode;
  isDeleteMode = false; // Turn off delete mode
  isAddMode = false; // Turn off add mode
  document.getElementById("admin-panel").style.display = "none";
  document.getElementById("btn-edit-mode").innerText = isEditMode ? "Cancel Edit" : "✏️ Edit Items";
  document.getElementById("btn-delete-mode").innerText = "🗑️ Delete Items";
  document.getElementById("btn-add-mode").innerText = "+ Add Items";
  document.getElementById("btn-confirm-delete").style.display = "none";
  itemsToDelete.clear();
  renderTable();
}

function toggleAddMode() {
  isAddMode = !isAddMode;
  isDeleteMode = false; // Turn off delete mode
  isEditMode = false; // Turn off edit mode
  document.getElementById("admin-panel").style.display = isAddMode ? "block" : "none";
  document.getElementById("btn-add-mode").innerText = isAddMode ? "Cancel Add" : "+ Add Items";
  document.getElementById("btn-delete-mode").innerText = "🗑️ Delete Items";
  document.getElementById("btn-edit-mode").innerText = "✏️ Edit Items";
  document.getElementById("btn-confirm-delete").style.display = "none";
  itemsToDelete.clear();
  renderTable();
}

function toggleItemSelection(id) {
  itemsToDelete.has(id) ? itemsToDelete.delete(id) : itemsToDelete.add(id);
}

// --- API ACTIONS (ADD, EDIT, DELETE) ---
async function addNewItem() {
  if (!adminPassword) return alert("Unauthorized.");
  const name = document.getElementById("newItemName").value;
  const price = document.getElementById("newItemPrice").value;
  const category = document.getElementById("newItemCategory").value;
  if (!name || !price) return alert("Please enter name and price.");

  const btn = document.getElementById("btn-add-item");
  btn.disabled = true; // Prevent double clicks

  try {
    const response = await fetch("/api/manage", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": adminPassword },
      body: JSON.stringify({ name, price, category }),
    });
    if (response.ok) {
      document.getElementById("newItemName").value = "";
      document.getElementById("newItemPrice").value = "";
      showSuccessModal("Item Added");
      await loadServicesFromDB();
    } else { alert("Error adding item."); }
  } catch (err) { console.error(err); alert("Connection lost."); }
  finally { btn.disabled = false; }
}

async function confirmDeleteItems() {
  if (itemsToDelete.size === 0) return alert("Select items first.");
  if (!confirm(`Delete ${itemsToDelete.size} item(s)?`)) return;

  const btn = document.getElementById("btn-confirm-delete");
  btn.disabled = true;

  try {
    const response = await fetch("/api/manage", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": adminPassword },
      body: JSON.stringify({ ids: Array.from(itemsToDelete) }),
    });

    if (response.ok) {
      showSuccessModal("Items Deleted");
      toggleDeleteMode(); // Auto close delete mode
      await loadServicesFromDB(); 
    } else { alert("Delete failed."); }
  } catch (err) { alert("Server error."); }
  finally { btn.disabled = false; }
}

// --- EDIT MODAL LOGIC ---
function openEditModal(id) {
  // Convert both to strings to prevent Number vs String mismatch errors
  const item = services.find(s => String(s.id) === String(id));
  
  if (!item) {
    console.error("Could not find the item in the services array with ID:", id);
    return;
  }
  
  document.getElementById("editItemId").value = item.id;
  document.getElementById("editItemName").value = item.name;
  document.getElementById("editItemPrice").value = item.price;
  document.getElementById("editItemCategory").value = item.group;
  
  // Show the modal
  document.getElementById("edit-modal").style.display = "flex";
}

function closeEditModal() {
  document.getElementById("edit-modal").style.display = "none";
}

async function saveEditItem() {
  const id = document.getElementById("editItemId").value;
  const name = document.getElementById("editItemName").value;
  const price = document.getElementById("editItemPrice").value;
  const category = document.getElementById("editItemCategory").value;

  const btn = document.getElementById("btn-save-edit");
  btn.disabled = true;

  try {
    const response = await fetch("/api/manage", {
      method: "PUT", // Or PATCH depending on your backend
      headers: { "Content-Type": "application/json", "x-admin-password": adminPassword },
      body: JSON.stringify({ id, name, price, category }),
    });

    if (response.ok) {
      showSuccessModal("Item Updated");
      closeEditModal();
      await loadServicesFromDB();
    } else { alert("Failed to update item."); }
  } catch (err) { alert("Connection error."); }
  finally { btn.disabled = false; }
}

// --- RENDERING & UI LOGIC ---
function renderTable() {
  const tbody = document.getElementById("service-rows");
  const headerRow = document.getElementById("table-header-row");
  tbody.innerHTML = "";

  // Dynamic Header logic remains same
  let actionHeader = "";
  if (isDeleteMode) actionHeader = "<th>Select</th>";
  else if (isEditMode) actionHeader = "<th>Edit</th>";
  
  headerRow.innerHTML = `
    ${actionHeader}
    <th>Service / Item</th>
    <th>Category</th>
    <th>Price</th>
    <th class="text-center">Quantity</th>
  `;

  // --- SKELETON UI STATE ---
  if (services.length === 0) {
    for (let i = 0; i < itemsPerPage; i++) {
      const sRow = document.createElement("tr");
      sRow.innerHTML = `
        ${actionHeader ? '<td><div class="skeleton-box" style="width:20px"></div></td>' : ''}
        <td><div class="skeleton-box"></div></td>
        <td><div class="skeleton-box" style="width:70%"></div></td>
        <td><div class="skeleton-box" style="width:50%"></div></td>
        <td><div class="skeleton-box" style="width:80px; margin: 0 auto;"></div></td>
      `;
      tbody.appendChild(sRow);
    }
    return; // Exit early while loading
  }

  // --- NORMAL RENDERING ---
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  pageData.forEach((s) => {
    const originalIndex = services.indexOf(s);
    const badgeColor = groupColors[s.group] || "#64748b";
    const row = document.createElement("tr");

    let actionCell = "";
    if (isDeleteMode) {
      actionCell = `<td><input type="checkbox" onchange="toggleItemSelection('${s.id}')" ${itemsToDelete.has(s.id) ? "checked" : ""}></td>`;
    } else if (isEditMode) {
      actionCell = `<td><button class="btn-edit-small" onclick="openEditModal('${s.id}')">✏️</button></td>`;
    }

    row.innerHTML = `
      ${actionCell}
      <td><strong>${s.name}</strong></td>
      <td><span style="background-color: ${badgeColor}; color: white; padding: 4px 8px; border-radius: 6px; font-size: 0.85rem; font-weight: 700;">${s.group}</span></td>
      <td>₱${s.price.toFixed(2)}</td>
      <td>
        <div class="controls">
          <button class="btn-ctrl btn-minus" onclick="changeQty(${originalIndex}, -1)" ${cart[originalIndex] === 0 ? "disabled" : ""}>-</button>
          <input type="number" class="qty-input" value="${cart[originalIndex]}" onchange="updateQtyInput(${originalIndex}, this.value)">
          <button class="btn-ctrl btn-plus" onclick="changeQty(${originalIndex}, 1)">+</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
  
  updatePaginationUI();
}

function updateQtyInput(index, value) {
  const newQty = parseInt(value);
  cart[index] = (isNaN(newQty) || newQty < 0) ? 0 : newQty;
  updateTotals();
  updateSummary();
  renderTable();
}

function changeQty(index, delta) {
  cart[index] = Math.max(0, cart[index] + delta);
  updateTotals();
  updateSummary();
  renderTable();
}

// --- SEARCH, PAGINATION & TABS ---
function filterServices() {
  const searchInput = document.getElementById("serviceSearch");
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  transactions[activeTabIndex].searchTerm = searchTerm;

  filteredData = services.filter((s) => s.name.toLowerCase().includes(searchTerm) || s.group.toLowerCase().includes(searchTerm));
  transactions[activeTabIndex].currentPage = 1;
  currentPage = 1;
  renderTable();
}

function changePage(direction) {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const nextStep = currentPage + direction;
  if (nextStep >= 1 && nextStep <= totalPages) {
    currentPage = nextStep;
    renderTable();
  }
}

function updatePaginationUI() {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  document.getElementById("pageInfo").innerText = `${currentPage} of ${totalPages}`;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

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
    name: `Transaction ${getTransactionLabel(transactionCounter++)}`,
    cart: Array(services.length).fill(0),
    searchTerm: "", currentPage: 1,
  });
  activeTabIndex = transactions.length - 1;
  switchTab(activeTabIndex);
}

function switchTab(index) {
  activeTabIndex = index;
  syncGlobalState();
  renderTabs();
  document.getElementById("serviceSearch").value = transactions[activeTabIndex].searchTerm;
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
    tabEl.innerHTML = `${tab.name} ${transactions.length > 1 ? `<span class="close-tab" onclick="removeTab(event, ${index})">×</span>` : ""}`;
    tabEl.onclick = () => switchTab(index);
    tabsList.appendChild(tabEl);
  });
}

function removeTab(event, index) {
  event.stopPropagation();
  if (transactions.length <= 1) return;
  transactions.splice(index, 1);
  if (activeTabIndex >= transactions.length) activeTabIndex = transactions.length - 1;
  switchTab(activeTabIndex);
}

// --- SUMMARY & UTILS ---
function updateTotals() {
  let grandTotal = 0, totalItems = 0;
  services.forEach((s, i) => { grandTotal += s.price * cart[i]; totalItems += cart[i]; });
  document.getElementById("grand-total").innerText = `₱${grandTotal.toFixed(2)}`;
  document.getElementById("item-count").innerText = `${totalItems} items`;
}

function updateSummary() {
  const summaryItems = document.getElementById("summary-items");
  summaryItems.innerHTML = "";
  let detailsText = "", hasItems = false;
  const groups = {};

  services.forEach((s, index) => {
    if (cart[index] > 0) {
      hasItems = true;
      if (!groups[s.group]) groups[s.group] = [];
      groups[s.group].push(`${s.name} - ${cart[index]} x ₱${s.price} = ₱${s.price * cart[index]}`);
    }
  });

  if (hasItems) {
    for (const group in groups) {
      detailsText += `<strong style="color: ${groupColors[group] || '#000'}">${group}</strong>\n${groups[group].join("\n")}\n\n`;
    }
    summaryItems.innerHTML = `<tr><td class="details-content">${detailsText}</td></tr>`;
  } else {
    summaryItems.innerHTML = `<tr><td class="details-content" style="color: #94a3b8; font-style: italic;">No items added yet...</td></tr>`;
  }
}

function resetAll() {
  if (confirm("Clear current order?")) {
    cart = Array(services.length).fill(0);
    document.getElementById("serviceSearch").value = "";
    filterServices();
    updateTotals();
    updateSummary();
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

  let textToCopy = ``;
  for (const group in groups) textToCopy += `[${group}]\n${groups[group].join("\n")}\n`;

  navigator.clipboard.writeText(textToCopy).then(() => {
    const btn = document.querySelector(".copy-btn");
    btn.innerText = "✅ Copied!";
    btn.style.background = "#22c55e";
    setTimeout(() => { btn.innerText = "Copy"; btn.style.background = "#fff"; }, 2000);
  });
}

init();