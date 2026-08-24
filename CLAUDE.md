# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal blog and portfolio website built with **Jekyll** (a static site generator) and the **Millennial** theme, published via GitHub Pages. Jekyll converts Markdown files into a static HTML site—no database, no runtime server.

## Architecture

**Jekyll processing pipeline:**
- Markdown files in `_posts/` → HTML via Liquid templates
- Static pages in `pages/` → HTML via Liquid templates
- SCSS in `_sass/` → compiled CSS in `assets/css/main.scss`
- Plugins enabled: jekyll-paginate, jekyll-feed, jekyll-sitemap, jekyll-seo-tag

**Key directories:**
- `_posts/` — Blog articles (YYYY-MM-DD-title.md format, Jekyll-specific)
- `pages/` — Static pages (About, contact, category pages)
- `_layouts/` — Liquid HTML templates (post, page, home, category)
- `_includes/` — Reusable Liquid components (header, footer, social icons, comments)
- `_sass/` — SCSS stylesheets compiled into CSS
- `_data/settings.yml` — Configuration for menu, social icons, analytics (no code changes needed)
- `_config.yml` — Jekyll settings (paginate, markdown parser, plugin config)
- `assets/img/` — Image files referenced in posts

**Theme source:** Millennial v2.0.0 (gem dependency, do not edit theme files directly in _layouts, _includes, _sass—override only if necessary)

## Commands

```bash
# Install dependencies (one-time, or after Gemfile changes)
bundle install

# Preview locally at http://localhost:4000
bundle exec jekyll serve

# Preview with hot-reload (preferred for development)
bundle exec jekyll serve --livereload

# Build static site to _site/ (GitHub Actions runs this on push)
bundle exec jekyll build
```

## Writing Content

**Creating a new blog post:**
1. Create file in `_posts/YYYY-MM-DD-title.md`
2. Include front matter (layout, title, author, categories, tags, image)
3. Add image to `assets/img/` if needed
4. Push to main → GitHub Actions auto-publishes

**Creating a static page:**
1. Create file in `pages/page-name.md`
2. Set `layout: page`, `title`, `permalink`
3. Add to menu in `_data/settings.yml` if desired

**Important:** Posts are only published if their date is ≤ today (future posts are withheld until their date arrives—useful for scheduling).

## Configuration

**Site metadata** → edit `_config.yml` (forces full rebuild)
- `title`, `description`, `author`
- `paginate` (posts per page)
- `permalink` (post URL format)

**Visual & behavior settings** → edit `_data/settings.yml` (no rebuild needed)
- `menu` — navigation items
- `social` — icon links (Font Awesome 6)
- `disqus.comments`, `google-ID` — optional integrations
- `pagination.next_page`, `pagination.previous_page` — paging labels

## Git Workflow

- When merging a feature branch (`feat/...`) into `main`, always **squash merge** (`git merge --squash`), not a regular merge — keeps `main` history to one commit per feature.
- Don't delete the feature branch after merging until the user explicitly confirms.

## GitHub Pages Deployment

Push to `main` branch → GitHub Actions automatically runs `jekyll build` and publishes to `gh-pages` branch. Check build status and logs at GitHub repo → Actions tab.

**DNS:** Configured to publish to `simonestrizzolo.github.io` (no manual deployment needed).

## Development Notes

- **Live server:** Use `--livereload` during editing—changes appear instantly in browser
- **Styling:** Modify files in `_sass/` (SCSS); never edit compiled CSS in `assets/css/main.scss` directly
- **Images:** Compress before adding (`squoosh.app`, `tinypng.com`); keep names simple (no spaces, no special chars)
- **Markdown:** Full CommonMark + Jekyll-specific features (Liquid tags, syntax highlighting via Rouge)
- **Testing:** No test suite—verify in browser at http://localhost:4000 before pushing

## Local Setup on Windows

- Use **Ruby+Devkit** from rubyinstaller.org, not the Microsoft Store Ruby — the Store version lacks the MSYS2 toolchain needed to compile native gem extensions (`bundle install` fails on gems like `bigdecimal`).
- Do not add a `kramdown:` / `math_engine:` key to `_config.yml` unless it's a real kramdown math engine gem name — an invalid value (e.g. `nil` as a literal string) breaks local builds on newer kramdown even though GitHub Pages' older pinned kramdown tolerates it silently.

## Low-Visibility Collection Pages Pattern

For content that shouldn't clutter the main menu (e.g. `/marvel/collezione`, `/marvel/personaggi`, `/starwars/collezione`, `/dccomics/collezione`): keep data in `_data/*.yml`, render via `pages/*.md` with Liquid loops, and never add the page to `_data/settings.yml` menu — link to it only from a post or another page. Example: the Marvel comics companion (`_data/marvel-comics.yml`, `_data/marvel-storie-canoniche.yml`), reachable only from the "Le mie collezioni nerd" post. Naming convention: `_data/*.yml` files are prefixed by franchise (`marvel-*`, or standalone `starwars.yml`/`dc-comics.yml`) so a generic-sounding name never hides which collection it belongs to; the shared rendering logic lives in `_includes/collezione-sezione.html`, with a thin per-franchise wrapper include (e.g. `_includes/marvel-sezione.html`) supplying `personaggi_link`/`data_source`/`grid_id`.

## CSS-only Expand/Collapse (`:target`) Pattern

For a grid of items where clicking one should reveal its details without JS and without the clicked item jumping around (bad on mobile): don't use `<details>`/`flex-basis:100%` (the opened item reflows to fill its row, so the tap target moves and users don't know where to tap to close it). Instead:
- Icons are plain `<a href="#{{ item.id }}">` in a static grid that never changes size/position.
- Each item's full content lives in a `.panel` (`display:none` by default) placed once, elsewhere in the page, with the matching `id`.
- `.panel:target { display:block; }` shows the right one — and since a URL can only have one fragment, at most one panel is ever open (no extra logic needed).
- Give the panel a visible "✕ Chiudi" link back to a stable anchor (e.g. the grid container's id) — this is the *only* way to close on mobile, since tapping outside doesn't clear `:target`.
- Set `scroll-margin-top` on the panel to match any fixed/sticky header height, otherwise the header covers the top of the panel (and the close link) when the browser scrolls to it.
- Bonus: cross-links between items (e.g. "storie collegate") are just `<a href="#other-id">` — switching the fragment automatically closes the old panel and opens the new one.
- Example: `pages/marvel-collezione.md`.

## Liquid Gotcha: Hyphenated Data Keys

A YAML key with a hyphen (e.g. `link-mu:`) cannot be accessed as `{{ item.link-mu }}` — Liquid parses `-` as subtraction. Use bracket notation: `{{ item["link-mu"] }}` / `{% if item["link-mu"] %}`.

## Interactive Maps & SVG Overlays (Experimental)

**Goal:** Create interactive circuit maps with clickable curve annotations (e.g., for Imola post).

**Approaches tested:**

1. **PNG + JavaScript calibrator** (simplest)
   - Use PNG image + JavaScript click handler to get pixel coordinates
   - Map coordinates to SVG viewBox
   - Pros: simple, works with any image
   - Cons: requires manual coordinate calibration for each curve

2. **SVG vettorization + embedded points**
   - Convert PNG → SVG using online service (Vectorizer.io) or Potrace
   - Embed SVG directly in HTML + add `<circle>` elements as interactive points
   - Use JavaScript for hover tooltips
   - Pros: vettoriale, scalable, clean
   - Cons: SVG vettorization quality varies; services like Vectorizer.io may produce overly complex files (1.4MB+)

3. **Potrace (command-line)**
   - `potrace.exe imola-original-layout.png -s -O 1.5 -o imola-original-layout.svg`
   - Produces cleaner, simpler SVG than online services
   - Good for circuit diagrams where you want simplified forms

**Key coordinates (Imola 1953-1972 layout, SVG 1875×1110):**
- Tamburello: ~1149, 207
- Rivazza: ~1205, 518
- Acque Minerali: ~947, 490
- Piratella: ~687, 640
- Tosa: ~335, 640

**Tools & Resources:**
- Vectorizer.io: online PNG→SVG (free, limited quality)
- Potrace: command-line PNG→SVG (better quality for simplified shapes)
- Inkscape: manual SVG editing and bitmap tracing (Path → Trace Bitmap)
