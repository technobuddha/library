//@ts-check

/** @type import("\@technobuddha/project").TechnobuddhaConfig */
const config = {
  lint: {
    rules: {
      'no-bitwise': { rule: 'off' },
      'unicorn/prefer-code-point': { rule: 'off' },
      'unicorn/prefer-math-trunc': { rule: 'off' }
    },
    ignores: ['fixtures', 'datasets']
  },
  directories: {
    'src/browser': {
      environment: 'browser',
    },
    'src/common': {
      environment: 'browser',
    },
    'src/esnext': {
      environment: 'esnext',
    },
    'src/node': {
      environment: 'node',
    },
    'datasets': {
      environment: 'esnext',
    },
    'standards': {
      environment: 'node',
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
        }
      }
    }
  },
  npm: {
    ignore: [
      'doc',
      'datasets',
      'reference',
      'fixtures',
      'standards',
      'documents',
      'public',
      '__tests__',
      'tsdoc.json'
    ],
  },
  vitest: {
    coverage: {
      exclude: ['src/esnext/difference', 'src/esnext/patch', 'src/esnext/match', 'src/esnext/metaphone/metaphone3.ts']
    }
  }
};

export default config;
