// Reusable open/close interaction used by the site menu on every page. The
// `hidden` attribute is the single visual state and aria-expanded mirrors it,
// so they cannot drift apart.

export function createDisclosure(button, panel, options = {}) {
  const { dismissOnOutside = false, dismissOnEscape = true } = options;
  const container = button.parentElement;
  let open = !panel.hidden;

  function render() {
    button.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
    button.classList.toggle("is-open", open);
  }

  function onDocumentClick(event) {
    if (!container.contains(event.target)) setOpen(false);
  }

  function setOpen(next, { returnFocus = false } = {}) {
    if (next === open) return;
    open = next;
    render();
    if (!open && returnFocus) button.focus();
    if (!dismissOnOutside) return;
    if (open) document.addEventListener("click", onDocumentClick);
    else document.removeEventListener("click", onDocumentClick);
  }

  button.addEventListener("click", () => setOpen(!open));

  if (dismissOnEscape) {
    container.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false, { returnFocus: true });
      }
    });
  }

  if (dismissOnOutside) {
    // Tabbing out of the menu closes it too.
    container.addEventListener("focusout", (event) => {
      if (open && event.relatedTarget && !container.contains(event.relatedTarget)) {
        setOpen(false);
      }
    });
  }

  render();
  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen(!open),
    isOpen: () => open,
  };
}

// Finds every [data-disclosure] button under root and wires it to the panel
// named by aria-controls. Safe to call again on newly created markup.
export function initDisclosures(root = document) {
  const instances = [];
  root.querySelectorAll("[data-disclosure]").forEach((button) => {
    if (button.dataset.ready) return;
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) return;
    button.dataset.ready = "true";
    instances.push(
      createDisclosure(button, panel, {
        dismissOnOutside: button.dataset.disclosure === "menu",
      })
    );
  });
  return instances;
}
