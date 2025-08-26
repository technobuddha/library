import { empty } from './unicode.ts';

/**
 * Negative Zero
 *
 * @group Math
 * @category Constants
 */
export const negativeZero = -0;

/**
 * Number of ticks in a second [1000]
 *
 * @group Time
 * @category Constants
 */
export const ticksPerSecond = 1000;

/**
 * Number of seconds in a minute [60]
 *
 * @group Time
 * @category Constants
 */
export const secondsPerMinute = 60;

/**
 * Number of minutes in an hour [60]
 *
 * @group Time
 * @category Constants
 */
export const minutesPerHour = 60;

/**
 * Number of hours in a day [24]
 * @group Time
 * @category Constants
 */
export const hoursPerDay = 24;

/**
 * Number of days in a week [7]
 *
 * @group Time
 * @category Constants
 */
export const daysPerWeek = 7;

/**
 * Number of ticks in a minute [60000]
 *
 * @group Time
 * @category Constants
 */
export const ticksPerMinute = ticksPerSecond * secondsPerMinute;

/**
 * Number of ticks in an hour [3600000]
 *
 * @group Time
 * @category Constants
 */
export const ticksPerHour = ticksPerMinute * minutesPerHour;

/**
 * Number of ticks in a day [86400000]
 *
 * @group Time
 * @category Constants
 */
export const ticksPerDay = ticksPerHour * hoursPerDay;

/**
 * Number of ticks in a week [604800000]
 *
 * @group Time
 * @category Constants
 */
export const ticksPerWeek = ticksPerDay * daysPerWeek;

/**
 * Number of seconds in an hour [3600]
 *
 * @group Time
 * @category Constants
 */
export const secondsPerHour = secondsPerMinute * minutesPerHour;

/**
 * Number of seconds in a day [86400]
 *
 * @group Time
 * @category Constants
 */
export const secondsPerDay = secondsPerHour * hoursPerDay;

/**
 * Number of seconds in a week [604800]
 *
 * @group Time
 * @category Constants
 */
export const secondsPerWeek = secondsPerDay * daysPerWeek;

/**
 * Number of minutes in a day [1440]
 *
 * @group Time
 * @category Constants
 */
export const minutesPerDay = minutesPerHour * hoursPerDay;

/**
 * Number of minutes in a week [10080]
 *
 * @group Time
 * @category Constants
 */
export const minutesPerWeek = minutesPerDay * daysPerWeek;

/**
 * Number of hours in a week [168]
 *
 * @group Time
 * @category Constants
 */
export const hoursPerWeek = hoursPerDay * daysPerWeek;

/**
 * Days of the week
 *
 * @group Time
 * @category Enumerations
 */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Translation object for name of day to day number.
 *
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
 * Months of the year
 *
 * @group Time
 * @category Enumerations
 */
export type MonthOfYear = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/**
 * Translation object for name of month to month number
 *
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
 * Words for unit numbers 0-19
 *
 * @group Math
 * @category Constants
 */
// prettier-ignore
export const cardinalOnes = [
  empty,          'one',          'two',          'three',        'four',
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
  'first',        'second',       'third',      'fourth',
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

/**
 * Regular expression that matches any whitespace character, including standard spaces,
 * non-breaking spaces (`\u00A0`), and zero-width no-break spaces (`\uFEFF`).
 * Useful for trimming or identifying whitespace-equivalent characters in strings.
 * @group String
 * @category Constants
 */
export const trimEquivalent = /[\s\uFEFF\u00A0]/u;
