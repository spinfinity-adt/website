# Spinfinity — cosmic theme system applied

## New type system
Rozha One (display/logo/headlines) · Spectral (body) · Kalam (hand: nav, labels, buttons).
All loaded once in styles.css.

## Three themes (set with a class on <body>)
- theme-light  — airy daytime sky, for educator pages (currently: about)
- theme-dusk   — teal twilight nebula, the neutral hub (currently: home, blog, projects)
- theme-studio — deep space, for Art × Data × Tech / creative work (defined, ready for
                 the project sub-pages when we bring them onto the system)

Hero colour teal runs through all three; yellow = starlight, violet = nebula.

## To change a page's theme
Edit the body tag, e.g.  <body class="theme-light">  ->  <body class="theme-dusk">

## To restyle the whole site
Edit the tokens at the top of styles.css. Each theme block sets --bg, --text,
--muted, --accent1..4, --card-bg, --border, --nav-bg.

## Readability fixes included
- Body text now uses full-contrast --text (no more 60% opacity).
- The grain overlay sits BEHIND content (z-index 0), not on top of the text.
- nav recolours per theme automatically (was hardcoded dark).

## Files changed
styles.css (rewritten) · nav.html (now token-driven) ·
index.html, blog.html, projects.html (theme-dusk) · about.html (theme-light)

## Not touched this pass
footer.html, nav.js, and all project sub-pages (math-creatures, climate-stripes, etc.)
— those come onto the shared themes in a later, deliberate pass.

## Note
about.html is set to theme-light. If you'd rather it match the hub, change its
body class to theme-dusk — one word.

## Standard structure for dark project pages (July 2026)
Any new project page that wants the dark look follows this recipe
(mosaic-data-viz, hilbert-curve-cat and vibe-shift are the references):

1. `<body class="theme-studio">` and `<link rel="stylesheet" href="/styles.css">`.
2. Open the page with the shared header component (defined in styles.css):
   ```html
   <header class="proj-header">
     <h1>Project Title</h1>
     <p class="proj-sub">one-line subtitle</p>
   </header>
   ```
   Centered; title in the one brand teal, subtitle in muted small caps.
3. Every chrome/UI colour comes from the theme tokens — no hardcoded hex:
   --bg, --text, --muted, --card-bg, --border, --accent1..4, --error, --success.
   For translucent tints, use `color-mix(in srgb, var(--accentN) X%, transparent)`.
4. One teal only for text: `--accent1-text` (#54c7ba on studio). `--accent1` is for
   teal fills/borders. Yellow (--accent3) is accent/graphic only — never text.
   Purple --accent2 and lilac --accent4 are the secondary accents.
5. Cards/panels: `background: var(--card-bg); border: 1px solid var(--border)`.
6. Data-encoding colours inside sketches/visualisations are exempt — they encode
   meaning and stay as-is.
