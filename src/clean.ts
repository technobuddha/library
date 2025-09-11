import { isRegExp } from './is-reg-exp.ts';
import { isString } from './is-string.ts';
import { trimEquivalent } from './regexp.ts';
import { splitChars } from './split-chars.ts';
import { empty } from './unicode.ts';

/**
 * Remove all occurrences of characters from the beginning and end of the string
 * @param input - The string
 * @param characters - The characters(s) to remove
 * @group String
 * @category Operations
 */
export function clean(
  input: string,
  characters: string | RegExp | (string | RegExp)[] = trimEquivalent,
): string {
  const re =
    isString(characters) ?
      splitChars(characters)
        .map((ch) => RegExp.escape(ch))
        .join('|')
    : isRegExp(characters) ? characters.source
    : characters
        .map((c) =>
          isRegExp(c) ?
            c.source
          : splitChars(c)
              .map((ch) => RegExp.escape(ch))
              .join('|'),
        )
        .join('|');

  return input.replaceAll(new RegExp(`^(${re})+|(${re})+$`, 'gu'), empty);
}
