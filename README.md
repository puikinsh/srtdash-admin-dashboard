# SRTdash Admin Dashboard

SRTdash is a free, multipurpose admin dashboard template designed for web applications, SaaS products, and back-office panels. It ships with **56 ready-to-use pages** covering everything from analytics dashboards and data tables to chat, email, file management, user profiles, and full authentication flows — all built on **Bootstrap 5.3.8** with pure **vanilla JavaScript**. No jQuery, no build tools, no framework lock-in.

The template features four distinct dashboard layouts (ICO/Crypto, Ecommerce, SEO/Marketing, and a horizontal-menu variant), each populated with realistic demo data rendered through Chart.js, Highcharts, ZingChart, and AmCharts. Every page is fully responsive, accessible out of the box (skip links, focus-visible, reduced-motion support), and optimized with AVIF images, modern font loading, and a GA4 tracking placeholder.

Whether you are bootstrapping an internal tool, prototyping a client project, or learning Bootstrap 5, SRTdash gives you a polished starting point with clean, modular code you can understand and extend in minutes.

<p align="center">
  <a href="https://colorlib.com/polygon/srtdash/index.html">
    <img src="srtdash-dashboard-main-page.png" alt="SRTdash main dashboard — ICO/crypto variant with live charts and statistics" width="720">
  </a>
</p>

<p align="center">
  <a href="https://colorlib.com/polygon/srtdash/index.html">
    <img src="srtdash-secondary-dashboard-example.png" alt="SRTdash secondary dashboard — SEO/marketing variant with user statistics" width="720">
  </a>
</p>

<p align="center">
  <a href="https://colorlib.com/polygon/srtdash/index.html"><strong>Live Preview</strong></a>
</p>

## Highlights

- **56 pages** — 4 dashboard variants, 9 app pages, 25+ UI components, auth flows, error pages
- **Zero jQuery** — every interaction is vanilla JavaScript
- **Bootstrap 5.3.8** — latest stable release, Popper bundled
- **4 charting libraries** — Chart.js 4, Highcharts 12, ZingChart, AmCharts
- **AVIF images** with `<picture>` JPG/PNG fallback on every image
- **Accessible** — skip links, `focus-visible`, `prefers-reduced-motion`
- **Font Awesome 7.1** + Themify Icons — two full icon sets included
- **GA4 ready** — tracking placeholder on every page
- **No build step** — open any HTML file and go

## Premium Admin Dashboards

Looking for more features, more pages, and dedicated support? Check out our premium dashboard templates on [DashboardPack](https://dashboardpack.com/).

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://dashboardpack.com/theme-details/tailpanel/">
        <img src="screenshots/tailpanel.png" alt="TailPanel — React + Tailwind CSS admin dashboard" width="100%">
      </a>
      <br>
      <a href="https://dashboardpack.com/theme-details/tailpanel/"><strong>TailPanel</strong></a>
      <br>
      <sub>React + TypeScript + Tailwind CSS + Vite. 9 dashboard layouts, dark/light themes.</sub>
    </td>
    <td align="center" width="50%">
      <a href="https://dashboardpack.com/theme-details/admindek-html/">
        <img src="screenshots/admindek.png" alt="Admindek — Bootstrap 5 admin dashboard with 100+ components" width="100%">
      </a>
      <br>
      <a href="https://dashboardpack.com/theme-details/admindek-html/"><strong>Admindek</strong></a>
      <br>
      <sub>Bootstrap 5 + vanilla JS. 100+ UI components, dark/light themes, RTL support.</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://dashboardpack.com/theme-details/adminty-html-dashboard/">
        <img src="screenshots/adminty.png" alt="Adminty — Bootstrap 5 admin dashboard with 160+ pages" width="100%">
      </a>
      <br>
      <a href="https://dashboardpack.com/theme-details/adminty-html-dashboard/"><strong>Adminty</strong></a>
      <br>
      <sub>Bootstrap 5. 160+ ready-to-use pages, comprehensive UI component library.</sub>
    </td>
    <td align="center" width="50%">
      <a href="https://dashboardpack.com/theme-details/architectui-dashboard-html-pro/">
        <img src="screenshots/architectui.png" alt="ArchitectUI — Bootstrap 5 admin dashboard with 250+ components" width="100%">
      </a>
      <br>
      <a href="https://dashboardpack.com/theme-details/architectui-dashboard-html-pro/"><strong>ArchitectUI</strong></a>
      <br>
      <sub>Bootstrap 5. 250+ components and widgets, modular architecture, 9 dashboards.</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <a href="https://dashboardpack.com/theme-details/kero-jquery-html-dashboard-pro/">
        <img src="screenshots/kero.png" alt="Kero — Bootstrap 5 admin dashboard with Webpack" width="100%">
      </a>
      <br>
      <a href="https://dashboardpack.com/theme-details/kero-jquery-html-dashboard-pro/"><strong>Kero</strong></a>
      <br>
      <sub>Bootstrap 5 + Webpack. Horizontal and sidebar layouts, SASS theming.</sub>
    </td>
    <td align="center" width="50%">
      <a href="https://dashboardpack.com/theme-details/cryptocurrency-dashboard/">
        <img src="screenshots/cryptocurrency.png" alt="Cryptocurrency Dashboard — Bitcoin and ICO admin panel" width="100%">
      </a>
      <br>
      <a href="https://dashboardpack.com/theme-details/cryptocurrency-dashboard/"><strong>Cryptocurrency Dashboard</strong></a>
      <br>
      <sub>Bootstrap. Purpose-built for ICO, Bitcoin, and crypto asset management.</sub>
    </td>
  </tr>
</table>

<p align="center">
  <a href="https://dashboardpack.com/"><strong>Browse All Premium Templates</strong></a>
</p>

## Quick Start

```bash
# Python
cd srtdash && python3 -m http.server 8000

# Node
npx http-server srtdash

# Then visit http://localhost:8000
```

There is a [starter template](srtdash/starter.html) for creating new pages — copy it, update the `<title>` and `<meta description>`, and add your content inside `.main-content-inner`.

## Pages

### Dashboards

| Page | Description |
|------|-------------|
| [index.html](srtdash/index.html) | ICO / Crypto dashboard |
| [index2.html](srtdash/index2.html) | Ecommerce dashboard |
| [index3.html](srtdash/index3.html) | SEO / Marketing dashboard |
| [index3-horizontalmenu.html](srtdash/index3-horizontalmenu.html) | Horizontal menu variant |

### App Pages

| Page | Description |
|------|-------------|
| [calendar.html](srtdash/calendar.html) | Event calendar |
| [chat.html](srtdash/chat.html) | Chat / messaging interface |
| [email.html](srtdash/email.html) | Email inbox |
| [file-manager.html](srtdash/file-manager.html) | File manager |
| [invoice.html](srtdash/invoice.html) | Invoice template |
| [notifications.html](srtdash/notifications.html) | Notification center |
| [profile.html](srtdash/profile.html) | User profile |
| [settings.html](srtdash/settings.html) | Account settings |
| [widgets.html](srtdash/widgets.html) | Widget showcase |

### Charts

| Page | Description |
|------|-------------|
| [barchart.html](srtdash/barchart.html) | Bar charts (Chart.js, Highcharts, AmCharts) |
| [linechart.html](srtdash/linechart.html) | Line charts (Chart.js, Highcharts, ZingChart, AmCharts) |
| [piechart.html](srtdash/piechart.html) | Pie / doughnut charts (Chart.js, ZingChart, AmCharts, Highcharts) |
| [maps.html](srtdash/maps.html) | Google Maps |

### UI Components

Accordion, Alerts, Badges, Buttons, Button Groups, Cards, Dropdowns, Grid, List Groups, Media Objects, Modals, Pagination, Popovers, Pricing Tables, Progress Bars, Tabs, Typography

### Tables & Forms

| Page | Description |
|------|-------------|
| [datatable.html](srtdash/datatable.html) | Interactive data tables (Simple-DataTables) |
| [table-basic.html](srtdash/table-basic.html) | Basic Bootstrap tables |
| [table-layout.html](srtdash/table-layout.html) | Table layout variations |
| [form.html](srtdash/form.html) | Form elements and validation |

### Icons

| Page | Description |
|------|-------------|
| [fontawesome.html](srtdash/fontawesome.html) | Font Awesome 7.1 icon showcase |
| [themify.html](srtdash/themify.html) | Themify Icons showcase |

### Authentication & Error

Login (3 variants), Register (4 variants), Forgot Password, Reset Password, Screen Lock (2 variants), 401, 403, 404, 500

## Tech Stack

| Library | Version | Source |
|---------|---------|--------|
| Bootstrap | 5.3.8 | Vendor (bundle with Popper) |
| MetisMenuJS | 1.4.0 | Vendor |
| Swiper | 12.1.0 | Vendor |
| Simple-DataTables | 10.x | CDN |
| Chart.js | 4.5.1 | CDN |
| Highcharts | 12.5.0 | CDN |
| ZingChart | 2.9.16 | CDN |
| Font Awesome | 7.1.0 Free | Vendor |
| Themify Icons | -- | Vendor |
| Google Fonts | -- | CDN (Lato, Poppins) |

## Project Structure

```
srtdash/
├── assets/
│   ├── css/          # Bootstrap 5.3.8, Font Awesome 7.1, template styles
│   ├── js/           # Vanilla JS — scripts.js, chart files, vendor libs
│   ├── fonts/        # Font Awesome + Themify icon fonts
│   └── images/       # AVIF + JPG/PNG fallback images
├── index.html        # Main dashboard
├── starter.html      # Blank page template
└── *.html            # All other pages
documentation/        # Standalone docs site (separate)
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full version history.

## Authors

[Colorlib](https://colorlib.com)

## Related Resources

- [Live Preview](https://colorlib.com/polygon/srtdash/index.html)
- [Bootstrap Dashboards](https://colorlib.com/wp/free-bootstrap-admin-dashboard-templates/)
- [Angular Dashboards](https://colorlib.com/wp/angularjs-admin-templates/)
- [Free Admin Dashboards](https://colorlib.com/wp/free-html5-admin-dashboard-templates/)
- [Bootstrap Templates](https://colorlib.com/wp/templates/)
- [WordPress Themes](https://colorlib.com/wp/free-wordpress-themes/)

## License

SRTdash is licensed under The MIT License (MIT). You can use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the final products. You must always credit Colorlib as the original author.
