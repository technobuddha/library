// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
import { app } from '@technobuddha/project';

export default [
  // src/tsconfig.code.json
  app.lint({
    files: ['src/**/*.ts'],
    ignores: ['src/**/*.test.ts'],
    environment: 'node',
    tsConfig: 'src/tsconfig.code.json',
    typescript: true,
  }),
  // src/tsconfig.json
  app.lint({
    files: ['src/**/*.test.ts', 'src/**/*.d.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/tsconfig.json',
    typescript: true,
    jest: true,
  }),
  // tsconfig.json
  app.lint({ files: ['*.config.js'], ignores: [], environment: 'node' }),
  // tsconfig.json
  app.lint({ files: ['*.config.ts'], ignores: [], environment: 'node' }),
  // tsconfig.json
  app.lint({ files: ['*.setup.ts'], ignores: [], environment: 'node' }),
];
