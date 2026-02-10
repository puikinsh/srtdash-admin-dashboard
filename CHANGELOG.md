# Changelog

All notable changes to the SRTdash Admin Dashboard template are documented here.

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
