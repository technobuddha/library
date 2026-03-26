// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { app } from '@technobuddha/project';

/** @type import('eslint').Linter.Config[] */
const config = [
  // wip
  app.lint({ files: ['**/*.ts'], ignores: [], tsConfig: 'tsconfig.json' }),
];

export default config;
