import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], 
  base: '/resqeat/', // החליפי 'resqeat' בשם המאגר שלך ב-GitHub
  build: {
    outDir: 'docs'}
})

