/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Permitir el uso de variables globales como `describe` y `test`
    environment: "jsdom", // Simular un entorno de navegador
    setupFiles: "./setupTests.js", // Configuración global de pruebas
  },
  resolve: {
    alias: {
      '@src': new URL('./src', import.meta.url).pathname,
      '@public': new URL('./public', import.meta.url).pathname,
      '@components': new URL('./src/components', import.meta.url).pathname,
      '@pages': new URL('./src/pages', import.meta.url).pathname,
      '@utils': new URL('./src/utils', import.meta.url).pathname,
      '@services': new URL('./src/services', import.meta.url).pathname,
      '@hooks': new URL('./src/hooks', import.meta.url).pathname,
      '@assets': new URL('./src/assets', import.meta.url).pathname,
      '@config': new URL('./src/config', import.meta.url).pathname,
      '@context': new URL('./src/context', import.meta.url).pathname,
      '@container': new URL('./src/container', import.meta.url).pathname,
      '@layout': new URL('./src/layout', import.meta.url).pathname,
      '@routes': new URL('./src/routes', import.meta.url).pathname,
      '@css': new URL('./src/css', import.meta.url).pathname,
    },
  },
  preview: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  },
});
