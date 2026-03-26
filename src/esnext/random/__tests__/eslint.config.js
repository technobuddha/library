// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { app } from '@technobuddha/project';

/** @type import('eslint').Linter.Config[] */
const config = [
  // src/esnext/random/__tests__
  app.lint({
    files: ['**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'tsconfig.json',
    jest: true,
  }),
  // src/esnext/random/__tests__
  app.lint({ files: ['**/*.ts'], ignores: [], environment: 'node', tsConfig: 'tsconfig.json' }),
];

export default config;
