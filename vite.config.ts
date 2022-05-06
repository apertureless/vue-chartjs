import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup-vitest.ts',
    include: ['./test/(*.)spec.(js|ts)'],
    threads: false,
    coverage: {
      include: ['./src/**/*'],
      reportsDirectory: 'coverage',
      enabled: true,
      reporter: ['lcovonly', 'text']
    }
  }
})
