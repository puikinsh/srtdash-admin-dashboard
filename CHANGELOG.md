# Changelog

All notable changes to the SRTdash Admin Dashboard template are documented here.

## Unreleased

## v2.1.1 - 2026-11-16

### Dependencies

There is no package manager here — libraries are vendored under
`srtdash/assets/` or pinned by CDN URL — so each was checked against its
current published version by hand.

Updated:

- Bootstrap 5.3.8 → 5.3.9 (vendored CSS and bundle JS)
- Chart.js 4.5.1 → 4.6.1 (CDN pin)
- Font Awesome 7.1.0 → 7.3.1 (`fontawesome.min.css` plus all four webfonts)
- Swiper 12.1.0 → 14.4.0 (`swiper-bundle.min.css` / `.js`)
- FullCalendar 6.1.15 → 6.1.22 (CDN pin)
- Highcharts 12.5.0 → 13.1.1, and moved off `code.highcharts.com` — see below

Already current, left alone: MetisMenuJS 1.4.0,
ZingChart 2.9.16-1, simple-datatables 10.x.

### Fixed

- **Charts on `index3.html` were dead in production.** `code.highcharts.com`
  rejects any request without a `Referer` header and returned 403 for
  `highcharts.js`, `exporting.js` and `export-data.js` — confirmed against the
  live demo, not just locally, where `window.Highcharts` was undefined. Now
  served from jsDelivr, which has no such requirement.

### Not done, and why

- **FullCalendar was not taken to 7.x.** Version 7 drops the UMD global build
  (`index.global.min.js` is a 404) and ships ESM-only with subpath exports.
  This template has no build step and initialises the calendar with
  `new FullCalendar.Calendar(...)` from a plain `<script>` tag, so v7 would
  need `calendar.html` rewritten around an import map. Pinned to the latest
  6.x instead. Taking v7 is a deliberate migration, not a version bump.

- **The calendar demo opened on an empty month.** Events were hard-coded to
  February 2026; they are now generated in the current month.
- **Horizontal overflow on phones** for long button groups
  (`button-group.html`) and wide data tables (`datatable.html`).

### Known upstream issue

- `maps.html` embeds a Google Maps API key without billing enabled
  (`BillingNotEnabledMapError`); replace it with your own key.

### Verified

Swiper crossed two majors and FullCalendar one, so behaviour was checked
rather than assumed: carousel initialises with working pagination bullets,
the calendar renders its toolbar and day grid, Highcharts draws, and
`index.html`, `index3.html`, `calendar.html` and `datatable.html` all load
with no JavaScript errors and no failed requests.

## v2.1.0

### New Pages

- Add 9 new app pages: Calendar, Chat, Email, File Manager, Notifications, Profile, Settings, Widgets, 401 Error
- Total page count: 56 (up from 47)

### Icon Overhaul

- Replace all Font Awesome 4 icon classes with native FA7 classes
- Remove FA v4 compatibility shims entirely
- Rebuild fontawesome.html showcase with working FA7 icons

### Bug Fixes

- Fix sidebar submenus not expanding correctly
- Fix ZingChart CDN URL returning 404
- Fix console errors from jQuery remnants in chart files
- Fix favicon path and icon shadow rendering
- Fix header alignment and icon rendering issues
- Improve dashboard chart data for more realistic demos
- Improve header area layout and spacing

## v2.0.0

Complete modernization from Bootstrap 4 + jQuery to Bootstrap 5.3.8 + vanilla JavaScript.

### Framework Upgrade

- Upgrade Bootstrap 4.1 to 5.3.8
- Remove jQuery entirely; rewrite all JS in vanilla JavaScript (IIFE pattern)
- Replace `data-toggle` / `data-target` with `data-bs-toggle` / `data-bs-target`
- Replace `ml-*` / `mr-*` with `ms-*` / `me-*`

### Library Replacements

- Replace Owl Carousel with Swiper 12.1.0
- Replace jQuery MetisMenu with MetisMenuJS 1.4.0
- Replace jQuery DataTables with Simple-DataTables 10.x
- Remove SlimScroll, SlickNav, Modernizr

### Chart Upgrades

- Upgrade Chart.js 2.7.2 to 4.5.1
- Pin Highcharts 12.5.0
- Pin ZingChart 2.9.16

### Icons & Fonts

- Upgrade Font Awesome 4 to 7.1.0 Free (with v4 shims for transition)
- Optimize Google Fonts loading with preconnect + css2 API

### Images

- Convert all images to AVIF format
- Add `<picture>` elements with JPG/PNG fallback on every image

### Accessibility

- Add skip-to-content links on every page
- Add `focus-visible` outline styles
- Add `prefers-reduced-motion` media query support

### SEO & Analytics

- Add unique `<title>` and `<meta name="description">` to every page
- Add GA4 tracking placeholder on every page

### Cleanup

- Remove 99 obsolete CSS vendor prefixes (keep only `-webkit-font-smoothing` and `-webkit-text-size-adjust`)
- Remove all IE compatibility code
- Remove dead CSS and unused files

## v1.0.0

Initial release by Colorlib. Bootstrap 4.1, jQuery 3.3.1, Owl Carousel, SlickNav, Modernizr.
