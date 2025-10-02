import { database } from '../@data/pluralization.ts';
import { matchCase } from '../case-conversion/match-case.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { empty, space } from '../unicode/unicode.ts';

/**
 * Return the plural version of the input string
 * @param input - The word to pluralize
 * @param quantity - The quantity to prepend to the word.  If omitted nothing is prepended.  If quantity is one the singular form is returned.
 * @param include - If true and quantity is supplied, the quantity is prepended to the output.
 * @returns The plural form of the input, or if a quantity is supplied - the quantity and the singular/plural form of the input (whichever is appropriate)
 * @example
 * ```typescript
 * plural('cat'); // cats
 * plural('mouse', 1); // mouse
 * plural('mouse', 2); // mice
 * plural('dog', 1, true); // 1 dog
 * plural('dog', 2, true); // 2 dogs
 * ```
 * @group English
 * @category Numbering
 */
export function plural(word: StringLike, quantity?: NumberLike, include = false): string {
  const input = toString(word);
  const qty = toNumber(quantity ?? 2);

  if (qty === 1 || qty === -1) {
    return include ? qty.toString() + space + input : input;
  }

  let lc = input.toLocaleLowerCase();
  let suffix = empty;
  let prefix = empty;
  let result = null as string | null;

  for (const p of database.prefixes) {
    if (lc.startsWith(p)) {
      prefix = p;
      lc = lc.slice(p.length);
      break;
    }
  }

  for (const s of database.suffixes) {
    if (lc.endsWith(s)) {
      suffix = s;
      lc = lc.slice(0, Math.max(0, lc.length - s.length));
      break;
    }
  }

  if (database.uncountableWords.includes(lc)) {
    result = matchCase(prefix + lc + suffix, input);
  }

  if (!result && lc in database.irregulars) {
    result = matchCase(prefix + database.irregulars[lc] + suffix, input);
  }

  if (!result) {
    for (const v of database.uncountableRules) {
      if (v.test(lc)) {
        result = matchCase(prefix + lc + suffix, input);
        break;
      }
    }
  }

  if (!result) {
    for (const v of database.rules) {
      if (v[0].test(lc)) {
        result = matchCase(prefix + lc.replace(v[0], v[1]) + suffix, input);
        break;
      }
    }
  }

  result ??= matchCase(`${prefix}${lc}s${suffix}`, input);

  return include && quantity != null ? `${qty}${space}${result}` : result;
}
