import { project } from '@technobuddha/project';

export default [
  {
    ignores: ['dist/**/*'],
  },
  project.lint({
    files: ['src/**/*.ts'],
    tsConfig: './src/tsconfig.json',
    environment: 'node',
  }),
];
