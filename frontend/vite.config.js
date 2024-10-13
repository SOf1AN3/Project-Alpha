import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Default build output directory
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // L'URL de votre serveur backend
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
