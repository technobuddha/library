//@ts-check

/** @type {import('@technobuddha/builder').Builds} */
const config = {
  dev: {
    watch: true,
    projects: [
      {
        name: 'Clean',
        steps: 'rm -rf ./dist'
      },
      {
        name: 'Library',
        directory: ['./src'],
        steps: 'tsc -p ./src/tsconfig.code.json',
      },
    ],
  },
  prod: {
    projects: [
      {
        name: 'Clean',
        steps: 'rm -rf ./dist',
      },
      {
        name: 'Library',
        steps: 'tsc -p ./src/tsconfig.code.json',
      },
    ]
  }
};

export default config;
