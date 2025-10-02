import { type Flexible } from '../array/flexible.ts';
import { escapeRegExp } from '../escape/escape-regexp.ts';
import { isRegExp } from '../regexp/is-regexp.ts';
import { trimEquivalent } from '../regexp/trim-equivalent.ts';
import { splitChars } from '../tokenization/split-chars.ts';
import { empty } from '../unicode/unicode.ts';

import { isStringLike } from './is-string-like.ts';
import { type StringLike } from './string-like.ts';

/**
 * Remove all occurrences of characters from the beginning and end of the string
 * @param input - The string
 * @param characters - The characters(s) to remove
 * @group String
 * @category Clean
 */
export function clean(
  input: StringLike,
  characters: Flexible<StringLike | RegExp> = trimEquivalent,
): string {
  const re =
    isStringLike(characters) ? splitChars(characters).map(escapeRegExp).join('|')
    : isRegExp(characters) ? characters.source
    : characters
        .map((c) => (isRegExp(c) ? c.source : splitChars(c).map(escapeRegExp).join('|')))
        .join('|');

  return input.replaceAll(new RegExp(`^(${re})+|(${re})+$`, 'vg'), empty);
}
