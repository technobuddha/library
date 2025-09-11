import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  test: {
    root: './src',
    include: ['**/*.test.ts'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      reportsDirectory: '../coverage',
      skipFull: true,
      enabled: true,
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
