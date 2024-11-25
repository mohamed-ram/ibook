// Constants
const itemsPerPage = 48;
let currentPage = 1;

const stores = {
  "Ibook Stationery": {
    name: "Ibook",
    img: "https://cdn.instashop.ae/82df8e681ac5c11287376a603451b341_ibook-500x500.png",
  },
  "IBook Stationery": {
    name: "Ibook",
    img: "https://cdn.instashop.ae/82df8e681ac5c11287376a603451b341_ibook-500x500.png",
  },
  "El Fares Stationery": {
    name: "El Fares",
    img: "https://cdn.instashop.ae/ada24a9d1689a49d4f55faab3802ee8b_samer-stationery--500x500_-1-.png",
  },
  "Office Works": {
    name: "Office Works",
    img: "https://cdn.instashop.ae/0fdabc2095bc0ad633125edd431e0022_office-works-500x500.png",
  },
  "Samir & Aly Stationery": {
    name: "Samir & Aly",
    img: "https://cdn.instashop.ae/cc55c1cf810cc061109de03866017edf_samir-n-ali-500x500.png",
  },
  "Bakier Stationery & More": {
    name: "Bakier",
    img: "https://cdn.instashop.ae/6f1d56f819e744e3de7eb940df612c65_bakier_2.png",
  },
  "El Mallah Stationery": {
    name: "El Mallah",
    img: "https://cdn.instashop.ae/c3f63cd2d51e0acab64dec2511502395_el-malah-stationery-500x500.png",
  },
};

let products;

const branchProductsMap = {
  defaa: productsDefaa,
  maady: productsMaady,
  nargis: productsNargis,
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
  document.getElementById("search-input").value = "";
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
          <input type="checkbox" name="stores" value="${store}"> ${stores[store].name}<br>
      `;
    storeSelection.appendChild(label);
  });
}

// Add change event listener to each radio button
branchRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    const selectedBranch = this.value;
    updateProducts(selectedBranch);
  });
});

// Initialize products based on the default selected branch on page load
const defaultBranch = document.querySelector(
  'input[name="branch"]:checked'
).value;
updateProducts(defaultBranch);

// Add change event listener to each radio button
branchRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    const selectedBranch = this.value;
    updateProducts(selectedBranch);
  });
});

// Function to display a toast message
function showToast(message) {
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  // Create the toast element
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  // Append the toast to the container
  toastContainer.appendChild(toast);

  // Remove the toast after the animation ends
  toast.addEventListener("animationend", () => {
    toast.remove();
  });
}

function shareProduct(branch, id) {
  // Generate the product URL
  console.log(branch, id);
  const productUrl = `${window.location.origin}/details.html?branch=${branch}&id=${id}`;

  // Copy the URL to the clipboard
  navigator.clipboard
    .writeText(productUrl)
    .then(() => {
      showToast("Product link copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy the link:", err);
      showToast("Failed to copy the link. Please try again.");
    });

  // Update Open Graph meta tags dynamically
  const metaTitle = document.querySelector('meta[property="og:title"]');
  const metaDescription = document.querySelector(
    'meta[property="og:description"]'
  );
  const metaImage = document.querySelector('meta[property="og:image"]');
  const metaUrl = document.querySelector('meta[property="og:url"]');

  if (metaTitle)
    metaTitle.setAttribute("content", `Check out this product: ${id}`);
  if (metaDescription)
    metaDescription.setAttribute(
      "content",
      "Find out more about this product!"
    );
  if (metaImage)
    metaImage.setAttribute(
      "content",
      `https://example.com/images/product-${id}.jpg`
    ); // Use actual product image URL
  if (metaUrl) metaUrl.setAttribute("content", productUrl);
}

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
  const branch = product.branch || "nargis"; // Use branch from product or fallback
  card.className = "product-card";
  card.innerHTML = `
    <div class="img-container">
      <div class="download-container">
        <img 
          class="download" 
          src="./imgs/download.png" 
          onclick="shareProduct('${branch}', '${product.id}')" 
          alt="Share Product" 
        />
      </div>
      <img src="${product.img}" alt="${product.title}">
    </div>
    <div class="product-info">
      <small>${product.packaging || "No Packaging Info"}</small>
      <h4 class="title">
        <a class='title' href='/details.html?branch=${branch}&id=${product.id}'>
          ${product.title}
        </a>
      </h4>
    </div>
    <div class="store-cards">
      ${product.stores
        .map((store) => {
          const hasOffer = store["discount price"];
          const priceValue = parseFloat(store.price);
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
            <img src="${stores[store.store].img}" alt="${
            store.store
          }" width="50px" />
            <p 
              title="${priceTitle}" 
              style="color:${priceColor}; 
                     text-decoration:${hasOffer ? "line-through" : "none"}; 
                     font-size:${hasOffer ? "16px" : "30px"}; 
                     font-weight:${hasOffer ? "200" : "bold"};  
                     margin:${hasOffer ? "0" : "5px"};" 
              class="price">
                ${store.price}
            </p>
            ${
              hasOffer
                ? `<p 
                    title="${priceTitle}" 
                    style="color:#8B5DFF; 
                           font-size:30px;
                           font-weight:bold; 
                           margin:0px;" 
                    class="price">
                      ${store["discount price"]}
                  </p>`
                : ""
            }
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
  currentPage = 1;
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

  return Array.from(uniqueProducts.values());
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
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  document.getElementById("next-button").onclick = function () {
    if (currentPage < totalPages) {
      currentPage++;
      displayProducts(filteredProducts);
      setupPagination(filteredProducts);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
}

const searchProducts = () => {
  document
    .querySelectorAll('input[name="stores"]')
    .forEach((input) => (input.checked = false));

  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();

  // Filter products based on title or packaging that contains the search term
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.packaging.toLowerCase().includes(searchTerm)
  );

  currentPage = 1;
  displayProducts(filteredProducts);
  setupPagination(filteredProducts);
};

// Optional: Add "Enter" key support for the search input
document.getElementById("search-input").addEventListener("change", () => {
  searchProducts();
});
