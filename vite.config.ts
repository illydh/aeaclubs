// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages build (set by .github/workflows/deploy-pages.yml): prerender every route to
// static HTML served from the root of the custom domain (aeaclubs.org). Unset everywhere else,
// so Lovable builds are unchanged.
const ghPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(ghPages
      ? {
          prerender: {
            enabled: true,
            autoStaticPathsDiscovery: true,
            crawlLinks: true,
            autoSubfolderIndex: true,
            failOnError: true,
          },
        }
      : {}),
  },
  ...(ghPages
    ? {
        // Root of the custom domain. TanStack Start derives the router basepath from this, so it
        // must not be a repo sub-path like "/aeaclubs/" (that was only right for illydh.github.io).
        vite: { base: "/" },
        // Static hosting needs no server bundle. Without nitro, TanStack Start writes
        // dist/server/server.js (which its prerender step loads) and pages to dist/client.
        nitro: false,
      }
    : {}),
});
