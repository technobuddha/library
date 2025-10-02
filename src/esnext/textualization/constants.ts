import { empty } from '../unicode/unicode.ts';

/**
 * Words for unit numbers 0-19
 *
 * one, two, three, four, five, six, seven, eight, nine, ten,
 * eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen
 * @group Number
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
 *
 * twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety
 * @group Number
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
 * first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth,
 * eleventh, twelfth, thirteenth, fourteenth, fifteenth, sixteenth, seventeenth, eighteenth, nineteenth
 * @group Number
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
 * twentieth, thirtieth, fortieth, fiftieth, sixtieth, seventieth, eightieth, ninetieth
 * @group Number
 * @category Constants
 */
// prettier-ignore
export const ordinalTens = [
  'twentieth',    'thirtieth',    'fortieth',     'fiftieth',
  'sixtieth',     'seventieth',   'eightieth',    'ninetieth',
];
