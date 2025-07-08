import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // asegúrate de tener esto si el proyecto está en la raíz del dominio
  plugins: [
    react(),
    tailwindcss()
  ],
})
