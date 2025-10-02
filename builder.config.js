//@ts-check

/** @type import('\@technobuddha/project/build').Builds */
const config = {
  default: {
    watch: true,
    steps: [
      {
        name: 'Clean',
        command: ['rm -rf ./dist', 'rm -rf ./src/esnext/@data/moby*']
      },
      {
        name: 'Lorem',
        command: 'npx tsx scripts/make-lorem-ipsum.ts',
        directory: './reference/lorem',
      },
      {
        name: 'Hyphen',
        command: 'npx tsx scripts/make-hyphenation.ts',
        directory: './reference/hyphen',
      },
      // {
      //   name: 'Moby',
      //   command: 'npx tsx scripts/make-moby.ts',
      //   directory: './reference/moby',
      // },
      {
        name: 'Library',
        directory: ['./src'],
        command: 'npx tsc --build src',
      },
      {
        name: 'Documentation',
        directory: ['./src'],
        command: 'npx typedoc',
      }
    ],
  },
  prod: {
    steps: [
      { build: 'default' },
    ]
  },
  publish: {
    steps: [
      { build: 'default' },
      {
        name: 'Version',
        command: 'yarn version prerelease',
      },
      {
        name: 'Publish',
        command: 'yarn npm publish',
      }
    ]
  }
};

export default config;
