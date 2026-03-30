// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { lint } from '@technobuddha/project';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  lint({
    files: ['**/*.ts'],
    ignores: [
      'array/__tests__/**/*',
      'binary/__tests__/**/*',
      'blob/__tests__/**/*',
      'boolean/__tests__/**/*',
      'case-conversion/__tests__/**/*',
      'comparison/__tests__/**/*',
      'construction/__tests__/**/*',
      'data-structures/__tests__/**/*',
      'difference/__tests__/**/*',
      'english/__tests__/**/*',
      'error/__tests__/**/*',
      'escape/__tests__/**/*',
      'evaluate/__tests__/**/*',
      'file-system/__tests__/**/*',
      'function/__tests__/**/*',
      'geometry/__tests__/**/*',
      'graphql/__tests__/**/*',
      'hash/__tests__/**/*',
      'iteration/__tests__/**/*',
      'match/__tests__/**/*',
      'math/__tests__/**/*',
      'metaphone/__tests__/**/*',
      'network/__tests__/**/*',
      'number/__tests__/**/*',
      'object/__tests__/**/*',
      'patch/__tests__/**/*',
      'phonetic/__tests__/**/*',
      'primitive/__tests__/**/*',
      'random/__tests__/**/*',
      'regexp/__tests__/**/*',
      'roman/__tests__/**/*',
      'serialization/__tests__/**/*',
      'stem/__tests__/**/*',
      'string/__tests__/**/*',
      'textualization/__tests__/**/*',
      'time/__tests__/**/*',
      'tokenization/__tests__/**/*',
      'unicode/__tests__/**/*',
    ],
    typescript: true,
  }),
]);
