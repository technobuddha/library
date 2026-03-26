// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { app } from '@technobuddha/project';

/** @type import('eslint').Linter.Config[] */
const config = [
  // src/node
  app.lint({
    files: ['**/*.ts'],
    ignores: ['__tests__/**/*'],
    environment: 'node',
    tsConfig: 'tsconfig.json',
  }),
];

export default config;
