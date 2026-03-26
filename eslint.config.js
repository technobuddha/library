// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { app } from '@technobuddha/project';

/** @type import('eslint').Linter.Config[] */
const config = [
  // .
  app.lint({ files: ['*.config.js'], ignores: [], environment: 'node' }),
  // .
  app.lint({
    files: ['*.config.ts', '*.setup.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'tsconfig.json',
  }),
];

export default config;
