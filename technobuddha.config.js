//@ts-check

/** @type import("\@technobuddha/project").TechnobuddhaConfig */
const config = {
  lint: {
    rules: {
      'no-bitwise': { rule: 'off' },
      'unicorn/prefer-code-point': { rule: 'off' },
      'unicorn/prefer-math-trunc': { rule: 'off' },
    },
    ignores: ['fixtures'],
  },
  prettier: {
    ignore: ['reference/source/transcriptions.js'],
  },
  directories: {
    'src/browser': {
      platform: 'browser',
    },
    'src/common': {
      platform: 'browser',
    },
    'src/esnext': {
      platform: 'esnext',
    },
    'src/node': {
      platform: 'node',
    },
    'standards': {
      platform: 'node',
    },
    'wip': {
      platform: 'esnext',
      tsconfig: {
        compilerOptions: {
          noEmit: true,
          rewriteRelativeImportExtensions: false,
        },
      }
    }
  },
  tsconfig: {
    base: {
      compilerOptions: {
        paths: {
          '@technobuddha/library': ['./src/esnext/index.ts'],
          '@technobuddha/library/node': ['./src/node/index.ts'],
          '@technobuddha/library/browser': ['./src/browser/index.ts'],
          '@technobuddha/library/esnext': ['./src/esnext/index.ts'],
        },
      },
    },
  },
  npm: {
    ignore: [
      'doc',
      'reference',
      'fixtures',
      'standards',
      'documents',
      'public',
      '__tests__',
      'tsdoc.json',
    ],
  },
  vitest: {
    coverage: {
      exclude: [
        'src/esnext/difference',
        'src/esnext/patch',
        'src/esnext/match',
        'src/esnext/metaphone/metaphone3.ts',
      ],
    },
  },
};

export default config;
