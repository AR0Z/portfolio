import fs from 'fs';
import path from 'path';

// Chemins
const distDir = path.resolve('./dist');
const robotsPath = path.join(distDir, 'robots.txt');
const sitemapPath = path.join(distDir, 'sitemap.xml');
const projectsPath = path.resolve('./src/locales/projects.json');

// Crée le dossier dist s’il n’existe pas
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// --- Lecture des projets ---
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

// --- Génération robots.txt ---
const robotsTxt = `
User-agent: *
Disallow: /404.html
Allow: /

Sitemap: https://duchene.dev/sitemap.xml
`.trim();

fs.writeFileSync(robotsPath, robotsTxt, 'utf-8');
console.log('robots.txt generated !');

// --- Génération sitemap.xml ---
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://duchene.dev/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

projects.forEach(project => {
  sitemapXml += `
  <url>
    <loc>https://duchene.dev/project/${project.id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

// On pourrait ajouter d'autres pages si besoin, mais pas la 404
sitemapXml += `
</urlset>
`;

fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');
console.log('sitemap.xml generated !');
