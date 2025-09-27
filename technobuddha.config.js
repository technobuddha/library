//@ts-check
/** @type import("@technobuddha/project").TechnobuddhaConfig */
const config = {
  lint: {
    rules: {
      'unicorn/prefer-code-point': { rule: 'off' },
    }
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
  npm: {
    ignore: ['doc'],
  },
};

export default config;
