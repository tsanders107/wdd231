# Instructor notes: Trail Finder (code-reading format)

**Format:** students receive the finished code, read it, discuss it, then add a
feature.
**Time:** 15 min read solo/pairs, 15 min class discussion, 30-40 min feature.
**Goal:** students can explain how a URL parameter drives data flow and how one
open/close widget keeps visual, keyboard, and ARIA state in sync.

## Before class

1. In `demos/trail-finder`, run `npm install` once, then `npm run dev`.
2. Run `npm test` and confirm 9 passing tests.
3. Print or share the reading worksheet below.

## Reading worksheet (give to students)

Work in pairs. Write answers in your own words; do not run anything until
question 7.

1. There are 4 javascript files and 2 html files. Describe the role of each .js file...what is each responsible for? Map out the flow through the code. What function gets called first when the index page loads? List all the functions that get called for index. Do the same for the trails.html page.
2. Click a card on the list page. Which line of code builds the link? What
   does the address bar look like afterwards?
3. In `trails.js`, trace `?id=fairy-falls` through `resolveTrail`. List each
   function it passes through and what each returns.
4. There are four outcomes: found, missing, invalid, unknown. Write one URL
   that triggers each, and say where in the code the decision is made.
5. Why does `parseTrailId` check the shape before `findTrail` runs?
6. In `disclosure.js`, name every place `open` changes. Where do `hidden` and
   `aria-expanded` get set, and why only there?
7. Predict what happens for: Escape while the menu is open; clicking outside;
   Tab out of the menu. Then test your predictions.
8. The accordion uses `<details>`; the menu uses custom code. Why might the
   author have chosen differently for each?
9. Find one thing you would change, and one thing you did not understand.

## Discussion flow (15 min)

| Step | Prompt                                 | Point to make                                                                  |
| ---- | -------------------------------------- | ------------------------------------------------------------------------------ |
| 1    | Walk question 2 on the projector       | The URL is input; refresh works because the page rebuilds from it              |
| 2    | Four URLs from question 3              | Missing, invalid, unknown deserve different messages                           |
| 3    | Open the tests; map each to an outcome | Pure functions are testable without a browser                                  |
| 4    | Question 5: single source of truth     | `render()` writes all state together so it cannot drift                        |
| 5    | Question 7: native vs custom           | Use the native element unless you need behaviour it lacks (Escape, click-away) |

## Talking points

- **Validate before lookup.** Shape checks keep junk out of messages, logs, and
  future request URLs.
- **Why `textContent`.** Try `?id=<img src=x onerror=alert(1)>`; it is rejected
  and never rendered.
- **Focus on error.** The problem heading receives focus so keyboard and
  screen-reader users land on the message.
- **Click-away is opt-in.** Menus dismiss on outside click; accordions should
  not. `data-disclosure="menu"` selects this.
- **`aria-expanded` is not magic.** It only informs; `hidden` does the hiding.
- **`<details name>`.** Native exclusive accordion with no JavaScript.

## Feature options (pick one for the second half)

Choose by how much time you have and which skill to stress.

| Feature                                                                                                                             | Skills stressed                                                                                | Size   |
| ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------ |
| `?difficulty=` filter on the list that survives refresh and back/forward                                                            | Reading and writing params, `history.replaceState`, validating a value against an allowed list | Medium |
| Previous / Next trail links on the detail page                                                                                      | Using the id to find a neighbour in the array, edge cases at both ends                         | Small  |
| Related trails: link to other trails in the same `area`                                                                             | Filtering by the loaded record, reusing `detailUrl`                                            | Small  |
| Favorites: a button on the detail page saved to `localStorage`, with a "Favorites" filter on the list (ties back to the state demo) | Combining params with persistence, validating stored ids against the data                      | Medium |
| Accessible modal "Share this trail" that reuses `createDisclosure`, adding a focus trap                                             | Extending existing code without breaking it, focus management                                  | Large  |
| Search box bound to `?q=`                                                                                                           | Params, debouncing, escaping and empty states                                                  | Medium |

**Recommended:** the `?difficulty=` filter. It reuses the same parameter ideas
students just read, forces them to extend `trails.js` (validate against an
allowed list, return a result object) and has an obvious "unknown value" case.
Make it a test-first task: they add tests for valid, missing, and invalid
values before wiring up the DOM.

**Stretch for fast pairs:** Previous/Next, or `?q=` combined with difficulty
so two parameters coexist.

## Making the code-literacy exercise work

- **Predict, then run.** Have students write predictions before running
  anything. Compare after.
- **Trace with real values.** Ask for the exact value at each step, not
  "it validates the id".
- **Explain aloud.** Pairs take turns explaining one function to each other.
- **Break it on purpose.** Offer small mutations to diagnose: remove the
  `hidden` assignment; change the regex; drop `type="button"`; remove
  `initDisclosures()`. They name the symptom and the line.
- **Ask for a changed line, not a rewrite.** In the feature step, require the
  smallest change that works. It shows whether they understood the structure.
- **Tests first.** Reading the tests is the fastest way to learn expected
  behaviour. Make them extend the tests before the code.
- **Capture questions.** Have each pair write down one line they could not
  explain, and answer those before the feature.
- **Exit ticket.** One sentence: "The URL parameter controls the page by..."

## Likely stumbling blocks

- Opening via `file://` (modules and `fetch` fail); use `npm run dev`.
- Setting `aria-expanded` in one place and `hidden` in another.
- Confusing `parseTrailId` (shape) with `findTrail` (existence).
- Reading `window.location.search` inside a pure function, which breaks tests.
- Escape works only when focus is inside the widget.

## Discussion questions

1. What should happen if the id is valid but the data request fails?
2. Should an unknown id return a 404 status? What can a static site do instead?
3. When would a modal need a focus trap that this menu does not?
4. What do you lose by using `<details>` instead of a custom accordion?

## Evidence checklist for the contract

- List -> detail flow and refresh on a detail URL
- Tests for valid, missing, invalid, unknown ids
- Explanation of the parameter data flow
- Menu working by keyboard, and an explanation of its synchronized state
- Same menu module reused on both pages
- The added feature, with tests
