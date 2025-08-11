import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Function to remove sourceMappingURL comments from files
function removeSourceMapComments(filePath) {
  try {
    let content = readFileSync(filePath, 'utf8');
    const originalLength = content.length;
    
    // Remove sourceMappingURL comments
    content = content.replace(/\/\*# sourceMappingURL=.*?\*\//g, '');
    content = content.replace(/\/\/# sourceMappingURL=.*/g, '');
    
    if (content.length !== originalLength) {
      writeFileSync(filePath, content);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Process CSS files
console.log('🔧 Removing source map references from CSS files...');
const cssDir = 'srtdash/assets/css';
const cssFiles = readdirSync(cssDir).filter(f => f.endsWith('.css'));

cssFiles.forEach(file => {
  const fullPath = join(cssDir, file);
  if (removeSourceMapComments(fullPath)) {
    console.log(`  ✅ Fixed: ${file}`);
  }
});

// Process JS files
console.log('\n🔧 Removing source map references from JS files...');
const jsDir = 'srtdash/assets/js';
const jsFiles = readdirSync(jsDir).filter(f => f.endsWith('.js'));

jsFiles.forEach(file => {
  const fullPath = join(jsDir, file);
  if (removeSourceMapComments(fullPath)) {
    console.log(`  ✅ Fixed: ${file}`);
  }
});

// Also check vendor directory if it exists
try {
  const vendorDir = 'srtdash/assets/js/vendor';
  const vendorFiles = readdirSync(vendorDir).filter(f => f.endsWith('.js'));
  
  vendorFiles.forEach(file => {
    const fullPath = join(vendorDir, file);
    if (removeSourceMapComments(fullPath)) {
      console.log(`  ✅ Fixed: vendor/${file}`);
    }
  });
} catch (e) {
  // Vendor directory might not exist
}

console.log('\n✨ Source map references removed! Restart your dev server for a clean console.');