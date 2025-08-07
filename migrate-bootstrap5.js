import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { resolve } from 'path';

// Bootstrap 4 to 5 class mappings
const classReplacements = {
  // Utilities - Left/Right to Start/End
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
  'form-row': 'row',
  
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
  
  // Utilities
  'font-weight-': 'fw-',
  'font-italic': 'fst-italic',
  'text-monospace': 'font-monospace',
  'text-hide': 'd-none',
  
  // Close button
  'close': 'btn-close',
  
  // Jumbotron (removed - use custom CSS)
  'jumbotron': 'p-5 mb-4 bg-light rounded-3',
  
  // Media object (removed - use flexbox)
  'media': 'd-flex',
  'media-body': 'flex-grow-1 ms-3'
};

// Data attribute replacements
const dataAttributeReplacements = {
  'data-toggle': 'data-bs-toggle',
  'data-target': 'data-bs-target',
  'data-dismiss': 'data-bs-dismiss',
  'data-placement': 'data-bs-placement',
  'data-content': 'data-bs-content',
  'data-trigger': 'data-bs-trigger',
  'data-offset': 'data-bs-offset',
  'data-parent': 'data-bs-parent',
  'data-slide': 'data-bs-slide',
  'data-ride': 'data-bs-ride',
  'data-slide-to': 'data-bs-slide-to',
  'data-interval': 'data-bs-interval',
  'data-keyboard': 'data-bs-keyboard',
  'data-pause': 'data-bs-pause',
  'data-wrap': 'data-bs-wrap',
  'data-touch': 'data-bs-touch',
  'data-backdrop': 'data-bs-backdrop',
  'data-scroll': 'data-bs-scroll'
};

function migrateBootstrapClasses(content) {
  let migratedContent = content;
  
  // Replace classes
  Object.entries(classReplacements).forEach(([oldClass, newClass]) => {
    // Match whole class names in class attributes
    const classRegex = new RegExp(`(class="[^"]*\\b)${oldClass.replace(/[-/]/g, '\\$&')}`, 'g');
    migratedContent = migratedContent.replace(classRegex, `$1${newClass}`);
  });
  
  // Replace data attributes
  Object.entries(dataAttributeReplacements).forEach(([oldAttr, newAttr]) => {
    const attrRegex = new RegExp(oldAttr, 'g');
    migratedContent = migratedContent.replace(attrRegex, newAttr);
  });
  
  // Fix specific Bootstrap 5 changes
  
  // Update dropdown menu structure
  migratedContent = migratedContent.replace(
    /<a([^>]*?)class="([^"]*?)dropdown-toggle([^"]*?)"([^>]*?)>/g,
    '<a$1class="$2dropdown-toggle$3"$4 role="button" data-bs-toggle="dropdown" aria-expanded="false">'
  );
  
  // Update modal structure
  migratedContent = migratedContent.replace(
    /data-bs-backdrop="static" data-bs-keyboard="false"/g,
    'data-bs-backdrop="static" data-bs-keyboard="false"'
  );
  
  // Fix button group
  migratedContent = migratedContent.replace(
    /btn-group-toggle/g,
    'btn-group'
  );
  
  // Update carousel indicators
  migratedContent = migratedContent.replace(
    /<li data-bs-target/g,
    '<button type="button" data-bs-target'
  );
  migratedContent = migratedContent.replace(
    /<\/li>(\s*<li data-bs-target|\s*<\/ol>)/g,
    '</button>$1'
  );
  
  return migratedContent;
}

function migrateHtmlFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const migratedContent = migrateBootstrapClasses(content);
  
  // Count changes made
  let changesCount = 0;
  Object.entries(classReplacements).forEach(([oldClass]) => {
    const oldCount = (content.match(new RegExp(oldClass.replace(/[-/]/g, '\\$&'), 'g')) || []).length;
    const newCount = (migratedContent.match(new RegExp(oldClass.replace(/[-/]/g, '\\$&'), 'g')) || []).length;
    changesCount += oldCount - newCount;
  });
  
  Object.entries(dataAttributeReplacements).forEach(([oldAttr]) => {
    const oldCount = (content.match(new RegExp(oldAttr, 'g')) || []).length;
    const newCount = (migratedContent.match(new RegExp(oldAttr, 'g')) || []).length;
    changesCount += oldCount - newCount;
  });
  
  writeFileSync(filePath, migratedContent);
  return changesCount;
}

function migrateAllHtmlFiles() {
  console.log('🚀 Starting Bootstrap 5 migration...\n');
  
  // Migrate HTML files in srtdash directory
  const srtdashPath = resolve('srtdash');
  if (existsSync(srtdashPath)) {
    const htmlFiles = readdirSync(srtdashPath)
      .filter(file => file.endsWith('.html'))
      .map(file => resolve(srtdashPath, file));
    
    let totalChanges = 0;
    htmlFiles.forEach(file => {
      const changes = migrateHtmlFile(file);
      totalChanges += changes;
      console.log(`✅ Migrated ${file.split('/').pop()} (${changes} changes)`);
    });
    
    console.log(`\n✨ Migration complete! Total changes: ${totalChanges}`);
  }
  
  // Also migrate partials
  const partialsPath = resolve('src/partials');
  if (existsSync(partialsPath)) {
    const partialFiles = readdirSync(partialsPath)
      .filter(file => file.endsWith('.hbs'))
      .map(file => resolve(partialsPath, file));
    
    partialFiles.forEach(file => {
      const changes = migrateHtmlFile(file);
      console.log(`✅ Migrated partial ${file.split('/').pop()} (${changes} changes)`);
    });
  }
}

// Run migration
migrateAllHtmlFiles();