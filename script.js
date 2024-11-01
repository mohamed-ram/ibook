// // Load products and stores on page load
// window.onload = () => {
//   loadProducts();
//   loadStoreOptions();
// };

// const stores = {
//   Ibook:
//     "https://cdn.instashop.ae/82df8e681ac5c11287376a603451b341_ibook-500x500.png",
//   "El Fares":
//     "https://cdn.instashop.ae/ada24a9d1689a49d4f55faab3802ee8b_samer-stationery--500x500_-1-.png",
//   "Office Works":
//     "https://cdn.instashop.ae/0fdabc2095bc0ad633125edd431e0022_office-works-500x500.png",
//   "Samir & Aly":
//     "https://cdn.instashop.ae/cc55c1cf810cc061109de03866017edf_samir-n-ali-500x500.png",
//   Bakier:
//     "https://cdn.instashop.ae/6f1d56f819e744e3de7eb940df612c65_bakier_2.png",
//   "El Mallah":
//     "https://cdn.instashop.ae/c3f63cd2d51e0acab64dec2511502395_el-malah-stationery-500x500.png",
// };

// const products = productData.slice(0, 30);
// function loadProducts() {
//   const container = document.getElementById("product-container");

//   products.forEach((product) => {
//     const prices = product.stores.map((store) => store.price);
//     const minPrice = Math.min(...prices);
//     const maxPrice = Math.max(...prices);
//     const card = document.createElement("div");
//     card.className = "product-card";
//     card.innerHTML = `
//           <div class="img-container">
//             <img src="${product.img}" alt="${product.title}">
//           </div>
//           <div class="product-info">
//           <small>${product.packaging}</small>
//           <h4>${product.title}</h4>
//           </div>
//           <div class="store-cards">
//           ${product.stores
//             .map((store) => {
//               const priceValue = parseFloat(
//                 store.price.replace(/[^0-9.-]+/g, "")
//               );
//               let priceColor = "#7c7382";
//               let priceTitle = "";

//               // Determine color based on price conditions
//               if (product.stores.length > 1) {
//                 if (priceValue === minPrice) {
//                   priceColor = "green"; // Low price
//                   priceTitle = "Lowest price";
//                 } else if (priceValue === maxPrice) {
//                   priceColor = "red"; // High price
//                   priceTitle = "Highest price";
//                 }
//               }

//               return `
//                       <div class="store-card">
//                           <img src=${stores[store.store]}
//                                 alt=${stores[store.store]}
//                                 width='50px'
//                           />
//                           <p title='${priceTitle}' style='color:${priceColor}' class="price">${Math.round(
//                 store.price
//               )}</p>
//                       </div>`;
//             })
//             .join("")}
//           </div>
//       `;
//     container.appendChild(card);
//   });
// }

// function loadStoreOptions() {
//   const storeSelection = document.getElementById("store-selection");
//   const uniqueStores = new Set();

//   products.forEach((product) => {
//     product.stores.forEach((store) => {
//       uniqueStores.add(store.store);
//     });
//   });

//   uniqueStores.forEach((store) => {
//     const label = document.createElement("label");
//     label.innerHTML = `
//           <input type="checkbox" name="stores" value="${store}"> ${store}<br>
//       `;
//     storeSelection.appendChild(label);
//   });
// }

// // Handle form submission for comparing stores
// document.getElementById("compare-form").onsubmit = function (event) {
//   event.preventDefault();
//   const selectedStores = Array.from(
//     document.querySelectorAll('input[name="stores"]:checked')
//   ).map((input) => input.value);

//   if (selectedStores.length === 0) {
//     alert("Please select at least one store to compare.");
//     return;
//   }

//   const uniqueProducts = getUniqueProducts(selectedStores);
//   displayComparison(uniqueProducts);
// };

// function getUniqueProducts(selectedStores) {
//   const uniqueProducts = products.filter((product) => {
//     const productStores = product.stores.map((store) => store.store);
//     return (
//       selectedStores.every((store) => productStores.includes(store)) &&
//       selectedStores.length === productStores.length
//     );
//   });
//   return uniqueProducts;
// }

// // Handle reset button click
// document.getElementById("reset-button").onclick = function () {
//   // Uncheck all checkboxes
//   document
//     .querySelectorAll('input[name="stores"]')
//     .forEach((input) => (input.checked = false));

//   displayComparison(products);
// };

// function displayComparison(products) {
//   const container = document.getElementById("product-container");
//   container.innerHTML = "";

//   if (products.length === 0) {
//     container.innerHTML = "<p>No common products found in selected stores.</p>";
//     return;
//   }

//   products.forEach((product) => {
//     const prices = product.stores.map((store) => store.price);
//     const minPrice = Math.min(...prices);
//     const maxPrice = Math.max(...prices);
//     const card = document.createElement("div");
//     card.className = "product-card";
//     card.innerHTML = `
//           <div class="img-container">
//             <img src="${product.img}" alt="${product.title}">
//           </div>
//           <div class="product-info">
//           <small>${product.packaging}</small>
//           <h4>${product.title}</h4>
//           </div>
//           <div class="store-cards">
//           ${product.stores
//             .map((store) => {
//               const priceValue = parseFloat(
//                 store.price.replace(/[^0-9.-]+/g, "")
//               );
//               let priceColor = "#7c7382";
//               let priceTitle = "";

//               // Determine color based on price conditions
//               if (product.stores.length > 1) {
//                 if (priceValue === minPrice) {
//                   priceColor = "green"; // Low price
//                   priceTitle = "Lowest price";
//                 } else if (priceValue === maxPrice) {
//                   priceColor = "red"; // High price
//                   priceTitle = "Highest price";
//                 }
//               }

//               return `
//                       <div class="store-card">
//                           <img src=${stores[store.store]}
//                                 alt=${stores[store.store]}
//                                 width='50px'
//                           />
//                           <p title='${priceTitle}' style='color:${priceColor}' class="price">${Math.round(
//                 store.price
//               )}</p>
//                       </div>`;
//             })
//             .join("")}
//           </div>
//       `;
//     container.appendChild(card);
//   });
// }

// ===============================================

// Constants
const itemsPerPage = 48;
let currentPage = 1;
const stores = {
  Ibook:
    "https://cdn.instashop.ae/82df8e681ac5c11287376a603451b341_ibook-500x500.png",
  IBook:
    "https://cdn.instashop.ae/82df8e681ac5c11287376a603451b341_ibook-500x500.png",
  "El Fares":
    "https://cdn.instashop.ae/ada24a9d1689a49d4f55faab3802ee8b_samer-stationery--500x500_-1-.png",
  "Office Works":
    "https://cdn.instashop.ae/0fdabc2095bc0ad633125edd431e0022_office-works-500x500.png",
  "Samir & Aly":
    "https://cdn.instashop.ae/cc55c1cf810cc061109de03866017edf_samir-n-ali-500x500.png",
  Bakier:
    "https://cdn.instashop.ae/6f1d56f819e744e3de7eb940df612c65_bakier_2.png",
  "El Mallah":
    "https://cdn.instashop.ae/c3f63cd2d51e0acab64dec2511502395_el-malah-stationery-500x500.png",
};

let products;

const branchProductsMap = {
  defaa: productDefaa,
  maady: productMaady,
  nargis: productNargis,
};

const branchRadios = document.querySelectorAll('input[name="branch"]');

// Function to update products based on the selected branch
const updateProducts = (selectedBranch) => {
  products = branchProductsMap[selectedBranch] || [];
  loadStoreOptions(products); // Pass the current products to loadStoreOptions
  displayProducts(products);
  setupPagination(products);
};

// Modify loadStoreOptions to filter based on current products
function loadStoreOptions(currentProducts) {
  const storeSelection = document.getElementById("store-selection");
  storeSelection.innerHTML = ""; // Clear existing options
  const uniqueStores = new Set();

  currentProducts.forEach((product) => {
    product.stores.forEach((store) => {
      uniqueStores.add(store.store); // Collect unique store names
    });
  });

  // Populate the store selection with relevant stores
  uniqueStores.forEach((store) => {
    const label = document.createElement("label");
    label.innerHTML = `
          <input type="checkbox" name="stores" value="${store}"> ${store}<br>
      `;
    storeSelection.appendChild(label);
  });
}

// Add change event listener to each radio button
branchRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    const selectedBranch = this.value;
    updateProducts(selectedBranch);
    console.log("Selected Branch:", selectedBranch);
    console.log("Updated Products:", products);
  });
});

// Initialize products based on the default selected branch on page load
const defaultBranch = document.querySelector(
  'input[name="branch"]:checked'
).value;
updateProducts(defaultBranch);
console.log("Default Selected Branch on Load:", defaultBranch);
console.log("Initial Products:", products);

// Add change event listener to each radio button
branchRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    const selectedBranch = this.value;
    updateProducts(selectedBranch);
  });
});

// Initialize page
// window.onload = () => {
//   loadStoreOptions();
//   displayProducts(products);
//   setupPagination(products);
// };

// // Load store options dynamically
// function loadStoreOptions() {
//   const storeSelection = document.getElementById("store-selection");
//   const uniqueStores = new Set(
//     products.flatMap((product) => product.stores.map((store) => store.store))
//   );

//   uniqueStores.forEach((store) => {
//     const label = document.createElement("label");
//     label.innerHTML = `<input type="checkbox" name="stores" value="${store}"> ${store}<br>`;
//     storeSelection.appendChild(label);
//   });
// }

// Display products on current page with pagination
function displayProducts(productsToShow) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";
  const paginatedProducts = paginateProducts(productsToShow);

  if (paginatedProducts.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  paginatedProducts.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

// Create product card HTML
function createProductCard(product) {
  const prices = product.stores.map((store) => store.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <div class="img-container">
      <img src="${product.img}" alt="${product.title}">
    </div>
    <div class="product-info">
      <small>${product.packaging}</small>
      <h4>${product.title}</h4>
    </div>
    <div class="store-cards">
      ${product.stores
        .map((store) => {
          const priceValue = parseFloat(store.price.replace(/[^0-9.-]+/g, ""));
          let priceColor = "#7c7382";
          let priceTitle = "";

          if (product.stores.length > 1) {
            if (priceValue === minPrice) {
              priceColor = "green";
              priceTitle = "Lowest price";
            } else if (priceValue === maxPrice) {
              priceColor = "red";
              priceTitle = "Highest price";
            }
          }

          return `
            <div class="store-card">
              <img src=${stores[store.store]} alt=${store.store} width="50px" />
              <p title="${priceTitle}" style="color:${priceColor}" class="price">${Math.round(
            store.price
          )}</p>
            </div>`;
        })
        .join("")}
    </div>`;
  return card;
}

// Handle form submission for comparing stores
document.getElementById("compare-form").onsubmit = function (event) {
  event.preventDefault();
  const selectedStores = Array.from(
    document.querySelectorAll('input[name="stores"]:checked')
  ).map((input) => input.value);

  if (selectedStores.length === 0) {
    alert("Please select at least one store to compare.");
    return;
  }

  currentPage = 1;
  const uniqueProducts = getUniqueProducts(selectedStores);
  displayProducts(uniqueProducts);
  setupPagination(uniqueProducts);
};

// Reset filter and display all products
document.getElementById("reset-button").onclick = function () {
  document
    .querySelectorAll('input[name="stores"]')
    .forEach((input) => (input.checked = false));
  displayProducts(products);
  setupPagination(products);
};

// Filter products based on selected stores, ensuring exclusivity
function getUniqueProducts(selectedStores) {
  const uniqueProducts = new Map(); // Using Map to maintain unique items

  products.forEach((product) => {
    const productStores = product.stores.map((store) => store.store);

    // Check if the product is exclusively available in the selected stores
    const matchesSelectedStores =
      selectedStores.every((store) => productStores.includes(store)) &&
      productStores.every((store) => selectedStores.includes(store));

    if (matchesSelectedStores) {
      uniqueProducts.set(product.title, product); // Use product.title as key or product.id if available
    }
  });

  return Array.from(uniqueProducts.values()); // Convert Map values back to an array
}

// Paginate products for display
function paginateProducts(productsToShow) {
  const start = (currentPage - 1) * itemsPerPage;
  return productsToShow.slice(start, start + itemsPerPage);
}

// Setup pagination controls
function setupPagination(filteredProducts) {
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  document.getElementById(
    "page-indicator"
  ).textContent = `${currentPage} / ${totalPages}`;

  document.getElementById("prev-button").disabled = currentPage === 1;
  document.getElementById("next-button").disabled = currentPage === totalPages;

  document.getElementById("prev-button").onclick = function () {
    if (currentPage > 1) {
      currentPage--;
      displayProducts(filteredProducts);
      setupPagination(filteredProducts);
    }
  };

  document.getElementById("next-button").onclick = function () {
    if (currentPage < totalPages) {
      currentPage++;
      displayProducts(filteredProducts);
      setupPagination(filteredProducts);
    }
  };
}
