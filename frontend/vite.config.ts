import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',  // Asegura que el servidor escuche en todas las interfaces
    allowedHosts: ['registro.guadalahacks.com'],  // Permite el acceso solo desde tu dominio
    hmr: {
      protocol: 'wss',  // Usa WebSocket seguro
      host: 'registro.guadalahacks.com',  // El dominio de tu servidor
      port: 443,  // Usar el puerto 443 para HTTPS
    },
    https: true,  // Asegúrate de que Vite esté ejecutándose sobre HTTPS
  }
})
