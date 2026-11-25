import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// This website lives at https://wizkidzai.github.io/grip-ai/girls-in-robotics/
// so `base` is the repo name, then this folder's name.
export default defineConfig({
  plugins: [react()],
  base: '/grip-ai/girls-in-robotics/',
})
