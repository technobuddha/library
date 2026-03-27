// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { app } from '@technobuddha/project';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  app.lint({ files: ['*.config.js'], environment: 'node' }),
  app.lint({ files: ['*.config.ts', '*.setup.ts'], environment: 'node', typescript: true }),
]);
