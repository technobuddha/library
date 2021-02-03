/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const base = require('../../.eslintrc.base');

module.exports = base(path.join(__dirname, './tsconfig.lint.json'));
