import { lookAhead } from './look-ahead.ts';
import { splitChars } from './split-chars.ts';
import { empty } from './unicode.ts';

// prettier-ignore
type Glyph =
  | 'ↈ' | 'ↇ' | 'ↂ' | 'ↁ' | 'm' | 'M' | 'Ⅿ' | 'ⅿ' | 'ↀ' | 'd' | 'D' | 'Ⅾ' | 'ⅾ'
  | 'c' | 'C' | 'Ⅽ' | 'ⅽ' | 'l' | 'L' | 'Ⅼ' | 'ⅼ' | 'ↆ' | 'Ⅻ' | 'ⅻ' | 'Ⅺ' | 'ⅺ' | 'x'
  | 'X' | 'Ⅹ' | 'ⅹ' | 'Ⅸ' | 'ⅸ' | 'Ⅷ' | 'ⅷ' | 'Ⅶ' | 'ⅶ' | 'Ⅵ' | 'ⅵ' | 'ↅ'
  | 'v' | 'V' | 'Ⅴ' | 'ⅴ' | 'Ⅳ' | 'ⅳ' | 'ⅲ' | 'Ⅲ' | 'ⅱ' | 'Ⅱ' | 'i' | 'I' | 'j' | 'Ⅰ'
  | 'ⅰ';

const glyphValues: Record<Glyph, number> = {
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

/**
 * Parse a roman numeral string into it's integer value.
 * @param val - The roman numeral string to parse
 * @returns Parsed roman number
 *
 * @group Math
 * @category Numbers
 */
export function parseRoman(val: string): number {
  const values = splitChars(val).map((g) => glyphValues[g as Glyph]);
  if (values.some((g) => g === undefined)) {
    return Number.NaN;
  }

  for (const [thisGlyph, nextGlyph, i] of lookAhead(values)) {
    if (thisGlyph < nextGlyph) {
      values[i] *= -1;
    }
  }

  return values.reduce((total, n) => total + n);
}

/**
 * Options for converting numbers to Roman numerals.
 *
 * @group Math
 * @category Numbers
 */
export type RomanOptions = {
  /** Specifies the output format for the Roman numeral. */
  format?: 'standard' | 'apostrophus' | 'vinculum';
};

/**
 * Parse number into a roman numeral string
 * @param input - The number to turn into a roman numeral
 * @returns Converted roman numeral
 *
 * @group Math
 * @category Numbers
 */
export function toRoman(input: number, { format = 'standard' }: RomanOptions = {}): string {
  const vg = valueGlyphs[format];

  if (input < 1 || input > vg.limit || !Number.isInteger(input)) {
    throw new RangeError(`Input must be an integer between 1 and ${vg.limit}`);
  }

  const digits = splitChars(input.toString());
  let roman = empty;
  for (let i = 0; i < vg.glyphs.length && digits.length > 0; ++i) {
    roman = vg.glyphs[i][Number.parseInt(digits.pop()!)] + roman;
  }
  // return lastGlyph.repeat(Number.parseInt(build(digits))) + roman;
  return roman;
}

// cspell:disable
const valueGlyphs = {
  standard: {
    limit: 3999,
    glyphs: [
      [empty, 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
      [empty, 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
      [empty, 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
      [empty, 'M', 'MM', 'MMM'],
    ],
  },
  apostrophus: {
    limit: 399999,
    glyphs: [
      [empty, 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
      [empty, 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
      [empty, 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'Cↀ'],
      [empty, 'ↀ', 'ↀↀ', 'ↀↀↀ', 'ↀↁ', 'ↁ', 'ↁↀ', 'ↁↀↀ', 'ↁↀↀↀ', 'ↀↂ'],
      [empty, 'ↂ', 'ↂↂ', 'ↂↂↂ', 'ↂↇ', 'ↇ', 'ↇↂ', 'ↇↂↂ', 'ↇↂↂↂ', 'ↂↈ'],
      [empty, 'ↈ', 'ↈↈ', 'ↈↈↈ'],
    ],
  },
  vinculum: {
    limit: 899999999,
    glyphs: [
      [empty, 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
      [empty, 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
      [empty, 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CI̅'],
      [empty, 'I̅', 'I̅I̅', 'I̅I̅I̅', 'I̅V̅', 'V̅', 'V̅I̅', 'V̅I̅I̅', 'V̅I̅I̅I̅', 'I̅X̅'],
      [empty, 'X̅', 'X̅X̅', 'X̅X̅X̅', 'X̅L̅', 'L̅', 'L̅X̅', 'L̅X̅X̅', 'L̅X̅X̅X̅', 'X̅C̅'],
      [empty, 'C̅', 'C̅C̅', 'C̅C̅C̅', 'C̅D̅', 'D̅', 'D̅C̅', 'D̅C̅C̅', 'D̅C̅C̅C̅', 'C̅I̿'],
      [empty, 'I̿', 'I̿I̿', 'I̿I̿I̿', 'I̿V̿', 'V̿', 'V̿I̿', 'V̿I̿I̿', 'V̿I̿I̿I̿', 'I̿X̿'],
      [empty, 'X̿', 'X̿X̿', 'X̿X̿X̿', 'X̿L̿', 'L̿', 'L̿X̿', 'L̿X̿X̿', 'L̿X̿X̿X̿', 'X̿C̿'],
      [empty, 'C̿', 'C̿C̿', 'C̿C̿C̿', 'C̿D̿', 'D̿', 'D̿C̿', 'D̿C̿C̿', 'D̿C̿C̿C̿'],
    ],
  },
};
// cspell:enable
