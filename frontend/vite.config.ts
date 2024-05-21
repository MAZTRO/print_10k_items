import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5000,
    host: 'localhost'
  },
  build: {
    outDir: './build/dist',
    minify: 'terser',
    emptyOutDir: true
  },
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      assets: '/src/assets',
      pages: '/src/pages',
      utils: '/src/utils'
    }
  }
})
