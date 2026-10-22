const cards = [

    { 
        id: "1", 
        name: "soda", 
        image: "./images/rsz_1cocacola.jpg", 
        category: "Drink", 
        title: "Coca Cola", 
        description: "The Coca-Cola logo works well because its flowing script feels friendly, energetic, and timeless. Its distinctive red-and-white color combination is eye-catching, easy to recognize, and strongly associated with the brand." 
    },

    { 
        id: "2", 
        name: "chips", 
        image: "./images/chips.jpg", 
        category: "Snack", 
        title: "Doritos", 
        description: "The Doritos logo works well because its bold, vibrant design stands out on shelves and appeals to a wide audience. The distinctive orange color and playful font create a sense of fun and excitement." 
    },

    { 
        id: "3", 
        name: "skincare", 
        image: "./images/makeup.jpg", 
        category: "beauty", 
        title: "NARS beauty", 
        description: "The NARS beauty logo works well because its sleek, modern design conveys sophistication and high-quality. The bold typography and distinctive color scheme make it stand out in a crowded market." 
    },

    { 
        id: "4", 
        name: "clothing brand", 
        image: "./images/vans.jpg", 
        category: "clothing brand", 
        title: "Vans", 
        description: "The Vans logo works well because its simple, bold design is instantly recognizable. The distinctive checkerboard pattern and straightforward typography create a strong visual identity that resonates with the brand's culture of being 'off the wall'." 
    },

    { 
        id: "5", 
        name: "company", 
        image: "./images/fedex.jpg", 
        category: "company", 
        title: "Fed Ex", 
        description: "The FedEx logo works well because its clean, bold lettering looks professional and trustworthy. The hidden arrow between the E and x cleverly represents speed, movement, and delivery." 
    },

    { 
        id: "6", 
        name: "waterbottle", 
        image: "./images/owala.jpeg", 
        category: "waterbottle", 
        title: "Owala", 
        description: "The Owala logo works well because its minimalist design is both modern and functional. The clean typography and simple color scheme convey a sense of purity and sustainability." 
    },

    { 
        id: "7", 
        name: "cars", 
        image: "./images/jeep.jpg", 
        category: "car", 
        title: "Jeep", 
        description: "The Jeep logo works well because its bold, rugged design reflects the brand's heritage and off-road capabilities. The distinctive styling and strong visual identity make it easily recognizable." 
    }
];

const cardContainer = document.querySelector("#card-container");
const categoryFilter = document.querySelector("#category-filter");
const searchForm = document.querySelector("#brand-search-form");
const searchInput = document.querySelector("#brand-search-input");
const searchResults = document.querySelector("#brand-search-results");
const searchStatus = document.querySelector("#brand-search-status");

// Replaced placeholder with the client ID
const BRANDFETCH_CLIENT_ID = "1idyNdK_8wUFAABJvPp";

function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[character]));
}

function addCategory(category) {
    if ([...categoryFilter.options].some(option => option.value === category)) return;
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
}

function renderCard(card) {
    const article = document.createElement("article");
    article.className = "design-card";
    article.dataset.category = card.category.toLowerCase();
    article.innerHTML = `
        <div class="card-image">
            <img class="cardphotos" src="${escapeHtml(card.image)}" alt="${escapeHtml(card.title)} logo" loading="lazy">
        </div>
        <div class="card-content">
            <p class="category">${escapeHtml(card.category)}</p>
            <h3>${escapeHtml(card.title)}</h3>
            <p class="description">${escapeHtml(card.description)}</p>
        </div>`;
    cardContainer.appendChild(article);
}

cards.forEach(card => {
    renderCard(card);
    addCategory(card.category.toLowerCase());
});

function showBrandResults(results) {
    searchResults.innerHTML = results.map(brand => {
        const title = brand.name || brand.domain || "Unnamed brand";
        const domain = brand.domain || "";
        const logo = brand.icon || `https://cdn.brandfetch.io/domain/${encodeURIComponent(domain)}/type/icon?c=${encodeURIComponent(BRANDFETCH_CLIENT_ID)}`;
        return `
            <div class="brand-result">
                <img src="${escapeHtml(logo)}" alt="${escapeHtml(title)} logo" loading="lazy">
                <div class="brand-result-info"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(domain)}</span></div>
                <button class="add-brand-button" type="button" data-brand-name="${escapeHtml(title)}" data-brand-logo="${escapeHtml(logo)}">Add</button>
            </div>`;
    }).join("");
}

if (searchForm && searchInput && searchResults && searchStatus) {
searchForm.addEventListener("submit", async event => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) {
        searchStatus.textContent = "Type a brand name first.";
        return;
    }
    if (BRANDFETCH_CLIENT_ID === "PASTE_YOUR_BRANDFETCH_CLIENT_ID_HERE") {
        searchStatus.textContent = "Add your Brandfetch client ID in script.js before searching.";
        return;
    }

    searchStatus.textContent = "Searching Brandfetch...";
    searchResults.innerHTML = "";
    try {
        const response = await fetch(`https://api.brandfetch.io/v2/search/${encodeURIComponent(query)}?c=${encodeURIComponent(BRANDFETCH_CLIENT_ID)}`);
        if (!response.ok) throw new Error(`Brandfetch request failed: ${response.status}`);
        const results = await response.json();
        const brands = Array.isArray(results) ? results.slice(0, 5) : [];
        showBrandResults(brands);
        searchStatus.textContent = brands.length ? "Choose a result to add it to your collection." : "No brands found.";
    } catch (error) {
        console.error(error);
        searchStatus.textContent = "The search could not be completed. Check your client ID and try again.";
    }
});

searchResults.addEventListener("click", event => {
    const button = event.target.closest(".add-brand-button");
    if (!button) return;
    const title = button.dataset.brandName;
    renderCard({
        title,
        category: "Brandfetch",
        image: button.dataset.brandLogo,
        description: `${title} was loaded from Brandfetch. Add your own notes about its color, typography, shape, and layout here.`
    });
    addCategory("brandfetch");
    button.textContent = "Added";
    button.disabled = true;
    searchStatus.textContent = `${title} was added to your collection.`;
});
}

if (categoryFilter) {
categoryFilter.addEventListener("change", event => {
    const selectedCategory = event.target.value;
    document.querySelectorAll(".design-card").forEach(card => {
        card.hidden = selectedCategory !== "all" && card.dataset.category !== selectedCategory;
    });
});
}
