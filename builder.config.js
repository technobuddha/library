//@ts-check

/** @type import('\@technobuddha/project/build').Builds */
const config = {
  default: {
    steps: [
      {
        name: 'Clean',
        command: ['rm -rf ./dist'],
      },
      {
        name: 'Library',
        command: 'npx tsc --build src',
      },
      {
        name: 'Transcriptions',
        command: 'npx tsx scripts/make-transcriptions.ts',
      },
      {
        name: 'Lorem',
        command: 'npx tsx scripts/make-lorem-ipsum.ts',
      },
      {
        name: 'Hyphen',
        command: 'npx tsx scripts/make-hyphenation.ts',
      },
      {
        name: 'Library',
        command: 'npx tsc --build src',
      },
      {
        name: 'Documentation',
        command: 'npx typedoc',
      },
    ],
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
        command: 'yarn npm publish --access=public',
      },
    ],
  },
};

export default config;
