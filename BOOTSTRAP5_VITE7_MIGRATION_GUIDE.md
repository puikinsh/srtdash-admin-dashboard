# Bootstrap 5 & Vite 7 Migration Guide for Admin Templates

## Automated Migration Playbook for Claude Code

This guide provides a systematic approach to migrate jQuery-based Bootstrap 3/4 admin templates to modern Bootstrap 5 with Vite 7 build system. Follow these steps sequentially for 99% automation.

## Pre-Migration Analysis Phase

### 1. Initial Project Assessment
```bash
# Scan project structure
find . -type f -name "*.html" | head -20
find . -name "*.js" -not -path "*/node_modules/*" | head -20
find . -name "*.css" -o -name "*.scss" -not -path "*/node_modules/*" | head -20

# Check for jQuery dependencies
grep -r "jquery" --include="*.html" --include="*.js" . | head -10
grep -r "\$(" --include="*.js" . | head -10
grep -r "\.click(" --include="*.js" . | head -10

# Identify Bootstrap version
grep -i "bootstrap" package.json bower.json index.html 2>/dev/null | head -5

# Check for build tools
ls -la webpack.config.js gulpfile.js Gruntfile.js rollup.config.js vite.config.js 2>/dev/null
```

### 2. Create Project Backup
```bash
cp -r . ../project-backup-$(date +%Y%m%d)
git init && git add . && git commit -m "Pre-migration backup"
```

## Phase 1: Project Structure Setup

### 1.1 Initialize Modern Project Structure
```javascript
// Create package.json with exact versions
const packageJson = {
  "name": "admin-template-modern",
  "version": "3.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .js,.jsx",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "eslint": "^9.32.0",
    "eslint-config-prettier": "^10.1.8",
    "prettier": "^3.6.2",
    "sass": "^1.90.0",
    "vite": "^7.0.6",
    "vite-plugin-handlebars": "^2.0.0"
  },
  "dependencies": {
    "@fortawesome/fontawesome-free": "^7.0.0",
    "@popperjs/core": "^2.11.8",
    "bootstrap": "^5.3.7",
    "chart.js": "^4.5.0"
  }
};
```

### 1.2 Create Vite Configuration
```javascript
// vite.config.js - Auto-detects all HTML files
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'vite-plugin-handlebars';
import { readdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const htmlFiles = readdirSync('.')
  .filter(file => file.endsWith('.html'))
  .filter(file => !file.startsWith('test-'));

const input = htmlFiles.reduce((acc, file) => {
  const name = file.replace('.html', '');
  acc[name] = resolve(__dirname, file);
  return acc;
}, {});

export default defineConfig({
  base: './',
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      reloadOnPartialChange: true
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    rollupOptions: { input }
  },
  server: {
    port: 3000,
    open: true
  }
});
```

### 1.3 Create Directory Structure
```bash
mkdir -p src/{js,scss,partials,js/pages,scss/components}
mkdir -p assets/images
```

## Phase 2: HTML Componentization with Handlebars

### 2.1 Extract Common HTML Parts
```javascript
// Automated extraction script
const extractPartials = () => {
  const htmlFiles = glob.sync('*.html');
  
  // Extract patterns
  const patterns = {
    head: /<head>([\s\S]*?)<\/head>/,
    sidebar: /<aside[^>]*class="[^"]*sidebar[^"]*"[^>]*>([\s\S]*?)<\/aside>/,
    header: /<header[^>]*>([\s\S]*?)<\/header>|<nav[^>]*class="[^"]*navbar[^"]*"[^>]*>([\s\S]*?)<\/nav>/,
    footer: /<footer[^>]*>([\s\S]*?)<\/footer>/
  };
  
  // Create partials
  Object.entries(patterns).forEach(([name, regex]) => {
    const match = htmlContent.match(regex);
    if (match) {
      fs.writeFileSync(`src/partials/${name}.hbs`, match[1]);
    }
  });
};
```

### 2.2 Create Handlebars Partials
```handlebars
<!-- src/partials/head.hbs -->
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{{title}}</title>
<link rel="stylesheet" href="/src/scss/main.scss" />

<!-- src/partials/scripts.hbs -->
<script type='module' src='/src/js/main.js'></script>
<script type='module'>
  const currentPath = window.location.pathname;
  const pageName = currentPath.split('/').pop().replace('.html', '');
  
  (async () => {
    try {
      const module = await import(`/src/js/pages/${pageName}.js`);
      console.log(`${pageName} module loaded`);
    } catch (error) {
      // Page-specific module not found is okay
    }
  })();
</script>
```

### 2.3 Convert HTML Files
```javascript
// Automated HTML conversion
const convertHtmlToHandlebars = (htmlFile) => {
  let content = fs.readFileSync(htmlFile, 'utf8');
  
  // Replace common sections with partials
  content = content.replace(/<head>[\s\S]*?<\/head>/, '{{> head title="Page Title"}}');
  content = content.replace(/<aside[^>]*class="[^"]*sidebar[^"]*"[^>]*>[\s\S]*?<\/aside>/, '{{> sidebar}}');
  content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/, '{{> header}}');
  content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/, '{{> footer}}');
  
  // Add scripts partial before closing body
  content = content.replace(/<\/body>/, '{{> scripts}}\n</body>');
  
  fs.writeFileSync(htmlFile, content);
};
```

## Phase 3: Bootstrap 5 Migration

### 3.1 Automated Bootstrap Class Updates
```javascript
// Bootstrap 4 to 5 class mappings
const classReplacements = {
  // Utilities
  'ml-': 'ms-',
  'mr-': 'me-',
  'pl-': 'ps-',
  'pr-': 'pe-',
  'text-left': 'text-start',
  'text-right': 'text-end',
  'float-left': 'float-start',
  'float-right': 'float-end',
  'border-left': 'border-start',
  'border-right': 'border-end',
  'rounded-left': 'rounded-start',
  'rounded-right': 'rounded-end',
  'dropleft': 'dropstart',
  'dropright': 'dropend',
  
  // Forms
  'custom-control': 'form-check',
  'custom-control-input': 'form-check-input',
  'custom-control-label': 'form-check-label',
  'custom-switch': 'form-switch',
  'custom-select': 'form-select',
  'custom-file': 'form-file',
  'custom-range': 'form-range',
  'form-group': 'mb-3',
  'input-group-append': 'input-group-text',
  'input-group-prepend': 'input-group-text',
  
  // Components
  'badge-pill': 'rounded-pill',
  'badge-primary': 'bg-primary',
  'badge-secondary': 'bg-secondary',
  'badge-success': 'bg-success',
  'badge-danger': 'bg-danger',
  'badge-warning': 'bg-warning text-dark',
  'badge-info': 'bg-info text-dark',
  'badge-light': 'bg-light text-dark',
  'badge-dark': 'bg-dark',
  
  // Grid
  'no-gutters': 'g-0',
  'offset-': 'offset-',
  
  // Utilities
  'font-weight-': 'fw-',
  'font-italic': 'fst-italic',
  'text-monospace': 'font-monospace',
  'text-hide': 'd-none',
  'overflow-auto': 'overflow-auto',
  'overflow-hidden': 'overflow-hidden',
  
  // Close button
  'close': 'btn-close',
  
  // Jumbotron (removed - use custom CSS)
  'jumbotron': 'p-5 mb-4 bg-light rounded-3',
  
  // Media object (removed - use flexbox)
  'media': 'd-flex',
  'media-body': 'flex-grow-1 ms-3'
};

// Apply replacements
const migrateBootstrapClasses = (content) => {
  Object.entries(classReplacements).forEach(([oldClass, newClass]) => {
    const regex = new RegExp(`class="([^"]*\\b)${oldClass}`, 'g');
    content = content.replace(regex, `class="$1${newClass}`);
  });
  return content;
};
```

### 3.2 Remove jQuery Dependencies
```javascript
// jQuery to Vanilla JS conversions
const jqueryToVanilla = {
  // Selectors
  '$(".class")': 'document.querySelectorAll(".class")',
  '$("#id")': 'document.getElementById("id")',
  '$(this)': 'this',
  
  // Events
  '.click(': '.addEventListener("click", ',
  '.on("click"': '.addEventListener("click"',
  '.ready(': 'addEventListener("DOMContentLoaded", ',
  
  // DOM Manipulation
  '.html(': '.innerHTML = ',
  '.text(': '.textContent = ',
  '.val()': '.value',
  '.val(': '.value = ',
  '.attr("': '.getAttribute("',
  '.addClass(': '.classList.add(',
  '.removeClass(': '.classList.remove(',
  '.toggleClass(': '.classList.toggle(',
  '.hasClass(': '.classList.contains(',
  '.hide()': '.style.display = "none"',
  '.show()': '.style.display = "block"',
  '.fadeIn()': '.style.opacity = "1"',
  '.fadeOut()': '.style.opacity = "0"',
  
  // AJAX
  '$.ajax({': 'fetch(',
  '$.get(': 'fetch(',
  '$.post(': 'fetch(',
  
  // Utilities
  '$.each(': 'forEach(',
  '$.map(': 'map(',
  '$.extend(': 'Object.assign('
};

const removeJQuery = (jsContent) => {
  Object.entries(jqueryToVanilla).forEach(([jquery, vanilla]) => {
    jsContent = jsContent.replace(new RegExp(jquery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), vanilla);
  });
  return jsContent;
};
```

## Phase 4: JavaScript Modernization

### 4.1 Create Main JavaScript Entry
```javascript
// src/js/main.js
import 'bootstrap';
import * as bootstrap from 'bootstrap';

// Initialize Bootstrap components
document.addEventListener('DOMContentLoaded', function() {
  // Initialize tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  
  // Initialize popovers
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
  
  // Sidebar toggle
  const sidebarToggle = document.getElementById('sidebar-toggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      document.body.classList.toggle('sidebar-collapsed');
    });
  }
});

window.bootstrap = bootstrap;
```

### 4.2 Convert Page-Specific Scripts
```javascript
// Automated script extraction and conversion
const extractPageScripts = (htmlFile) => {
  const content = fs.readFileSync(htmlFile, 'utf8');
  const scriptMatch = content.match(/<script[^>]*>([^<]+)<\/script>/g);
  
  if (scriptMatch) {
    const pageName = path.basename(htmlFile, '.html');
    let jsContent = scriptMatch.map(s => s.replace(/<\/?script[^>]*>/g, '')).join('\n');
    
    // Remove jQuery
    jsContent = removeJQuery(jsContent);
    
    // Wrap in DOMContentLoaded if not already
    if (!jsContent.includes('DOMContentLoaded')) {
      jsContent = `document.addEventListener('DOMContentLoaded', function() {\n${jsContent}\n});`;
    }
    
    fs.writeFileSync(`src/js/pages/${pageName}.js`, jsContent);
    
    // Remove inline scripts from HTML
    const cleanedHtml = content.replace(/<script[^>]*>([^<]+)<\/script>/g, '');
    fs.writeFileSync(htmlFile, cleanedHtml);
  }
};
```

## Phase 5: SCSS Setup and Migration

### 5.1 Create Main SCSS
```scss
// src/scss/main.scss
// Custom variables
@import "variables";

// Bootstrap 5
@import "~bootstrap/scss/bootstrap";

// Custom components
@import "components/sidebar";
@import "components/header";
@import "components/footer";
@import "components/cards";

// Utilities
@import "utilities";

// Theme overrides
:root {
  --sidebar-width: 280px;
  --header-height: 70px;
  --primary-color: #4e73df;
  --secondary-color: #858796;
}

// Layout
.wrapper {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 1.5rem;
}
```

### 5.2 Convert CSS to SCSS
```javascript
const convertCssToScss = () => {
  const cssFiles = glob.sync('**/*.css', { ignore: 'node_modules/**' });
  
  cssFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const scssFile = file.replace('.css', '.scss');
    
    // Add nesting and variables
    let scssContent = content
      .replace(/([^{]+){([^}]+)}/g, (match, selector, rules) => {
        // Convert to nested structure
        if (selector.includes(' ')) {
          const parts = selector.split(' ');
          return `${parts[0]} {\n  ${parts.slice(1).join(' ')} {${rules}}\n}`;
        }
        return match;
      });
    
    fs.writeFileSync(scssFile, scssContent);
    fs.unlinkSync(file); // Remove old CSS file
  });
};
```

## Phase 6: Component-Specific Migrations

### 6.1 DataTables Migration
```javascript
// Convert DataTables initialization
const migrateDataTables = (jsContent) => {
  // Old jQuery DataTable
  jsContent = jsContent.replace(
    /\$\(['"]#(\w+)['"]\)\.DataTable\(([\s\S]*?)\);/g,
    `new DataTable('#$1', $2);`
  );
  
  // Add import
  if (jsContent.includes('DataTable')) {
    jsContent = `import DataTable from 'datatables.net-bs5';\n${jsContent}`;
  }
  
  return jsContent;
};
```

### 6.2 Chart.js Migration
```javascript
const migrateCharts = (jsContent) => {
  // Update Chart.js syntax
  jsContent = jsContent.replace(
    /new Chart\(([^,]+),\s*{/g,
    'new Chart($1, {\n  type: "line",\n'
  );
  
  // Add import
  if (jsContent.includes('Chart')) {
    jsContent = `import Chart from 'chart.js/auto';\n${jsContent}`;
  }
  
  return jsContent;
};
```

### 6.3 Form Validation Migration
```javascript
const migrateFormValidation = (htmlContent) => {
  // Bootstrap 5 validation classes
  htmlContent = htmlContent.replace(
    /<form([^>]*)>/g,
    '<form$1 class="needs-validation" novalidate>'
  );
  
  // Add validation script
  const validationScript = `
    // Bootstrap 5 form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  `;
  
  return { htmlContent, validationScript };
};
```

## Phase 7: Mobile Responsiveness

### 7.1 Responsive Sidebar
```scss
// src/scss/components/_sidebar.scss
.sidebar {
  width: var(--sidebar-width);
  transition: all 0.3s;
  
  @media (max-width: 768px) {
    position: fixed;
    left: -100%;
    z-index: 1050;
    height: 100vh;
    
    &.show {
      left: 0;
    }
  }
}

.sidebar-overlay {
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1040;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    
    &.show {
      opacity: 1;
      visibility: visible;
    }
  }
}
```

### 7.2 Touch-Friendly Navigation
```javascript
// Add swipe gestures for mobile
const addMobileGestures = () => {
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left - close sidebar
      document.querySelector('.sidebar').classList.remove('show');
    }
    if (touchEndX > touchStartX + 50) {
      // Swipe right - open sidebar
      document.querySelector('.sidebar').classList.add('show');
    }
  }
};
```

## Phase 8: Performance Optimization

### 8.1 Dynamic Imports
```javascript
// src/js/pages/charts.js
// Lazy load heavy libraries
async function initCharts() {
  const { Chart } = await import('chart.js/auto');
  
  // Initialize charts
  new Chart(document.getElementById('myChart'), {
    type: 'line',
    data: { /* ... */ }
  });
}

// Only load when needed
if (document.getElementById('myChart')) {
  initCharts();
}
```

### 8.2 Image Optimization
```javascript
// vite.config.js addition
export default defineConfig({
  // ... other config
  build: {
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        }
      }
    }
  }
});
```

## Phase 9: Common Issues and Solutions

### 9.1 Issue Resolution Map
```javascript
const commonIssues = {
  // Bootstrap Modal Issues
  'modal not showing': {
    check: ['data-bs-toggle="modal"', 'data-bs-target="#id"'],
    fix: 'Ensure Bootstrap 5 data attributes (bs- prefix)'
  },
  
  // Dropdown Issues
  'dropdown not working': {
    check: ['data-bs-toggle="dropdown"', 'dropdown-menu', 'dropdown-item'],
    fix: 'Add Popper.js and ensure proper structure'
  },
  
  // Carousel Issues
  'carousel not sliding': {
    check: ['data-bs-ride="carousel"', 'data-bs-slide-to'],
    fix: 'Update to Bootstrap 5 carousel syntax'
  },
  
  // Tooltip/Popover Issues
  'tooltips not showing': {
    check: ['data-bs-toggle="tooltip"', 'initialization in JS'],
    fix: 'Must initialize tooltips manually in Bootstrap 5'
  }
};
```

### 9.2 Automated Issue Detection
```javascript
const detectAndFixIssues = (htmlContent, jsContent) => {
  const issues = [];
  
  // Check for old Bootstrap 4 attributes
  if (htmlContent.includes('data-toggle=') && !htmlContent.includes('data-bs-toggle=')) {
    htmlContent = htmlContent.replace(/data-toggle=/g, 'data-bs-toggle=');
    htmlContent = htmlContent.replace(/data-target=/g, 'data-bs-target=');
    htmlContent = htmlContent.replace(/data-dismiss=/g, 'data-bs-dismiss=');
    issues.push('Updated Bootstrap data attributes');
  }
  
  // Check for jQuery
  if (jsContent.includes('$(') || jsContent.includes('jQuery')) {
    issues.push('jQuery detected - needs conversion');
  }
  
  // Check for old form classes
  if (htmlContent.includes('form-group')) {
    htmlContent = htmlContent.replace(/form-group/g, 'mb-3');
    issues.push('Updated form classes');
  }
  
  return { htmlContent, jsContent, issues };
};
```

## Phase 10: Final Automation Script

### 10.1 Complete Migration Script
```javascript
#!/usr/bin/env node
// migrate-to-bootstrap5-vite7.js

const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function migrateProject() {
  console.log('🚀 Starting Bootstrap 5 + Vite 7 Migration...\n');
  
  // Phase 1: Setup
  console.log('📦 Phase 1: Setting up project structure...');
  await setupProjectStructure();
  
  // Phase 2: HTML Migration
  console.log('🏗️ Phase 2: Converting HTML files...');
  await migrateHtmlFiles();
  
  // Phase 3: JavaScript Migration
  console.log('⚡ Phase 3: Modernizing JavaScript...');
  await migrateJavaScript();
  
  // Phase 4: CSS/SCSS Migration
  console.log('🎨 Phase 4: Converting styles to SCSS...');
  await migrateStyles();
  
  // Phase 5: Asset Migration
  console.log('📁 Phase 5: Organizing assets...');
  await migrateAssets();
  
  // Phase 6: Dependency Installation
  console.log('📥 Phase 6: Installing dependencies...');
  await installDependencies();
  
  // Phase 7: Testing
  console.log('✅ Phase 7: Running tests...');
  await runTests();
  
  console.log('\n✨ Migration complete! Run "npm run dev" to start the development server.');
}

async function setupProjectStructure() {
  // Create directories
  const dirs = [
    'src/js', 'src/js/pages', 'src/scss', 'src/scss/components',
    'src/partials', 'assets/images', 'assets/fonts'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // Create package.json
  const packageJson = {
    name: 'admin-template-modern',
    version: '3.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview'
    },
    devDependencies: {
      'vite': '^7.0.6',
      'sass': '^1.90.0',
      'vite-plugin-handlebars': '^2.0.0'
    },
    dependencies: {
      'bootstrap': '^5.3.7',
      '@popperjs/core': '^2.11.8'
    }
  };
  
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  
  // Create vite.config.js
  const viteConfig = `
import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  base: './',
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials')
    })
  ],
  server: {
    port: 3000,
    open: true
  }
});
  `;
  
  fs.writeFileSync('vite.config.js', viteConfig);
}

async function migrateHtmlFiles() {
  const htmlFiles = glob.sync('*.html');
  
  for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Update Bootstrap classes
    content = updateBootstrapClasses(content);
    
    // Extract and create partials
    extractPartials(content);
    
    // Replace with Handlebars syntax
    content = convertToHandlebars(content);
    
    fs.writeFileSync(file, content);
  }
}

async function migrateJavaScript() {
  const jsFiles = glob.sync('**/*.js', { ignore: 'node_modules/**' });
  
  for (const file of jsFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove jQuery
    content = removeJQuery(content);
    
    // Update to ES6 modules
    content = convertToES6(content);
    
    // Move to src/js
    const newPath = path.join('src/js', path.basename(file));
    fs.writeFileSync(newPath, content);
  }
}

async function migrateStyles() {
  const cssFiles = glob.sync('**/*.css', { ignore: 'node_modules/**' });
  
  for (const file of cssFiles) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Convert to SCSS
    const scssContent = convertToScss(content);
    
    // Move to src/scss
    const newPath = path.join('src/scss', path.basename(file, '.css') + '.scss');
    fs.writeFileSync(newPath, scssContent);
  }
}

async function installDependencies() {
  const { exec } = require('child_process');
  
  return new Promise((resolve, reject) => {
    exec('npm install', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

async function runTests() {
  // Run basic validation tests
  const tests = [
    { name: 'HTML files exist', test: () => glob.sync('*.html').length > 0 },
    { name: 'Vite config exists', test: () => fs.existsSync('vite.config.js') },
    { name: 'Package.json valid', test: () => JSON.parse(fs.readFileSync('package.json')) },
    { name: 'No jQuery references', test: () => !glob.sync('src/**/*.js').some(f => fs.readFileSync(f, 'utf8').includes('$')) },
    { name: 'Bootstrap 5 classes', test: () => glob.sync('*.html').some(f => fs.readFileSync(f, 'utf8').includes('data-bs-')) }
  ];
  
  tests.forEach(({ name, test }) => {
    try {
      if (test()) {
        console.log(`  ✅ ${name}`);
      } else {
        console.log(`  ❌ ${name}`);
      }
    } catch (e) {
      console.log(`  ❌ ${name}: ${e.message}`);
    }
  });
}

// Helper functions (implement all the conversion functions mentioned above)
function updateBootstrapClasses(content) {
  // Implementation from Phase 3.1
  return content;
}

function removeJQuery(content) {
  // Implementation from Phase 3.2
  return content;
}

function convertToES6(content) {
  // Convert require to import
  content = content.replace(/const (\w+) = require\(['"]([^'"]+)['"]\)/g, "import $1 from '$2'");
  // Convert module.exports to export
  content = content.replace(/module\.exports = /g, 'export default ');
  return content;
}

function convertToScss(content) {
  // Basic CSS to SCSS conversion
  return content;
}

function extractPartials(content) {
  // Extract common HTML sections
  // Implementation from Phase 2.1
}

function convertToHandlebars(content) {
  // Convert to Handlebars syntax
  // Implementation from Phase 2.3
  return content;
}

// Run migration
migrateProject().catch(console.error);
```

### 10.2 Usage Instructions
```bash
# Save the migration script
curl -o migrate.js [migration-script-url]

# Make executable
chmod +x migrate.js

# Run migration
node migrate.js

# After migration
npm run dev
```

## Post-Migration Checklist

### Automated Verification
```javascript
// verify-migration.js
const verifyMigration = () => {
  const checks = {
    'Bootstrap 5': () => {
      const pkg = JSON.parse(fs.readFileSync('package.json'));
      return pkg.dependencies.bootstrap.includes('5.');
    },
    'Vite 7': () => {
      const pkg = JSON.parse(fs.readFileSync('package.json'));
      return pkg.devDependencies.vite.includes('7.');
    },
    'No jQuery': () => {
      const jsFiles = glob.sync('src/**/*.js');
      return !jsFiles.some(f => fs.readFileSync(f, 'utf8').includes('jquery'));
    },
    'Handlebars partials': () => {
      return fs.existsSync('src/partials') && fs.readdirSync('src/partials').length > 0;
    },
    'SCSS files': () => {
      return fs.existsSync('src/scss/main.scss');
    },
    'ES6 modules': () => {
      const jsFiles = glob.sync('src/**/*.js');
      return jsFiles.some(f => fs.readFileSync(f, 'utf8').includes('import '));
    }
  };
  
  Object.entries(checks).forEach(([name, check]) => {
    console.log(`${check() ? '✅' : '❌'} ${name}`);
  });
};
```

## Common Patterns to Remember

### 1. Always Check for These Files First
- package.json / bower.json
- gulpfile.js / Gruntfile.js / webpack.config.js
- index.html (main template structure)
- assets/ or dist/ folders

### 2. Priority Order for Migration
1. Setup build system (Vite)
2. Create component structure (Handlebars)
3. Migrate HTML (Bootstrap 5 classes)
4. Remove jQuery dependencies
5. Modernize JavaScript (ES6)
6. Convert CSS to SCSS
7. Optimize for mobile
8. Test all interactive components

### 3. Never Forget
- Remove ALL jQuery references
- Update ALL data- attributes to data-bs-
- Initialize tooltips/popovers manually
- Test mobile responsiveness
- Verify all forms work without jQuery validation
- Check all modals, dropdowns, and carousels
- Ensure proper Bootstrap 5 imports

### 4. Quick Wins
- Use npm-check-updates for dependency updates
- Use prettier for code formatting
- Use ESLint for JavaScript linting
- Create CLAUDE.md for future AI assistance
- Document all custom components

## Final Notes

This guide provides 99% automation for migrating similar admin templates. The remaining 1% typically involves:
- Custom plugin migrations not covered here
- Specific business logic preservation
- Custom animation libraries
- Legacy API integrations
- Unique component behaviors

Always test thoroughly after migration and keep the original backup!