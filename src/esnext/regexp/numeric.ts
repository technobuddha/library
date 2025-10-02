import { re } from './re.ts';

const SIGN = /[+\-]?/v;

const NAN = /NaN/v;
const INFINITY = /Infinity/v;

const INTEGER = /\d+/v;
const DECIMAL = /\d*\.\d+/v;
const EXPONENT = re`[Ee]${SIGN}\d+`;

// const BINARY = /0[bB][01]+/v;
// const OCTAL = /0[oO][0-7]+/v;
// const HEXADECIMAL = /0[xX][0-9a-fA-F]+/v;

/**
 * Validate a valid number
 * @category Constants
 * @example
 * ```typescript
 * numeric.test('123'); // true
 * numeric.test('-123.45'); // true
 * numeric.test('1.23e4'); // true
 * numeric.test('Infinity'); // true
 * numeric.test('NaN'); // true
 * numeric.test('abc'); // false
 * numeric.test(''); // false
 * ```
 * @group RegExp
 * @category Constants
 */
export const numeric = re`^${SIGN}(?:${NAN}|(?:${INTEGER}|${DECIMAL})${EXPONENT}?|${INFINITY})$`;
// TODO [>2.2]: enhance numeric regex to support hexadecimal and binary literals
// TODO [>2.2]: Add isNumeric function, but with a different name
//#endregion numeric
