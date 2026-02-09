# SRTdash Admin Dashboard — Upgrade Plan

**Goal**: Modernize from Bootstrap 4 / jQuery 2.2.4 to Bootstrap 5.3.8 / vanilla JavaScript with all libraries at latest 2026 versions.

**Scope**: 46 HTML pages in `srtdash/`, all assets in `srtdash/assets/`.

---

## Current vs Target Dependencies

| Library | Current | Target | Notes |
|---------|---------|--------|-------|
| Bootstrap | 4.x (local) | **5.3.8** (local) | Major migration |
| jQuery | 2.2.4 (local) | **Remove** | All plugins go vanilla |
| Popper.js | Unknown (local) | **Remove** | Bundled in BS5 `bootstrap.bundle.min.js` |
| Modernizr | 2.8.3 (local) | **Remove** | Unnecessary in 2026 |
| Font Awesome | 4.x (local) | **7.1.0** (CDN or local) | Class syntax rewrite: `fa fa-*` → `fa-solid fa-*` |
| Themify Icons | local | **Keep or consolidate** into FA7 | Evaluate usage first |
| Chart.js | 2.7.2 (CDN) | **4.5.1** (CDN) | Major API changes (v2→v4) |
| Highcharts | unversioned (CDN) | **12.5.0** (CDN) | Pin version |
| ZingChart | unversioned (CDN) | **2.9.16** (CDN) | Pin version |
| amCharts | 3.x (CDN) | **5.x** (CDN) | Major rewrite (used on linechart, barchart, maps pages) |
| MetisMenu | jQuery version (local) | **MetisMenuJS 1.4.0** (vanilla) | Near-identical API |
| Owl Carousel | jQuery (local) | **Swiper 12.1.0** | Markup restructure needed |
| jQuery SlimScroll | jQuery (local) | **Remove** | Replace with CSS `scrollbar-width` + `overflow-y` |
| SlickNav | jQuery (local) | **Remove** | Replace with custom vanilla JS or BS5 offcanvas |
| DataTables | 1.10.18/19 (CDN) | **Simple-DataTables 10.2.0** | Zero-dependency vanilla JS |
| Google Fonts | old `css` API via `@import` | **`css2` API via `<link>` + preconnect** | Trim unused weights |

---

## Phase 1: Bootstrap 5.3.8 Upgrade

Keep jQuery temporarily. Focus only on Bootstrap CSS/JS migration.

### 1.1 Replace Bootstrap files

```bash
# Download BS5 bundle (includes Popper)
curl -o srtdash/assets/js/bootstrap.bundle.min.js \
  https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js

curl -o srtdash/assets/css/bootstrap.min.css \
  https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css
```

Delete: `srtdash/assets/js/popper.min.js`, `srtdash/assets/js/bootstrap.min.js`

Update all 46 HTML files: replace `popper.min.js` + `bootstrap.min.js` script tags with single `bootstrap.bundle.min.js`.

### 1.2 Data attribute migration (all 46 HTML files)

Search and replace across all `srtdash/*.html`:

| Find | Replace |
|------|---------|
| `data-toggle=` | `data-bs-toggle=` |
| `data-target=` | `data-bs-target=` |
| `data-dismiss=` | `data-bs-dismiss=` |
| `data-slide=` | `data-bs-slide=` |
| `data-slide-to=` | `data-bs-slide-to=` |
| `data-ride=` | `data-bs-ride=` |
| `data-spy=` | `data-bs-spy=` |
| `data-offset=` | `data-bs-offset=` |

### 1.3 CSS class migration (all 46 HTML files)

| Find | Replace |
|------|---------|
| `ml-` | `ms-` |
| `mr-` | `me-` |
| `pl-` | `ps-` |
| `pr-` | `pe-` |
| `ml-auto` | `ms-auto` |
| `mr-auto` | `me-auto` |
| `float-left` | `float-start` |
| `float-right` | `float-end` |
| `text-left` | `text-start` |
| `text-right` | `text-end` |
| `sr-only` | `visually-hidden` |
| `badge-pill` | `rounded-pill` |
| `font-weight-bold` | `fw-bold` |
| `font-weight-normal` | `fw-normal` |
| `input-group-append` | (restructure) |
| `input-group-prepend` | (restructure) |

### 1.4 Form markup updates

BS5 changed custom form controls:
- `custom-control` → `form-check`
- `custom-control-input` → `form-check-input`
- `custom-control-label` → `form-check-label`
- `custom-switch` → `form-switch`

Affects: `form.html` and any page with custom checkboxes/switches.

### 1.5 Dropdown changes

BS5 dropdowns need `.dropdown-menu-end` (was `.dropdown-menu-right`). Check all notification/profile dropdowns in the header area across all pages.

### 1.6 Add link underline reset

Bootstrap 5 adds default `text-decoration: underline` to links. Add to `styles.css`:

```css
a { text-decoration: none; }
a:hover { text-decoration: none; }
```

### 1.7 Test

Open every dashboard variant (`index.html`, `index2.html`, `index3.html`, `index3-horizontalmenu.html`) and `starter.html`. Verify:
- Sidebar menu opens/closes
- Dropdowns work (notifications, profile, settings)
- Modals open/close
- Tabs switch
- Cards render correctly
- Responsive layout at mobile breakpoints

**Commit**: `Upgrade to Bootstrap 5.3.8`

---

## Phase 2: jQuery Removal & Plugin Replacements

### 2.1 Replace MetisMenu (jQuery → vanilla)

Download MetisMenuJS 1.4.0:
```bash
curl -o srtdash/assets/js/metismenujs.min.js \
  https://cdn.jsdelivr.net/npm/metismenujs@1.4.0/dist/metismenujs.min.js
curl -o srtdash/assets/css/metismenujs.min.css \
  https://cdn.jsdelivr.net/npm/metismenujs@1.4.0/dist/metismenujs.min.css
```

Delete: `metisMenu.min.js`, `metisMenu.css`

Update all HTML files: swap CSS/JS references.

In `scripts.js`, change `$("#menu").metisMenu()` → `new MetisMenu('#menu')`.

### 2.2 Replace Owl Carousel with Swiper 12

Download Swiper 12.1.0:
```bash
curl -o srtdash/assets/js/swiper-bundle.min.js \
  https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js
curl -o srtdash/assets/css/swiper-bundle.min.css \
  https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css
```

Delete: `owl.carousel.min.js`, `owl.carousel.min.css`

Restructure `.testimonial-carousel` markup:
```html
<!-- Before (Owl) -->
<div class="testimonial-carousel owl-carousel">
  <div class="single-testimonial">...</div>
  <div class="single-testimonial">...</div>
</div>

<!-- After (Swiper) -->
<div class="testimonial-carousel swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide single-testimonial">...</div>
    <div class="swiper-slide single-testimonial">...</div>
  </div>
  <div class="swiper-pagination"></div>
</div>
```

Or use the `wrapSwiperSlides()` helper from the universal guide to do this in JS.

### 2.3 Remove SlimScroll → CSS

Delete: `jquery.slimscroll.min.js`

Add to `styles.css`:
```css
.menu-inner,
.nofity-list,
.timeline-area,
.recent-activity,
.settings-list {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.3) transparent;
}
.menu-inner::-webkit-scrollbar { width: 6px; }
.menu-inner::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 3px; }
```

Set explicit heights matching current SlimScroll config:
- `.nofity-list`: `max-height: 435px`
- `.timeline-area`: `max-height: 500px`
- `.recent-activity`: `max-height: calc(100vh - 114px)`
- `.settings-list`: `max-height: calc(100vh - 158px)`

### 2.4 Remove SlickNav → BS5 Offcanvas or custom vanilla

Delete: `jquery.slicknav.min.js`, `slicknav.min.css`

The admin sidebar already handles mobile via `.sbar_collapsed`. SlickNav was for `ul#nav_menu` which is only on certain pages. Replace with Bootstrap 5's offcanvas component or a small vanilla JS toggle.

### 2.5 Replace DataTables with Simple-DataTables 10.2.0

Only affects `datatable.html` (and initialization in `scripts.js`).

```html
<!-- Remove jQuery DataTables CDN CSS/JS (6 files) -->
<!-- Add: -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simple-datatables@10/dist/style.min.css">
<script src="https://cdn.jsdelivr.net/npm/simple-datatables@10/dist/umd/simple-datatables.min.js"></script>
```

Replace init:
```javascript
// Before (jQuery DataTables)
$('#dataTable').DataTable({ responsive: true });

// After (Simple-DataTables)
new simpleDatatables.DataTable('#dataTable', { perPage: 10 });
```

### 2.6 Remove Modernizr

Delete: `vendor/modernizr-2.8.3.min.js`

Remove `<script src="assets/js/vendor/modernizr-2.8.3.min.js">` from all 46 HTML files.

Replace `<html class="no-js">` with:
```html
<html lang="en">
```
And add in `<head>`:
```html
<script>document.documentElement.classList.replace('no-js','js')</script>
```
(Only if any CSS references `.no-js` — otherwise just remove it.)

### 2.7 Remove jQuery

Delete: `vendor/jquery-2.2.4.min.js`, `plugins.js`

Remove all `<script>` references from all 46 HTML files.

### 2.8 Remove IE conditional comments

Delete from all pages:
```html
<!--[if lt IE 8]>
  <p class="browserupgrade">...</p>
<![endif]-->
```

**Commit**: `Remove jQuery, replace plugins with vanilla JS alternatives`

---

## Phase 3: Vanilla JavaScript Rewrite

Rewrite `scripts.js` as vanilla JS. One function per feature, guard clauses for missing elements.

### Target structure for new `scripts.js`:

```javascript
(function() {
  'use strict';

  // Preloader
  initPreloader();

  // Sidebar
  initSidebar();

  // MetisMenu
  initSidebarMenu();

  // Scrollable areas (CSS handles the actual scrolling now)
  // No JS needed — removed SlimScroll

  // Sticky header
  initStickyHeader();

  // Form validation
  initFormValidation();

  // Login form focus states
  initFormFocus();

  // Settings panel toggle
  initSettingsPanel();

  // Testimonial carousel (Swiper)
  initTestimonialCarousel();

  // Fullscreen toggle
  initFullscreen();

  // Simple-DataTables
  initDataTables();
})();
```

### Functions to convert:

| jQuery (current) | Vanilla JS (target) |
|---|---|
| `$(window).on('load', fn)` | `window.addEventListener('load', fn)` |
| `$('#preloader').fadeOut()` | `el.style.opacity = '0'; setTimeout(() => el.remove(), 300)` |
| `$('.page-container').addClass('sbar_collapsed')` | `el.classList.add('sbar_collapsed')` |
| `$('.nav-btn').on('click', fn)` | `el.addEventListener('click', fn)` |
| `$(window).on('scroll', fn)` | `window.addEventListener('scroll', fn)` |
| `$(this).parent('.form-gp').addClass('focused')` | `el.closest('.form-gp').classList.add('focused')` |
| `$('.offset-area').toggleClass('show_hide')` | `el.classList.toggle('show_hide')` |
| `$('[data-toggle="popover"]').popover()` | `document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new bootstrap.Popover(el))` |

### amCharts CDN URL update

Update `amcharts.com/lib/3/` references in `linechart.html`, `barchart.html`, `maps.html` to pinned amCharts 3 versions (or upgrade to amCharts 5 — see Phase 3b).

**Commit**: `Rewrite scripts.js in vanilla JavaScript`

---

## Phase 3b: Chart Library Upgrades (optional — can be separate phase)

This is the highest-effort part of the upgrade due to completely different APIs.

### Chart.js 2.7.2 → 4.5.1

Affects: `bar-chart.js` (809 lines), `pie-chart.js` (431 lines), `line-chart.js` (partially)

Key API changes:
- Canvas registration: `Chart.register(...)` required for tree-shaking, or use UMD build which auto-registers
- Dataset property changes (e.g., `borderSkipped` defaults changed)
- Scale config moved: `options.scales.xAxes[0]` → `options.scales.x`
- Tooltip config moved: `options.tooltips` → `options.plugins.tooltip`
- Legend config moved: `options.legend` → `options.plugins.legend`

CDN update:
```html
<!-- Before -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>
<!-- After -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js"></script>
```

### Highcharts → 12.5.0

```html
<!-- Before -->
<script src="https://code.highcharts.com/highcharts.js"></script>
<!-- After -->
<script src="https://code.highcharts.com/12.5.0/highcharts.js"></script>
```

Mostly backward-compatible. Test existing configs.

### ZingChart → 2.9.16

```html
<!-- Before -->
<script src="https://cdn.zingchart.com/zingchart.min.js"></script>
<!-- After -->
<script src="https://cdn.zingchart.com/2.9.16/zingchart.min.js"></script>
```

Update modules directory:
```javascript
zingchart.MODULESDIR = "https://cdn.zingchart.com/2.9.16/modules/";
```

### amCharts 3 → 5

**This is a complete rewrite.** amCharts 5 has an entirely different API, class-based architecture, and module system. Affects `linechart.html`, `barchart.html`, `maps.html`.

Option A: Upgrade to amCharts 5 (significant effort, ~1800 lines to rewrite in `maps.js` alone)
Option B: Pin amCharts 3 CDN URLs to specific version and leave as-is

**Recommendation**: Pin amCharts 3 for now, upgrade in a separate project phase.

**Commit**: `Upgrade Chart.js to 4.5.1, pin Highcharts 12.5.0 and ZingChart 2.9.16`

---

## Phase 4: Font Awesome 7.1.0 & Icon Audit

### 4.1 Audit current icon usage

Before upgrading, audit which FA4 icons and Themify icons are actually used across all 46 pages.

FA4 icons use `fa fa-*` syntax. FA7 uses `fa-solid fa-*` / `fa-regular fa-*` / `fa-brands fa-*`.

Many icon names changed between FA4 and FA7. Common renames:

| FA4 | FA7 |
|-----|-----|
| `fa-paper-plane-o` | `fa-regular fa-paper-plane` |
| `fa-envelope-o` | `fa-regular fa-envelope` |
| `fa-bell-o` | `fa-regular fa-bell` |
| `fa-user-o` | `fa-regular fa-user` |
| `fa-times` | `fa-solid fa-xmark` |
| `fa-cog` | `fa-solid fa-gear` |
| `fa-bar-chart` | `fa-solid fa-chart-bar` |
| `fa-line-chart` | `fa-solid fa-chart-line` |
| `fa-pie-chart` | `fa-solid fa-chart-pie` |
| `fa-pencil` | `fa-solid fa-pencil` |
| `fa-trash-o` | `fa-regular fa-trash-can` |
| `fa-sign-out` | `fa-solid fa-right-from-bracket` |

Reference: https://docs.fontawesome.com/apis/graphql/tables#version-4-to-version-6-name-changes (also applies to v7)

### 4.2 Replace Font Awesome

```bash
# Option A: CDN
# Replace local font-awesome.min.css with:
# <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.1.0/css/all.min.css" rel="stylesheet">

# Option B: Local download
curl -L https://github.com/FortAwesome/Font-Awesome/releases/download/7.1.0/fontawesome-free-7.1.0-web.zip -o fa.zip
unzip fa.zip
# Copy css/all.min.css and webfonts/ directory to assets/
```

Delete: `assets/css/font-awesome.min.css` and old `assets/fonts/fontawesome-webfont.*` files.

### 4.3 Themify Icons decision

Audit usage count. If < 20 unique `ti-*` icons are used, map them to FA7 equivalents and remove Themify entirely. If heavily used (SRTdash uses `ti-*` icons extensively in sidebar), keep as-is — Themify has no jQuery dependency.

### 4.4 Special case: icon showcase pages

`fontawesome.html` (292KB) and `themify.html` (115KB) are icon reference/showcase pages listing hundreds of icons. These need to be regenerated for FA7 icon names, or removed if not needed.

**Commit**: `Upgrade to Font Awesome 7.1.0, update icon class names`

---

## Phase 5: AVIF Images

### 5.1 Convert images

```bash
cd srtdash/assets/images

# JPG → AVIF
for f in $(find . -name '*.jpg'); do
  avifenc --min 20 --max 30 --speed 4 "$f" "${f%.jpg}.avif"
done

# PNG → AVIF
for f in $(find . -name '*.png'); do
  avifenc --min 20 --max 30 --speed 4 "$f" "${f%.png}.avif"
done
```

### 5.2 Update HTML to `<picture>` elements

```html
<!-- Before -->
<img src="assets/images/author/avatar.jpg" alt="User">

<!-- After -->
<picture>
  <source srcset="assets/images/author/avatar.avif" type="image/avif">
  <img src="assets/images/author/avatar.jpg" alt="User">
</picture>
```

Keep original JPG/PNG files for fallback.

### 5.3 Skip favicon and logo

Keep `favicon.ico` and `logo.png` as-is (too small to benefit, compatibility concerns).

**Commit**: `Add AVIF images with picture element fallback`

---

## Phase 6: Performance Optimizations

### 6.1 Google Fonts loading

Remove `@import` from `default-css.css`. Add to `<head>` of all HTML files:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Trimmed Poppins from 9 weights (100-900) to 5 actually used (300-700).

### 6.2 Non-blocking CSS for plugins

```html
<!-- Critical (render-blocking) -->
<link rel="stylesheet" href="assets/css/bootstrap.min.css">
<link rel="stylesheet" href="assets/css/styles.css">
<link rel="stylesheet" href="assets/css/responsive.css">

<!-- Non-critical (non-blocking) -->
<link rel="stylesheet" href="assets/css/swiper-bundle.min.css" media="print" onload="this.media='all'">
<link rel="stylesheet" href="assets/css/metismenujs.min.css" media="print" onload="this.media='all'">
```

### 6.3 Minify custom assets

```bash
npm install -g clean-css-cli terser

cleancss -o srtdash/assets/css/styles.min.css srtdash/assets/css/styles.css
cleancss -o srtdash/assets/css/responsive.min.css srtdash/assets/css/responsive.css
cleancss -o srtdash/assets/css/default-css.min.css srtdash/assets/css/default-css.css
cleancss -o srtdash/assets/css/typography.min.css srtdash/assets/css/typography.css

terser srtdash/assets/js/scripts.js -o srtdash/assets/js/scripts.min.js -c -m
terser srtdash/assets/js/bar-chart.js -o srtdash/assets/js/bar-chart.min.js -c -m
terser srtdash/assets/js/line-chart.js -o srtdash/assets/js/line-chart.min.js -c -m
terser srtdash/assets/js/pie-chart.js -o srtdash/assets/js/pie-chart.min.js -c -m
terser srtdash/assets/js/maps.js -o srtdash/assets/js/maps.min.js -c -m
```

Update HTML to reference `.min.css` / `.min.js` versions.

### 6.4 Remove amCharts export CSS

All pages load `https://www.amcharts.com/lib/3/plugins/export/export.css` but only chart pages use amCharts. Remove from non-chart pages.

**Commit**: `Optimize font loading, non-blocking CSS, minify assets`

---

## Phase 7: Accessibility

### 7.1 Skip link

Add to all pages after `<body>`:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### 7.2 Landmarks

Wrap `.main-content-inner` contents in `<main id="main-content">`.

### 7.3 ARIA

- Add `aria-label="Main navigation"` to sidebar `<nav>`
- Add `aria-label="Toggle sidebar"` to `.nav-btn`
- Add `aria-hidden="true"` to decorative icons (`<i class="ti-*">`, `<i class="fa-*">`)
- Add `aria-label` to notification bell, message, and settings buttons

### 7.4 Focus styles

```css
*:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
```

### 7.5 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Commit**: `Add skip link, ARIA labels, focus styles, reduced motion`

---

## Phase 8: SEO & Analytics

### 8.1 Page-specific `<title>` tags

Currently all pages use generic `srtdash` title. Update each page:
- `index.html` → `ICO Dashboard - SRTdash Admin`
- `index2.html` → `Ecommerce Dashboard - SRTdash Admin`
- `form.html` → `Forms - SRTdash Admin`
- etc.

### 8.2 Meta descriptions

Add unique `<meta name="description">` to each page.

### 8.3 GA4

Add before `</body>` on all pages:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Commit**: `Add page-specific titles, meta descriptions, GA4 placeholder`

---

## Phase 9: Audit & Cleanup

### 9.1 Unused CSS

Run PurgeCSS against all 46 HTML files:
```bash
purgecss --content 'srtdash/*.html' --css srtdash/assets/css/styles.css --output srtdash/assets/css/styles.purged.css
```

Review diff. Remove dead selectors targeting old plugins (`.owl-*`, `.slicknav_*`, `.slimScrollBar`, etc.)

### 9.2 Vendor prefix audit

Remove obsolete prefixes from `styles.css` and `responsive.css`:
- `-webkit-transform`, `-moz-transform`, `-ms-transform` → `transform`
- `-webkit-transition`, `-moz-transition` → `transition`
- `-webkit-box-shadow`, `-moz-box-shadow` → `box-shadow`
- `-webkit-border-radius`, `-moz-border-radius` → `border-radius`

### 9.3 Dead file cleanup

Files to delete after all phases:
```
assets/js/vendor/jquery-2.2.4.min.js
assets/js/vendor/modernizr-2.8.3.min.js
assets/js/popper.min.js
assets/js/bootstrap.min.js (replaced by bundle)
assets/js/plugins.js
assets/js/owl.carousel.min.js
assets/js/metisMenu.min.js (replaced by metismenujs)
assets/js/jquery.slimscroll.min.js
assets/js/jquery.slicknav.min.js
assets/css/owl.carousel.min.css
assets/css/slicknav.min.css
assets/css/metisMenu.css (replaced by metismenujs)
assets/css/font-awesome.min.css (replaced by FA7)
assets/fonts/fontawesome-webfont.* (old FA4 font files)
```

Verify no HTML file references deleted files:
```bash
grep -rn 'jquery-2.2.4\|modernizr\|popper.min\|owl.carousel\|slimscroll\|slicknav\|plugins.js' srtdash/*.html
```

### 9.4 Update `.gitignore`

```
.idea
.sass-cache/
node_modules/
.DS_Store
*.map
```

**Commit**: `Remove unused CSS, vendor prefixes, and dead files`

---

## Phase 10: Content Enhancement Report

Generate `CONTENT_ENHANCEMENT_REPORT.md` with:
- Existing pages inventory (46 pages)
- Missing section suggestions for dashboard variants (e.g., dark mode toggle that actually works, notification center page, user settings page)
- Suggestions for modernizing demo data and placeholder content

**Commit**: `Add content enhancement report`

---

## Phase 11: Documentation

### 11.1 Update README.md

- Version 2.0.0
- Updated dependency list with versions
- Bootstrap 5.3.8 noted
- No jQuery dependency
- Modern browser support (drop IE references)

### 11.2 Create CHANGELOG.md

```markdown
## [2.0.0] - 2026-XX-XX

### Major Changes
- Upgraded from Bootstrap 4 to Bootstrap 5.3.8
- Removed jQuery 2.2.4 dependency entirely
- Upgraded Font Awesome 4 to Font Awesome 7.1.0
- Replaced Owl Carousel with Swiper 12.1.0
- Replaced jQuery DataTables with Simple-DataTables 10.2.0
- Replaced jQuery MetisMenu with MetisMenuJS 1.4.0 (vanilla)
- Removed SlimScroll (CSS scrollbar styling)
- Removed SlickNav (Bootstrap 5 offcanvas)
- Removed Modernizr (unnecessary)
- Upgraded Chart.js 2.7.2 to 4.5.1
- Pinned Highcharts 12.5.0, ZingChart 2.9.16

### Improvements
- AVIF images with picture element fallback
- Non-blocking CSS loading
- Optimized Google Fonts loading (css2 API, preconnect, display=swap)
- Minified CSS and JS
- Removed obsolete vendor prefixes
- Added skip navigation link and ARIA labels
- Added focus-visible styles and reduced motion support
- Page-specific title tags
- GA4 analytics placeholder
```

### 11.3 Update CLAUDE.md

Update to reflect new dependencies, file structure, and vanilla JS patterns.

**Commit**: `Update README, add CHANGELOG, update CLAUDE.md`

---

## Execution Order Summary

| Phase | Effort | Description |
|-------|--------|-------------|
| 1 | Medium | Bootstrap 5.3.8 (CSS classes + data attributes across 46 files) |
| 2 | High | jQuery removal + plugin swaps (MetisMenu, Swiper, SlimScroll, SlickNav, DataTables, Modernizr) |
| 3 | Medium | Vanilla JS rewrite of `scripts.js` |
| 3b | High | Chart library upgrades (Chart.js 4, pin Highcharts/ZingChart, amCharts decision) |
| 4 | Medium | Font Awesome 7.1.0 + icon class name migration |
| 5 | Low | AVIF images |
| 6 | Low | Performance (fonts, non-blocking CSS, minification) |
| 7 | Low | Accessibility |
| 8 | Low | SEO & Analytics |
| 9 | Low | Audit & Cleanup |
| 10 | Low | Content Enhancement Report |
| 11 | Low | Documentation |

**Critical rule**: Never combine phases in a single commit. Each phase gets its own atomic commit(s).

---

## Version Comparison

| Feature | v1.0 (Current) | v2.0 (Target) |
|---------|---------------|---------------|
| Bootstrap | 4.x | 5.3.8 |
| jQuery | 2.2.4 | Removed |
| Font Awesome | 4.x | 7.1.0 |
| Chart.js | 2.7.2 | 4.5.1 |
| Highcharts | unversioned | 12.5.0 |
| ZingChart | unversioned | 2.9.16 |
| Carousel | Owl Carousel (jQuery) | Swiper 12.1.0 |
| Sidebar menu | MetisMenu (jQuery) | MetisMenuJS 1.4.0 |
| Data tables | DataTables 1.10 (jQuery) | Simple-DataTables 10.2.0 |
| Scrollbars | SlimScroll (jQuery) | CSS `scrollbar-width` |
| Mobile menu | SlickNav (jQuery) | BS5 offcanvas / vanilla JS |
| Modernizr | 2.8.3 | Removed |
| Images | JPG/PNG | AVIF + JPG/PNG fallback |
| Google Fonts | old `css` API, `@import` | `css2` API, `<link>` + preconnect |
| CSS loading | All blocking | Critical blocking, rest non-blocking |
| IE support | IE8+ shims | Dropped (modern browsers only) |
