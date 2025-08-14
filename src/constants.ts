/**
 * @group String
 * @category Constants
 */
export const empty = '';
/**
 * @group String
 * @category Constants
 */
export const space = ' ';
/**
 * @group String
 * @category Constants
 */
export const nbsp = '\u00A0';
/**
 * @group String
 * @category Constants
 */
export const zwsp = '\u200B';

/**
 * Negative Zero
 *
 * @group Math
 * @category Constants
 */
export const negativeZero = -0;

/**
 * @group Time
 * @category Constants
 */
export const ticksPerSecond = 1000;
/**
 * @group Time
 * @category Constants
 */
export const secondsPerMinute = 60;
/**
 * @group Time
 * @category Constants
 */
export const minutesPerHour = 60;
/**
 * @group Time
 * @category Constants
 */
export const hoursPerDay = 24;
/**
 * @group Time
 * @category Constants
 */
export const daysPerWeek = 7;
/**
 * @group Time
 * @category Constants
 */
export const ticksPerMinute = ticksPerSecond * secondsPerMinute;
/**
 * @group Time
 * @category Constants
 */
export const ticksPerHour = ticksPerMinute * minutesPerHour;
/**
 * @group Time
 * @category Constants
 */
export const ticksPerDay = ticksPerHour * hoursPerDay;
/**
 * @group Time
 * @category Constants
 */
export const ticksPerWeek = ticksPerDay * daysPerWeek;

/**
 * @group Time
 * @category Constants
 */
export const secondsPerHour = secondsPerMinute * minutesPerHour;
/**
 * @group Time
 * @category Constants
 */
export const secondsPerDay = secondsPerHour * hoursPerDay;
/**
 * @group Time
 * @category Constants
 */
export const secondsPerWeek = secondsPerDay * daysPerWeek;
/**
 * @group Time
 * @category Constants
 */
export const minutesPerDay = minutesPerHour * hoursPerDay;
/**
 * @group Time
 * @category Constants
 */
export const minutesPerWeek = minutesPerDay * daysPerWeek;
/**
 * @group Time
 * @category Constants
 */
export const hoursPerWeek = hoursPerDay * daysPerWeek;
/**
 * @group Time
 * @category Enumerations
 */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
/**
 * @group Time
 * @category Enumerations
 */
export const day: Readonly<Record<string, DayOfWeek>> = Object.freeze({
  sunday: 0,
  sun: 0,
  su: 0,
  monday: 1,
  mon: 1,
  mo: 1,
  tuesday: 2,
  tue: 2,
  tu: 2,
  tues: 2,
  wednesday: 3,
  wed: 3,
  we: 3,
  thursday: 4,
  thu: 4,
  th: 4,
  thur: 4,
  thurs: 4,
  friday: 5,
  fri: 5,
  fr: 5,
  saturday: 6,
  sat: 6,
  sa: 6,
});

/**
 * @group Time
 * @category Enumerations
 */
export type MonthOfYear = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/**
 * @group Time
 * @category Enumerations
 */
export const month: Readonly<Record<string, MonthOfYear>> = Object.freeze({
  january: 0,
  jan: 0,
  february: 1,
  feb: 1,
  march: 2,
  mar: 2,
  april: 3,
  apr: 3,
  may: 4,
  june: 5,
  jun: 5,
  july: 6,
  jul: 6,
  august: 7,
  aug: 7,
  september: 8,
  sept: 8,
  sep: 8,
  october: 9,
  oct: 9,
  november: 10,
  nov: 10,
  december: 11,
  dec: 11,
});

/**
 * Fraction Slash
 *
 * @group Math
 * @category Unicode
 */
export const fractionSlash = '⁄'; // U+2044 FRACTION SLASH
/**
 * Hyphen
 *
 * @group English
 * @category Unicode
 */
export const hyphen = '‐'; // U+2010 HYPHEN
/**
 * Non-Breaking Hyphen
 *
 * @group English
 * @category Unicode
 */
export const nbHyphen = '‑'; // U+2011 NON-BREAKING HYPHEN
/**
 * Soft Hyphen
 *
 * @group English
 * @category Unicode
 */
export const softHyphen = '­'; // U+00AD SOFT HYPHEN

/**
 * Negative Sign
 *
 * @group Math
 * @category Unicode
 */
export const negativeSign = '˗'; // U+02D7 MODIFIER LETTER MINUS
/**
 * Positive Sign
 *
 * @group Math
 * @category Unicode
 */
export const positiveSign = '˖'; // U+02D8 MODIFIER LETTER PLUS

/**
 * Superscript Negative
 *
 * @group Math
 * @category Unicode
 */
export const supNegative = '⁻'; // U+207B SUPERSCRIPT MINUS
/**
 * Superscript Positive
 *
 * @group Math
 * @category Unicode
 */
export const supPositive = '⁺'; // U+207A SUPERSCRIPT PLUS

/**
 * Subscript Negative
 *
 * @group Math
 * @category Unicode
 */
export const subNegative = '₋'; // U+208B SUBSCRIPT MINUS
/**
 * Subscript Positive
 *
 * @group Math
 * @category Unicode
 */
export const subPositive = '₊'; // U+208A SUBSCRIPT PLUS

/**
 * Invisible Plus sign
 *
 * @group Math
 * @category Unicode
 */
export const invisiblePlus = '⁤'; // U+2064 INVISIBLE PLUS

/**
 * Words for unit numbers 0-19
 *
 * @group Math
 * @category Constants
 */
// prettier-ignore
export const cardinalOnes = [
  'zero',         'one',          'two',          'three',        'four',
  'five',         'six',          'seven',        'eight',        'nine',
  'ten',          'eleven',       'twelve',       'thirteen',     'fourteen',
  'fifteen',      'sixteen',      'seventeen',    'eighteen',     'nineteen',
];

/**
 * Words for tens 20-90
 * @group Math
 * @category Constants
 */
// prettier-ignore
export const cardinalTens = [
  'twenty',       'thirty',       'forty',        'fifty',
  'sixty',        'seventy',      'eighty',       'ninety',
];

/**
 * Words for ordinal numbers 0-19
 *
 * @group Math
 * @category Constants
 */
// prettier-ignore
export const ordinalOnes = [
  '',             'first',        'second',       'third',      'fourth',
  'fifth',        'sixth',        'seventh',      'eighth',     'ninth',
  'tenth',        'eleventh',     'twelfth',      'thirteenth', 'fourteenth',
  'fifteenth',    'sixteenth',    'seventeenth',  'eighteenth', 'nineteenth'
];

/**
 * Words for ordinal tens 20-90
 *
 * @group Math
 * @category Constants
 */
// prettier-ignore
export const ordinalTens = [
  'twentieth',    'thirtieth',    'fortieth',     'fiftieth',
  'sixtieth',     'seventieth',   'eightieth',    'ninetieth',
];
