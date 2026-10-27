import { loadTrails, resolveTrail, detailUrl } from "./trails.js";
import { initDisclosures } from "./disclosure.js";

initDisclosures();

const view = document.querySelector("#trail-view");

const MESSAGES = {
  missing: {
    title: "No trail selected",
    body: "This page needs a trail in the address, such as trail.html?id=fairy-falls.",
  },
  invalid: {
    title: "That trail link is not valid",
    body: "Trail ids use lowercase letters, numbers, and single hyphens.",
  },
  unknown: {
    title: "We could not find that trail",
    body: "It may have been renamed or removed.",
  },
};

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function showProblem(status, trails) {
  const { title, body } = MESSAGES[status];
  document.title = `${title} | Trail Finder`;

  const heading = element("h1", title);
  heading.tabIndex = -1;
  const section = element("section", undefined, "notice");
  section.append(heading, element("p", body));

  if (trails.length) {
    const links = element("ul", undefined, "link-list");
    trails.forEach((trail) => {
      const item = element("li");
      const link = element("a", trail.name);
      link.href = detailUrl(trail.id);
      item.append(link);
      links.append(item);
    });
    section.append(element("p", "Try one of these instead:"), links);
  }

  view.replaceChildren(section);
  heading.focus();
}

// The browser handles open/close, keyboard, and accessibility state for <details>.
function createAccordionItem(title, text) {
  const item = element("details", undefined, "accordion-item");
  item.name = "trail-info";
  item.append(element("summary", title), element("p", text));
  return item;
}

function showTrail(trail) {
  document.title = `${trail.name} | Trail Finder`;

  const back = element("a", "← All trails");
  back.href = "index.html";
  const heading = element("h1", trail.name);

  const facts = element("p", undefined, "facts");
  facts.textContent = `${trail.distanceMiles} mi · ${trail.elevationGainFeet.toLocaleString()} ft gain · ${trail.difficulty}`;

  const accordion = element("div", undefined, "accordion");
  accordion.append(
    createAccordionItem("About this trail", trail.description),
    createAccordionItem("Where it starts", `${trail.name} is in the ${trail.area} area.`),
    createAccordionItem(
      "Before you go",
      "Check current park alerts and conditions, carry water, and give wildlife plenty of room."
    )
  );

  const article = element("article");
  article.append(back, element("p", trail.area, "eyebrow"), heading, facts, accordion);
  view.replaceChildren(article);
}

try {
  const trails = await loadTrails();
  const result = resolveTrail(window.location.search, trails);
  if (result.status === "found") showTrail(result.trail);
  else showProblem(result.status, trails);
} catch (error) {
  view.replaceChildren(element("p", "Trail data could not be loaded.", "notice"));
  console.error(error);
}
