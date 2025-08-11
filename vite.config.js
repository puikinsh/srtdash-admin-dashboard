import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'vite-plugin-handlebars';
import { readdirSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// Auto-detect all HTML files in srtdash directory
const srtdashPath = resolve(__dirname, 'srtdash');
let htmlFiles = [];

if (existsSync(srtdashPath)) {
  htmlFiles = readdirSync(srtdashPath)
    .filter(file => file.endsWith('.html'))
    .filter(file => !file.startsWith('test-'));
}

const input = htmlFiles.reduce((acc, file) => {
  const name = file.replace('.html', '');
  acc[name] = resolve(srtdashPath, file);
  return acc;
}, {});

// Add index.html at root if it exists
if (existsSync(resolve(__dirname, 'index.html'))) {
  input['main'] = resolve(__dirname, 'index.html');
}

export default defineConfig({
  root: 'srtdash',
  base: './',
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      reloadOnPartialChange: true,
      context: {
        title: 'SRTdash Admin Dashboard',
        year: new Date().getFullYear()
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api']
      }
    },
    devSourcemap: false  // Disable CSS source maps in development
  },
  build: {
    sourcemap: false,
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: { 
      input,
      output: {
        assetFileNames: assetInfo => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '/src': resolve(__dirname, './src'),
      '@': resolve(__dirname, './src'),
      '@scss': resolve(__dirname, './src/scss'),
      '@js': resolve(__dirname, './src/js'),
      '@assets': resolve(__dirname, './srtdash/assets')
    }
  }
});