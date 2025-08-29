import { isRegExp } from './is-reg-exp.ts';
import { isString } from './is-string.ts';

/**
 * Determines if the given `text` matches the provided `match` criteria.
 *
 * The `match` parameter can be:
 * - A string: returns true if the trimmed, lowercased `text` is equal to the lowercased `match` string.
 * - A RegExp: returns true if the regular expression matches the trimmed, lowercased `text`.
 * - An iterable of strings or RegExps: returns true if any of the elements match the `text` as described above.
 * @param text - The input string to test against the match criteria.
 * @param match - A string, RegExp, or iterable of strings/RegExps to match against the input text.
 * @returns `true` if the text matches the criteria; otherwise, `false`.
 * @group RegExp
 * @category Operations
 * @example
 * ```typescript
 * matches('Hello', 'hello'); // true
 * matches('Hello', /he.*\/ui); // true
 * matches('Hello', ['hi', /he.*\/ui]); // true
 * matches('Hello', ['hi', 'hey']); // false
 * ```
 */
export function matches(text: string, match: string | RegExp | Iterable<string | RegExp>): boolean {
  const str = text.trim().toLocaleLowerCase();

  if (isRegExp(match)) {
    return match.test(str);
  }
  if (isString(match)) {
    return match.toLocaleLowerCase() === str;
  }

  for (const m of match) {
    if ((isRegExp(m) && m.test(str)) || (isString(m) && m.toLocaleLowerCase() === str)) {
      return true;
    }
  }

  return false;
}
