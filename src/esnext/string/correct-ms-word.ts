import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

const find = /[\u00A0–—‘’‹›“”«»©®¼½¾…€™←→⇐⇒⇔☹☺]/gv;
const replace: Readonly<Record<string, string>> = Object.freeze({
  '\u00A0': ' ',
  '–': '-',
  '—': '-',
  '‘': "'",
  '’': "'",
  '‹': '<',
  '›': '>',
  '“': '"',
  '”': '"',
  '«': '<<',
  '»': '>>',
  '©': '(c)',
  '®': '(r)',
  '¼': '1/4',
  '½': '1/2',
  '¾': '3/4',
  '…': '...',
  '€': '(e)',
  '™': '(tm)',
  '←': '<--',
  '→': '-->',
  '⇐': '<==',
  '⇒': '==>',
  '⇔': '<=>',
  '☹': ':(',
  '☺': ':)',
});

/**
 * Correct character sequences that Microsoft Word changes to make it look prettier
 * @param input - The mangled string
 * @returns string with special characters corrected
 * @group String
 * @category Correction
 */
export function correctMSWord(input: StringLike): string {
  return toString(input).replaceAll(find, (a) => replace[a]);
}
