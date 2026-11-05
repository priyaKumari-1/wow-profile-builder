// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// On Vercel the site is prerendered to static HTML (dist/client) instead of a Cloudflare Worker.
const isVercel = !!process.env.VERCEL;

export default defineConfig(
  isVercel
    ? {
        cloudflare: false,
        // crawlLinks off: it would follow the résumé download link and overwrite the PNG with HTML
        tanstackStart: { prerender: { enabled: true, crawlLinks: false } },
      }
    : {},
);
