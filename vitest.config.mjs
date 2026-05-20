import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  server: {
    fs: { strict: false }
  },
  test: {
    environment: 'node',
    exclude: ['**/node_modules/**', '**/dist/**', '.matomo/**', '.matomo-db/**', '.glitchtip-db/**', '.database/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/libraries/**/*.ts', 'src/features/**/*.ts'],
      exclude: ['**/*.spec.ts', '**/*.d.ts', '**/index.ts']
    }
  }
});
