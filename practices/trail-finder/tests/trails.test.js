import { test, expect } from "vite-plus/test";
import { readFile } from "node:fs/promises";
import {
  isValidId,
  parseTrailId,
  findTrail,
  resolveTrail,
  detailUrl,
} from "../js/trails.js";

const trails = JSON.parse(
  await readFile(new URL("../public/data/trails.json", import.meta.url), "utf8")
);

test("valid id finds the trail", () => {
  const result = resolveTrail("?id=fairy-falls", trails);
  expect(result.status).toBe("found");
  expect(result.trail.name).toBe("Fairy Falls");
});

test("missing id is reported as missing", () => {
  for (const search of ["", "?", "?id=", "?id=%20%20", "?other=1"]) {
    expect(resolveTrail(search, trails).status, search).toBe("missing");
  }
});

test("badly formed ids are invalid", () => {
  const bad = [
    "?id=Fairy-Falls",
    "?id=fairy_falls",
    "?id=-fairy",
    "?id=fairy--falls",
    "?id=<script>alert(1)</script>",
    "?id=../secret",
    `?id=${"a".repeat(61)}`,
  ];
  for (const search of bad) {
    expect(resolveTrail(search, trails).status, search).toBe("invalid");
  }
});

test("well formed but unknown id is unknown", () => {
  const result = resolveTrail("?id=no-such-trail", trails);
  expect(result.status).toBe("unknown");
  expect(result.id).toBe("no-such-trail");
});

test("first id wins when the parameter repeats", () => {
  expect(parseTrailId("?id=delta-lake&id=x!").id).toBe("delta-lake");
});

test("other parameters do not interfere", () => {
  expect(resolveTrail("?ref=nav&id=taggart-lake", trails).status).toBe("found");
});

test("findTrail returns null when absent", () => {
  expect(findTrail(trails, "nope")).toBeNull();
});

test("detailUrl round-trips through the parser", () => {
  for (const trail of trails) {
    const search = detailUrl(trail.id).split("trail.html")[1];
    expect(resolveTrail(search, trails).trail.id).toBe(trail.id);
  }
});

test("every id in the data is valid and unique", () => {
  const ids = trails.map((trail) => trail.id);
  expect(ids.every(isValidId)).toBe(true);
  expect(new Set(ids).size).toBe(ids.length);
});
