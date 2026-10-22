const cards = [
    { 
        id: "1", 
        name: "soda", 
        image: "./images/rsz_1cocacola.jpg", 
        category: "Drink", 
        title: "Coca Cola", 
        description: "The Coca-Cola logo works well because its flowing script feels friendly, energetic, and timeless. Its distinctive red-and-white color combination is eye-catching, easy to recognize, and strongly associated with the brand.", readMore: "The Coca-Cola logo was first introduced in 1886 by Frank Mason Robinson. Robinson created the Spencerian script, a flowing handwriting style popular in the 19th century, giving the logo its distinctive appearance.", keyDesigns: "Typography: flowing Spencerian script. Color: red and white create strong recognition. Ribbon: conveys motion, fluidity, and refreshment." 
    },

    { 
        id: "2", 
        name: "chips", 
        image: "./images/chips.jpg", 
        category: "Snack", 
        title: "Doritos", 
        description: "The Doritos logo works well because its bold, vibrant design stands out on shelves and appeals to a wide audience. The distinctive orange color and playful font create a sense of fun and excitement.", readMore: "Since Doritos launched in 1966, its logo has gone through several redesigns, changing from a simple colorful design into the sharp, modern logo recognized today.", keyDesigns: "Typography: bold, angular lettering. Triangle: reflects the shape of a tortilla chip. Colors: red, orange, yellow, and black suggest bold flavor and energy." 
    },

    { 
        id: "3", 
        name: "skincare", 
        image: "./images/makeup.jpg", 
        category: "beauty", 
        title: "NARS beauty", 
        description: "The NARS beauty logo works well because its sleek, modern design conveys sophistication and high-quality. The bold typography and distinctive color scheme make it stand out in a crowded market.", readMore: "NARS uses a restrained identity to make its beauty products feel modern, premium, and recognizable.", keyDesigns: "Typography: clean and bold. Style: minimal and sophisticated. Contrast: makes the wordmark stand out." 
    },

    { 
        id: "4", 
        name: "clothing brand", 
        image: "./images/vans.jpg", 
        category: "clothing brand", 
        title: "Vans", 
        description: "The Vans logo works well because its simple, bold design is instantly recognizable. The distinctive checkerboard pattern and straightforward typography create a strong visual identity that resonates with the brand's culture of being 'off the wall'.", readMore: "Vans connects its logo and visual style to skate culture, movement, and individuality.", keyDesigns: "Typography: bold and direct. Pattern: checkerboard adds energy. Personality: casual, youthful, and rebellious." 
    },

    { 
        id: "5", 
        name: "company", 
        image: "./images/fedex.jpg", 
        category: "company", 
        title: "Fed Ex", 
        description: "The FedEx logo works well because its clean, bold lettering looks professional and trustworthy. The hidden arrow between the E and x cleverly represents speed, movement, and delivery.", readMore: "The FedEx wordmark uses a hidden arrow to communicate forward motion and efficient delivery.", keyDesigns: "Typography: clean sans serif. Negative space: creates the hidden arrow. Color: helps separate the two parts of the name." 
    },

    { 
        id: "6", 
        name: "waterbottle", 
        image: "./images/owala.jpeg", 
        category: "waterbottle", 
        title: "Owala", 
        description: "The Owala logo works well because its minimalist design is both modern and functional. The clean typography and simple color scheme convey a sense of purity and sustainability.", readMore: "Owala's design emphasizes simplicity and environmental consciousness.", keyDesigns: "Typography: clean and modern. Color: simple and sustainable. Shape: streamlined and functional." 
    },

    { 
        id: "7", 
        name: "cars", 
        image: "./images/jeep.jpg", 
        category: "car", 
        title: "Jeep", 
        description: "The Jeep logo works well because its bold, rugged design reflects the brand's heritage and off-road capabilities. The distinctive styling and strong visual identity make it easily recognizable.", readMore: "Jeep's visual identity is designed to communicate adventure, durability, and off-road capability.", keyDesigns: "Typography: strong and sturdy. Shape: simple and recognizable. Personality: rugged, adventurous, and dependable." 
    }
];

const cardContainer = document.querySelector("#card-container");
const categoryFilter = document.querySelector("#category-filter");
const searchForm = document.querySelector("#brand-search-form");
const searchInput = document.querySelector("#brand-search-input");
const searchResults = document.querySelector("#brand-search-results");
const searchStatus = document.querySelector("#brand-search-status");

// Replace this placeholder with the client ID from https://developers.brandfetch.com.
const BRANDFETCH_CLIENT_ID = "1idyNdK_8wUFAABJvPp";     // Keep secret and make other file to make it more private (slice on #5)

function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"           // saftey measure: this helps prevent the text from the API as being interpreted as unwanted HTML code.
    }[character]));
}

function addCategory(category) {
    if (!categoryFilter || [...categoryFilter.options].some(option => option.value === category)) return;          // checks if the dropdown is already there
    const option = document.createElement("option");                           // creates the new option elememt 
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);            // sets what text is in the option
    categoryFilter.appendChild(option);            // adds the option 
}


// this function creates and displays a brand card.
function renderCard(card) {
    const article = document.createElement("article");                   // creates the new HTML element.
    article.className = "design-card";                                   // gives it a CSS class
    article.dataset.category = card.category.toLowerCase();              // stores the category and makes it lower case
    const detailsId = `card-details-${card.id || Date.now()}-${Math.random().toString(16).slice(2)}`;   // creates a unique ID for the card’s additional information.
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
            <button class="view-more-button" type="button" aria-expanded="false" aria-controls="${detailsId}" aria-label="View more information about ${escapeHtml(card.title)}">View more</button>
            <div class="additional-info" id="${detailsId}" hidden>
                <h4>More about the design</h4>
                <p><strong>History:</strong> ${escapeHtml(readMore)}</p>
                <p><strong>Key design choices:</strong> ${escapeHtml(keyDesigns)}</p>
            </div>
        </div>`;
           // the escapeHTML takes the current brand’s title, safely escapes it, and inserts it into the generated HTML
    cardContainer.appendChild(article);    // adds the card
}

cards.forEach(card => {                           // FOR EACH loops through every brand object in the cards array.
    renderCard(card);                             // creates and displays card
    addCategory(card.category.toLowerCase());     // adds category to filter 
});


// the view more buttons 
cardContainer.addEventListener("click", event => {
    const button = event.target.closest(".view-more-button");                 // checks whether the clicked element is a “View more” button.
    if (!button) return;

    const details = document.getElementById(button.getAttribute("aria-controls"));       // gets the ID of the details section connected to that button.
    const isOpen = button.getAttribute("aria-expanded") === "true";                      // checks whether the details are currently open.
    button.setAttribute("aria-expanded", String(!isOpen));
    button.textContent = isOpen ? "View more" : "View less";
    details.hidden = isOpen;
});

function showBrandResults(results) {
    searchResults.innerHTML = results.map(brand => {          // goes through each brand in the array.
        // what should be displayed 
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

if (searchForm && searchInput && searchResults && searchStatus) {            // program checks that all search elements exist
    //then listens for the form being submitted 
    searchForm.addEventListener("submit", async event => {
    event.preventDefault();             // stops page from refreshing
    const query = searchInput.value.trim();
    // checks whether the user entered anything
    if (!query) {
        searchStatus.textContent = "Type a brand name first.";
        return;
    }
    // checks whether the Brandfetch client ID was added
    if (BRANDFETCH_CLIENT_ID === "PASTE_YOUR_BRANDFETCH_CLIENT_ID_HERE") {
        searchStatus.textContent = "Add your Brandfetch client ID in script.js before searching.";
        return;
    }

    // contacts Brandfetch 
    searchStatus.textContent = "Searching Brandfetch...";
    searchResults.innerHTML = "";
    try {                              
        // fetch sends a request to the Brandfetch API.
        const response = await fetch(`https://api.brandfetch.io/v2/search/${encodeURIComponent(query)}?c=${encodeURIComponent(BRANDFETCH_CLIENT_ID)}`);
        if (!response.ok) throw new Error(`Brandfetch request failed: ${response.status}`);
        // await pauses this function until the API responds then converts the API response into usable JavaScript data,
        const results = await response.json();
        const brands = Array.isArray(results) ? results.slice(0, 5) : [];
        showBrandResults(brands);
        searchStatus.textContent = brands.length ? "Choose a result to add it to your collection." : "No brands found.";
    } catch (error) {
        // catch handles problems and displays error
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
        description: `${title} was loaded from Brandfetch. Add your own notes about its color, typography, shape, and layout here.`,
        id: `brand-${Date.now()}`
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
