import { defineConfig } from 'vitest/config'
import { createVuePlugin } from 'vite-plugin-vue2'

export default defineConfig({
  // plugins: [createVuePlugin({ vueTemplateOptions: { isFunctional: true } })],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/test/(*.)spec.(js|ts)'],
    coverage: {
      include: ['src/**/*'],
      reportsDirectory: 'coverage',
      enabled: true,
      reporter: ['lcovonly', 'text']
    }
  }
})
