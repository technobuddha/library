import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  test: {
    include: ['./src/**/*.test.ts'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      enabled: true,
      include: ['src/**'],
      exclude: [
        '**/*.test.*',
        '**/*.config.*',
        'scripts/**/*.*',
        '**/index.ts',
        '**/@types',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
}));
