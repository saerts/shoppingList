import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**', '**/.{idea,git,cache,output,temp}/**'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',

      // Exclude files that don't need coverage
      exclude: [
        'node_modules/',
        'src/main.tsx',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/types/**',
        '**/*.d.ts',
        '**/testUtils.tsx',
        'vite.config.ts',
        'playwright.config.ts',
        'eslint.config.js',
        'src/setupTests.ts',
        'e2e/**',
      ],

      // Coverage thresholds - tests will fail if coverage drops below these
      thresholds: {
        lines: 95,
        functions: 76,
        branches: 86,
        statements: 95,
      },

      // Include all files, even untested ones
      all: true,
    },
  },
})
