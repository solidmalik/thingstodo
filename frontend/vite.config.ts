import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) 
    }
  },
  server: {
    port: 3000,  // Vite running on port 3000
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',  // Use IPv4 address to avoid IPv6 resolution
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')  // Remove the '/api' prefix
      }
    }
  }
});
