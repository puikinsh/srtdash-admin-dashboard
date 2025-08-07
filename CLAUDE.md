# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SRTdash is a static HTML admin dashboard template built with Bootstrap 4. This is NOT a web application with build processes, but rather a collection of static HTML/CSS/JS files that can be directly opened in a browser or integrated into any backend framework.

## Development Commands

Since this is a static template, there are no build/test/lint commands. Development workflow:
- Open HTML files directly in browser for preview
- Use any local web server (e.g., `python -m http.server` or Live Server extension)
- Modify files directly - changes are immediately visible on refresh

## Architecture & Structure

### Directory Layout
```
srtdash/                  # Main template directory
├── *.html               # 46+ template pages (dashboards, components, forms, etc.)
├── assets/
│   ├── css/            # Stylesheets
│   │   ├── styles.css         # Main custom styles
│   │   ├── default-css.css   # Base framework styles
│   │   └── responsive.css    # Mobile/tablet responsiveness
│   ├── js/             # JavaScript files
│   │   ├── scripts.js        # Core template functionality
│   │   └── vendor/           # Third-party libraries
│   └── images/         # Icons, logos, UI assets
documentation/           # Template documentation site
```

### Key Template Pages
- **Dashboards:** `index.html`, `index2.html`, `index3.html` - Different dashboard layouts
- **Starter Template:** `starter.html` - Clean slate for new pages
- **Authentication:** `login.html`, `register.html`, `forgot-password.html`, `screen-lock.html`
- **Components:** Individual pages for each UI component (buttons, forms, tables, charts, etc.)

### Technology Stack
- **Frontend Framework:** Bootstrap 4 with jQuery 2.2.4
- **Charts:** Chart.js (local) and AmCharts 3 (CDN)
- **Icons:** Font Awesome + Themify Icons
- **Navigation:** MetisMenu for sidebar, SlickNav for mobile

### Template Architecture Pattern
All pages follow this consistent structure:
1. Common sidebar navigation (`<nav class="sidebar">`)
2. Main content area with header bar
3. Shared CSS/JS includes in same order
4. Page-specific scripts at bottom of body

### Critical Files for Customization
- **Global Styles:** `srtdash/assets/css/styles.css` - Override Bootstrap defaults here
- **Core JavaScript:** `srtdash/assets/js/scripts.js` - Template interactions and initializations
- **Navigation Structure:** Present in every HTML file's sidebar section
- **Color Scheme:** Defined in CSS variables within `styles.css`

### Integration Points
When integrating with backend frameworks:
1. Extract common layout elements (sidebar, header) into partials/components
2. Keep asset paths relative to maintain portability
3. Charts data is hardcoded in HTML - replace with dynamic data injection
4. Form actions point to `#` - update with actual endpoints

### Common Modifications
- **Adding New Pages:** Copy `starter.html` and maintain the same structure
- **Updating Navigation:** Modify sidebar `<ul class="metismenu">` in each HTML file
- **Custom Styling:** Add to `styles.css` rather than modifying Bootstrap files
- **Chart Data:** Look for inline `<script>` tags in chart pages for data configuration