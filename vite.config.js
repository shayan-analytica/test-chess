import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'netlify/functions/server.js')
      },
      output: {
        dir: 'dist',
        format: 'cjs'
      }
    }
  }
});
