// Saved browser state and shared safety helpers.
function isValidState(value) {
    return value && value.version === STATE_VERSION &&
        validCategories.includes(value.selectedCategory) &&
        Array.isArray(value.expandedCardIds) &&
        value.expandedCardIds.every(id => typeof id === "string") &&
        typeof value.lastSearch === "string" &&
        Array.isArray(value.savedCards) &&
        value.savedCards.every(card => card && typeof card.id === "string" && typeof card.title === "string" && typeof card.image === "string");
}

function loadState() {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (isValidState(stored)) return stored;
        if (stored !== null) localStorage.removeItem(STORAGE_KEY);
    } catch {
        localStorage.removeItem(STORAGE_KEY);
    }
    return { version: STATE_VERSION, selectedCategory: "all", expandedCardIds: [], lastSearch: "", savedCards: [], modalOpen: false };
}

let appState = loadState();

function saveState() {
    const stateToStore = { version: STATE_VERSION, selectedCategory: appState.selectedCategory, expandedCardIds: appState.expandedCardIds, lastSearch: appState.lastSearch, savedCards: appState.savedCards };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToStore)); } catch { /* Storage is optional. */ }
}

function updateState(changes) {
    appState = { ...appState, ...changes };
    saveState();
}

function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
}
