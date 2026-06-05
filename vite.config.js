import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Copy optimized images from src/assets/image2 to public/images automatically
try {
  const srcDir = path.resolve(__dirname, 'src/assets/image2')
  const destDir = path.resolve(__dirname, 'public/images')
  if (fs.existsSync(srcDir)) {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }
    const files = fs.readdirSync(srcDir)
    files.forEach(file => {
      const srcFile = path.join(srcDir, file)
      const destFile = path.join(destDir, file)
      if (fs.statSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, destFile)
      }
    })
    console.log('Optimized images synced to public/images successfully!')
  }
} catch (err) {
  console.error('Error syncing optimized images:', err)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Required for GitHub Pages at mrinal22258.github.io
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})

