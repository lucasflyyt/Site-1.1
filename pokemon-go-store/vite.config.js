import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Configurações para domínio personalizado
  base: '/', // Garante que os assets sejam carregados corretamente
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Garante que os caminhos sejam relativos
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  },
  server: {
    host: true, // Permite acesso externo durante desenvolvimento
    port: 3000,
    strictPort: false,
  },
  preview: {
    host: true, // Permite acesso externo durante preview
    port: 4173,
    strictPort: false,
  }
})

