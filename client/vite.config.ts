import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // default, can customize if needed
    sourcemap: false, // enable for debugging production build
  },
  server: {
    port: 5173, // dev server port (optional)
    open: true, // auto-open browser on `npm run dev`
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
    
  },
});