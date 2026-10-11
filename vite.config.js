import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The website lives at https://wizkidzai.github.io/grip-ai/
  // so this must match the GitHub repo name. npm run check tests this.
  base: '/grip-ai/',
})
