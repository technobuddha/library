import { project } from '@technobuddha/project';

export default [
  {
    ignores: ['dist/**/*'],
  },
  project.lint({
    files: ['src/**/*.ts'],
    ignores: ['src/**/*.test.ts'],
    tsConfig: './src/tsconfig.json',
    environment: 'node',
  }),
  project.lint({
    files: ['src/**/*.test.ts'],
    tsConfig: './src/tsconfig.json',
    environment: 'node',
    jest: true,
  }),
];
