// Page behavior: cards, search, filters, modal details, and detail pages.
const cardContainer = document.querySelector("#card-container");
const categoryFilter = document.querySelector("#category-filter");
const searchForm = document.querySelector("#brand-search-form");
const searchInput = document.querySelector("#brand-search-input");
const searchResults = document.querySelector("#brand-search-results");
const searchStatus = document.querySelector("#brand-search-status");
const emptyCategoryMessage = document.querySelector("#empty-category-message");
const selectedCategoryTitle = document.querySelector("#selected-category-title");
const detailRoot = document.querySelector("#detail-root");
const detailsModal = document.querySelector("#details-modal");
const modalBody = document.querySelector("#modal-body");
const modalClose = document.querySelector("#modal-close");
const cardsForDisplay = [...cards, ...(appState.savedCards || [])];

function addCategory(category) {
    if (!categoryFilter || [...categoryFilter.options].some(option => option.value === category)) return;
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
}

function renderCard(card) {
    if (!cardContainer) return;
    const article = document.createElement("article");
    article.className = "design-card";
    article.dataset.category = card.category.toLowerCase();
    article.dataset.readMore = card.readMore || "This brand was loaded from Brandfetch. Add your own research about its history and visual identity here.";
    article.dataset.keyDesigns = card.keyDesigns || "Add notes about the typography, color, shape, layout, and other design choices here.";
    article.dataset.cardTitle = card.title;
    article.dataset.cardDescription = card.description;
    article.innerHTML = `<div class="card-image"><img class="cardphotos" src="${escapeHtml(card.image)}" alt="${escapeHtml(card.title)} logo on product packaging" loading="lazy"></div><div class="card-content"><p class="category">${escapeHtml(card.category)}</p><h3>${escapeHtml(card.title)}</h3><p class="description">${escapeHtml(card.description)}</p><button class="view-more-button" type="button" aria-expanded="false" aria-controls="details-modal" aria-label="View more information about ${escapeHtml(card.title)}" data-card-id="${escapeHtml(card.id)}">View more</button><a class="card-detail-link" href="details.html?id=${encodeURIComponent(card.id)}" aria-label="Read the full design details for ${escapeHtml(card.title)}">Read ${escapeHtml(card.title)} design details</a></div>`;
    cardContainer.appendChild(article);
}

cardsForDisplay.forEach(card => { renderCard(card); addCategory(card.category.toLowerCase()); });

let lastFocusedElement = null;

function getCardForDetails(cardId) {
    const card = cardsForDisplay.find(item => item.id === cardId);
    if (card) return card;
    const article = document.querySelector(`.design-card .view-more-button[data-card-id="${CSS.escape(cardId)}"]`)?.closest(".design-card");
    return article ? { id: cardId, title: article.dataset.cardTitle, description: article.dataset.cardDescription, readMore: article.dataset.readMore, keyDesigns: article.dataset.keyDesigns } : null;
}

function openDetailsModal(cardId, trigger) {
    if (!detailsModal || !modalBody) return;
    const card = getCardForDetails(cardId);
    if (!card) return;
    lastFocusedElement = trigger;
    modalBody.innerHTML = `<p class="eyebrow">${escapeHtml(card.category || "BRAND DETAILS")}</p><h2 id="modal-title">${escapeHtml(card.title)}</h2><p>${escapeHtml(card.description)}</p><p><strong>History:</strong> ${escapeHtml(card.readMore || "No additional history has been added yet.")}</p><p><strong>Key design choices:</strong> ${escapeHtml(card.keyDesigns || "No design notes have been added yet.")}</p>`;
    detailsModal.classList.add("show");
    detailsModal.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
    appState.modalOpen = true;
    modalClose?.focus();
}

function closeDetailsModal() {
    if (!detailsModal) return;
    detailsModal.classList.remove("show");
    detailsModal.setAttribute("aria-hidden", "true");
    document.querySelectorAll(".view-more-button[aria-expanded='true']").forEach(button => button.setAttribute("aria-expanded", "false"));
    appState.modalOpen = false;
    lastFocusedElement?.focus();
    lastFocusedElement = null;
}

cardContainer?.addEventListener("click", event => {
    const button = event.target.closest(".view-more-button");
    if (button) openDetailsModal(button.dataset.cardId, button);
});

if (detailsModal) {
    modalClose?.addEventListener("click", closeDetailsModal);
    detailsModal.addEventListener("click", event => { if (event.target === detailsModal) closeDetailsModal(); });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && detailsModal.classList.contains("show")) closeDetailsModal();
        if (event.key !== "Tab" || !detailsModal.classList.contains("show")) return;
        const focusable = detailsModal.querySelectorAll("button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])");
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
}

function showBrandResults(results) {
    if (!searchResults) return;
    searchResults.innerHTML = results.map(brand => {
        const title = brand.name || brand.domain || "Unnamed brand";
        const domain = brand.domain || "";
        const logo = brand.icon || `https://cdn.brandfetch.io/domain/${encodeURIComponent(domain)}/type/icon?c=${encodeURIComponent(BRANDFETCH_CLIENT_ID)}`;
        return `<div class="brand-result"><img src="${escapeHtml(logo)}" alt="${escapeHtml(title)} logo" loading="lazy"><div class="brand-result-info"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(domain)}</span></div><button class="add-brand-button" type="button" data-brand-name="${escapeHtml(title)}" data-brand-logo="${escapeHtml(logo)}">Add ${escapeHtml(title)}</button></div>`;
    }).join("");
}

searchForm?.addEventListener("submit", async event => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) { searchStatus.textContent = "Type a brand name first."; return; }
    searchStatus.textContent = "Searching Brandfetch...";
    updateState({ lastSearch: query });
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

searchResults?.addEventListener("click", event => {
    const button = event.target.closest(".add-brand-button");
    if (!button) return;
    const title = button.dataset.brandName;
    const newCard = { title, category: "Brandfetch", image: button.dataset.brandLogo, description: `${title} was loaded from Brandfetch. Add your own notes about its color, typography, shape, and layout here.`, readMore: "This brand was selected from Brandfetch and saved for this browser session.", keyDesigns: "Add notes about the typography, color, shape, and layout here.", id: `brand-${Date.now()}` };
    renderCard(newCard);
    updateState({ savedCards: [...appState.savedCards, newCard] });
    addCategory("brandfetch");
    button.textContent = "Added";
    button.disabled = true;
    searchStatus.textContent = `${title} was added to your collection.`;
});

function applyCategoryFilter(selectedCategory) {
    if (!validCategories.includes(selectedCategory)) selectedCategory = "all";
    const targetCategory = categoryAliases[selectedCategory] || selectedCategory;
    let visibleCards = 0;
    if (categoryFilter && [...categoryFilter.options].some(option => option.value === targetCategory)) categoryFilter.value = targetCategory;
    document.querySelectorAll(".design-card").forEach(card => {
        const isVisible = targetCategory === "all" || card.dataset.category === targetCategory;
        card.hidden = !isVisible;
        if (isVisible) visibleCards += 1;
    });
    if (emptyCategoryMessage) emptyCategoryMessage.hidden = visibleCards !== 0;
    updateState({ selectedCategory });
    if (selectedCategoryTitle) selectedCategoryTitle.textContent = `${selectedCategory === "all" ? "All designs" : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}.`;
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", event => applyCategoryFilter(event.target.value));
    const requestedCategory = new URLSearchParams(window.location.search).get("category") || appState.selectedCategory || "all";
    applyCategoryFilter(requestedCategory);
}

if (detailRoot) {
    const detailId = new URLSearchParams(window.location.search).get("id");
    const detailCard = detailId && cardsForDisplay.find(card => card.id === detailId);
    if (!detailCard) {
        detailRoot.innerHTML = `<p class="eyebrow">DETAIL NOT FOUND</p><h1>We couldn't find that brand.</h1><p>Return to the gallery and choose a card to view its details.</p><a class="hero-button" href="gallery.html?category=all">Back to the gallery</a>`;
    } else {
        document.title = `${detailCard.title} Logo Design | Package Designs`;
        detailRoot.innerHTML = `<p class="eyebrow">${escapeHtml(detailCard.category)}</p><h1>${escapeHtml(detailCard.title)}</h1><p class="detail-description">${escapeHtml(detailCard.description)}</p><div class="detail-copy"><h2>History</h2><p>${escapeHtml(detailCard.readMore || "No additional history has been added yet.")}</p><h2>Key design choices</h2><p>${escapeHtml(detailCard.keyDesigns || "No design notes have been added yet.")}</p></div>`;
    }
}

document.querySelectorAll(".category-choice").forEach(choice => {
    if (choice.href.includes(`category=${appState.selectedCategory}`)) choice.classList.add("last-choice");
});
