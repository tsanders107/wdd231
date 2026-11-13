const cards = [
    { 
        id: "1", 
        name: "soda", 
        image: "./images/rsz_1cocacola.jpg", 
        category: "Drink", title: "Coca Cola", 
        description: "The Coca-Cola logo works well because its flowing script feels friendly, energetic, and timeless. Its distinctive red-and-white color combination is eye-catching, easy to recognize, and strongly associated with the brand.", 
        readMore: "The Coca-Cola logo was first introduced in 1886 by Frank Mason Robinson. Robinson created the Spencerian script, a flowing handwriting style popular in the 19th century, giving the logo its distinctive appearance.", 
        keyDesigns: "Typography: flowing Spencerian script. Color: red and white create strong recognition. Ribbon: conveys motion, fluidity, and refreshment." 
    },
    { 
        id: "2", 
        name: "chips", 
        image: "./images/chips.jpg", 
        category: "Snack", title: "Doritos", 
        description: "The Doritos logo works well because its bold, vibrant design stands out on shelves and appeals to a wide audience. The distinctive orange color and playful font create a sense of fun and excitement.", 
        readMore: "Since Doritos launched in 1966, its logo has gone through several redesigns, changing from a simple colorful design into the sharp, modern logo recognized today.", 
        keyDesigns: "Typography: bold, angular lettering. Triangle: reflects the shape of a tortilla chip. Colors: red, orange, yellow, and black suggest bold flavor and energy." 
    },
    { 
        id: "3", 
        name: "skincare", 
        image: "./images/makeup.jpg", 
        category: "beauty", 
        title: "NARS beauty", 
        description: "The NARS beauty logo works well because its sleek, modern design conveys sophistication and high-quality. The bold typography and distinctive color scheme make it stand out in a crowded market.", 
        readMore: "NARS uses a restrained identity to make its beauty products feel modern, premium, and recognizable.", 
        keyDesigns: "Typography: clean and bold. Style: minimal and sophisticated. Contrast: makes the wordmark stand out." 
    },
    { 
        id: "4", 
        name: "clothing brand", 
        image: "./images/vans.jpg", 
        category: "clothing brand", 
        title: "Vans", 
        description: "The Vans logo works well because its simple, bold design is instantly recognizable. The distinctive checkerboard pattern and straightforward typography create a strong visual identity that resonates with the brand's culture of being 'off the wall'.", 
        readMore: "Vans connects its logo and visual style to skate culture, movement, and individuality.", 
        keyDesigns: "Typography: bold and direct. Pattern: checkerboard adds energy. Personality: casual, youthful, and rebellious." 
    },
    { 
        id: "5", 
        name: "company", 
        image: "./images/fedex.jpg", 
        category: "company", 
        title: "Fed Ex", 
        description: "The FedEx logo works well because its clean, bold lettering looks professional and trustworthy. The hidden arrow between the E and x cleverly represents speed, movement, and delivery.", 
        readMore: "The FedEx wordmark uses a hidden arrow to communicate forward motion and efficient delivery.", 
        keyDesigns: "Typography: clean sans serif. Negative space: creates the hidden arrow. Color: helps separate the two parts of the name." 
    },
    { 
        id: "6", 
        name: "waterbottle", 
        image: "./images/owala.jpeg", 
        category: "waterbottle", 
        title: "Owala", 
        description: "The Owala logo works well because its minimalist design is both modern and functional. The clean typography and simple color scheme convey a sense of purity and sustainability.", 
        readMore: "Owala uses a simple visual identity to support its focus on reusable water bottles and everyday use.", 
        keyDesigns: "Typography: modern and approachable. Layout: simple and easy to recognize. Mood: clean, fresh, and functional." 
    },
    { 
        id: "7", 
        name: "cars", 
        // image: "./images/jeep.jpg", 
        category: "car", 
        title: "Jeep", 
        description: "The Jeep logo works well because its bold, rugged design reflects the brand's heritage and off-road capabilities. The distinctive styling and strong visual identity make it easily recognizable.", 
        readMore: "Jeep's visual identity is designed to communicate adventure, durability, and off-road capability.", 
        keyDesigns: "Typography: strong and sturdy. Shape: simple and recognizable. Personality: rugged, adventurous, and dependable." 
    }
];


// these lines connects the javaScript to elements in the html so javascript can use them
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

// loads the categorys at the beginning page
const STORAGE_KEY = "packageDesignArchiveState";
const STATE_VERSION = 1;
const validCategories = ["all", "clothing", "beauty", "snacks", "company", "cars", "other", "technology", "music", "drinks", "drink", "snack", "clothing brand", "waterbottle", "car", "brandfetch"];
const categoryAliases = {
    clothing: "clothing brand",
    beauty: "beauty",
    snacks: "snack",
    company: "company",
    cars: "car",
    drinks: "drink"
};


// slice 4
// This checks if the saved website state is valid before the website uses it.
function isValidState(value) {
    return value && value.version === STATE_VERSION &&
        validCategories.includes(value.selectedCategory) &&
        Array.isArray(value.expandedCardIds) &&
        value.expandedCardIds.every(id => typeof id === "string") &&
        typeof value.lastSearch === "string" &&
        Array.isArray(value.savedCards) &&
        value.savedCards.every(card => card && typeof card.id === "string" && typeof card.title === "string" && typeof card.image === "string");
}

// slice 1
// this one loads the website’s saved information from a localStorage
function loadState() {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));  // this converts JSON into some JavaScript objects:
        if (isValidState(stored)) return stored;                       // checks whether the saved data is valid:
        if (stored !== null) localStorage.removeItem(STORAGE_KEY);    // removes if data is invalid or already exists
    } catch {
        localStorage.removeItem(STORAGE_KEY);
    }

    return {                                                          // if data is all invalid it returns to these default values
        version: STATE_VERSION,
        selectedCategory: "all",
        expandedCardIds: [],
        lastSearch: "",
        savedCards: [],
        modalOpen: false
    };
}

// this loads the saved state of the cards and combines the normal cards with the user’s saved cards so they can all be seen on the website.
let appState = loadState();
const cardsForDisplay = [...cards, ...(appState.savedCards || [])];

// remembers the user’s choices, search, expanded cards, and saved cards so they can be saved for later.
function saveState() {                          // savesState: it saves the important parts of the application’s current state in the browser’s localStorage
    const stateToStore = {                      // creates an object containing the information that should be saved
        version: STATE_VERSION,
        selectedCategory: appState.selectedCategory,
        expandedCardIds: appState.expandedCardIds,
        lastSearch: appState.lastSearch,
        savedCards: appState.savedCards
    };
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToStore));    // converts the object into JSON text and stores it in the browser
    } catch {
        // The site still works if browser storage is unavailable or full.
    }
}

// slice 2
// changes selected parts of the app’s state and immediately saves those changes.
function updateState(changes) {
    appState = { ...appState, ...changes };
    saveState();
}

// replaced this placeholder with the client ID from https://developers.brandfetch.com.
const BRANDFETCH_CLIENT_ID = "1idyNdK_8wUFAABJvPp";                          // make private!

// saftey measure: this helps prevent the text from the API as being interpreted as unwanted HTML code.
function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[character]));
}

// adds a category to the filter dropdown only if the dropdown exists and that category has not already been added.
function addCategory(category) {
    if (!categoryFilter || [...categoryFilter.options].some(option => option.value === category)) return;   // checks if the dropdown is already there
    const option = document.createElement("option");                                                       // creates the new option elememt 
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);                           // sets what text is in the option
    categoryFilter.appendChild(option);                                                                 // adds the option 
}

// slice 5
// this function creates and displays a brand card.
function renderCard(card) {
    if (!cardContainer) return;
    const article = document.createElement("article");             // creates the new HTML element.
    article.className = "design-card";                             // gives it a CSS class
    article.dataset.category = card.category.toLowerCase();        // stores the category and makes it lower case
    const readMore = card.readMore || "This brand was loaded from Brandfetch. Add your own research about its history and visual identity here.";
    const keyDesigns = card.keyDesigns || "Add notes about the typography, color, shape, layout, and other design choices here.";
    article.innerHTML = `
        <div class="card-image">
            <img class="cardphotos" src="${escapeHtml(card.image)}" alt="${escapeHtml(card.title)} logo" loading="lazy">
        </div>
        <div class="card-content">
            <p class="category">${escapeHtml(card.category)}</p>
            <h3>${escapeHtml(card.title)}</h3>
            <p class="description">${escapeHtml(card.description)}</p>
            <button class="view-more-button" type="button" aria-expanded="false" aria-controls="details-modal" aria-label="View more information about ${escapeHtml(card.title)}" data-card-id="${escapeHtml(card.id)}">View more</button>
            <a class="card-detail-link" href="details.html?id=${encodeURIComponent(card.id)}">Open full details</a>
        </div>`;
    article.dataset.readMore = readMore;
    article.dataset.keyDesigns = keyDesigns;
    article.dataset.cardTitle = card.title;
    article.dataset.cardDescription = card.description;
    cardContainer.appendChild(article);
}

cardsForDisplay.forEach(card => {                         // FOR EACH loops through every brand object in the cards array.
    renderCard(card);                                     // creates and displays card
    addCategory(card.category.toLowerCase());             // adds category to filter 
});

if (cardContainer) {
cardContainer.addEventListener("click", event => {
    const button = event.target.closest(".view-more-button");     // checks whether the clicked element is a “View more” button.
    if (!button) return;
    openDetailsModal(button.dataset.cardId, button);              // if view more button is clicked then open the card 
});
}

// creates empty storage for remembering the last element that was focused on
let lastFocusedElement = null;

// slice 12
// first looks for a card in the JavaScript data
// if it cannot find it there, it looks for the card in the HTML and gathers its details from that cards attributes
function getCardForDetails(cardId) {                                // getCardForDetails: finds the information for a card using its ID.
    const card = cardsForDisplay.find(item => item.id === cardId);  // searches the cardsForDisplay array
    if (card) return card;                                          // if it finds a matching card, it returns that card:

    // if card is not in array, it goes and searches the webpage for a matching card
    const article = document.querySelector(`.design-card[data-category] .view-more-button[data-card-id="${CSS.escape(cardId)}"]`)?.closest(".design-card");
    if (!article) return null;        // if no card element exists, it returns
    // if it does find the card on the page, it creates and returns an object using information stored in the HTML elements attributes 
    return {                          
        id: cardId,
        title: article.dataset.cardTitle,
        description: article.dataset.cardDescription,
        readMore: article.dataset.readMore,
        keyDesigns: article.dataset.keyDesigns
    };
}

// slice 9 and 10
// finds the selected card, fills the modal with that card’s information, opens the modal, updates accessibility settings, 
// and places the keyboard focus on the close button
function openDetailsModal(cardId, trigger) {
    if (!detailsModal || !modalBody) return;           // checks whether the modal elements exist
    const card = getCardForDetails(cardId);           // finds the card’s information
    if (!card) return;

    lastFocusedElement = trigger;                     // remembers the element that opened the modal
    // inserts the card information into the modal
    modalBody.innerHTML = `                           
        <p class="eyebrow">${escapeHtml(card.category || "BRAND DETAILS")}</p>
        <h2 id="modal-title">${escapeHtml(card.title)}</h2>
        <p>${escapeHtml(card.description)}</p>
        <p><strong>History:</strong> ${escapeHtml(card.readMore || "No additional history has been added yet.")}</p>
        <p><strong>Key design choices:</strong> ${escapeHtml(card.keyDesigns || "No design notes have been added yet.")}</p>`;

    detailsModal.classList.add("show");                    // makes the modal visible
    detailsModal.setAttribute("aria-hidden", "false");     // updates accessibility information
    trigger.setAttribute("aria-expanded", "true");
    appState.modalOpen = true;                            // records that the modal is open
    modalClose?.focus();                                  // moves keyboard focus to the close button
}

// closes the details popup and restores the page to its previous state
function closeDetailsModal() {
    if (!detailsModal) return;
    detailsModal.classList.remove("show");
    detailsModal.setAttribute("aria-hidden", "true");
    document.querySelectorAll(".view-more-button[aria-expanded='true']").forEach(button => {     // finds any “View More” buttons marked as expanded and changes them back
        button.setAttribute("aria-expanded", "false");
    });                // then updates application status
    appState.modalOpen = false;
    lastFocusedElement?.focus();
    lastFocusedElement = null;
}

// slice 11
// controls for closing the modal and managing keyboard accessibility
if (detailsModal) {
    modalClose?.addEventListener("click", closeDetailsModal);
    detailsModal.addEventListener("click", event => {
        if (event.target === detailsModal) closeDetailsModal();
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && detailsModal.classList.contains("show")) {
            closeDetailsModal();
        }
        if (event.key === "Tab" && detailsModal.classList.contains("show")) {
            const focusable = detailsModal.querySelectorAll("button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])");
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });
}

// displays brand search results on the webpage
function showBrandResults(results) {
    if (!searchResults) return;                          // checks whether the brand exists
    searchResults.innerHTML = results.map(brand => {    // loops through every brand in results
        const title = brand.name || brand.domain || "Unnamed brand";     // chooses a brand name to be displayed 
        const domain = brand.domain || "";                               // get the brands domain and logo
        const logo = brand.icon || `https://cdn.brandfetch.io/domain/${encodeURIComponent(domain)}/type/icon?c=${encodeURIComponent(BRANDFETCH_CLIENT_ID)}`;
       // then creates the html for it 
        return `
            <div class="brand-result">
                <img src="${escapeHtml(logo)}" alt="${escapeHtml(title)} logo" loading="lazy">
                <div class="brand-result-info"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(domain)}</span></div>
                <button class="add-brand-button" type="button" data-brand-name="${escapeHtml(title)}" data-brand-logo="${escapeHtml(logo)}">Add</button>
            </div>`;
    }).join("");
}

// slice 8 
// search bar 
if (searchForm && searchInput && searchResults && searchStatus) {     // makes sure that code only runs if the form, input field, results area, and status message all exist
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

searchResults.addEventListener("click", event => {
    const button = event.target.closest(".add-brand-button");
    if (!button) return;
    const title = button.dataset.brandName;
    const newCard = {
        title,
        category: "Brandfetch",
        image: button.dataset.brandLogo,
        description: `${title} was loaded from Brandfetch. Add your own notes about its color, typography, shape, and layout here.`,
        readMore: "This brand was selected from Brandfetch and saved for this browser session.",
        keyDesigns: "Add notes about the typography, color, shape, and layout here.",
        id: `brand-${Date.now()}`
    };
    renderCard(newCard);
    updateState({ savedCards: [...appState.savedCards, newCard] });
    addCategory("brandfetch");
    button.textContent = "Added";
    button.disabled = true;
    searchStatus.textContent = `${title} was added to your collection.`;
});
}

// slice 2
function applyCategoryFilter(selectedCategory) {
    if (!validCategories.includes(selectedCategory)) {
        selectedCategory = "all";
        if (selectedCategoryTitle) selectedCategoryTitle.textContent = "Category not found. Showing all designs.";
    }

    const targetCategory = categoryAliases[selectedCategory] || selectedCategory;
    let visibleCards = 0;

    if (categoryFilter && [...categoryFilter.options].some(option => option.value === targetCategory)) {
        categoryFilter.value = targetCategory;
    }

    document.querySelectorAll(".design-card").forEach(card => {
        const isVisible = targetCategory === "all" || card.dataset.category === targetCategory;
        card.hidden = !isVisible;
        if (isVisible) visibleCards += 1;
    });

    if (emptyCategoryMessage) emptyCategoryMessage.hidden = visibleCards !== 0;
    updateState({ selectedCategory });
    if (selectedCategoryTitle) {
        const label = selectedCategory === "all" ? "All designs" : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
        if (visibleCards > 0 || selectedCategory === "all") selectedCategoryTitle.textContent = `${label}.`;
    }
}

// filter category
if (categoryFilter) {
categoryFilter.addEventListener("change", event => {
    applyCategoryFilter(event.target.value);
});

// slice 6 and 7
const requestedCategory = new URLSearchParams(window.location.search).get("category") || appState.selectedCategory || "all";
applyCategoryFilter(requestedCategory);
}

if (detailRoot) {
    const detailId = new URLSearchParams(window.location.search).get("id");
    const detailCard = detailId && cardsForDisplay.find(card => card.id === detailId);
    if (!detailCard) {
        detailRoot.innerHTML = `<p class="eyebrow">DETAIL NOT FOUND</p><h1>We couldn't find that brand.</h1><p>Return to the gallery and choose a card to view its details.</p><a class="hero-button" href="gallery.html?category=all">Back to the gallery</a>`;
    } else {
        detailRoot.innerHTML = `
            <p class="eyebrow">${escapeHtml(detailCard.category)}</p>
            <h1>${escapeHtml(detailCard.title)}</h1>
            <p class="detail-description">${escapeHtml(detailCard.description)}</p>
            <div class="detail-copy">
                <h2>History</h2>
                <p>${escapeHtml(detailCard.readMore || "No additional history has been added yet.")}</p>
                <h2>Key design choices</h2>
                <p>${escapeHtml(detailCard.keyDesigns || "No design notes have been added yet.")}</p>
            </div>`;
    }
}

const landingChoices = document.querySelectorAll(".category-choice");
if (landingChoices.length) {
    const savedCategory = appState.selectedCategory;
    landingChoices.forEach(choice => {
        if (choice.href.includes(`category=${savedCategory}`)) choice.classList.add("last-choice");
    });
}
