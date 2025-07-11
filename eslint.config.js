// @ts-check
// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
import { app } from '@technobuddha/project';

/* @type {(import('eslint').Linter.Config[]} */
const config = [
  // src/tsconfig.code.json
  app.lint({
    files: ['src/**/*.ts'],
    ignores: ['src/**/*.test.ts'],
    tsConfig: 'src/tsconfig.code.json',
  }),
  // src/tsconfig.json
  app.lint({
    files: ['src/**/*.test.ts', 'src/**/*.d.ts'],
    ignores: [],
    tsConfig: 'src/tsconfig.json',
    environment: 'node',
    jest: true,
  }),
  // tsconfig.json
  app.lint({ files: ['*.config.js'], ignores: [], environment: 'node' }),
  // tsconfig.json
  app.lint({ files: ['*.config.ts'], ignores: [], environment: 'node' }),
  // tsconfig.json
  app.lint({ files: ['*.setup.ts'], ignores: [], environment: 'node' }),
  // scripts/tsconfig.json
  app.lint({
    files: ['scripts/*.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'scripts/tsconfig.json',
  }),
];

export default config;
