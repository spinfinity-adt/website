# Spinfinity light theme guide (`theme-paper`)

Self-contained instructions for styling a page or project so it matches
spinfinity.in's current light theme. Written to be handed to anyone (or any
session) with no other context. The source of truth is `styles.css` at the
website repo root — if this document and `styles.css` disagree, trust the CSS.

For the dark project-page theme (`theme-studio`), see **THEME-NOTES.md** in
this same folder — same brand and same palette rules, re-tuned for dark
surfaces.

## The one-paragraph version

Warm off-white paper background, dark ink text, four brand accents used with
discipline: **deep purple leads, teal seconds, yellow only decorates, lilac
supports**. Two fonts: Bricolage Grotesque for display/headings, Nunito for
everything else. Rounded corners, pill buttons, white cards with subtle
borders. Playful comes from color and shape — not from clutter.

## Fonts

```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700&display=swap');
--display: 'Bricolage Grotesque', sans-serif;  /* headings, titles, names */
--hand:    'Nunito', sans-serif;               /* body, labels, buttons — everything else */
```

Roles: page titles and card/item names use `--display` (weight 700).
Body copy, buttons, tags, and metadata use `--hand`; bold weights (700/800)
are encouraged for labels and small caps. Small metadata lines look best as
uppercase Nunito 700 with letter-spacing ~0.08em in the muted color.

## Tokens

```css
--bg:      #FBFBF8;   /* warm paper — the page background, keep it plain */
--text:    #232730;   /* ink */
--muted:   #5d616b;   /* secondary text, labels, captions */
--card-bg: #ffffff;   /* cards/surfaces */
--border:  #e5e3db;   /* hairline borders, dividers */

--accent1:      #3FA796;  /* teal — secondary (graphics, fills, frames) */
--accent1-text: #2E7A6E;  /* teal darkened to pass AA — use THIS for teal text */
--accent2:      #502064;  /* deep purple — PRIMARY accent */
--accent3:      #FFBD35;  /* yellow — decoration ONLY */
--accent4:      #8267BE;  /* lilac — supporting accent */
```

## Palette rules (the part that keeps pages consistent)

1. **Deep purple (#502064) is the primary.** Active states, primary buttons,
   emphasized inline text, links on hover, question/quote highlights.
2. **Teal is the secondary.** Fine as fills, frames, and graphics at #3FA796;
   as *text* always use the darkened #2E7A6E (contrast).
3. **Yellow (#FFBD35) is never text and never a text background behind long
   copy.** Use it for underline swipes, small highlights, borders, selection
   tint (`rgba(255,189,53,.35)`), tiny decorative marks.
4. **Lilac (#8267BE) supports** — pills, borders, decoration. Avoid as body text.
5. Body text is always full-contrast `--text`. Don't fake hierarchy with
   opacity; use `--muted` instead.
6. When several items need to cycle through colors (cards, tags, frames),
   rotate through all four accents in order: teal, lilac, yellow, purple.
   For soft tinted fills derive from the accent at ~10% alpha, e.g.
   `rgba(63,167,150,.10)`, `rgba(130,103,190,.10)`, `rgba(255,189,53,.14)`,
   `rgba(80,32,100,.08)`.

## Shape & component idioms

- **Radius:** ~11px for general surfaces (`--radius:11px`); larger feature
  cards can go to 16px. Buttons and tags are full pills (`border-radius:20px+`).
- **Cards:** white `--card-bg`, 1px `--border` (or a 2px accent frame when the
  card is the star of the page), roomy padding. The signature playful shadow
  is a *flat offset* shadow in the card's accent at ~25% alpha —
  `box-shadow: 0 4px 0 rgba(63,167,150,.24)` — deepening to `0 8px 0` on
  hover with a small `translateY(-4px)`. Avoid big soft blurry shadows.
- **Buttons/filters:** Nunito 700 pills. Inactive: white bg, `--border`
  border, `--muted` text. Hover: purple border + purple text. Active/primary:
  solid purple bg, white text.
- **Tags/badges:** small pills with a 10%-alpha accent tint background and
  full-contrast `--text`, or bordered pills in the accent color.
- **Section labels:** small uppercase Nunito, `--muted`, generous
  letter-spacing, optionally a thin gradient rule trailing off to the right.
- **Background:** plain `--bg`. A very faint SVG noise grain overlay is fine
  (the site uses one at ~3% effective opacity, behind content, never over text).
  No gradients, no dot grids.
- **Motion:** short and soft — fade-up entrances (~0.35–0.7s ease), gentle
  hover lifts. A tiny rotate (±1°) on hover of playful elements is on-brand;
  permanent tilts are not (retired).

## Hooking into the shared stylesheet vs. standalone

- **Page lives inside the website repo:** link `/styles.css`, set
  `<body class="theme-paper">`, and use the tokens (`var(--accent2)` etc.)
  instead of hardcoding colors. Don't keep a local `:root` palette that
  shadows the tokens. (`theme-light` exists with the same palette; new light
  pages should prefer `theme-paper`, which also carries logo/CTA styling.)
- **Standalone project (own repo / no shared CSS):** copy the font import and
  the token block above into the project's stylesheet verbatim, then follow
  the palette rules. Keep the variable *names* the same so the project can be
  folded into the shared system later.

## Reference implementation

`math-creatures/index.html` in the website repo is the current best example
of a light project page on this system: theme-paper body, token-driven local
styles, accent-cycling card frames with flat offset shadows, tinted image
mats, Bricolage names with uppercase Nunito metadata.

## Don'ts

- No yellow text, ever. No lilac body text.
- No hardcoded old-palette colors (`#0c8294`, `#7a52c4`, ink-grays like
  `#1f2b30` — use the tokens).
- No heavy drop shadows, no cork-board/pushpin skeuomorphism, no permanent
  card rotations.
- Don't restyle copy or change wording while theming — content is sacred.
