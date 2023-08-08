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
      '/api/v1/': 'https://notitum-1f649e446a5b.herokuapp.com',
    },
  },
} as VitestConfigExport);
