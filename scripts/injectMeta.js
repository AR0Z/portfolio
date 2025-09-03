// inject-meta.js
import fs from 'fs';
import path from 'path';

const projectsPath = path.resolve('./src/locales/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

const distDir = path.resolve('./dist');

function injectMeta(filePath, { title, description, og, twitter }) {
  let html = fs.readFileSync(filePath, 'utf-8');

  // Retirer d'anciennes balises <title> et <meta>
  html = html.replace(/<title>.*<\/title>/, '');
  html = html.replace(/<meta .*?>/g, '');

  const metaTags = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${og.title}" />
    <meta property="og:description" content="${og.description}" />
    <meta property="og:type" content="${og.type}" />
    <meta property="og:url" content="${og.url}" />
    <meta property="og:image" content="${og.image}" />
    <meta name="twitter:card" content="${twitter.card}" />
    <meta name="twitter:title" content="${twitter.title}" />
    <meta name="twitter:description" content="${twitter.description}" />
    <meta name="twitter:image" content="${twitter.image}" />

    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="dark" />
  `;

  html = html.replace('<head>', `<head>${metaTags}`);
  fs.writeFileSync(filePath, html, 'utf-8');
}

// Home
injectMeta(path.join(distDir, 'index.html'), {
  title: 'Germain Duchêne – Portfolio',
  description: 'Portfolio de Germain Duchêne, développeur full-stack travaillant avec des technologies modernes.',
  og: {
    title: 'Germain Duchêne – Portfolio',
    description: 'Portfolio de Germain Duchêne, développeur full-stack travaillant avec des technologies modernes.',
    type: 'website',
    url: 'https://duchene.dev',
    image: 'https://duchene.dev/og-image-home.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Germain Duchêne – Portfolio',
    description: 'Portfolio de Germain Duchêne, développeur full-stack travaillant avec des technologies modernes.',
    image: 'https://duchene.dev/og-image-home.png',
  }
});

// 404
injectMeta(path.join(distDir, '404.html'), {
  title: '404 – Page non trouvée | Germain Duchêne',
  description: 'La page que vous cherchez n’existe pas. Retournez sur le portfolio de Germain Duchêne.',
  og: { title: '', description: '', type: 'website', url: '', image: '' },
  twitter: { card: 'summary', title: '', description: '', image: '' },
});

// Projects
projects.forEach(project => {
  const filePath = path.join(distDir, 'project', `${project.id}`, "index.html");
  injectMeta(filePath, {
    title: `${project.title["fr"]} – Germain Duchêne`,
    description: project.seoDesc,
    og: {
      title: `${project.title["fr"]} – Germain Duchêne`,
      description: project.seoDesc,
      type: 'website',
      url: `https://duchene.dev/project/${project.id}`
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title["fr"]} – Germain Duchêne`,
      description: project.seoDesc
    },
  });
});

console.log('Meta tags injected successfully!');