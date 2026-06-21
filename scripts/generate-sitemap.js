const fs = require('fs');
const path = require('path');

// Function to get all pages from the app directory
function getAllPages(dir, basePath = '') {
  const pages = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip admin and other non-public directories
      if (item === 'admin' || item.startsWith('_')) {
        continue;
      }
      
      // Handle Next.js app router groups like (main)
      if (item.startsWith('(') && item.endsWith(')')) {
        // Recursively scan inside the group but don't include the group name in the path
        pages.push(...getAllPages(fullPath, basePath));
        continue;
      }
      
      // Handle dynamic routes (directories with [slug] format)
      if (item.startsWith('[') && item.endsWith(']')) {
        // For dynamic routes (projects, blogs)
        if (item === '[slug]') {
          const dynamicPages = getDynamicPages(basePath);
          pages.push(...dynamicPages);
        }
      } else {
        pages.push(...getAllPages(fullPath, basePath ? `${basePath}/${item}` : item));
      }
    } else if (item === 'page.tsx' || item === 'page.js') {
      pages.push(basePath || '');
    }
  }

  return pages;
}

// Function to get dynamic pages (projects, blog posts, etc.)
function getDynamicPages(basePath) {
  // If we are at /projects/[slug]
  if (basePath === 'projects') {
    return [
      'farooq-azam-smart-clinic-hms',
      'minibites-restaurant-food-delivery',
      'xcode-ide-enhancement',
      'digiexplain-admin-system',
      'stag-chemist-pharmacy-platform',
      'baseer-hospital-speakers-platform',
      'mindscare-mental-health-platform',
      'stars-science-academy',
      'kirkuk-caffetorino-restaurant',
      'restaurant-pos-system',
      'stag-chemist-pharmacy-platform-seo',
      'tositsolutions-canada'
    ].map(slug => `projects/${slug}`);
  }
  
  // If we are at /[slug] (Blogs)
  if (basePath === '') {
    // Note: In a static script, it's harder to fetch from Firebase
    // This script will capture static files but not dynamic Firebase blogs.
    // However, the app/sitemap.ts I created handles dynamic fetching for the server.
    return []; 
  }

  return [];
}

// Generate sitemap XML
function generateSitemap() {
  const appDir = path.join(__dirname, '../app');
  const baseUrl = 'https://codsyn.com';
  
  const pages = getAllPages(appDir);
  
  // Custom: Add static project routes as fallback if not picked up
  const allUrls = [...new Set(pages)];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => {
  const url = `${baseUrl}${page.startsWith('/') ? '' : '/'}${page}`;
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
}).filter(url => !url.includes('[slug]')).join('\n')}
</urlset>`;

  // Write sitemap to public directory
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  console.log('Sitemap generated successfully!');
  console.log(`Location: ${sitemapPath}`);
}

// Run the function
generateSitemap();
