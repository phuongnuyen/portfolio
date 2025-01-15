import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.riv"],
  plugins: [react()],
  optimizeDeps: {
    include: ["@rive-app/canvas", "preline"],
  },
})
