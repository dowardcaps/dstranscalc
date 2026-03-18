// Use 'let' so these can be updated when the database responds
let services = [];
let cart = [];
let filteredData = [];
let activeTabIndex = 0;

// Initialize transactions with 'let'
let transactions = [
    { 
        id: Date.now(), 
        name: "Transaction A", 
        cart: [], 
        searchTerm: "", 
        currentPage: 1 
    }
];

async function unlockAdmin() {
    const pass = prompt("Enter Admin Password:");
    if (!pass) return;

    try {
        // Check the password against the new auth API
        const response = await fetch('/api/auth', {
            method: 'GET',
            headers: { 'x-admin-password': pass }
        });

        if (response.ok) {
            // SUCCESS: Only show the UI if the server says OK
            adminPassword = pass;
            document.getElementById('admin-panel').style.display = 'block';
            document.getElementById('btn-delete-mode').style.display = 'inline-block';
            document.getElementById('btn-manage-toggle').innerText = "Lock Admin";
            
            // Change button to a simple page reload to lock up
            document.getElementById('btn-manage-toggle').onclick = () => location.reload();
            console.log("Admin access granted.");
        } else {
            // FAILURE: Keep the UI hidden
            alert("Access Denied: Incorrect Password.");
        }
    } catch (err) {
        console.error("Auth error:", err);
        alert("System error. Check if 'vercel dev' is running.");
    }
}

function toggleDeleteMode() {
    isDeleteMode = !isDeleteMode;
    const btn = document.getElementById('btn-delete-mode');
    const confirmBtn = document.getElementById('btn-confirm-delete');
    
    btn.innerText = isDeleteMode ? "Cancel Selection" : "Select Items to Delete";
    confirmBtn.style.display = isDeleteMode ? "inline-block" : "none";
    
    if (!isDeleteMode) itemsToDelete.clear();
    renderTable(); // Re-render to show/hide checkboxes
}

async function loadServicesFromDB() {
    console.log("Connecting to DS Prints Database...");
    try {
        const response = await fetch('/api/items');
        
        // If the server crashes (500 error), stop here and show the error
        if (!response.ok) {
            const errorBody = await response.text(); 
            console.error("SERVER ERROR DETAILS:", errorBody);
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();

        // Update global variables (Now 'let', so this won't crash)
        services = data.map(item => ({
            id: item.id,
            name: item.name,
            price: parseFloat(item.price) || 0, 
            group: item.category 
        }));

        cart = Array(services.length).fill(0);
        filteredData = [...services]; 
        
        if (transactions[activeTabIndex]) {
            transactions[activeTabIndex].cart = [...cart];
        }

        console.log("Successfully loaded items:", services.length);
        
        filterServices(); 
        updateTotals();
        updateSummary();
        
    } catch (err) {
        console.error("STOPPED CRASH: Failed to load inventory:", err.message);
        // This prevents the "Undefined" UI errors seen in your screenshot
        services = []; 
        renderTable(); 
    }
}

const groupColors = {
  "Printing": "#002c8a", // Blue
  "Xerox": "#ff6e6e",    // Red
  "Rush ID": "#8b5cf6",  // Purple
  "Photo": "#bd7800",    // Amber/Orange
  "Laminate": "#10b981", // Emerald/Green
  "Scan": "#64748b"      // Slate/Gray
};

let currentPage = 1;
const itemsPerPage = 9;

function getTransactionLabel(index) {
    let label = "";
    while (index >= 0) {
        label = String.fromCharCode((index % 26) + 65) + label;
        index = Math.floor(index / 26) - 1;
    }
    return label;
}

function renderTable() {
const tbody = document.getElementById("service-rows");
    tbody.innerHTML = "";

    // IF DATA IS STILL LOADING
    if (services.length === 0) {
        for (let i = 0; i < itemsPerPage; i++) {
            const skeletonRow = document.createElement("tr");
            skeletonRow.className = "skeleton-row";
            skeletonRow.innerHTML = `
                <td><div class="skeleton-item"></div></td>
                <td><div class="skeleton-item skeleton-badge"></div></td>
                <td><div class="skeleton-item skeleton-price"></div></td>
                <td><div class="skeleton-item skeleton-ctrl"></div></td>
            `;
            tbody.appendChild(skeletonRow);
        }
        return; // Stop here until loadServicesFromDB finishes
    }

    // ORIGINAL RENDERING LOGIC (when services are loaded)
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
pageData.forEach((s) => {
    const originalIndex = services.indexOf(s);
    const badgeColor = groupColors[s.group] || "#64748b";

    const row = document.createElement("tr");
    
    // Add a checkbox column if in delete mode
    let deleteCell = isDeleteMode 
        ? `<td><input type="checkbox" onchange="toggleItemSelection('${s.id}')" ${itemsToDelete.has(s.id) ? 'checked' : ''}></td>` 
        : "";

    row.innerHTML = `
        ${deleteCell}
        <td><strong>${s.name}</strong></td>
    <td>
        <span class="badge" style="background-color: ${badgeColor}; color: white; padding: 4px 8px; border-radius: 6px; font-size: 1rem; font-weight: 700;">
            ${s.group}
        </span>
    </td>
    <td class="price-cell">₱${s.price.toFixed(2)}</td>
    <td>
        <div class="controls">
            <button class="btn-ctrl btn-minus" onclick="changeQty(${originalIndex}, -1)" ${cart[originalIndex] === 0 ? "disabled" : ""}>-</button>
            <input type="number" 
                   class="qty-input" 
                   value="${cart[originalIndex]}" 
                   min="0" 
                   onchange="updateQtyInput(${originalIndex}, this.value)">
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
    
    // Validate input: if it's not a number or empty, set to 0
    if (isNaN(newQty) || newQty < 0) {
        cart[index] = 0;
    } else {
        cart[index] = newQty;
    }
    
    updateTotals();
    updateSummary();
    renderTable(); // Refresh to update button disabled states
}

function filterServices() {
  const searchTerm = document
    .getElementById("serviceSearch")
    .value.toLowerCase();
  filteredData = services.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm) ||
      s.group.toLowerCase().includes(searchTerm),
  );

  currentPage = 1; // Reset to page 1 on search
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
  document.getElementById("pageInfo").innerText =
    `${currentPage} of ${totalPages}`;

  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

// Ensure changeQty calls renderTable to refresh the current page view
function changeQty(index, delta) {
  cart[index] = Math.max(0, cart[index] + delta);
  updateTotals();
  renderTable();
}

function updateTotals() {
  let grandTotal = 0;
  let totalItems = 0;
  services.forEach((s, i) => {
    grandTotal += s.price * cart[i];
    totalItems += cart[i];
  });
  document.getElementById("grand-total").innerText =
    `₱${grandTotal.toFixed(2)}`;
  document.getElementById("item-count").innerText = `${totalItems} items`;
}

function updateSummary() {
  const summaryContainer = document.getElementById("order-summary-container");
  const summaryItems = document.getElementById("summary-items");
  summaryItems.innerHTML = "";

  let detailsText = "";
  let hasItems = false;
  const groups = {};

  // Grouping logic to match your image layout
  services.forEach((s, index) => {
    if (cart[index] > 0) {
      hasItems = true;
      if (!groups[s.group]) groups[s.group] = [];
      // Example output: Letter (B&W) - 3 - ₱15
      groups[s.group].push(`${s.name} - ${cart[index]} x ₱${s.price} = ₱${s.price * cart[index]}`);
    }
  });

  // Always ensure the container is visible
  summaryContainer.style.display = "block";

if (hasItems) {
    for (const group in groups) {
      const headerColor = groupColors[group] || "#000";
      // Adding color to the group name in the summary table
      detailsText += `<strong style="color: ${headerColor}">${group}</strong>\n`;
      detailsText += groups[group].join(",\n") + "\n\n";
    }

    const row = document.createElement("tr");
    row.innerHTML = `<td class="details-content">${detailsText}</td>`;
    summaryItems.appendChild(row);
} else {
    // Show a placeholder or empty row so the table doesn't look broken
    const row = document.createElement("tr");
    row.innerHTML = `<td class="details-content" style="color: #94a3b8; font-style: italic;">No items added yet...</td>`;
    summaryItems.appendChild(row);
  }
}

// IMPORTANT: Ensure changeQty calls the update
function changeQty(index, delta) {
  cart[index] = Math.max(0, cart[index] + delta);
  updateTotals();
  updateSummary(); // This MUST be here to show the summary
  renderTable();
}

function resetAll() {
  if (confirm("Clear current order?")) {
    // 1. Reset the cart quantities
    cart = Array(services.length).fill(0);
    
    // 2. Clear the search input field
    const searchInput = document.getElementById("serviceSearch");
    if (searchInput) {
      searchInput.value = "";
    }
    
    // 3. Reset the filter and data view
    // Calling filterServices() while the search input is empty 
    // will set filteredData back to the full services list.
    filterServices(); 
    
    // 4. Update the UI components
    updateTotals();
    updateSummary();
    
    // No need to call renderTable() separately because 
    // filterServices() already calls it.
  }
}

function addNewTransaction() {
    const newId = Date.now();
    // Get the letter based on the counter, not the array length
    const letterLabel = getTransactionLabel(transactionCounter);

    transactions.push({
        id: newId,
        name: `Transaction ${letterLabel}`,
        cart: Array(services.length).fill(0),
        searchTerm: "",
        currentPage: 1
    });
    
    // Increment so the next one is always the next letter in the alphabet
    transactionCounter++; 
    
    activeTabIndex = transactions.length - 1;
    renderTabs();
    syncGlobalState();
    filterServices();
    updateSummary();
    updateTotals();
}

function switchTab(index) {
    activeTabIndex = index;
    
    // 1. Sync the data
    syncGlobalState();
    
    // 2. Update UI Elements
    renderTabs();
    document.getElementById("serviceSearch").value = transactions[activeTabIndex].searchTerm;
    
    // 3. Refresh the View
    filterServices(); // This handles renderTable()
    updateTotals();   // Recalculates the ₱ amount for THIS customer
    updateSummary();  // Rebuilds the text summary for THIS customer
}

function syncGlobalState() {
    // This connects your existing logic to the data of the currently selected tab
    cart = transactions[activeTabIndex].cart;
    currentPage = transactions[activeTabIndex].currentPage;
}

function renderTabs() {
    const tabsList = document.getElementById("tabs-list");
    tabsList.innerHTML = "";
    transactions.forEach((tab, index) => {
        const tabEl = document.createElement("button");
        tabEl.className = `tab-item ${index === activeTabIndex ? 'active' : ''}`;
        tabEl.innerHTML = `
            ${tab.name}
            ${transactions.length > 1 ? `<span class="close-tab" onclick="removeTab(event, ${index})">×</span>` : ''}
        `;
        tabEl.onclick = () => switchTab(index);
        tabsList.appendChild(tabEl);
    });
}

function removeTab(event, index) {
    event.stopPropagation(); // Prevent switching to the tab we are closing
    if (transactions.length <= 1) return;
    
    transactions.splice(index, 1);
    if (activeTabIndex >= transactions.length) {
        activeTabIndex = transactions.length - 1;
    }
    renderTabs();
    switchTab(activeTabIndex);
}

// Update your filterServices to save the search term to the tab
function filterServices() {
    const searchInput = document.getElementById("serviceSearch");
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    
    // Save search to current transaction
    transactions[activeTabIndex].searchTerm = searchTerm;

    filteredData = services.filter(
        (s) =>
            s.name.toLowerCase().includes(searchTerm) ||
            s.group.toLowerCase().includes(searchTerm),
    );

    transactions[activeTabIndex].currentPage = 1;
    currentPage = 1; 
    renderTable();
}

async function addNewItem() {
    const password = document.getElementById('adminPass').value;
    const item = {
        name: document.getElementById('newItemName').value,
        price: document.getElementById('newItemPrice').value,
        category: document.getElementById('newItemCategory').value
    };

    const response = await fetch('/api/manage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password // The Secret Key check
        },
        body: JSON.stringify(item)
    });

    const result = await response.json();
    if (response.ok) {
        alert("Success! Item added to DS Prints.");
        loadServicesFromDB(); // Refresh the list automatically
    } else {
        alert("Error: " + result.error);
    }
}

function copySummary() {
  const items = [];
  const groups = {};
  let grandTotal = 0;

  // 1. Collect only items with quantity > 0
  services.forEach((s, index) => {
    if (cart[index] > 0) {
      if (!groups[s.group]) groups[s.group] = [];
      groups[s.group].push(`${s.name} - ${cart[index]} x ₱${s.price} = ₱${s.price * cart[index]}`);
      grandTotal += s.price * cart[index];
    }
  });

  if (Object.keys(groups).length === 0) {
    alert("Cart is empty!");
    return;
  }

  // 2. Format the text block
  let textToCopy = ``;
  for (const group in groups) {
    textToCopy += `[${group}]\n${groups[group].join("\n")}\n`;
  }
  textToCopy += ``;

  // 3. Use the Clipboard API
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      const btn = document.querySelector(".copy-btn");
      btn.innerText = "✅ Copied!";
      btn.style.background = "#22c55e";

      // Reset button after 2 seconds
      setTimeout(() => {
        btn.innerText = "Copy";
        btn.style.background = "#fefeff";
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

function init() {
    renderTable(); // Show skeletons immediately
    loadServicesFromDB(); // Start the background fetch
}

init();
