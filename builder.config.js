//@ts-check

/** @type import('\@technobuddha/project/build').Builds */
const config = {
  default: {
    steps: [
      {
        name: 'Prepare',
        command: [
          'tar -czf dist-backup.tgz --ignore-failed-read --warning=no-failed-read dist',
          'rm -rf dist',
        ],
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
    onError: {
      name: 'Rollback',
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
