// Focus Board starter. Work through the steps in order; each one builds on the last.

const STORAGE_KEY = "focus-board";

const list = document.querySelector("#task-list");
const emptyMessage = document.querySelector("#empty-message");
const summary = document.querySelector("#summary");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll("[data-filter]");
const taskForm = document.querySelector("#task-form");

// STEP 1: Single source of truth.
// Declare `state` with: tasks (array), filter ("all"), theme ("light").
// Each task: { id, text, done, completedOn }.
let state = {
  tasks: [],
  filter: "all",
  theme: "light",
};

// STEP 2: Render.
// Make the DOM reflect `state`. Do not read from the DOM to decide anything.
// - set document.documentElement.dataset.theme
// - set aria-pressed on the filter buttons and theme toggle
// - build one <li class="task" data-id="..."> per visible task (use
//   createElement + textContent, not innerHTML)
// - show/hide #empty-message; update #summary ("2 left · 1 completed today")
function render(state) {
    document.documentElement.dataset.theme = state.theme;
    themeToggle.setAttribute("aria-pressed", state.theme === "dark");
    filterButtons.forEach((button) => {
        button.setAttribute("aria-pressed", button.dataset.filter === state.filter);
    });

    const visibleTasks = state.tasks.filter((task) => {
        if (state.filter === "all") return true;
        if (state.filter === "active") return !task.done;
        if (state.filter === "completed") return task.done;
    });

    list.innerHTML = "";
    if (visibleTasks.length === 0) {
        emptyMessage.hidden = false;    
    } else {
        emptyMessage.hidden = true;
        visibleTasks.forEach((task) => {
            const li = document.createElement("li");
            li.className = "task";
            li.dataset.id = task.id;
            li.textContent = task.text;
            if (task.done) {
                li.classList.add("done");
            }
            list.appendChild(li);
        });
    }
    summary.textContent = `${state.tasks.filter(t => !t.done).length} left · ${state.tasks.filter(t => t.done && t.completedOn === new Date().toDateString()).length} completed today`;
}

// STEP 3: setState(change): merge the change, save, render.
// This is the ONLY place state is replaced.
function setState(change) {
    state = { ...state, ...change };  // state is making a copy and change is chaning it
    saveState();
    render(state);
}

// STEP 4: Persistence.
// saveState: JSON.stringify into localStorage.
// loadState: JSON.parse, and fall back to defaults if the data is missing or
// corrupt (try/catch). Call loadState() when the app starts.
function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));   // JSON.stringfy turns dictionary into a string so it can be stored in local storage
}
function loadState() {
    try {
        const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));  // JSON.parse turns the string back into a dictionary
        if (savedState && typeof savedState === "object") {
            state = savedState;
        }
    } catch (e) {
        console.error("Failed to load state:", e);
    }
}

// STEP 5: Add tasks (form "submit"). Create a task with crypto.randomUUID()
// and add it WITHOUT mutating the old array (spread).
function addTask(text) {
    const newTask = {
        id: crypto.randomUUID(),
        text: text,
        done: false,
        completedOn: null,
    };
    setState({ tasks: [...state.tasks, newTask] });
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = taskForm.querySelector("input[name='task']");
    const text = input.value.trim();
    if (text) {
        addTask(text);
        input.value = "";
    }
});

// STEP 6: Toggle and delete using ONE click listener on #task-list
// (event delegation: event.target.closest("[data-id]")).
// Use map() to toggle and filter() to delete.

// STEP 7: Filter buttons and theme toggle. Both are UI state that persist.

// STEP 8: "Clear completed" button.

// STEP 9: Corrupt the saved value in DevTools > Application > Local Storage.
// Does the app still load?

// STEP 10 (stretch): window "storage" event to sync a second tab.
