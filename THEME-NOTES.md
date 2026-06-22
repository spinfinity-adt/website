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
