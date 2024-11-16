// Constants
const itemsPerPage = 48;
let currentPage = 1;
const stores = {
  Ibook: "./imgs/stores/ibook.png",
  IBook: "./imgs/stores/ibook.png",
  "El Fares": "./imgs/stores/elfares.png",
  "Office Works": "./imgs/stores/office works.png",
  "Samir & Aly": "./imgs/stores/samir.png",
  Bakier: "./imgs/stores/bakir.png",
  "El Mallah": "./imgs/stores/elmallah.png",
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

// function downloadImage(button) {
//   const productDiv = button.closest(".product-card"); // Capture the entire product-card div
//   const title = productDiv.querySelector(".title").innerText; // Use the title for the file name

//   // Use html2canvas with the useCORS option
//   html2canvas(productDiv, {
//     useCORS: true, // Enable CORS handling
//     allowTaint: true, // Allow tainted images (in case CORS fails)
//   }).then((canvas) => {
//     // Create a link element
//     const link = document.createElement("a");
//     link.download = `${title}.png`; // Use the title as the file name
//     link.href = canvas.toDataURL("image/png"); // Convert canvas to image URL
//     link.click(); // Trigger download
//   });
// }

function downloadImage(button) {
  const productDiv = button.closest(".product-card");
  const title = productDiv.querySelector(".title").innerText;
  const imageUrl = "http://localhost:8000/imgs/download.png"; // Use your local server URL

  const image = new Image();
  image.crossOrigin = "Anonymous"; // Set the CORS policy
  image.src = imageUrl;

  image.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 300;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(title, 10, canvas.height - 20);

    const link = document.createElement("a");
    link.download = `${title}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  image.onerror = () => {
    alert(
      "Unable to load image. Please check the URL or your server settings."
    );
  };
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
  card.className = "product-card";
  card.innerHTML = `
  <div class="img-container">
    <div class="download-container">
      <img onclick="downloadImage(this)" class="download" src="./imgs/download.png" alt="Download" />
    </div>
    <img src="${product.img}" alt="${product.title}">
  </div>
  <div class="product-info">
    <small>${product.packaging}</small>
    <h4 class="title">${product.title}</h4>
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
            <img src=${stores[store.store]} alt="${store.store}" width="50px" />
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
