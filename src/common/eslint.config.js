// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { app } from '@technobuddha/project';

/** @type import('eslint').Linter.Config[] */
const config = [
  // src/common
  app.lint({
    files: ['**/*.ts'],
    ignores: ['__tests__/**/*'],
    environment: 'browser',
    tsConfig: 'tsconfig.json',
  }),
];

export default config;
