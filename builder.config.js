//@ts-check

/** @type import('\@technobuddha/project/build').Builds */
const config = {
  default: {
    steps: [
      {
        display: 'Prepare',
        command: [
          'tar -czf dist-backup.tgz --ignore-failed-read --warning=no-failed-read dist',
          'rm -rf dist',
        ],
      },
      {
        display: 'Library',
        command: 'npx tsc --build src',
      },
      {
        display: 'Documentation',
        command: 'npx typedoc',
      },
    ],
    onError: {
      display: 'Rollback',
      command: [
        'rm -rf dist',
        'tar -xzf dist-backup.tgz'
      ],
    }
  },
  publish: {
    steps: [
      { build: 'default' },
      {
        display: 'Version',
        command: 'yarn version prerelease',
      },
      {
        display: 'Publish',
        command: 'yarn npm publish --access=public',
      },
    ],
  },
};

export default config;
