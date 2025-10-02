import { ensureArray } from '../array/ensure-array.ts';
import { type Flexible } from '../array/flexible.ts';
import { isString } from '../string/is-string.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

import { isRegExp } from './is-regexp.ts';

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
 * @example
 * ```typescript
 * matches('Hello', 'hello'); // true
 * matches('Hello', /he.*\/vi); // true
 * matches('Hello', ['hi', /he.*\/vi]); // true
 * matches('Hello', ['hi', 'hey']); // false
 * ```
 * @group RegExp
 * @category Validation
 */
export function matches(
  text: StringLike,
  match: Flexible<string | RegExp | Iterable<string | RegExp>>,
): boolean {
  const str = toString(text).trim().toLocaleLowerCase();

  for (const m of ensureArray(match)) {
    if (isRegExp(m)) {
      if (m.test(str)) {
        return true;
      }
      continue;
    }

    if (isString(m)) {
      if (m.toLocaleLowerCase() === str) {
        return true;
      }
      continue;
    }

    for (const mm of m) {
      if ((isRegExp(mm) && mm.test(str)) || (isString(mm) && mm.toLocaleLowerCase() === str)) {
        return true;
      }
    }
  }

  return false;
}
