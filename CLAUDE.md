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

## GitHub Pages Deployment

Push to `main` branch → GitHub Actions automatically runs `jekyll build` and publishes to `gh-pages` branch. Check build status and logs at GitHub repo → Actions tab.

**DNS:** Configured to publish to `simonestrizzolo.github.io` (no manual deployment needed).

## Development Notes

- **Live server:** Use `--livereload` during editing—changes appear instantly in browser
- **Styling:** Modify files in `_sass/` (SCSS); never edit compiled CSS in `assets/css/main.scss` directly
- **Images:** Compress before adding (`squoosh.app`, `tinypng.com`); keep names simple (no spaces, no special chars)
- **Markdown:** Full CommonMark + Jekyll-specific features (Liquid tags, syntax highlighting via Rouge)
- **Testing:** No test suite—verify in browser at http://localhost:4000 before pushing
