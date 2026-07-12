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

Deep space background (`#181320`), off-white ink text, same four brand
accents as the light theme but re-lifted for legibility on dark: teal and
lilac lead, yellow decorates, purple is dimmed slightly since true brand
purple is too dark to read on black. Same two fonts as the rest of the site:
Bricolage Grotesque for display, Nunito for everything else.

## Fonts

Same as the light theme — loaded once, site-wide, in `styles.css`:

```css
--display: 'Bricolage Grotesque', sans-serif;  /* headings, titles, names */
--hand:    'Nunito', sans-serif;               /* body, labels, buttons */
```

## Tokens (`theme-studio`)

```css
--bg:      #181320;   /* deep space */
--text:    #f2eef8;   /* off-white ink */
--muted:   #a99fb8;
--card-bg: rgba(255,255,255,0.05);
--border:  rgba(255,255,255,0.14);

--accent1:      #3FA796;  /* teal — leads alongside lilac */
--accent1-text: #54c7ba;  /* teal LIFTED for dark bg — use this for teal text, not --accent1 */
--accent2:      #a582e6;  /* purple, lifted — true brand #502064 is unreadable on dark */
--accent3:      #FFBD35;  /* yellow — accent/graphic only, never text */
--accent4:      #8267BE;  /* lilac — secondary lead alongside teal */
```

Note the one deliberate deviation from the light theme: on `theme-studio`,
**teal and lilac are the leads**, not purple — brand purple is simply too
dark to read as text on a near-black background, so `--accent2` substitutes
a lifted violet. Yellow keeps the same "never text" rule in both themes.

For translucent tints, don't hardcode rgba — use
`color-mix(in srgb, var(--accentN) X%, transparent)` so it stays theme-correct.

## Standard page structure

Any new project page that wants the dark look follows this recipe
(`mosaic-data-viz`, `hilbert-curve-cat`, `vibe-shift` are the references):

1. `<body class="theme-studio">` and `<link rel="stylesheet" href="/styles.css">`.
2. Open the page with the shared header component (defined in `styles.css`):
   ```html
   <header class="proj-header">
     <h1>Project Title</h1>
     <p class="proj-sub">one-line subtitle</p>
   </header>
   ```
   Centered; title in the one brand teal (`--accent1-text`), subtitle in
   muted small caps.
3. Every chrome/UI color comes from the theme tokens — no hardcoded hex:
   `--bg`, `--text`, `--muted`, `--card-bg`, `--border`, `--accent1..4`,
   `--error`, `--success`.
4. Cards/panels: `background: var(--card-bg); border: 1px solid var(--border)`.
5. Data-encoding colors inside sketches/visualizations are exempt — they
   encode meaning and stay as-is.

## History (why theme-dusk exists but isn't the target)

The site used to run a three-theme cosmic system (`theme-light` / `theme-dusk`
/ `theme-studio`) on a different font stack (Rozha One / Spectral / Kalam).
That's been superseded: fonts are now Bricolage Grotesque + Nunito everywhere,
and the light surface is `theme-paper` (see THEME-GUIDE.md), not `theme-light`.
`theme-dusk` still exists in `styles.css` as the pre-redesign default/fallback
palette (teal-twilight) but new pages should not be built on it — pick
`theme-paper` for light or `theme-studio` for dark.

## Don'ts

- Don't hardcode colors that duplicate a token — always reference the
  variable, so a future palette edit at the top of `styles.css` propagates.
- No yellow text, ever, on either theme.
- Don't use raw brand purple (`#502064`) as text on dark surfaces — use
  `--accent2`'s lifted value instead.
- Don't build new pages on `theme-light` or `theme-dusk` — they're legacy.
