// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { lint } from '@technobuddha/project';

export default lint(
  { files: ['**/*.test.ts'], platform: 'test', typescript: true },
  { files: ['**/*.ts'], platform: 'node', typescript: true },
);
