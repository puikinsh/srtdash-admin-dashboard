# SRTdash - Quick Start Guide

## 🚀 Quick Start

```bash
# Option 1: Use the start script (filters out warnings)
./start.sh

# Option 2: Use npm directly
npm run dev
```

Then open: http://localhost:3000

## 📝 About the Source Map Warnings

The warnings you see about `.map` files are **completely harmless**. They occur because:
- Minified libraries (bootstrap.min.css, metisMenu.min.js, etc.) reference source maps that don't exist
- These are only development warnings and don't affect functionality
- They won't appear in production builds

To reduce console noise, use `./start.sh` which filters these warnings.

## 🎯 What's Working

✅ **Bootstrap 5** - All components upgraded and functional  
✅ **Vite Dev Server** - Fast hot module replacement  
✅ **Handlebars Templates** - Modular HTML components  
✅ **SCSS Compilation** - Modern styling with variables  
✅ **jQuery-Free** - Pure vanilla JavaScript  

## 📁 Key Files & Folders

```
srtdash/          # Your HTML files (edit these)
src/
├── js/           # JavaScript modules
│   └── main.js   # Main entry point
├── scss/         # Stylesheets
│   └── main.scss # Main styles
└── partials/     # Reusable HTML components
    ├── header.hbs
    ├── sidebar.hbs
    └── footer.hbs
```

## 🛠️ Common Tasks

### Edit a page
1. Open any `.html` file in `srtdash/`
2. Changes auto-reload in browser

### Modify styles
1. Edit files in `src/scss/`
2. Changes apply instantly

### Update navigation
1. Edit `src/partials/sidebar.hbs`
2. All pages update automatically

### Add new JavaScript
1. Create file in `src/js/pages/`
2. Import in `src/js/main.js`

## 📦 Build for Production

```bash
npm run build
# Creates optimized files in dist/
```

## 🔧 Troubleshooting

### Port 3000 already in use
```bash
# Kill the existing process
pkill -f "node.*vite"
# Or use a different port
npm run dev -- --port 3001
```

### Changes not showing
1. Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
2. Clear browser cache
3. Restart dev server

### Styles not loading
- Check console for SCSS compilation errors
- Verify `src/scss/main.scss` exists
- Check import paths are correct

## 📚 Resources

- [Bootstrap 5 Components](https://getbootstrap.com/docs/5.3/components/)
- [Vite Documentation](https://vitejs.dev/)
- [Handlebars Syntax](https://handlebarsjs.com/guide/)

## 💡 Tips

1. **Use Bootstrap 5 utilities** instead of custom CSS when possible
2. **Keep JavaScript modular** - one file per feature
3. **Test on mobile** - Use browser dev tools responsive mode
4. **Check console** - Useful debugging information

---

Need help? Check `MIGRATION_REPORT.md` for detailed information.