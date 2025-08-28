//@ts-check

// eslint-disable-next-line tsdoc/syntax
/** @type {import("@technobuddha/project").TechnobuddhaConfig} */
const config = {
  lint: {
    rules: {
      '@typescript-eslint/method-signature-style': { rule: 'off' },
      'jest/require-hook': { rule: 'off' },
      'technobuddha/optimize-imports': {
        rule: [
          'error',
          {
            ancestor: 'alias',
            sibling: 'path',
            descendant: 'shortest',
            alias: 'alias',
            base: 'path',
            package: 'alias',
            extension: 'ts',
            index: true,
          },
        ],
        typescript: true,
      },
    },
  },
  directories: {
    src: {
      environment: 'universal',
    },
    scripts: {
      environment: 'node',
      tsconfig: {
        references: ['./src/tsconfig.code.json'],
      }
    }
  },
};

export default config;
