// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { app } from '@technobuddha/project';

/** @type import('eslint').Linter.Config[] */
const config = [
  // src
  app.lint({
    files: ['**/*.ts'],
    ignores: ['@types/**/*', 'browser/**/*', 'common/**/*', 'esnext/**/*', 'node/**/*'],
    environment: 'node',
    tsConfig: 'tsconfig.json',
  }),
];

export default config;
