import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG'],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api':       { target: 'http://localhost:5000', changeOrigin: true },
      '/sitemap.xml': { target: 'http://localhost:5000', changeOrigin: true },
      '/robots.txt':  { target: 'http://localhost:5000', changeOrigin: true },
    },
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-gsap':   ['gsap'],
          'vendor-three':  ['three'],
          'vendor-misc':   ['axios'],
        },
      },
    },
  },
});
