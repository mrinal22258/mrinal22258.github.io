import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Required for GitHub Pages at mrinal22258.github.io
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})

