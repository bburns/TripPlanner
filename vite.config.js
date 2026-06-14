import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Migrated from create-react-app (react-scripts 2.x + react-app-rewired).
// - REACT_APP_* env vars are kept working via envPrefix, so existing
//   `import.meta.env.REACT_APP_*` and `%REACT_APP_*%` (in index.html) resolve.
// - Output goes to `build/` to match firebase.json's hosting.public.
export default defineConfig({
  plugins: [react()],
  envPrefix: 'REACT_APP_',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
})
