// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { app } from '@technobuddha/project';

/** @type import('eslint').Linter.Config[] */
const config = [
  // src/esnext/metaphone/__tests__
  app.lint({
    files: ['**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'tsconfig.json',
    jest: true,
  }),
];

export default config;
