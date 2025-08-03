import { build } from './build.ts';
import { splitChars } from './split-chars.ts';

// const validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/u;

const glyphs = {
  ↈ: 100000,
  ↇ: 50000,
  ↂ: 10000,
  ↁ: 5000,

  m: 1000,
  M: 1000,
  Ⅿ: 1000,
  ⅿ: 1000,
  ↀ: 1000,

  d: 500,
  D: 500,
  Ⅾ: 500,
  ⅾ: 500,

  c: 100,
  C: 100,
  Ⅽ: 100,
  ⅽ: 100,

  l: 50,
  L: 50,
  Ⅼ: 50,
  ⅼ: 50,
  ↆ: 50,

  Ⅻ: 12,
  ⅻ: 12,

  Ⅺ: 11,
  ⅺ: 11,

  x: 10,
  X: 10,
  Ⅹ: 10,
  ⅹ: 10,

  Ⅸ: 9,
  ⅸ: 9,

  Ⅷ: 8,
  ⅷ: 8,

  Ⅶ: 7,
  ⅶ: 7,

  Ⅵ: 6,
  ⅵ: 6,
  ↅ: 6,

  v: 5,
  V: 5,
  Ⅴ: 5,
  ⅴ: 5,

  Ⅳ: 4,
  ⅳ: 4,

  ⅲ: 3,
  Ⅲ: 3,

  ⅱ: 2,
  Ⅱ: 2,

  i: 1,
  I: 1,
  j: 1,
  Ⅰ: 1,
  ⅰ: 1,
};

// Ↄ ↄ

// cspell:disable
const keyOut = [
  ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
  ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
  ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
  // ['', 'M', 'MM', 'MMM', 'Mↁ', 'ↁ', 'ↁM', 'ↁMM', 'ↁMMM', 'Mↂ'],
  // ['', 'ↂ', 'ↂↂ', 'ↂↂↂ', 'ↂↁ', 'ↁ', 'ↁↂ', 'ↁↂↂ', 'ↁↂↂↂ', 'ↂↈ'],

  // ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'Cↀ'],
  // ['', 'ↀ', 'ↀↀ', 'ↀↀↀ', 'ↀↁ', 'ↁ', 'ↁↀ', 'ↁↀↀ', 'ↁↀↀↀ', 'ↀↂ'],
  // ['', 'ↂ', 'ↂↂ', 'ↂↂↂ', 'ↂↇ', 'ↇ', 'ↇↂ', 'ↇↂↂ', 'ↇↂↂↂ', 'ↂↈ'],

  // ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CCIↃ'],
  // ['', 'CIↃ', 'CIↃCIↃ', 'CIↃCIↃCIↃ', 'CIↃIↃↃ', 'IↃↃ', 'IↃↃCIↃ', 'IↃↃCIↃCIↃ', 'IↃↃCIↃCIↃCIↃ', 'CIↃCCIↃↃ'],
  // ['', 'CCIↃↃ', 'CCIↃↃCCIↃↃ', 'CCIↃↃCCIↃↃCCIↃↃ', 'CCIↃↃIↃↃ', 'IↃↃↃ', 'IↃↃↃCCIↃↃ', 'IↃↃↃCCIↃↃCCIↃↃ', 'IↃↃↃCCIↃↃCCIↃↃCCIↃↃ', 'CCIↃↃCCCIↃↃↃ'],
  // ['', 'CCCIↃↃↃ', 'CCCIↃↃↃCCCIↃↃↃ', 'CCCIↃↃↃCCCIↃↃↃCCCIↃↃↃ', 'CCCIↃↃↃIↃↃↃↃ', 'IↃↃↃↃ', 'IↃↃↃↃCCCIↃↃↃ', 'IↃↃↃↃCCCIↃↃↃCCCIↃↃↃ', 'IↃↃↃↃCCCIↃↃↃCCCIↃↃↃCCCIↃↃↃ', 'CCCIↃↃↃCCCCIↃↃↃↃ'],

  // ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'C(I)'],
  // ['', '(I)', '(I)(I)', '(I)(I)(I)', '(I)I))', 'I))', 'I))(I)', 'I))(I)(I)', 'I))(I)(I)(I)', '(I)((I))'],
  // ['', '((I))', '((I))((I))', '((I))((I))((I))', '((I))I))', 'I)))', 'I)))((I))', 'I)))((I))((I))', 'I)))((I))((I))((I))', '((I))(((I)))'],
  // ['', '(((I)))', '(((I)))(((I)))', '(((I)))(((I)))(((I)))', '(((I)))I))))', 'I))))', 'I))))(((I)))', 'I))))(((I)))(((I)))', 'I))))(((I)))(((I)))(((I)))', '(((I)))((((I))))'],
];
// cspell:enable

const lastGlyph = keyOut.at(-1)!.at(-1)!.at(-1)!;

/**
 * Parse a roman numeral string into it's integer value.
 * @param val - The roman numeral string to parse
 * @returns Parsed roman number
 * @group Math
 * @category Numbering
 */
export function parseRoman(val: string): number {
  const glyphValues = splitChars(val).map((g) => glyphs[g as keyof typeof glyphs]);
  if (glyphValues.some((g) => g === undefined)) {
    throw new TypeError(`Invalid Roman Numeral: ${val}`);
  }

  for (let i = 0; i < glyphValues.length - 1; ++i) {
    const glyph = glyphValues[i];
    const lookahead = glyphValues[i + 1];

    if (glyph < lookahead) {
      glyphValues[i] *= -1;
    }
  }

  return glyphValues.reduce((total, n) => total + n);
}

/**
 * Parse number into a roman numeral string
 * @param val - The number to turn into a roman numeral
 * @returns Converted roman numeral
 * @group Math
 * @category Numbering
 */
export function toRoman(val: number): string {
  const digits = splitChars(val.toString());
  let roman = '';
  for (let i = 0; i < keyOut.length && digits.length > 0; ++i) {
    roman = keyOut[i][Number.parseInt(digits.pop()!)] + roman;
  }
  return lastGlyph.repeat(Number.parseInt(build(digits))) + roman;
}
