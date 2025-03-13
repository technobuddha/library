//@ts-check
/**
 * @import { TechnobuddhaConfig } from '@technobuddha/project'
 * @type {TechnobuddhaConfig}
 */
const config = {
  lint: {
    rules: {
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
            extension: 'js',
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
  },
};

export default config;
