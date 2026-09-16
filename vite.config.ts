import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { parseRoute } from './src/utils/seoEngine';
import { prerenderRouteHtml } from './src/utils/htmlPrerender';

function prerenderDevPlugin(): Plugin {
  return {
    name: 'calcyfy-dev-prerender',
    transformIndexHtml(html, ctx) {
      if (!ctx.originalUrl) return html;
      try {
        const url = new URL(ctx.originalUrl, 'http://localhost:3000');
        const pathname = url.pathname;
        // Only prerender known non-asset HTML requests
        if (pathname.includes('.') && !pathname.endsWith('.html')) {
          return html;
        }
        const route = parseRoute(pathname);
        return prerenderRouteHtml(html, route, route.lang);
      } catch (err) {
        return html;
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), prerenderDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
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
