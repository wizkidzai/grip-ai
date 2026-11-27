import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// This website lives at the root of https://wizkidzai.github.io/grip-ai/.
export default defineConfig({
  plugins: [react()],
  base: '/grip-ai/',
})
