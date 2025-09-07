//@ts-check

// eslint-disable-next-line tsdoc/syntax
/** @type {import("@technobuddha/project").TechnobuddhaConfig} */
const config = {
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
