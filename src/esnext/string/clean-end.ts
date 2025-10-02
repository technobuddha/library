import { type Flexible } from '../array/flexible.ts';
import { escapeRegExp } from '../escape/escape-regexp.ts';
import { isRegExp } from '../regexp/is-regexp.ts';
import { trimEquivalent } from '../regexp/trim-equivalent.ts';
import { splitChars } from '../tokenization/split-chars.ts';
import { empty } from '../unicode/unicode.ts';

import { isStringLike } from './is-string-like.ts';
import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Remove all occurrences of characters from the end of the string
 * @param text - The string
 * @param characters - the characters(s) to remove
 * @group String
 * @category Clean
 */
export function cleanEnd(
  text: StringLike,
  characters: Flexible<StringLike | RegExp> = trimEquivalent,
): string {
  const input = toString(text);

  const re =
    isStringLike(characters) ? splitChars(characters).map(escapeRegExp).join('|')
    : isRegExp(characters) ? characters.source
    : characters
        .map((c) => (isRegExp(c) ? c.source : splitChars(c).map(escapeRegExp).join('|')))
        .join('|');

  return input.replace(new RegExp(`(?:${re})+$`, 'v'), empty);
}
