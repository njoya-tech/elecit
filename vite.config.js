import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'  // ← FIXED THIS LINE

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Bundle analyzer - only runs when building
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ],
base: '/',

  
  // Performance optimizations
  build: {
    // Generate source maps for debugging
    sourcemap: false,
    
    // Rollup options for code splitting
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          
          // Animation library
          'animations': ['framer-motion'],
          
          // Internationalization
          'i18n': ['i18next', 'react-i18next'],
          
          // Icons
          'icons': ['lucide-react', 'react-icons'],
          
          // Form utilities
          'forms': ['react-phone-input-2'],
          
          // Directus SDK
          'directus': ['@directus/sdk'],
        },
        
        // Optimize asset file names
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2/.test(extType)) {
            extType = 'fonts';
          }
          
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Minify options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
  },
  
  // Development server
  server: {
    port: 5173,
    strictPort: true,
    open: true,
    host: true
  },
  
  // Preview server (for testing production build)
  preview: {
    port: 4173,
    strictPort: true,
  },
})