// --- State & Config ---
let products = [];
let cart = [];
let isAdminMode = false;
let activeCategory = 'all';
let selectedAdminColors = []; // Temporary storage for colors during product creation/edit
let currentEditProductId = null;

const DEFAULT_ADMIN_CODE = "admin123";
// Replace this with the store's actual WhatsApp phone number (with country code, e.g., 91 for India)
const WHATSAPP_PHONE = "919949457145"; 

// --- Seed Data (Pre-load clothes store items) ---
const SEED_PRODUCTS = [
    {
        id: "prod-1",
        name: "Classic Linen Solid Shirt",
        category: "Shirts",
        price: 999,
        description: "Crafted from 100% premium Belgian linen, this breathable solid shirt offers a relaxed yet tailored fit. Perfect for casual dates, business-casual days, or summer outings.",
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop",
        colors: [
            { name: "Pure White", hex: "#ffffff", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop" },
            { name: "Soft Blue", hex: "#bae6fd", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&auto=format&fit=crop" },
            { name: "Mint Green", hex: "#a7f3d0", image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&auto=format&fit=crop" }
        ],
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        id: "prod-2",
        name: "Premium Pique Polo T-Shirt",
        category: "Shirts",
        price: 649,
        description: "A timeless classic. Knit from double-mercerized combed cotton for a rich feel and supreme durability. Finished with flat-knit collar and cuffs.",
        badge: "New Arrival",
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop",
        colors: [
            { name: "Charcoal", hex: "#374151", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop" },
            { name: "Burgundy", hex: "#7f1d1d", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop" },
            { name: "Royal Navy", hex: "#1e3a8a", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop" }
        ],
        sizes: ["M", "L", "XL"]
    },
    {
        id: "prod-3",
        name: "Urban Stretch Chino Pants",
        category: "Pants",
        price: 1299,
        description: "Engineered with 4-way stretch twill fabric. Features a modern slim-fit shape, breathable cotton build, and deep safety pockets for phone and keys.",
        badge: "",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop",
        colors: [
            { name: "Khaki Tan", hex: "#d7c0a3", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop" },
            { name: "Slate Grey", hex: "#4b5563", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop" },
            { name: "Midnight Black", hex: "#111827", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop" }
        ],
        sizes: ["30", "32", "34", "36"]
    },
    {
        id: "prod-4",
        name: "Dry-Fit Lounge Shorts",
        category: "Shorts",
        price: 499,
        description: "Super lightweight, quick-dry lounge shorts designed with breathable mesh lining, zipper security pockets, and comfortable elastic waistband.",
        badge: "Hot",
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop",
        colors: [
            { name: "Steel Grey", hex: "#6b7280", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop" },
            { name: "Jet Black", hex: "#000000", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop" }
        ],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: "prod-5",
        name: "Flannel Plaid Comfort Pyjamas",
        category: "Pyjamas",
        price: 899,
        description: "Ultra-cozy nightwear flannel pyjamas woven with premium long-staple cotton fibers. Features two side pockets and mock-fly button detailed front.",
        badge: "Cozy Wear",
        image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&auto=format&fit=crop",
        colors: [
            { name: "Red Tartan", hex: "#b91c1c", image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&auto=format&fit=crop" },
            { name: "Forest Green", hex: "#065f46", image: "https://images.unsplash.com/photo-1608748010899-18f300247112?w=600&auto=format&fit=crop" }
        ],
        sizes: ["M", "L", "XL", "XXL"]
    },
    {
        id: "prod-6",
        name: "Classic Combed Cotton Inners (Pack of 3)",
        category: "Inners",
        price: 599,
        description: "Classic antibacterial rib knit undershirts. Moisture-wicking technology guarantees maximum cooling and anti-chafing feel throughout the active day.",
        badge: "Essential",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop",
        colors: [
            { name: "Pure White", hex: "#ffffff", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop" },
            { name: "Light Heather", hex: "#d1d5db", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop" }
        ],
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: "prod-7",
        name: "Premium Turkish Cotton Bath Towel",
        category: "Towels",
        price: 799,
        description: "Woven from 100% genuine Turkish cotton with a high density weight of 700 GSM. Extra thick, ultra-absorbent, and velvety soft for a spa-like bathing experience.",
        badge: "Pure Cotton",
        image: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=600&auto=format&fit=crop",
        colors: [
            { name: "Ocean Teal", hex: "#0f766e", image: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=600&auto=format&fit=crop" },
            { name: "Sand Beige", hex: "#d1fae5", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600&auto=format&fit=crop" },
            { name: "Peach Coral", hex: "#fecdd3", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&auto=format&fit=crop" }
        ],
        sizes: ["Standard"]
    }
];

const SEARCH_SUGGESTIONS = [
    "polo t-shirts", 
    "shirts", 
    "pants", 
    "shorts", 
    "pyjamas", 
    "inners", 
    "towels",
    "linen shirts",
    "cotton"
];

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    initProducts();
    initCart();
    renderCatalog();
    initEventListeners();
    populateSuggestions("");
});

// --- Theme Management ---
function loadTheme() {
    const savedTheme = localStorage.getItem("om_chanukya_theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("om_chanukya_theme", newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme} mode!`, "success");
}

function updateThemeIcon(theme) {
    const icon = document.querySelector("#themeToggle i");
    if (theme === "dark") {
        icon.className = "fa-solid fa-sun";
    } else {
        icon.className = "fa-solid fa-moon";
    }
}

// --- Product Database Operations ---
function initProducts() {
    const stored = localStorage.getItem("om_chanukya_products");
    if (stored) {
        products = JSON.parse(stored);
        // Sync any new seed products that don't exist yet in storage
        let updated = false;
        SEED_PRODUCTS.forEach(seed => {
            const existing = products.find(p => p.id === seed.id);
            if (!existing) {
                products.push(seed);
                updated = true;
            } else {
                // If stored product colors have blank/empty images, sync them with seed colors
                existing.colors.forEach(col => {
                    const seedCol = seed.colors.find(sc => sc.name === col.name);
                    if (seedCol && (!col.image || col.image.trim() === "") && seedCol.image) {
                        col.image = seedCol.image;
                        updated = true;
                    }
                });
            }
        });
        if (updated) {
            localStorage.setItem("om_chanukya_products", JSON.stringify(products));
        }
    } else {
        products = [...SEED_PRODUCTS];
        localStorage.setItem("om_chanukya_products", JSON.stringify(products));
    }
}

function saveProductsToStorage() {
    localStorage.setItem("om_chanukya_products", JSON.stringify(products));
    renderCatalog();
}

// --- Cart Operations ---
function initCart() {
    const stored = localStorage.getItem("om_chanukya_cart");
    if (stored) {
        cart = JSON.parse(stored);
        updateCartUI();
    }
}

function saveCartToStorage() {
    localStorage.setItem("om_chanukya_cart", JSON.stringify(cart));
    updateCartUI();
}

function addToCart(productId, size, colorName) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check if color name is provided, otherwise pick first
    const selectedColor = product.colors.find(c => c.name === colorName) || product.colors[0];
    
    // Create unique key for item in cart with specific size and color
    const cartItemId = `${productId}-${size}-${selectedColor.name.replace(/\s+/g, '-').toLowerCase()}`;
    
    const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            cartItemId: cartItemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            size: size,
            color: selectedColor.name,
            colorHex: selectedColor.hex,
            image: selectedColor.image || product.image,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    showToast(`Added ${product.name} (${colorName}, Size ${size}) to cart!`, "success");
}

function updateQty(cartItemId, change) {
    const index = cart.findIndex(item => item.cartItemId === cartItemId);
    if (index === -1) return;
    
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    saveCartToStorage();
}

function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    saveCartToStorage();
    showToast("Item removed from cart", "error");
}

function updateCartUI() {
    const container = document.getElementById("cartItemsContainer");
    const countBadge = document.getElementById("cartCount");
    const subtotalEl = document.getElementById("cartSubtotal");
    const totalEl = document.getElementById("cartTotal");
    
    let totalQty = 0;
    let totalPrice = 0;
    
    container.innerHTML = "";
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fa-solid fa-cart-flatbed-suitcases cart-empty-icon"></i>
                <p>Your shopping cart is empty</p>
                <button class="hero-btn" onclick="closeCart(); scrollToCatalog();" style="padding: 0.6rem 1.2rem; font-size: 0.85rem;">Browse Collection</button>
            </div>
        `;
    } else {
        cart.forEach(item => {
            totalQty += item.quantity;
            totalPrice += item.price * item.quantity;
            
            const itemHtml = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300'">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-meta">
                            <span class="cart-meta-badge">Size: ${item.size}</span>
                            <span class="cart-meta-badge" style="display: flex; align-items: center; gap: 4px;">
                                <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${item.colorHex}; border:1px solid #ccc;"></span>
                                ${item.color}
                            </span>
                        </div>
                        <div class="cart-item-bottom">
                            <div class="cart-qty-control">
                                <button class="qty-btn" onclick="updateQty('${item.cartItemId}', -1)"><i class="fa-solid fa-minus"></i></button>
                                <span class="qty-val">${item.quantity}</span>
                                <button class="qty-btn" onclick="updateQty('${item.cartItemId}', 1)"><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <span class="cart-item-price">Rs. ${item.price * item.quantity}</span>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.cartItemId}')" title="Remove Item">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            `;
            container.insertAdjacentHTML("beforeend", itemHtml);
        });
    }
    
    countBadge.textContent = totalQty;
    subtotalEl.textContent = `Rs. ${totalPrice}`;
    totalEl.textContent = `Rs. ${totalPrice}`;
}

// --- WhatsApp Checkout Formatter ---
function sendWhatsAppOrder() {
    if (cart.length === 0) {
        showToast("Your cart is empty!", "error");
        return;
    }
    
    let messageText = `*New Order - Om Chanukya Traders*\n`;
    messageText += `------------------------------------\n`;
    
    let total = 0;
    cart.forEach((item, idx) => {
        const itemSubtotal = item.price * item.quantity;
        total += itemSubtotal;
        messageText += `${idx + 1}. *${item.name}*\n`;
        messageText += `   Qty: ${item.quantity} | Size: ${item.size} | Color: ${item.color}\n`;
        messageText += `   Price: Rs. ${item.price} each | Sub: Rs. ${itemSubtotal}\n\n`;
    });
    
    messageText += `------------------------------------\n`;
    messageText += `*Total Amount:* Rs. ${total}\n`;
    messageText += `*Delivery Mode:* Store Pickup Only (I will collect from the shop)\n`;
    messageText += `------------------------------------\n`;
    messageText += `Please let me know when my order will be ready for pickup. Thank you!`;
    
    const encodedText = encodeURIComponent(messageText);
    const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodedText}`;
    
    window.open(waUrl, "_blank");
}

// --- Search and Suggestions Logic ---
function populateSuggestions(query) {
    const dropdown = document.getElementById("suggestionsDropdown");
    dropdown.innerHTML = "";
    
    let filtered = [];
    if (!query) {
        filtered = SEARCH_SUGGESTIONS.slice(0, 4); // default suggestions
    } else {
        const lowerQ = query.toLowerCase();
        filtered = SEARCH_SUGGESTIONS.filter(item => item.toLowerCase().includes(lowerQ));
        // Add categories if they match
        const cats = ["Shirts", "Pants", "Shorts", "Pyjamas", "Inners", "Towels"];
        cats.forEach(c => {
            if (c.toLowerCase().includes(lowerQ) && !filtered.includes(c)) {
                filtered.push(c);
            }
        });
    }
    
    if (filtered.length === 0) {
        dropdown.classList.remove("active");
        return;
    }
    
    dropdown.insertAdjacentHTML("beforeend", `<div class="suggestion-header">Suggestions</div>`);
    
    filtered.forEach(term => {
        const itemHtml = `
            <div class="suggestion-item" onclick="selectSuggestion('${term}')">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>${term}</span>
            </div>
        `;
        dropdown.insertAdjacentHTML("beforeend", itemHtml);
    });
    
    dropdown.classList.add("active");
}

function selectSuggestion(term) {
    const searchBar = document.getElementById("searchBar");
    searchBar.value = term;
    document.getElementById("suggestionsDropdown").classList.remove("active");
    renderCatalog(term);
}

// --- Rendering Catalog ---
function renderCatalog(filterQuery = "") {
    const grid = document.getElementById("productGrid");
    const infoText = document.getElementById("catalogInfo");
    
    grid.innerHTML = "";
    
    let filtered = products;
    
    // 1. Filter by category tabs
    if (activeCategory !== 'all') {
        filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }
    
    // 2. Filter by search bar query
    if (filterQuery) {
        const query = filterQuery.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.colors.some(c => c.name.toLowerCase().includes(query))
        );
    }
    
    infoText.textContent = `Showing ${filtered.length} product(s)`;
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-catalog">
                <i class="fa-solid fa-ban empty-icon"></i>
                <h3 class="empty-title">No Products Found</h3>
                <p class="empty-desc">We couldn't find any clothing matching your criteria. Try adjusting your search query or filters.</p>
                <button class="hero-btn" onclick="resetFilters()" style="padding: 0.6rem 1.2rem; font-size: 0.85rem;">Clear Filters</button>
            </div>
        `;
        return;
    }
    
    filtered.forEach(prod => {
        // Find default color to show initial color dots representation
        const hasColors = prod.colors && prod.colors.length > 0;
        
        let colorDotsHtml = "";
        if (hasColors) {
            prod.colors.forEach((col, cIdx) => {
                colorDotsHtml += `
                    <span class="color-dot ${cIdx === 0 ? 'active' : ''}" 
                          style="background: ${col.hex}" 
                          title="${col.name}" 
                          onclick="event.stopPropagation(); changeCardColor('${prod.id}', '${col.name}', this)">
                    </span>
                `;
            });
        }
        
        const cardHtml = `
            <article class="product-card" onclick="openProductDetail('${prod.id}')" data-id="${prod.id}">
                <div class="product-img-wrapper">
                    ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
                    <div class="product-admin-actions">
                        <button class="admin-action-btn edit" onclick="event.stopPropagation(); openEditProductModal('${prod.id}')" title="Edit Product">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="admin-action-btn delete" onclick="event.stopPropagation(); deleteProduct('${prod.id}')" title="Delete Product">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                    <img src="${prod.image}" alt="${prod.name}" class="product-card-img" id="card-img-${prod.id}" onerror="this.src='https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400'">
                </div>
                <div class="product-info">
                    <div>
                        <div class="product-category">${prod.category}</div>
                        <h3 class="product-name">${prod.name}</h3>
                    </div>
                    <div>
                        <div class="product-meta">
                            <span class="product-price">Rs. ${prod.price}</span>
                            <div class="product-card-colors">
                                ${colorDotsHtml}
                            </div>
                        </div>
                        <div class="product-action-row">
                            <button class="card-btn card-btn-primary" onclick="event.stopPropagation(); quickAddToCart('${prod.id}')">
                                <i class="fa-solid fa-cart-plus"></i> Add
                            </button>
                            <button class="card-btn card-btn-outline" onclick="event.stopPropagation(); openProductDetail('${prod.id}')">
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `;
        grid.insertAdjacentHTML("beforeend", cardHtml);
    });
}

function changeCardColor(productId, colorName, dotElement) {
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (!card) return;
    
    // Save selected color name as an attribute on the card
    card.setAttribute("data-selected-color", colorName);
    
    // Deactivate sibling dots
    const dots = card.querySelectorAll(".color-dot");
    dots.forEach(d => d.classList.remove("active"));
    dotElement.classList.add("active");
    
    // Find matching image for that color
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    
    const colorObj = prod.colors.find(c => c.name === colorName);
    const cardImg = document.getElementById(`card-img-${productId}`);
    
    if (colorObj && colorObj.image) {
        cardImg.src = colorObj.image;
    } else {
        cardImg.src = prod.image; // Fallback to base image
    }
}

function quickAddToCart(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    const selectedColor = card ? card.getAttribute("data-selected-color") : null;
    
    // Pick first size and selected/first color as default
    const size = prod.sizes && prod.sizes.length > 0 ? prod.sizes[0] : "M";
    const color = selectedColor || (prod.colors && prod.colors.length > 0 ? prod.colors[0].name : "Default");
    
    addToCart(productId, size, color);
}

// --- Detail View Modal ---
function openProductDetail(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    const preselectedColor = card ? card.getAttribute("data-selected-color") : null;
    
    const modal = document.getElementById("detailModal");
    
    document.getElementById("detailCategory").textContent = prod.category;
    document.getElementById("detailName").textContent = prod.name;
    document.getElementById("detailPrice").textContent = `Rs. ${prod.price}`;
    document.getElementById("detailDesc").textContent = prod.description;
    
    const img = document.getElementById("detailImage");
    
    const activeColorObj = preselectedColor ? prod.colors.find(c => c.name === preselectedColor) : prod.colors[0];
    img.src = (activeColorObj && activeColorObj.image) ? activeColorObj.image : prod.image;
    img.onerror = () => { img.src = "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"; };
    
    // Handle sizes UI
    const sizesContainer = document.getElementById("detailSizesContainer");
    sizesContainer.innerHTML = "";
    prod.sizes.forEach((sz, idx) => {
        const activeClass = idx === 0 ? "active" : "";
        sizesContainer.insertAdjacentHTML("beforeend", `
            <button class="detail-size-btn ${activeClass}" onclick="selectDetailSize(this)">${sz}</button>
        `);
    });
    
    // Handle colors UI
    const colorsContainer = document.getElementById("detailColorsContainer");
    colorsContainer.innerHTML = "";
    prod.colors.forEach((col, idx) => {
        const isActive = preselectedColor ? (col.name === preselectedColor) : (idx === 0);
        const activeClass = isActive ? "active" : "";
        colorsContainer.insertAdjacentHTML("beforeend", `
            <div class="detail-color-chip ${activeClass}" onclick="selectDetailColor('${productId}', '${col.name}', this)">
                <span class="color-dot-small" style="background: ${col.hex}"></span>
                ${col.name}
            </div>
        `);
    });
    
    // Set add-to-cart button binding
    const btn = document.getElementById("detailAddToCartBtn");
    btn.onclick = () => {
        const activeSizeEl = sizesContainer.querySelector(".detail-size-btn.active");
        const activeColorEl = colorsContainer.querySelector(".detail-color-chip.active");
        
        const size = activeSizeEl ? activeSizeEl.textContent : "M";
        const colorName = activeColorEl ? activeColorEl.textContent.trim() : prod.colors[0].name;
        
        addToCart(productId, size, colorName);
        closeModal("detailModal");
    };
    
    openModal("detailModal");
}

function selectDetailSize(buttonEl) {
    const parent = buttonEl.parentElement;
    parent.querySelectorAll(".detail-size-btn").forEach(b => b.classList.remove("active"));
    buttonEl.classList.add("active");
}

function selectDetailColor(productId, colorName, chipEl) {
    const parent = chipEl.parentElement;
    parent.querySelectorAll(".detail-color-chip").forEach(c => c.classList.remove("active"));
    chipEl.classList.add("active");
    
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    
    const colorObj = prod.colors.find(c => c.name === colorName);
    const detailImg = document.getElementById("detailImage");
    
    if (colorObj && colorObj.image) {
        detailImg.src = colorObj.image;
    } else {
        detailImg.src = prod.image;
    }
}

// --- Admin Controls ---
function openAdminPanel() {
    if (isAdminMode) {
        // Toggle OFF admin mode
        isAdminMode = false;
        document.body.classList.remove("admin-active");
        document.getElementById("adminModeIndicator").classList.remove("active");
        document.getElementById("adminAddFab").classList.remove("active");
        document.getElementById("adminAuthBtn").querySelector("i").className = "fa-solid fa-lock";
        showToast("Admin mode disabled", "info");
    } else {
        openModal("adminAuthModal");
    }
}

function handleAdminLogin(event) {
    event.preventDefault();
    const code = document.getElementById("adminCode").value;
    
    if (code === DEFAULT_ADMIN_CODE) {
        isAdminMode = true;
        document.body.classList.add("admin-active");
        document.getElementById("adminModeIndicator").classList.add("active");
        document.getElementById("adminAddFab").classList.add("active");
        document.getElementById("adminAuthBtn").querySelector("i").className = "fa-solid fa-lock-open";
        
        closeModal("adminAuthModal");
        document.getElementById("adminCode").value = "";
        showToast("Login Successful! Admin Mode Activated.", "success");
    } else {
        showToast("Invalid Admin Code!", "error");
    }
}

// Admin color tag builder in modal
function addAdminColorTag() {
    const nameInput = document.getElementById("colorNameInput");
    const hexInput = document.getElementById("colorHexInput");
    
    const name = nameInput.value.trim();
    const hex = hexInput.value;
    
    if (!name) {
        showToast("Please enter a color name", "error");
        return;
    }
    
    // Prevent duplicates in temporary tag list
    if (selectedAdminColors.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        showToast("Color variant already exists", "error");
        return;
    }
    
    selectedAdminColors.push({ name, hex, image: "" });
    renderAdminColorTags();
    
    nameInput.value = "";
}

function removeAdminColorTag(name) {
    selectedAdminColors = selectedAdminColors.filter(c => c.name !== name);
    renderAdminColorTags();
}

function renderAdminColorTags() {
    const container = document.getElementById("adminColorsContainer");
    container.innerHTML = "";
    
    selectedAdminColors.forEach(col => {
        container.insertAdjacentHTML("beforeend", `
            <span class="admin-color-tag">
                <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:${col.hex}; border:1px solid #ccc;"></span>
                ${col.name}
                <i class="fa-solid fa-xmark" onclick="removeAdminColorTag('${col.name}')"></i>
            </span>
        `);
    });
}

// Upload file to Base64
function previewUploadedImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById("imagePreview");
        preview.src = e.target.result;
        preview.style.display = "block";
    };
    reader.readAsDataURL(file);
}

function openAddProductModal() {
    currentEditProductId = null;
    document.getElementById("adminModalTitle").textContent = "Add New Product";
    document.getElementById("adminProductForm").reset();
    document.getElementById("imagePreview").style.display = "none";
    selectedAdminColors = [];
    renderAdminColorTags();
    openModal("adminProductModal");
}

function openEditProductModal(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    
    currentEditProductId = productId;
    document.getElementById("adminModalTitle").textContent = "Edit Product Details";
    document.getElementById("editProductId").value = prod.id;
    document.getElementById("prodName").value = prod.name;
    document.getElementById("prodCategory").value = prod.category;
    document.getElementById("prodPrice").value = prod.price;
    document.getElementById("prodBadge").value = prod.badge || "";
    document.getElementById("prodDesc").value = prod.description;
    document.getElementById("prodImageUrl").value = prod.image.startsWith("data:") ? "" : prod.image;
    
    const preview = document.getElementById("imagePreview");
    preview.src = prod.image;
    preview.style.display = "block";
    
    selectedAdminColors = [...prod.colors];
    renderAdminColorTags();
    
    openModal("adminProductModal");
}

function handleProductSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById("prodName").value.trim();
    const category = document.getElementById("prodCategory").value;
    const price = parseInt(document.getElementById("prodPrice").value);
    const badge = document.getElementById("prodBadge").value.trim();
    const description = document.getElementById("prodDesc").value.trim();
    const urlVal = document.getElementById("prodImageUrl").value.trim();
    const fileInput = document.getElementById("prodImageFile");
    const preview = document.getElementById("imagePreview");
    
    if (selectedAdminColors.length === 0) {
        showToast("Please add at least one color variant", "error");
        return;
    }
    
    let finalImage = "";
    if (fileInput.files.length > 0) {
        finalImage = preview.src; // Base64 data URL
    } else if (urlVal) {
        finalImage = urlVal;
    } else if (currentEditProductId) {
        // editing and kept same image
        const oldP = products.find(p => p.id === currentEditProductId);
        finalImage = oldP ? oldP.image : "";
    }
    
    if (!finalImage) {
        finalImage = "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600"; // Fallback placeholder
    }
    
    // Default sizes for simple inventory
    const defaultSizes = ["S", "M", "L", "XL", "XXL"];
    
    if (currentEditProductId) {
        // Modify existing
        const idx = products.findIndex(p => p.id === currentEditProductId);
        if (idx > -1) {
            products[idx] = {
                ...products[idx],
                name,
                category,
                price,
                description,
                badge,
                image: finalImage,
                colors: selectedAdminColors.map(c => {
                    // Update color specific images to match base image if blank
                    if (!c.image) c.image = finalImage;
                    return c;
                }),
                sizes: products[idx].sizes || defaultSizes
            };
            showToast("Product updated successfully", "success");
        }
    } else {
        // Add new product
        const newProduct = {
            id: `prod-${Date.now()}`,
            name,
            category,
            price,
            description,
            badge,
            image: finalImage,
            colors: selectedAdminColors.map(c => {
                c.image = finalImage;
                return c;
            }),
            sizes: defaultSizes
        };
        products.push(newProduct);
        showToast("New product added successfully", "success");
    }
    
    saveProductsToStorage();
    closeModal("adminProductModal");
}

function deleteProduct(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    
    if (confirm(`Are you sure you want to delete "${prod.name}" from catalog?`)) {
        products = products.filter(p => p.id !== productId);
        saveProductsToStorage();
        showToast("Product deleted from database", "error");
    }
}

// --- Layout Helpers ---
function openModal(modalId) {
    document.getElementById(modalId).classList.add("active");
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active");
}

function openCart() {
    document.getElementById("cartDrawer").classList.add("active");
}

function closeCart() {
    document.getElementById("cartDrawer").classList.remove("active");
}

function resetFilters() {
    activeCategory = 'all';
    document.querySelectorAll(".category-tab").forEach(tab => {
        tab.classList.remove("active");
        if (tab.getAttribute("data-category") === "all") {
            tab.classList.add("active");
        }
    });
    document.getElementById("searchBar").value = "";
    renderCatalog();
}

function scrollToCatalog() {
    document.getElementById("catalog-section").scrollIntoView({ behavior: "smooth" });
}

// --- Toast Feedback ---
function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    
    toast.className = `toast ${type}`;
    let iconClass = "fa-circle-check";
    if (type === "error") iconClass = "fa-circle-exclamation";
    if (type === "info") iconClass = "fa-circle-info";
    
    toast.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add("show");
    }, 50);
    
    // Remove toast
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3500);
}

// --- Event Listeners Setup ---
function initEventListeners() {
    // Theme
    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
    
    // Admin Login / Indicator
    document.getElementById("adminAuthBtn").addEventListener("click", openAdminPanel);
    document.getElementById("adminAuthClose").addEventListener("click", () => closeModal("adminAuthModal"));
    
    // Cart Drawer Toggle
    document.getElementById("cartToggle").addEventListener("click", openCart);
    document.getElementById("cartClose").addEventListener("click", closeCart);
    document.getElementById("whatsappCheckoutBtn").addEventListener("click", sendWhatsAppOrder);
    
    // Detail Modal Closes
    document.getElementById("detailModalClose").addEventListener("click", () => closeModal("detailModal"));
    
    // Admin Add Product Modals Closes & Fab
    document.getElementById("adminAddFab").addEventListener("click", openAddProductModal);
    document.getElementById("adminProductClose").addEventListener("click", () => closeModal("adminProductModal"));
    
    // Category tabs filter click binding
    document.getElementById("categoryTabs").addEventListener("click", (e) => {
        const tab = e.target.closest(".category-tab");
        if (!tab) return;
        
        document.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        
        activeCategory = tab.getAttribute("data-category");
        renderCatalog(document.getElementById("searchBar").value);
    });
    
    // Search input interactions
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("input", (e) => {
        const val = e.target.value;
        populateSuggestions(val);
        renderCatalog(val);
    });
    
    searchBar.addEventListener("focus", () => {
        populateSuggestions(searchBar.value);
    });
    
    // Close dropdown suggestions when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-wrapper")) {
            document.getElementById("suggestionsDropdown").classList.remove("active");
        }
    });
    
    // Escape key closes active modals
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeCart();
            closeModal("detailModal");
            closeModal("adminAuthModal");
            closeModal("adminProductModal");
            document.getElementById("suggestionsDropdown").classList.remove("active");
        }
    });
}
