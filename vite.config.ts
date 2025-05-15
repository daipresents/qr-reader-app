import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/qr-reader-app/',
  plugins: [react()],
})
