import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { resolve, basename } from 'path';

// Function to extract common partials from HTML files
function extractPartials() {
  const sampleFile = 'srtdash/index.html';
  
  if (!existsSync(sampleFile)) {
    console.error('Sample file not found:', sampleFile);
    return;
  }
  
  const content = readFileSync(sampleFile, 'utf8');
  
  // Extract head section
  const headMatch = content.match(/<head>([\s\S]*?)<\/head>/);
  if (headMatch) {
    let headContent = headMatch[1]
      .replace(/assets\//g, '/assets/')  // Update asset paths for Vite
      .replace(/\.min\.css/g, '.css')    // Remove .min from CSS files
      .replace(/\.min\.js/g, '.js')      // Remove .min from JS files
      .trim();
    
    // Convert to Handlebars with dynamic title
    headContent = `<meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>{{#if title}}{{title}} - {{/if}}SRTdash Admin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/png" href="/assets/images/icon/favicon.ico">
    
    <!-- Main SCSS entry point for Vite -->
    <link rel="stylesheet" href="/src/scss/main.scss">`;
    
    writeFileSync('src/partials/head.hbs', headContent);
    console.log('✅ Created head.hbs');
  }
  
  // Extract sidebar
  const sidebarMatch = content.match(/<div class="sidebar-menu">([\s\S]*?)<\/div>\s*<!-- sidebar menu area end -->/);
  if (sidebarMatch) {
    let sidebarContent = sidebarMatch[1]
      .replace(/assets\//g, '/assets/')
      .trim();
    
    writeFileSync('src/partials/sidebar.hbs', `<div class="sidebar-menu">
${sidebarContent}
</div>`);
    console.log('✅ Created sidebar.hbs');
  }
  
  // Extract header
  const headerMatch = content.match(/<div class="header-area">([\s\S]*?)<\/div>\s*<!-- header area end -->/);
  if (headerMatch) {
    let headerContent = headerMatch[1]
      .replace(/assets\//g, '/assets/')
      .trim();
    
    writeFileSync('src/partials/header.hbs', `<div class="header-area">
${headerContent}
</div>`);
    console.log('✅ Created header.hbs');
  }
  
  // Extract footer
  const footerMatch = content.match(/<footer>([\s\S]*?)<\/footer>/);
  if (footerMatch) {
    let footerContent = footerMatch[1]
      .replace(/assets\//g, '/assets/')
      .trim();
    
    writeFileSync('src/partials/footer.hbs', `<footer>
${footerContent}
</footer>`);
    console.log('✅ Created footer.hbs');
  }
  
  // Extract scripts section
  const scriptsContent = `<!-- Scripts -->
<script type="module" src="/src/js/main.js"></script>

{{#if pageScript}}
<script type="module">
  // Load page-specific module if it exists
  const pageName = '{{pageScript}}';
  import(\`/src/js/pages/\${pageName}.js\`).catch(() => {
    // Page-specific script not found, that's okay
  });
</script>
{{/if}}`;
  
  writeFileSync('src/partials/scripts.hbs', scriptsContent);
  console.log('✅ Created scripts.hbs');
  
  // Create preloader partial
  const preloaderContent = `<!-- preloader area start -->
<div id="preloader">
    <div class="loader"></div>
</div>
<!-- preloader area end -->`;
  
  writeFileSync('src/partials/preloader.hbs', preloaderContent);
  console.log('✅ Created preloader.hbs');
  
  // Create layout wrapper partial
  const layoutContent = `<!doctype html>
<html class="no-js" lang="en">
<head>
    {{> head title=title}}
</head>
<body>
    {{> preloader}}
    
    <!-- page container area start -->
    <div class="page-container">
        {{> sidebar}}
        
        <!-- main content area start -->
        <div class="main-content">
            {{> header}}
            
            <!-- page title area start -->
            {{#if pageTitle}}
            <div class="page-title-area">
                <div class="row align-items-center">
                    <div class="col-sm-6">
                        <div class="breadcrumbs-area clearfix">
                            <h4 class="page-title pull-left">{{pageTitle}}</h4>
                            {{#if breadcrumbs}}
                            <ul class="breadcrumbs pull-left">
                                {{#each breadcrumbs}}
                                <li><a href="{{this.url}}">{{this.name}}</a></li>
                                {{/each}}
                            </ul>
                            {{/if}}
                        </div>
                    </div>
                </div>
            </div>
            {{/if}}
            <!-- page title area end -->
            
            <div class="main-content-inner">
                {{{body}}}
            </div>
        </div>
        <!-- main content area end -->
        
        {{> footer}}
    </div>
    <!-- page container area end -->
    
    {{> scripts pageScript=pageScript}}
</body>
</html>`;
  
  writeFileSync('src/partials/layout.hbs', layoutContent);
  console.log('✅ Created layout.hbs');
}

// Run the extraction
extractPartials();
console.log('\n✨ Partials extraction complete!');