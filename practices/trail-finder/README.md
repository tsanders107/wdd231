# Trail Finder demo (Contract 6)

A two-page site that connects navigation and interaction:

- `index.html` lists trails; each card links to `trail.html?id=<trail-id>`.
- `trail.html` reads `?id=`, validates it, looks it up, and renders either the
  trail or a specific message for a missing, malformed, or unknown id.
- One reusable module, `js/disclosure.js`, powers the site menu on both pages.
- The accordions on the detail page use the native `<details>`/`<summary>`
  elements, with `name` making them exclusive (one open at a time).

## Files

- `js/trails.js`: pure helpers (`parseTrailId`, `findTrail`, `resolveTrail`, `detailUrl`, `loadTrails`)
- `js/list.js`, `js/detail.js`: page scripts that render from the helpers
- `js/disclosure.js`: `createDisclosure` and `initDisclosures`
- `tests/trails.test.js`: valid, missing, invalid, and unknown identifiers
- `public/data/trails.json`: trail records (same data as the Yellowstone demo), served at `/data/trails.json`
- `vite.config.js`: Vite+ config (both HTML pages as build inputs, test include pattern)
- `INSTRUCTOR-NOTES.md`: pacing, talking points, and evidence checklist

## Run it

This demo uses [Vite+](https://viteplus.dev). It needs Node `^22.18` or `^24.11`.
If you do not have Node install on your computer yet then you should just install Vite+ globally instead. It will manage Node for you.

- macOS / Linux: curl -fsSL https://vite.plus | bash
- Windows (PowerShell): irm https://vite.plus/ps1 | iex

```bash
cd demos/trail-finder
npm install
npm run dev      # or `vp dev` if you have the global CLI
```

Open the local URL it prints (usually <http://localhost:5173/>). Refresh on any
detail page to confirm a direct visit works. `npm run preview` serves a
production build made with `vp build`.

## Run the tests

```bash
npm test         # runs `vp test` (Vitest)
```

## How the parameter controls the data flow

```text
click card -> trail.html?id=fairy-falls
  -> URLSearchParams(location.search).get("id")
  -> validate shape (lowercase words and hyphens, max 60 chars)
  -> find in loaded data
  -> found | missing | invalid | unknown -> render
```

Validation is separate from lookup so malformed input is never compared to data
or inserted into the page; all content is written with `textContent`.

## Synchronized state

**Menu (custom).** `hidden` on the panel is the only visual state.
`createDisclosure` writes `aria-expanded` and an `is-open` class from the same
`open` variable in a single `render()`.

| Input                           | Behaviour                          |
| ------------------------------- | ---------------------------------- |
| Click / Enter / Space on button | toggle                             |
| Escape                          | close, focus returns to the button |
| Click outside                   | close                              |
| Tab out                         | close                              |

**Accordion (native).** `<details>` keeps its own `open` state, exposes it to
assistive technology, and handles Enter/Space with no JavaScript. Sharing a
`name` closes the other items when one opens.

Try it: <http://localhost:5173/trail.html?id=fairy-falls>,
then `trail.html`, `trail.html?id=Bad!`, and `trail.html?id=nope`.
