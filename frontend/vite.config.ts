import type { InlineConfig } from 'vitest';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    testMatch: ['./src/tests/**/*.test.tsx'],
    globals: true,
  },
  server: {
    proxy: {
      '/api/v1/': 'http://localhost:8080',
    },
  },
} as VitestConfigExport);
