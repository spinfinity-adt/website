# Spinfinity — Brand & Design Guidelines

**Source of truth for spinfinity.in.** Paste into Claude Code, reference in chats. Verified against the live repo (`spinfinity-adt/website`: `styles.css`, `index.html`, and every page's `<body>` class, checked by rendering the pages) on 2026-11-10. Where the live site and older notes disagreed, **the live site wins** and the difference is flagged under "Open / to reconcile."

Companion docs in the repo root: `THEME-GUIDE.md` (light theme, `theme-paper`) and `THEME-NOTES.md` (dark theme, `theme-studio`). For exact values, `styles.css` always wins.

---

## 1. What Spinfinity is

Aditi Bhat's practice — hula hoops, poi, flow arts and data storytelling as a way into math, movement, art and performance. The site has a **dual identity**: an educator side (workshops, student work) and a creative-practitioner side (creative code, data performances, LED/fire). Jags (Jagrut, Aditi's partner) drives the build and shot some photography.

Tagline, verbatim: *using the hula hoop as a portal to explore the worlds of math, movement, art and data.*

---

## 2. Palette (canonical)

Color Hunt `FFBD35-3FA796-8267BE-502064`. Exposed as CSS tokens; **every component reads tokens, never hardcoded hex**, so one theme block restyles the whole site.

| Role | Token | Hex | Use |
|---|---|---|---|
| **Primary** | `--accent2` | `#502064` deep purple | CTAs, "spin" in the hero wordmark, links, primary emphasis |
| **Secondary** | `--accent1` | `#3FA796` teal | graphics, fills, underlines |
| Secondary (text) | `--accent1-text` | `#2E7A6E` | teal **on text** — darkened to pass WCAG AA on paper. Use this, not `#3FA796`, for teal words incl. "finity" |
| **Accent — never on text** | `--accent3` | `#FFBD35` yellow | selection highlight, small graphic accents, hover fills, the hero underline. **Never colour text with this.** |
| **Supporting accent** | `--accent4` | `#8267BE` lilac | pills, borders, decoration, knot-tittles. Avoid as body text (borderline contrast); not a text lead like purple/teal |
| Ground | `--bg` | `#FBFBF8` paper | |
| Ink | `--text` | `#232730` | |

**Contrast rule:** anything on text must pass AA (4.5:1) on `#FBFBF8`. Teal fails as text → use `--accent1-text`.

**Why this palette:** deliberately differentiates from papercranelab.com (teal/pink/yellow in a bright *candy* register, where Aditi is Lab Manager). Spinfinity sits in a deep-register **plum + teal**, ink-forward, colour-as-annotation.

**Data colours are not theme colours.** Never retheme palettes that encode data: mosaic tiles, the climate stripes (Show Your Stripes 16-step blue→red), the 100-days cat medium/maker colours, the IndiaFOSS sticker greens. Recolour only the chrome around them.

---

## 3. Typography (canonical — **changed since early notes**)

- **Display / headings / logo:** **Excon** (Alisa Nowak / Indian Type Foundry, via Fontshare, ITF Free Font License, **self-hosted** at `/fonts/excon-500.woff2` and `/fonts/excon-700.woff2`, live since 2026-10-17). Token `--display`. Two weights only: 500 and 700. *(It replaced Bricolage Grotesque, which replaced Rozha One. Aditi loved Bricolage for being quirky and readable, but dropped it because it's overused on vibe-coded sites.)*
- **Everything else (body, UI, nav, labels):** **Nunito**, from Google Fonts. Token `--hand`.
- **One type system everywhere:** no page imports its own fonts; every page links `/styles.css` and uses the two tokens. If a p5 sketch draws text, point `textFont()` at Nunito.
- **What she looks for in a display face:** quirky *and* readable, with curves ("spinning is all about curves"). It must also sit well on the real wordmark: short x-heights and connected scripts throw off the knot-tittles.
- **Rejected display faces:** Rozha One, Bricolage Grotesque, Space Grotesk (AI-startup-saturated), Syne, Fraunces, DM Serif Display, Instrument Serif, Kalam, and Onest (briefly live: readable but lost the quirk). Excon's final shortlist was Pally, Roundo, Geologica and Host Grotesk; she picked Excon as sturdy, curvy, and rare on vibe-coded sites.

> Note: Spectral (an earlier body serif) and the `--serif` token are **gone** from the whole repo. Body is Nunito.

---

## 4. Logo & wordmark

- **Mark — the "inspin knot":** a four-petal endless knot, one continuous woven path, built from one petal (`M66 54 C40 44 32 6 60 6 C88 6 80 44 54 54`) rotated 0/90/180/270° around (60,60), viewBox `-6 -6 132 132`, round caps. **Deep purple strokes (`--mk-main`) with a teal drop shadow (`--mk-shadow`).**
- **Wordmark "spinfinity":** lowercase, Excon 700, always on one line. Hero treatment as it renders: **"spin" = purple (`--accent2`), "finity" = teal (`--accent1-text`)**, with a flat **yellow** (`--accent3`) underline, 4px, tilted, that draws in on load. *(`index.html` still has its own purple "finity" and a purple→yellow gradient underline, but the `theme-paper` rules in `styles.css` override both. That leftover markup is dead code.)*
- **The three i's** wear hairline inspin-knots as tittles (dotless-ı `ı` + `aria-label="spinfinity"` so it reads/copies as the real word). Tittles render **lilac** (`--tit`, fallback `--accent4`) everywhere, the hero included. *(The hero markup sets `stroke="var(--text)"` on the paths, but the CSS rule in `styles.css` beats that attribute, so they show lilac. Override per-tittle with `--tit` on the `.it` span.)*
- **One-colour fallback** exists (knot in a single ink/purple) for stamps, favicons, embroidery.
- **The tilted underline is a site-wide motif:** 4px, rounded ends, `rotate(-1.2deg)`. It's yellow under the hero wordmark, teal under every `theme-studio` project title, and teal under "Aditi Bhat" on About. Reuse it rather than inventing new underline styles.

---

## 5. Themes (live state)

Four `<body>` class blocks in `styles.css`. Set the class on `<body>`; edit the block once to restyle every page wearing it.

| Class | Ground | Pages using it today |
|---|---|---|
| `theme-paper` | paper `#FBFBF8` | the hub (home, projects, about, blog), plus math-creatures, hands-of-vizchitra, indiafoss2026, hoop-school-math-edition |
| `theme-light` | paper (same palette as paper) | hoop-trick-shapes only |
| `theme-studio` | "ink & paper": warm ink-charcoal `#1c1a20`, faint paper grain, cream text | climate-stripes, mosaic-data-viz, hilbert-curve-cat, vibe-shift |
| `theme-dusk` | cosmic teal `#123f4a` | **no page.** Legacy; it survives only as the `:root` default, so an unclassed page still renders |

`100-days-of-making` has no theme class: it keeps its own warm paper-craft colours by choice. vibe-shift likewise keeps its own neutral-dark colours inside `theme-studio`. Don't "standardise" either without asking.

**`theme-studio` rules ("paper after dark"):**
- Purple leads, lifted to `#b996ec` (`--accent2`) because true brand purple is unreadable on dark. Teal supports (`--accent1-text` `#62b3a4`). Yellow still never colours text.
- **No glows** anywhere: flat borders and offset shadows only.
- **Project titles** (`.proj-header`) are cream with **exactly one purple word** (`<span class="w">`), a tilted teal underline below, and a teal small-caps subtitle.
- **climate-stripes is the one exception to the plain ground.** Its background is a page-length gradient taken from the stripes: darkest stripe blue `#08306b` at the top, the theme's ink in the middle, darkest stripe red `#67000d` at the bottom. Each end is mixed 55% into the ink so cream text stays readable. It scrolls with the page: the further you read, the warmer it gets.

**Nav bar** is one theme-independent gradient bar (plum→deep-teal, `#502064`→`#2E7A6E`), identical on every page. Nav wordmark: **"spin" = yellow (`--nav-spin`), "finity" = lifted lilac (`--nav-finity` `#c9adf5`)** for legibility on plum.

---

## 6. Layout (new — set 2026-10-17)

Aditi's rule: **the page should fill the viewport without leftover space on one side.** Both of these read as mistakes:
- a narrow (~1000px) centred column floating in empty space (the old default, and why the site "didn't fill the viewport");
- content pushed to the left edge with text capped at reading width, leaving an awkward empty strip on the right.

**What works:**
- **One centred container (~1320px, `--wrap`) whose columns fill it edge to edge**, so the side margins are equal. Size it to its content: photo/visual column + text column + gap.
- **Text and its visual side by side**, usually 50/50 (`.side-by-side`). Don't cap text narrower than its column unless a visual sits beside it.
- Secondary blocks (chip rows, CTA boxes, link rows) end on the **same two edges** as everything above them.
- **Two columns, not three.** Three text columns at full screen was "too much."
- Prose-only runs get split into grids rather than one long narrow column: the climate-stripes steps sit in a 2×2 grid, and its "Thank you" and "Watch & read" pair up.
- Media-heavy pages can instead use the full width on the nav's gutter, with visuals running edge to edge. Mosaic does this, and Aditi confirmed it's fine as is.

**Shared tokens and classes in `styles.css`:**
- `--gutter` — `clamp(1.2rem,4vw,3rem)`, the same side gutter as the nav.
- `--measure` — 70ch reading width.
- `.frame` — full width, padded by `--gutter`.
- `.measure` — caps an element at `--measure`.
- `.proj-header.split` — the left-aligned project header: title block plus an optional `.proj-aside`. The centred `.proj-header` stays for hilbert.

**Breakpoints:**
- **Wider than 1100px:** side-by-side rows show both columns.
- **1100px and below:** they stack, and text uses the full column.
- **Around 700–760px:** phone layout, one column.
- **Phones:** never scroll sideways. The one exception is the mosaic canvas, a fixed 1000px p5 sketch, which scrolls on its own.

**Per-page layout state:**

| Page | Layout |
|---|---|
| climate-stripes, about, hoop-school-math-edition | centred 1320px container |
| mosaic-data-viz | full width on the gutter; title, link and legend beside the mosaic (Aditi: "fine, leave it") |
| hilbert-curve-cat | full-screen tool layout (commit 9ad1555) |
| math-creatures | **don't change** (Aditi's explicit call) |
| home, projects, blog, vibe-shift, hoop-trick-shapes | not yet reviewed under these rules |

---

## 7. Structure & content decisions

- **Home hero:** left text column + a right-half bleed **video** (`/aditi-spiral.MOV`, Aditi hooping on a rooftop; muted/playsinline autoplay, starts at 1s, loops). Aditi's face is **not** a static hero portrait.
- **Lissajous canvases:** removed from the home hero (Claude-generated; it fought the ground; Aditi may make her own) and from behind climate-stripes. Don't add generated background decoration.
- **climate-stripes — tried and rejected:** a scroll-driven blue→red ambient glow, and a fixed "stripes rail" used as a year-marking scrollbar. The stripes gradient ground (§5) replaced both.
- **Tagline:** the "tracing equations in the air" line is gone. In the main tagline, "data" is styled identically to "math, movement, art".
- **About page:**
  - **Heading:** one line, "Hello! I'm **Aditi Bhat**", with the name in bold purple and a tilted teal underline under it. The earlier "hi, I'm" label floating over the photo was rejected.
  - **Roles:** a row of pills.
  - **Caption:** her wording, verbatim: *"A shot from juggling in Cubbon Park. A hoop for each dimension of my professional background: hula hooper and flow artist since 2005, computer science engineer since 2015, design researcher and educator since 2021, and learner/explorer, till forever ∞"*
- **Tag pills:** removed from home; kept on About (the roles row, recoloured off yellow). *The blog cards still show tag pills — see §10.*
- **Planet-cat:** placeholder removed. Aditi will draw her own; the hoop-motion interaction is to be rethought (cursor-chase felt off).
- **Footer:** exactly one, the shared `footer.html`. Never hand-write a footer into a page: climate-stripes had a duplicate whose CSS also stripped the shared footer's padding.

---

## 8. Hard technical constraints (don't break)

- Pure static HTML/CSS/JS on **GitHub Pages**, no build step. Repo `spinfinity-adt/website`.
- **`.nojekyll` is load-bearing** — disables Jekyll, whose `{{`/`{%` collides with p5.js. Never remove.
- **Images:**
  - Bulk/large images go through the **jsDelivr CDN** pinned to a commit (`https://cdn.jsdelivr.net/gh/OWNER/REPO@<commit>/...`), never hotlinked from `raw.githubusercontent.com`.
  - Large galleries: ~500px WebP thumbnails for the grid, full-res only in the lightbox (hoop-trick-shapes does this).
  - Never inline base64; extract to `images/`.
- Shared **nav + footer** are partials injected by `nav.js` into `#sf-nav-mount` / `#sf-footer-mount`; include `<script src="/nav.js"></script>` once. Edit `nav.html` / `footer.html` to change them site-wide.
- **Data-driven pages:** `projects.html` and galleries render cards from a JS array — add/reorder/remove one object, markup + accent + animation are generated.
- **Pipelines:**
  - hoop-trick-shapes: add drawings to the images repo, run `build.py`, push.
  - hands-of-vizchitra: run `update-photos.py` to sync sheet photos and the embedded CSV.
  - vibe-shift: frozen as a static gallery since Supabase was removed. `git revert ebcbe8d` restores uploads.
- Leave **p5 sketches and data-encoding palettes** alone; recolour only chrome. If a sketch draws text, point `textFont()` at Nunito.
- Vector authoring in **Affinity Designer** (not Photo — it rasterizes on merge).

---

## 9. Design principles, voice & how to work with Aditi

- **"Annotated reality"** is the design language *and* Aditi's existing practice: a quiet crafted ground + personality from her own hand-drawn circles, arrows and math annotations over real photos. Personality comes from **her marks**, not generated decoration. (Kin to Lynn Fisher / Maggie Appleton; pure minimalism was too flat.)
- **Chrome must not outcompete content** — the core critique behind every rejected direction.
- **Her copy is sacred — verbatim.** Never paraphrase, reword or "improve" it. If an edit makes a line read oddly, flag it; let her decide. When she asks for new copy, offer options and use her wording once she gives it (the About caption went this way).
- **Show, don't describe** — she reacts to rendered specimens, not adjectives. Build a mockup/toggle before committing to real files. Visual-first, iterate v1→v2→v3.
  - Mock on a scratch copy as variant pages (e.g. `index-mock.html`) next to the current one, so she can switch between them.
  - **Show it in the browser, not in long full-page screenshots** — those don't help her judge.
- **Scope before coding.** For multi-part asks, lay out what each part buys and risks, recommend, and let her pick. The real need is often smaller than the spec.
- **Verify before pushing:**
  - Check desktop (~1600px), a mid width (~1100px) and a phone (375px).
  - Toggle views and resize; a static screenshot isn't enough.
  - Confirm her visible text is unchanged.
- **Commit and push only when she says so.**
- **Prefer targeted diffs** over regenerating whole files.
- **Discuss first, build after alignment.** One focused question at a real decision point, not walls of analysis. Slow, step-by-step, collaborative.
- **Voice:** playful math puns she flags herself ("poi-ssibilities", "sPInfinity"), rigorously humble, citation-rich (Francis Su, Eugenia Cheng, Strogatz, 4Es of cognition), credits collaborators by name, sits honestly with tensions (incl. ambivalence about AI). Pedagogy: anti-banking-model, embodied/feminist, circles-based, closes with personal letters to students.
- **Don't make her re-feed context** — this doc exists so established decisions carry forward.

---

## 10. Open / to reconcile (not yet decided)

1. **Nav vs hero wordmark colours differ.** Nav: yellow "spin" + lilac "finity" on plum. Hero: purple "spin" + teal "finity" on paper. Intentional (the bar needs legibility on plum) or drift to unify?
2. **Four themes still exist, two barely used.** `theme-light` is near-identical to `paper` and now only on hoop-trick-shapes; `theme-dusk` is on no page. Earlier intent was to collapse toward two (paper + studio). Move hoop-trick-shapes to `paper`, then retire `light` and `dusk`?
3. **Knot-tittle colour:** every tittle renders lilac, but the hero markup still says ink (`stroke="var(--text)"`, overridden by CSS). Keep lilac and delete the dead attribute, or switch the hero to ink on purpose?
4. **Dead hero CSS in `index.html`:** its purple "finity" and purple→yellow gradient underline are overridden by `styles.css`. Clean up once item 3 is settled.
5. **Blog cards still show tag pills** (math, data + making, learning, embodied cognition, origin), though older notes say tags were removed from the blog. Keep or remove?
6. **Pending from project notes:**
   - jsDelivr swap for math-creatures: it still loads 24 images from `raw.githubusercontent.com`. *(Mosaic's photos are local files, so it needs no swap; hoop-trick-shapes is already on jsDelivr with WebP thumbnails — done.)*
   - climate-stripes: the visible copy and social preview already say "175 years"; only the page's `<meta name="description">` still says "165 years" (her edit to confirm).
   - climate-stripes credit line reword (her copy, waiting on her wording).
7. **Pages not yet given the layout pass (§6):** home, projects, blog, vibe-shift, hoop-trick-shapes.
