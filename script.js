const services = [
  // DOCUMENT PRINTING
  { name: "Letter (B&W)", price: 5, group: "Printing" },
  { name: "A4 (B&W)", price: 5, group: "Printing" },
  { name: "Long (B&W)", price: 7, group: "Printing" },
  { name: "Back to back Add (B&W)", price: 2, group: "Printing" },
  { name: "Letter (Partial)", price: 6, group: "Printing" },
  { name: "A4 (Partial)", price: 6, group: "Printing" },
  { name: "Long (Partial)", price: 8, group: "Printing" },
  { name: "Back to back Add (Partial)", price: 5, group: "Printing" },
  { name: "Letter (Full Color)", price: 10, group: "Printing" },
  { name: "A4 (Full Color)", price: 10, group: "Printing" },
  { name: "Long (Full Color)", price: 15, group: "Printing" },
  { name: "Back to back Add (Full)", price: 5, group: "Printing" },

  // XEROX
  { name: "Letter (B&W)", price: 3, group: "Xerox" },
  { name: "A4 (B&W)", price: 3, group: "Xerox" },
  { name: "Long (B&W)", price: 5, group: "Xerox" },
  { name: "Back to back Add (B&W)", price: 2, group: "Xerox" },
  { name: "Letter (Partial)", price: 5, group: "Xerox" },
  { name: "A4 (Partial)", price: 5, group: "Xerox" },
  { name: "Long (Partial)", price: 7, group: "Xerox" },
  { name: "Back to back Add (Partial)", price: 2, group: "Xerox" },
  { name: "Letter (Full Color)", price: 8, group: "Xerox" },
  { name: "A4 (Full Color)", price: 8, group: "Xerox" },
  { name: "Long (Full Color)", price: 10, group: "Xerox" },
  { name: "Back to back Add (Full)", price: 5, group: "Xerox" },

  // RUSH ID PACKAGES
  { name: "P1 - 9pcs 1x1", price: 50, group: "Rush ID" },
  { name: "P2 - 9pcs 2x2", price: 50, group: "Rush ID" },
  { name: "P3 - 6pcs Passport", price: 50, group: "Rush ID" },
  { name: "P4 - 4pcs 2x2 & 6pcs 1x1", price: 60, group: "Rush ID" },
  { name: "P5 - 3pcs 2x2, Passport, 4pcs 1x1", price: 70, group: "Rush ID" },
  { name: "Add-on: Change Attire", price: 10, group: "Rush ID" },
  { name: "Add-on: Get Soft copy", price: 15, group: "Rush ID" },

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

  // SCAN & OTHERS
  { name: "Scan (Any size)", price: 15, group: "Scan" },
  { name: "Scan (15 pages up)", price: 10, group: "Scan" },
];

let cart = Array(services.length).fill(0);
let currentPage = 1;
const itemsPerPage = 9;
let filteredData = [...services]; // Track filtered results for pagination

function init() {
  filterServices(); // Initial render through filter logic
}

function renderTable() {
  const tbody = document.getElementById("service-rows");
  tbody.innerHTML = "";

  // Calculate start and end indices for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = filteredData.slice(startIndex, endIndex);

  pageData.forEach((s) => {
    // Find the original index in the main services array for the cart
    const originalIndex = services.indexOf(s);

    const row = document.createElement("tr");
    if (cart[originalIndex] > 0) row.className = "active-row";

    row.innerHTML = `
    <td><strong>${s.name}</strong></td>
    <td><span class="badge">${s.group}</span></td>
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
      groups[s.group].push(`${s.name} - ${cart[index]}`);
    }
  });

  // Always ensure the container is visible
  summaryContainer.style.display = "block";

  if (hasItems) {
    for (const group in groups) {
      detailsText += `<strong>${group}</strong>\n`;
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

function copySummary() {
  const items = [];
  const groups = {};
  let grandTotal = 0;

  // 1. Collect only items with quantity > 0
  services.forEach((s, i) => {
    if (cart[i] > 0) {
      if (!groups[s.group]) groups[s.group] = [];
      groups[s.group].push(`${s.name} (x${cart[i]})`);
      grandTotal += s.price * cart[i];
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
  filterServices();
  updateSummary();
}

init();
