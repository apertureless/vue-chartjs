import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    setupFiles: ['test/setup.js'],
    deps: {
      inline: ['vitest-canvas-mock']
    },
    coverage: {
      reporter: ['lcovonly', 'text']
    }
  }
})
