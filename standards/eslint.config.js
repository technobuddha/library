// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { app } from '@technobuddha/project';

/** @type import('eslint').Linter.Config[] */
const config = [
  // standards
  app.lint({ files: ['**/*.ts'], ignores: [], environment: 'node', tsConfig: 'tsconfig.json' }),
];

export default config;
