import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Use Rollup's chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — tiny, cached forever
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // UI feedback libs
          'vendor-toast': ['react-hot-toast'],
          // Swiper slider
          'vendor-swiper': ['swiper'],
          // Icon libraries (large — split so pages that don't use them skip it)
          'vendor-icons': ['react-icons', 'lucide-react', '@heroicons/react'],
          // Admin-only: recharts is very large (~500KB), keep it isolated
          'vendor-recharts': ['recharts'],
          // styled-components
          'vendor-styled': ['styled-components'],
          // Reactstrap + bootstrap
          'vendor-reactstrap': ['reactstrap'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
})