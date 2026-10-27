import { loadTrails, detailUrl } from "./trails.js";
import { initDisclosures } from "./disclosure.js";

initDisclosures();

const list = document.querySelector("#trail-list");
const status = document.querySelector("#list-status");

function createCard(trail) {
  const item = document.createElement("li");
  item.className = "card";

  const area = document.createElement("p");
  area.className = "eyebrow";
  area.textContent = trail.area;

  const title = document.createElement("h2");
  const link = document.createElement("a");
  link.href = detailUrl(trail.id);
  link.textContent = trail.name;
  title.append(link);

  const facts = document.createElement("p");
  facts.className = "facts";
  facts.textContent = `${trail.distanceMiles} mi · ${trail.difficulty}`;

  item.append(area, title, facts);
  return item;
}

try {
  const trails = await loadTrails();
  list.replaceChildren(...trails.map(createCard));
  status.textContent = `${trails.length} trails`;
} catch (error) {
  status.textContent = "Trail data could not be loaded.";
  console.error(error);
}
