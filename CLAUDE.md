# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SRTdash is a static Bootstrap 5.3.8 admin dashboard HTML template by Colorlib. It has 56 HTML pages, no build system, no package.json, and no server-side code. All assets are plain HTML/CSS/JS served directly. No jQuery — all JavaScript is vanilla.

## Running Locally

No build step required. Open any HTML file directly or use a local server:

```bash
# Python
cd srtdash && python3 -m http.server 8000

# Node
npx http-server srtdash

# Then visit http://localhost:8000
```

## Architecture

### Directory Layout

- `srtdash/` — All template HTML pages and assets
- `srtdash/starter.html` — Clean starting template (use as base for new pages)
- `srtdash/index.html` / `index2.html` / `index3.html` / `index3-horizontalmenu.html` — Four dashboard variants (ICO, Ecommerce, SEO, Horizontal)
- `srtdash/calendar.html`, `chat.html`, `email.html`, `file-manager.html`, `notifications.html`, `profile.html`, `settings.html`, `widgets.html` — App pages
- `srtdash/assets/css/` — Stylesheets (no preprocessor)
- `srtdash/assets/js/` — Scripts (no bundler, no modules)
- `documentation/` — Standalone documentation site (separate from template)

### Page Structure

Every page follows the same layout skeleton:

```
<a.skip-link>            → Skip to main content (accessibility)
#preloader
.page-container
  .sidebar-menu          → Left nav with MetisMenuJS (#menu)
  .main-content
    .header-area         → Top bar with search, notifications, profile
      #sticky-header     → Becomes sticky on scroll
    .page-title-area     → Breadcrumbs and page heading
    .main-content-inner#main-content → PAGE CONTENT GOES HERE
  footer
.offset-area             → Right-side settings panel (toggled by .settings-btn)
GA4 tracking snippet
```

### CSS Load Order (in `<head>`)

1. Google Fonts (preconnect + css2 API link)
2. `bootstrap.min.css` — Bootstrap 5.3.8
3. Icon CSS — `fontawesome.min.css`, `themify-icons.css`
4. Plugin CSS — `metismenujs.min.css`, `swiper-bundle.min.css`
5. Template CSS — `typography.css`, `default-css.css`, `styles.css`, `responsive.css`

### JS Load Order (before `</body>`)

1. `bootstrap.bundle.min.js` (includes Popper)
2. `metismenujs.min.js`
3. `swiper-bundle.min.js`
4. Page-specific chart JS (CDN: Chart.js 4.5.1, Highcharts 12.5.0, ZingChart 2.9.16, AmCharts)
5. `scripts.js` — Main app logic (vanilla JS IIFE)

### Key JS Behaviors (scripts.js)

All wrapped in vanilla JS IIFE `(function() { 'use strict'; ... })()`:

- **initPreloader()**: Fades out 300ms after `window.load`
- **initSidebar()**: Adds `.sbar_collapsed` to `.page-container` at <=1364px or on `.nav-btn` click
- **initSidebarMenu()**: `new MetisMenu('#menu')` — collapsible sidebar navigation
- **initStickyHeader()**: Adds `.sticky-menu` to `#sticky-header` on scroll > 1px
- **initTestimonialCarousel()**: Swiper with responsive breakpoints, auto-wraps slides
- **initSettingsPanel()**: `.settings-btn` toggles `.show_hide` on `.offset-area`
- **initFullscreen()**: Fullscreen toggle via `#full-view` / `#full-view-exit`
- **initFormValidation()**: Bootstrap 5 native form validation
- **initFormFocus()**: Floating label effect on `.form-gp` inputs

### Data Attributes (Bootstrap 5)

This template uses Bootstrap 5 conventions:
- `data-bs-toggle="dropdown"`, `data-bs-toggle="tab"`, `data-bs-toggle="modal"`, `data-bs-toggle="popover"`
- `data-bs-target="#id"`
- `data-bs-dismiss="modal"`, `data-bs-dismiss="alert"`

### Chart Files

Each chart file initializes hardcoded demo data — no API calls. Guard clauses use `document.getElementById()`:
- `bar-chart.js` — Chart.js 4 bar charts + AmCharts + Highcharts
- `line-chart.js` — Chart.js 4, Highcharts, ZingChart, AmCharts line charts
- `pie-chart.js` — Chart.js 4 doughnut, ZingChart, AmCharts, Highcharts pie charts
- `maps.js` — Google Maps integration

### Images

All images use `<picture>` elements with AVIF sources and JPG/PNG fallback:
```html
<picture>
  <source srcset="assets/images/path/file.avif" type="image/avif">
  <img src="assets/images/path/file.jpg" alt="description">
</picture>
```

## Tech Stack

| Library | Version | Source |
| ------- | ------- | ------ |
| Bootstrap | 5.3.8 | Vendor (bundle) |
| MetisMenuJS | 1.4.0 | Vendor |
| Swiper | 12.1.0 | Vendor |
| Simple-DataTables | 10.x | CDN |
| Chart.js | 4.5.1 | CDN |
| Highcharts | 12.5.0 | CDN |
| ZingChart | 2.9.16 | CDN |
| Font Awesome | 7.1.0 Free | Vendor |
| Themify Icons | — | Vendor |
| Google Fonts | — | CDN (Lato, Poppins) |

## Conventions

- **HTML**: Semantic HTML5. AVIF images with `<picture>` fallback. Skip links for accessibility. `lang="en"` on `<html>`. Each page has unique `<title>` and `<meta name="description">`.
- **CSS**: No preprocessor. Class-based selectors, kebab-case naming. `styles.css` is the main customization file; `responsive.css` handles breakpoints. No vendor prefixes for standard properties.
- **JavaScript**: Vanilla JS IIFE pattern. One function per feature with guard clauses (`if (!el) return`). No jQuery. No global state.
- **New pages**: Copy `starter.html`, update `<title>` and `<meta name="description">`, edit content inside `.main-content-inner`, update sidebar links.
