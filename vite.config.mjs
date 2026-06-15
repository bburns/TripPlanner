import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import os from 'node:os'
import path from 'node:path'

// Migrated from create-react-app (react-scripts 2.x + react-app-rewired).
// - REACT_APP_* env vars are kept working via envPrefix, so existing
//   `import.meta.env.REACT_APP_*` and `%REACT_APP_*%` (in index.html) resolve.
// - Output goes to `build/` to match firebase.json's hosting.public.
export default defineConfig({
  plugins: [react()],
  envPrefix: 'REACT_APP_',
  // This project lives inside a Dropbox folder. Vite's dependency-optimization
  // cache (default node_modules/.vite) gets locked mid-rename by Dropbox/AV
  // sync, causing "EBUSY ... rename deps_temp -> deps". Keep that churning cache
  // outside the synced tree.
  cacheDir: path.join(os.tmpdir(), 'vite-tripplanner'),
  // Old libs (fbjs via draft-js/react-draft-wysiwyg) reference Node's `global`,
  // which CRA/webpack shimmed automatically but Vite does not. Map it to
  // globalThis for both the production build (define) and dev's pre-bundled
  // dependencies (optimizeDeps.esbuildOptions.define).
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
})
