import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
   preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'project-pps-production.up.railway.app'
    ]
  }
})