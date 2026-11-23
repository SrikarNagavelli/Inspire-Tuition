import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { findPage, notFoundPage, pages } from './src/config/pages.ts';

const metadataMarker = '<!-- route-metadata -->';

function escapeHtml(value: string) {
  const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

function pageMetadata(pathname: string, origin: string) {
  const page = findPage(pathname);
  const { title, description, path: canonicalPath } = page ?? notFoundPage;
  const canonical = escapeHtml(new URL(canonicalPath, origin).href);
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);

  return [
    `<title>${safeTitle}</title>`,
    `<meta name="description" content="${safeDescription}" />`,
    `<meta name="robots" content="${page ? 'index, follow' : 'noindex, follow'}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${safeTitle}" />`,
    `<meta property="og:description" content="${safeDescription}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:title" content="${safeTitle}" />`,
    `<meta name="twitter:description" content="${safeDescription}" />`,
  ].join('\n    ');
}

function sitemap(origin: string) {
  const entries = pages.map(({ path: pagePath }) => `  <url><loc>${escapeHtml(new URL(pagePath, origin).href)}</loc></url>`);
  return ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...entries, '</urlset>', ''].join('\n');
}

export function siteSeo(origin: string): Plugin {
  let outputDirectory: string;
  let build = false;
  let robots: string;

  return {
    name: 'inspire-page-metadata',
    configResolved(config) {
      outputDirectory = path.resolve(config.root, config.build.outDir);
      build = config.command === 'build';
      const rules = fs.readFileSync(path.join(config.publicDir, 'robots.txt'), 'utf8').trimEnd();
      robots = `${rules}\n\nSitemap: ${new URL('/sitemap.xml', origin).href}\n`;
    },
    configureServer(server) {
      server.middlewares.use('/sitemap.xml', (_request, response) => {
        response.setHeader('Content-Type', 'application/xml; charset=utf-8');
        response.end(sitemap(origin));
      });
      server.middlewares.use('/robots.txt', (_request, response) => {
        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
        response.end(robots);
      });
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        if (!context.server) return html;
        const pathname = new URL(context.originalUrl ?? '/', origin).pathname;
        return html.replace(metadataMarker, () => pageMetadata(pathname, origin));
      },
    },
    closeBundle(error) {
      if (!build || error) return;
      const indexPath = path.join(outputDirectory, 'index.html');
      const index = fs.readFileSync(indexPath, 'utf8');
      if (!index.includes(metadataMarker)) {
        throw new Error('The HTML template is missing its route metadata marker.');
      }

      for (const page of [...pages, notFoundPage]) {
        const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
        fs.writeFileSync(path.join(outputDirectory, file), index.replace(metadataMarker, () => pageMetadata(page.path, origin)));
      }
      fs.writeFileSync(path.join(outputDirectory, 'sitemap.xml'), sitemap(origin));
      fs.writeFileSync(path.join(outputDirectory, 'robots.txt'), robots);
    },
  };
}
