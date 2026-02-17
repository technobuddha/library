// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
// @ts-check
import { app } from '@technobuddha/project';

/** @type import('eslint').Linter.Config[] */
const config = [
  { ignores: ['coverage', 'dist', 'fixtures'] },
  // .
  app.lint({ files: ['*.config.js'], ignores: [], environment: 'node' }),
  // .
  app.lint({
    files: ['*.config.ts', '*.setup.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'tsconfig.json',
  }),
  // scripts
  app.lint({
    files: ['scripts/**/*.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'scripts/tsconfig.json',
  }),
  // src/browser/__tests__
  app.lint({
    files: ['src/browser/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/browser/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/browser
  app.lint({
    files: ['src/browser/**/*.ts'],
    ignores: ['src/browser/__tests__/**/*'],
    environment: 'browser',
    tsConfig: 'src/browser/tsconfig.json',
  }),
  // src/common/__tests__
  app.lint({
    files: ['src/common/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/common/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/common
  app.lint({
    files: ['src/common/**/*.ts'],
    ignores: ['src/common/__tests__/**/*'],
    environment: 'browser',
    tsConfig: 'src/common/tsconfig.json',
  }),
  // src/esnext/array/__tests__
  app.lint({
    files: ['src/esnext/array/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/array/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/binary/__tests__
  app.lint({
    files: ['src/esnext/binary/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/binary/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/blob/__tests__
  app.lint({
    files: ['src/esnext/blob/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/blob/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/boolean/__tests__
  app.lint({
    files: ['src/esnext/boolean/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/boolean/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/case-conversion/__tests__
  app.lint({
    files: ['src/esnext/case-conversion/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/case-conversion/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/comparison/__tests__
  app.lint({
    files: ['src/esnext/comparison/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/comparison/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/construction/__tests__
  app.lint({
    files: ['src/esnext/construction/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/construction/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/data-structures/__tests__
  app.lint({
    files: ['src/esnext/data-structures/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/data-structures/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/difference/__tests__
  app.lint({
    files: ['src/esnext/difference/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/difference/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/english/__tests__
  app.lint({
    files: ['src/esnext/english/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/english/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/error/__tests__
  app.lint({
    files: ['src/esnext/error/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/error/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/escape/__tests__
  app.lint({
    files: ['src/esnext/escape/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/escape/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/evaluate/__tests__
  app.lint({
    files: ['src/esnext/evaluate/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/evaluate/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/file-system/__tests__
  app.lint({
    files: ['src/esnext/file-system/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/file-system/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/function/__tests__
  app.lint({
    files: ['src/esnext/function/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/function/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/geometry/__tests__
  app.lint({
    files: ['src/esnext/geometry/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/geometry/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/graphql/__tests__
  app.lint({
    files: ['src/esnext/graphql/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/graphql/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/hash/__tests__
  app.lint({
    files: ['src/esnext/hash/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/hash/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/iteration/__tests__
  app.lint({
    files: ['src/esnext/iteration/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/iteration/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/match/__tests__
  app.lint({
    files: ['src/esnext/match/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/match/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/math/__tests__
  app.lint({
    files: ['src/esnext/math/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/math/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/metaphone/__tests__
  app.lint({
    files: ['src/esnext/metaphone/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/metaphone/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/network/__tests__
  app.lint({
    files: ['src/esnext/network/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/network/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/number/__tests__
  app.lint({
    files: ['src/esnext/number/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/number/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/object/__tests__
  app.lint({
    files: ['src/esnext/object/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/object/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/object/__tests__
  app.lint({
    files: ['src/esnext/object/__tests__/**/*.test-d.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/object/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/patch/__tests__
  app.lint({
    files: ['src/esnext/patch/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/patch/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/phonetic/__tests__
  app.lint({
    files: ['src/esnext/phonetic/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/phonetic/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/primitive/__tests__
  app.lint({
    files: ['src/esnext/primitive/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/primitive/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/random/__tests__
  app.lint({
    files: ['src/esnext/random/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/random/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/random/__tests__
  app.lint({
    files: ['src/esnext/random/__tests__/**/*.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/random/__tests__/tsconfig.json',
  }),
  // src/esnext/regexp/__tests__
  app.lint({
    files: ['src/esnext/regexp/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/regexp/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/roman/__tests__
  app.lint({
    files: ['src/esnext/roman/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/roman/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/serialization/__tests__
  app.lint({
    files: ['src/esnext/serialization/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/serialization/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/stem/__tests__
  app.lint({
    files: ['src/esnext/stem/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/stem/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/string/__tests__
  app.lint({
    files: ['src/esnext/string/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/string/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/textualization/__tests__
  app.lint({
    files: ['src/esnext/textualization/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/textualization/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/time/__tests__
  app.lint({
    files: ['src/esnext/time/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/time/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/tokenization/__tests__
  app.lint({
    files: ['src/esnext/tokenization/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/tokenization/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/esnext/unicode/__tests__
  app.lint({
    files: ['src/esnext/unicode/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/esnext/unicode/__tests__/tsconfig.json',
    jest: true,
  }),
  // src
  app.lint({
    files: ['src/**/*.ts'],
    ignores: [
      'src/browser/**/*',
      'src/common/**/*',
      'src/esnext/array/__tests__/**/*',
      'src/esnext/binary/__tests__/**/*',
      'src/esnext/blob/__tests__/**/*',
      'src/esnext/boolean/__tests__/**/*',
      'src/esnext/case-conversion/__tests__/**/*',
      'src/esnext/comparison/__tests__/**/*',
      'src/esnext/construction/__tests__/**/*',
      'src/esnext/data-structures/__tests__/**/*',
      'src/esnext/difference/__tests__/**/*',
      'src/esnext/english/__tests__/**/*',
      'src/esnext/error/__tests__/**/*',
      'src/esnext/escape/__tests__/**/*',
      'src/esnext/evaluate/__tests__/**/*',
      'src/esnext/file-system/__tests__/**/*',
      'src/esnext/function/__tests__/**/*',
      'src/esnext/geometry/__tests__/**/*',
      'src/esnext/graphql/__tests__/**/*',
      'src/esnext/hash/__tests__/**/*',
      'src/esnext/iteration/__tests__/**/*',
      'src/esnext/match/__tests__/**/*',
      'src/esnext/math/__tests__/**/*',
      'src/esnext/metaphone/__tests__/**/*',
      'src/esnext/network/__tests__/**/*',
      'src/esnext/number/__tests__/**/*',
      'src/esnext/object/__tests__/**/*',
      'src/esnext/patch/__tests__/**/*',
      'src/esnext/phonetic/__tests__/**/*',
      'src/esnext/primitive/__tests__/**/*',
      'src/esnext/random/__tests__/**/*',
      'src/esnext/regexp/__tests__/**/*',
      'src/esnext/roman/__tests__/**/*',
      'src/esnext/serialization/__tests__/**/*',
      'src/esnext/stem/__tests__/**/*',
      'src/esnext/string/__tests__/**/*',
      'src/esnext/textualization/__tests__/**/*',
      'src/esnext/time/__tests__/**/*',
      'src/esnext/tokenization/__tests__/**/*',
      'src/esnext/unicode/__tests__/**/*',
      'src/node/**/*',
    ],
    environment: 'node',
    tsConfig: 'src/tsconfig.json',
  }),
  // src/node/__tests__
  app.lint({
    files: ['src/node/__tests__/**/*.test.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/node/__tests__/tsconfig.json',
    jest: true,
  }),
  // src/node
  app.lint({
    files: ['src/node/**/*.ts'],
    ignores: ['src/node/__tests__/**/*'],
    environment: 'node',
    tsConfig: 'src/node/tsconfig.json',
  }),
  // standards
  app.lint({
    files: ['standards/**/*.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'standards/tsconfig.json',
  }),
  // src/esnext
  app.lint({ files: ['src/esnext/**/*.ts'], ignores: [], tsConfig: 'src/esnext/tsconfig.json' }),
  // src/helpers
  app.lint({
    files: ['src/helpers/**/*.ts'],
    ignores: [],
    environment: 'node',
    tsConfig: 'src/helpers/tsconfig.json',
  }),
];

export default config;
