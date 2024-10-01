// ​🚨​
// ​🚨​ This file is managed by @technobuddha/project
// ​🚨​
export default {
  lint: {
    rules: {
      'import-x/no-extraneous-dependencies': {
        rule: [
          'error',
          {
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: false,
            bundledDependencies: false,
            whitelist: ['type-fest', 'jest-extended'],
          },
        ],
      },
    },
  },
};
