import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { siteUrl } from './src/config/pages.ts';
import { siteSeo } from './site-seo.ts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, '');
  const canonicalOrigin =
    siteUrl(env.SITE_CANONICAL_URL) ??
    siteUrl(env.VITE_SITE_CANONICAL_URL) ??
    siteUrl(env.VERCEL_PROJECT_PRODUCTION_URL) ??
    siteUrl(env.VERCEL_URL);

  const localOrigin = `http://localhost:${env.PORT || '3000'}`;
  return {
    plugins: [
      react(),
      tailwindcss(),
      siteSeo(canonicalOrigin ?? localOrigin),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(import.meta.dirname, 'dist');
          const srcAssets = path.resolve(import.meta.dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    define: {
      'import.meta.env.VITE_SITE_CANONICAL_URL': JSON.stringify(canonicalOrigin ?? ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
