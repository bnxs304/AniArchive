import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: 'VITE_',
  envDir: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Simplified chunk splitting to avoid initialization issues
          if (id.includes('node_modules')) {
            // Keep React ecosystem together
            if (id.includes('react') || id.includes('react-dom') || id.includes('@emotion') || id.includes('@mui') || id.includes('react-router')) {
              return 'vendor-react-ecosystem'
            }
            if (id.includes('leaflet')) {
              return 'vendor-leaflet'
            }
            if (id.includes('firebase')) {
              return 'vendor-firebase'
            }
            if (id.includes('framer-motion') || id.includes('react-helmet') || id.includes('react-icons') || id.includes('react-intersection')) {
              return 'vendor-utils'
            }
            if (id.includes('jspdf')) {
              return 'vendor-pdf'
            }
            if (id.includes('@emailjs')) {
              return 'vendor-email'
            }
            // Default vendor chunk for other dependencies
            return 'vendor'
          }
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging
    sourcemap: false,
    // Optimize for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true, // Allow external connections
    hmr: false, // Temporarily disable HMR to avoid WebSocket issues
    // Additional server options for better compatibility
    strictPort: false, // Allow port fallback if port is busy
  },
  preview: {
    port: 4173,
    open: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
      '@mui/icons-material',
      'react-router-dom',
    ],
    exclude: ['mui'], // Exclude the problematic 'mui' package
    force: true, // Force re-optimization
  },
}) 