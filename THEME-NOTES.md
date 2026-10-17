# Spinfinity dark theme guide (`theme-studio`)

Self-contained instructions for styling a page or project so it matches
spinfinity.in's dark project-page look (Art × Data × Tech / creative work).
Written to be handed to anyone (or any session) with no other context. The
source of truth is `styles.css` at the website repo root — if this document
and `styles.css` disagree, trust the CSS.

For the light theme (`theme-paper`), see **THEME-GUIDE.md** in this same
folder — same brand, same rules, different surface. Read that doc's palette
rules section too; it applies here as well (purple primary, yellow never
text, etc.), just re-tuned for dark surfaces below.

## The one-paragraph version

"Ink & paper": the paper theme after dark. Warm ink-charcoal background
(`#1c1a20`) with a faint paper grain, cream text, and the same brand roles as
the light theme re-lifted for legibility on dark: purple leads (one coloured
word per title), teal supports (subtitle, underline, offset shadows), yellow
decorates. No glows anywhere: flat borders and offset shadows only. Same two
fonts as the rest of the site: Excon for display, Nunito for everything else.

## Fonts

Same as the light theme — loaded once, site-wide, in `styles.css`:

```css
--display: 'Excon', sans-serif;                /* headings, titles, names */
--hand:    'Nunito', sans-serif;               /* body, labels, buttons */
```

## Tokens (`theme-studio`)

```css
--bg:      #1c1a20;   /* warm ink-charcoal (+ paper-grain SVG on body, in styles.css) */
--text:    #f3efe6;   /* cream, like the paper */
--muted:   #b0aaa0;
--card-bg: #24222a;
--border:  rgba(243,239,230,0.13);

--accent1:      #4FA393;  /* teal — fills/graphics */
--accent1-text: #62b3a4;  /* teal lifted for dark bg, kept close to brand teal (not mint) */
--accent2:      #b996ec;  /* purple, lifted — the text lead; true brand #502064 is unreadable on dark */
--accent3:      #FFBD35;  /* yellow — accent/graphic only, never text */
--accent4:      #8267BE;  /* lilac — secondary lead alongside teal */
```

Same roles as the light theme: **purple leads, teal supports.** Brand purple
is too dark to read on the dark ground, so `--accent2` is a lifted violet.
Yellow keeps the same "never text" rule in both themes. All text tokens pass
WCAG AA on `--bg` (text 15:1, muted 7.5:1, purple 7.1:1, teal 7:1).

The body also gets a soft hairline + shadow under the nav (`.sf-nav`) so the
plum end of the nav bar doesn't melt into the dark background.

For translucent tints, don't hardcode rgba — use
`color-mix(in srgb, var(--accentN) X%, transparent)` so it stays theme-correct.

## Standard page structure

Any new project page that wants the dark look follows this recipe
(`mosaic-data-viz`, `hilbert-curve-cat`, `vibe-shift` are the references):

1. `<body class="theme-studio">` and `<link rel="stylesheet" href="/styles.css">`.
2. Open the page with the shared header component (defined in `styles.css`):
   ```html
   <header class="proj-header">
     <h1>Project <span class="w">Title</span></h1>
     <p class="proj-sub">one-line subtitle</p>
   </header>
   ```
   Centered; cream title in bold Excon with one word wrapped in
   `<span class="w">` (turns purple), a short tilted teal underline drawn
   automatically under it, and the subtitle in teal small caps.
3. Every chrome/UI color comes from the theme tokens — no hardcoded hex:
   `--bg`, `--text`, `--muted`, `--card-bg`, `--border`, `--accent1..4`,
   `--error`, `--success`.
4. Cards/panels: `background: var(--card-bg); border: 1px solid var(--border)`.
   Buttons: outlined pill in `--accent2` with cream text and a flat teal offset
   shadow (`box-shadow: 4px 4px 0 var(--accent1-text)`), nudging up-left on hover.
   Section headings can alternate purple / teal.
5. Data-encoding colors inside sketches/visualizations are exempt — they
   encode meaning and stay as-is.

## History (why theme-dusk exists but isn't the target)

The site used to run a three-theme cosmic system (`theme-light` / `theme-dusk`
/ `theme-studio`) on a different font stack (Rozha One / Spectral / Kalam).
That's been superseded: fonts are now Excon + Nunito everywhere,
and the light surface is `theme-paper` (see THEME-GUIDE.md), not `theme-light`.
`theme-dusk` still exists in `styles.css` as the pre-redesign default/fallback
palette (teal-twilight) but new pages should not be built on it — pick
`theme-paper` for light or `theme-studio` for dark.

## Don'ts

- Don't hardcode colors that duplicate a token — always reference the
  variable, so a future palette edit at the top of `styles.css` propagates.
- No yellow text, ever, on either theme.
- No glows (`box-shadow: 0 0 Npx <colour>`, coloured blur shadows). Use flat
  offset shadows or plain borders — that's what keeps dark mode feeling papery
  instead of like a template.
- Don't use raw brand purple (`#502064`) as text on dark surfaces — use
  `--accent2`'s lifted value instead.
- Don't build new pages on `theme-light` or `theme-dusk` — they're legacy.
