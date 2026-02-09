# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SRTdash is a static Bootstrap 4 admin dashboard HTML template by Colorlib. It has 46+ HTML pages, no build system, no package.json, and no server-side code. All assets are plain HTML/CSS/JS served directly.

## Running Locally

No build step required. Open any HTML file directly or use a local server:

```bash
# Python
cd srtdash && python3 -m http.server 8000

# Node
npx http-server srtdash

# Then visit http://localhost:8000/starter.html
```

## Architecture

### Directory Layout

- `srtdash/` — All template HTML pages and assets
- `srtdash/starter.html` — Clean starting template (use as base for new pages)
- `srtdash/index.html` / `index2.html` / `index3.html` — Three dashboard variants (ICO, Ecommerce, SEO)
- `srtdash/assets/css/` — Stylesheets (no preprocessor)
- `srtdash/assets/js/` — Scripts (no bundler, no modules)
- `documentation/` — Standalone documentation site (separate from template)

### Page Structure

Every page follows the same layout skeleton:

```
#preloader
.page-container
  .sidebar-menu          → Left nav with MetisMenu (#menu)
  .main-content
    .header-area         → Top bar with search, notifications, profile
      #sticky-header     → Becomes sticky on scroll
    .page-title-area     → Breadcrumbs and page heading
    .main-content-inner  → PAGE CONTENT GOES HERE
  footer
.offset-area             → Right-side settings panel (toggled by .settings-btn)
```

### CSS Load Order (in `<head>`)

1. `bootstrap.min.css` — Bootstrap 4 framework
2. Icon CSS — `font-awesome.min.css`, `themify-icons.css`
3. Plugin CSS — `metisMenu.css`, `owl.carousel.min.css`, `slicknav.min.css`
4. Template CSS — `typography.css`, `default-css.css` (utilities), `styles.css` (main), `responsive.css` (media queries)

### JS Load Order (before `</body>`)

1. `vendor/jquery-2.2.4.min.js`
2. `bootstrap.min.js` + `popper.min.js`
3. Plugin JS — `metisMenu.min.js`, `jquery.slimscroll.min.js`, `jquery.slicknav.min.js`, `owl.carousel.min.js`
4. Page-specific chart JS (loaded via CDN: Chart.js 2.7.2, Highcharts, ZingChart)
5. `scripts.js` — Main app logic (sidebar toggle, sticky header, preloader, form states, fullscreen)

### Key JS Behaviors (scripts.js)

All wrapped in jQuery IIFE `(function($) { ... })(jQuery)`:

- **Preloader**: Fades out 300ms after `window.load`
- **Sidebar collapse**: Adds `.sbar_collapsed` to `.page-container` at <=1364px or on `.nav-btn` click
- **MetisMenu**: `$("#menu").metisMenu()` — handles collapsible sidebar navigation
- **SlimScroll**: Custom scrollbars on `.menu-inner`, `.nofity-list`, `.timeline-area`, `.recent-activity`, `.settings-list`
- **Sticky header**: Adds `.sticky-menu` to `#sticky-header` on scroll > 1px
- **SliceNav**: `$('ul#nav_menu').slicknav()` — mobile hamburger menu
- **Owl Carousel**: `.testimonial-carousel` with responsive breakpoints
- **Offset panel**: `.settings-btn` toggles `.show_hide` on `.offset-area`

### Data Attributes (Bootstrap 4)

This template uses Bootstrap 4 conventions:
- `data-toggle="dropdown"`, `data-toggle="tab"`, `data-toggle="modal"`, `data-toggle="popover"`
- `data-target="#id"`
- `aria-expanded="true/false"` on MetisMenu items

### Chart Files

Each chart file initializes hardcoded demo data — no API calls:
- `bar-chart.js` — Chart.js bar charts
- `line-chart.js` — Highcharts & ZingChart line charts
- `pie-chart.js` — Chart.js pie/doughnut charts
- `maps.js` — Google Maps integration

## Tech Stack & Dependencies

| Library | Version | Source |
|---------|---------|--------|
| Bootstrap | 4 | Vendor (minified) |
| jQuery | 2.2.4 | Vendor |
| Modernizr | 2.8.3 | Vendor |
| MetisMenu | minified | Vendor |
| Owl Carousel | minified | Vendor |
| SliceNav | minified | Vendor |
| jQuery SlimScroll | minified | Vendor |
| Chart.js | 2.7.2 | CDN |
| Highcharts | latest | CDN |
| ZingChart | latest | CDN |
| Font Awesome | 4.5.0 | Vendor fonts |
| Themify Icons | — | Vendor fonts |
| Google Fonts | — | CDN (Lato, Poppins) |

## Conventions

- **HTML**: H5 Boilerplate inspired. IE8 compatibility shims present. Section comments mark regions.
- **CSS**: No preprocessor. Class-based selectors, kebab-case naming. `styles.css` is the main customization file; `responsive.css` handles breakpoints.
- **JavaScript**: jQuery IIFE pattern. Feature blocks separated by comment banners. Guard with length checks (e.g., `if ($('#dataTable').length)`).
- **New pages**: Copy `starter.html`, update `<title>`, edit content inside `.main-content-inner`, update sidebar links.
