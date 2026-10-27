// Pure data helpers: no DOM access, so they can be tested with unit tests.

// Lowercase words joined by single hyphens, e.g. "fairy-falls".
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_ID_LENGTH = 60;

export function isValidId(value) {
  return (
    typeof value === "string" &&
    value.length <= MAX_ID_LENGTH &&
    ID_PATTERN.test(value)
  );
}

export function detailUrl(id) {
  return `trail.html?${new URLSearchParams({ id })}`;
}

// Reads ?id= from a query string and says whether it is usable.
export function parseTrailId(search) {
  const raw = new URLSearchParams(search).get("id");
  if (raw === null || raw.trim() === "") return { status: "missing", id: null };
  const id = raw.trim();
  return isValidId(id)
    ? { status: "valid", id }
    : { status: "invalid", id: null };
}

export function findTrail(trails, id) {
  return trails.find((trail) => trail.id === id) ?? null;
}

// One answer for the detail page: found | missing | invalid | unknown.
export function resolveTrail(search, trails) {
  const parsed = parseTrailId(search);
  if (parsed.status !== "valid") return { status: parsed.status, trail: null };

  const trail = findTrail(trails, parsed.id);
  return trail
    ? { status: "found", trail }
    : { status: "unknown", trail: null, id: parsed.id };
}

export async function loadTrails(url = "./data/trails.json") {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Trail request failed: ${response.status}`);
  const trails = await response.json();
  if (!Array.isArray(trails)) throw new Error("Trail data must be an array");
  return trails;
}
