import { ensureArray } from '../array/ensure-array.ts';
import { unique } from '../array/unique.ts';
import { deepCopy } from '../object/deep-copy.ts';
import { isString } from '../string/is-string.ts';
import { keep as keepFn } from '../string/keep.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { removeDiacritics } from '../unicode/remove-diacritics.ts';
import { empty, space } from '../unicode/unicode.ts';

import {
  type CompiledForkingPhonetic,
  type CompiledNonForkingPhonetic,
  type CompiledPhonetic,
  type Scanner,
} from './algorithm.ts';

/**
 * Generates a single phonetic code using configurable translation rules.
 *
 * @remarks
 * The `options` parameter must be a compiled configuration object, created using {@link createAlgorithm}.
 * This ensures that scan rules are grouped by their first character for efficient lookup.
 *
 * @param input - The string-like value to encode phonetically
 * @param options - Compiled configuration options for the phonetic encoding (non-forking), created via {@link createAlgorithm}
 * @returns The phonetically encoded string
 *
 * @example
 * // Basic usage with translation mapping
 * import \{ createAlgorithm, phonetic \} from './phonetic.ts';
 *
 * const config = createAlgorithm(\{
 *   scan: [
 *     \{ m: 'S', o: '2' \},
 *     \{ m: 'M', o: '3' \},
 *     \{ m: 'T', o: '7' \},
 *     \{ m: 'H', o: '8' \},
 *   ],
 *   length: 4,
 *   pad: '0',
 * \});
 * phonetic('Smith', config); // 'S378'
 *
 * // Soundex-like encoding
 * const soundexConfig = createAlgorithm(\{
 *   scan: [
 *     \{ m: 'B', o: '1' \}, \{ m: 'F', o: '1' \}, \{ m: 'P', o: '1' \}, \{ m: 'V', o: '1' \},
 *     \{ m: 'C', o: '2' \}, \{ m: 'G', o: '2' \}, \{ m: 'J', o: '2' \}, \{ m: 'K', o: '2' \},
 *     \{ m: 'Q', o: '2' \}, \{ m: 'S', o: '2' \}, \{ m: 'X', o: '2' \}, \{ m: 'Z', o: '2' \},
 *     \{ m: 'D', o: '3' \}, \{ m: 'T', o: '3' \},
 *     \{ m: 'L', o: '4' \},
 *     \{ m: 'M', o: '5' \}, \{ m: 'N', o: '5' \},
 *     \{ m: 'R', o: '6' \},
 *   ],
 *   firstLetter: 'separate',
 *   length: 4,
 *   pad: '0',
 * \});
 * phonetic('Robert', soundexConfig); // 'R163'
 *
 * @group Phonetic
 * @category Algorithm
 */
export function phonetic(input: StringLike, options: CompiledNonForkingPhonetic): string;

/**
 * Generates multiple phonetic encodings using configurable translation rules with forking.
 *
 * @remarks
 * The `options` parameter must be a compiled configuration object, created using {@link createAlgorithm}.
 * This ensures that scan rules are grouped by their first character for efficient lookup.
 *
 * @param input - The string-like value to encode phonetically
 * @param options - Compiled configuration options for the phonetic encoding (forking), created via {@link createAlgorithm}
 * @returns An array of all possible phonetically encoded strings
 *
 * @example
 * // With forking enabled, returns all possible encodings
 * import \{ createAlgorithm, phonetic \} from './phonetic.ts';
 *
 * const config = createAlgorithm(\{
 *   scan: [
 *     \{ m: 'C', o: ['S', 'K'] \},
 *     \{ m: 'TH', o: 'T' \},
 *     // ... other rules
 *   ],
 *   length: 4,
 *   forking: true,
 * \});
 * phonetic('Catherine', config); // ['KTRN', 'STRN']
 *
 * @group Phonetic
 * @category Algorithm
 */
export function phonetic(input: StringLike, options: CompiledForkingPhonetic): string[];

/**
 * Generates a phonetic encoding of the input string using configurable translation rules.
 *
 * This function processes text through multiple stages: case conversion, diacritic removal,
 * optional rule-based replacements, character-to-code translation, and final formatting.
 * It is used for implementing phonetic algorithms like Soundex, Metaphone, and custom rules.
 *
 * @remarks
 * The `options` parameter must be a compiled configuration object, created using {@link createAlgorithm}.
 * This ensures that scan rules are grouped by their first character for efficient lookup.
 *
 * @param word - The string-like value to encode phonetically
 * @param options - The compiled configuration object specifying translation, scanning, and formatting rules (see {@link createAlgorithm})
 * @returns The phonetic encoding as a string, or an array of strings if forking is enabled
 *
 * @example
 * // Simple uppercase conversion
 * phonetic('hello', createAlgorithm(\{\})); // 'HELLO'
 *
 * // With scan rules and padding
 * const config = createAlgorithm(\{
 *   scan: [
 *     \{ m: 'S', o: '2' \},
 *     \{ m: 'M', o: '3' \},
 *     \{ m: 'T', o: '7' \},
 *     \{ m: 'H', o: '8' \},
 *   ],
 *   length: 4,
 *   pad: '0',
 * \});
 * phonetic('Smith', config); // 'S378'
 *
 * // With forking
 * const forkConfig = createAlgorithm(\{
 *   scan: [
 *     \{ m: 'C', o: ['2', '3'] \},
 *     \{ m: 'A', o: '1' \},
 *   ],
 *   forking: true,
 * \});
 * phonetic('CA', forkConfig); // ['21', '31']
 *
 * @group Phonetic
 * @category Algorithm
 */
export function phonetic(
  word: StringLike,
  {
    convertCase: convert = 'upper',
    charSet = 'basic-latin',
    keep,
    padding = false,
    forking = false,
    preprocessRules,
    priorRules,
    firstLetter,
    prepareRules,
    notFound = 'reset',
    silentLetters = ['A', 'E', 'I', 'O', 'U', 'H', 'W', 'Y'],
    removeDuplicates = 'last',
    scan,
    pad,
    length = 0,
    laterRules,
    setQueries,
  }: CompiledPhonetic,
): string | readonly string[] {
  // eslint-disable-next-line no-multi-assign, @typescript-eslint/no-explicit-any
  const phoneticTrace: Scanner[] = ((globalThis as any).phoneticTrace = []);

  const queries: Set<string> = new Set();
  type PhoneticResult = { text: string; first?: string };
  let results: PhoneticResult[] = [];

  let text = toString(word);

  if (preprocessRules) {
    text = preprocessRules.reduce((t, { r, s }) => t.replaceAll(r, s), text);
  }

  text = convert === 'upper' ? text.toUpperCase() : text.toLowerCase();
  text = charSet === 'basic-latin' ? removeDiacritics(text) : text;
  text = text.replaceAll(/[\s\p{P}\p{S}]+/gv, space);
  text = (keep ? keepFn(text, keep) : text).trim();

  if (text.length === 0) {
    return forking === false ? '' : [];
  }

  if (setQueries) {
    for (const q of setQueries(text)) {
      queries.add(q);
    }
  }
  phoneticTrace.push({ m: Array.from(queries).join('; ') });

  if (priorRules) {
    text = priorRules.reduce((t, { r, s }) => t.replaceAll(r, s), text);
  }

  const primaryLetter = text.at(0) ?? empty;
  if (firstLetter === 'separate') {
    text = text.slice(1);
  }

  if (prepareRules) {
    text = prepareRules.reduce((t, { r, s }) => t.replaceAll(r, s), text);
  }

  const textLength = text.length;
  if (padding) {
    text += space;
  }

  if (scan) {
    type ScanResult = { text: string; last?: string };
    let scanResults: ScanResult[] = [];

    for (let i = 0; i < (typeof forking === 'boolean' ? 1 : forking); i++) {
      scanResults.push({ text: empty });
    }

    function row(rule: Scanner, index: number): boolean {
      const { m, i, n, ṅ, p, p1, p2, p3, ṗ, ṗ1, ṗ2, ṗ3, b, ḃ, e, ė, q } = rule;

      const nextIndex = index + m.length;
      const prevIndex = index;

      return (
        /* v8 ignore next 10 */
        (i == null ||
          (i === 'b' && index === 0) ||
          (i === 'B' && index !== 0) ||
          (i === 'm' && index !== 0 && index !== textLength - m.length) ||
          (i === 'M' && (index === 0 || index === textLength - m.length)) ||
          (i === 'e' && index === textLength - m.length) ||
          (i === 'E' && index !== textLength - m.length) ||
          (i === 'ḃ' && index === 1) ||
          (i === 'ė' && index === textLength - 1 - m.length)) &&
        text.startsWith(m, index) &&
        (!q || (q.startsWith('!') ? !queries.has(q.slice(1)) : queries.has(q))) &&
        (!n || ensureArray(n).some((s) => text.startsWith(s, nextIndex))) &&
        (!ṅ || ensureArray(ṅ).every((s) => !text.startsWith(s, nextIndex))) &&
        (!p || ensureArray(p).some((s) => text.endsWith(s, prevIndex))) &&
        (!p1 || ensureArray(p1).some((s) => text.endsWith(s, prevIndex - 1))) &&
        (!p2 || ensureArray(p2).some((s) => text.endsWith(s, prevIndex - 2))) &&
        (!p3 || ensureArray(p3).some((s) => text.endsWith(s, prevIndex - 3))) &&
        (!ṗ || ensureArray(ṗ).every((s) => !text.endsWith(s, prevIndex))) &&
        (!ṗ1 || ensureArray(ṗ1).every((s) => !text.endsWith(s, prevIndex - 1))) &&
        (!ṗ2 || ensureArray(ṗ2).every((s) => !text.endsWith(s, prevIndex - 2))) &&
        (!ṗ3 || ensureArray(ṗ3).every((s) => !text.endsWith(s, prevIndex - 3))) &&
        (!b || ensureArray(b).some((s) => text.startsWith(s))) &&
        (!ḃ || ensureArray(ḃ).every((s) => !text.startsWith(s))) &&
        (!e || ensureArray(e).some((s) => text.slice(0, textLength).endsWith(s))) &&
        (!ė || ensureArray(ė).every((s) => !text.slice(0, textLength).endsWith(s)))
      );
    }

    function appendToResults(results: ScanResult[], o: string): ScanResult[] {
      const last = removeDuplicates === 'full' ? o : o?.at(-1);

      for (const result of results) {
        let c = o;
        if (removeDuplicates === 'last') {
          while (result.last && c.startsWith(result.last)) {
            c = c.slice(result.last.length);
          }
        }

        if (removeDuplicates === 'full') {
          while (result.last && c === result.last) {
            c = empty;
          }
        }

        result.text += c.replaceAll('-', empty);
        result.last = last;
      }

      return results;
    }

    for (let i = 0; i < textLength; i++) {
      if (
        removeDuplicates === 'metaphone' &&
        i > 0 &&
        text.at(i) !== 'C' &&
        text.at(i) === text.at(i - 1)
      ) {
        continue;
      }

      let found = false;
      for (const rule of scan[text.at(i)!] ?? []) {
        if (row(rule, i)) {
          found = true;

          phoneticTrace.push(rule);
          const { m, l, o } = rule;

          if (o) {
            if (isString(o)) {
              appendToResults(scanResults, o);
            } else if (typeof forking === 'boolean') {
              const base = scanResults;
              const final: typeof scanResults = [];

              for (const oo of o) {
                final.push(...appendToResults(deepCopy(base), oo));
              }
              scanResults = final;
            } else {
              for (let i = 0; i < o.length; i++) {
                appendToResults([scanResults[i]], o[i]);
              }
            }
          }
          i += (l ?? m.length) - 1;
          break;
        }
      }
      if (!found) {
        phoneticTrace.push({ m: 'NOT FOUND' });
        if (notFound === 'reset') {
          appendToResults(scanResults, '-');
        }
      }
    }

    results = scanResults.map((s) => ({ ...s }));
  } else {
    results = [{ text }];
  }

  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (firstLetter) {
    case 'prefix': {
      for (const result of results) {
        result.text = primaryLetter + result.text;
      }
      break;
    }

    case 'replace': {
      for (const result of results) {
        result.text =
          silentLetters.includes(primaryLetter) ?
            primaryLetter + result.text
          : primaryLetter + result.text.slice(1);
      }
      break;
    }

    // no default
  }

  if (laterRules) {
    for (const result of results) {
      result.text = laterRules.reduce((t, { r, s }) => t.replaceAll(r, s), result.text);
    }
  }

  if (firstLetter === 'separate') {
    for (const result of results) {
      result.text = primaryLetter + result.text;
    }
  } else if (firstLetter === 'vowel') {
    for (const result of results) {
      if ('AEIOU'.includes(primaryLetter)) {
        result.text = primaryLetter + result.text.slice(result.text.at(0) === 'A' ? 1 : 0);
      }
    }
  }

  for (const result of results) {
    result.text =
      length > 0 ?
        (pad ? result.text.padEnd(length, pad) : result.text).slice(0, length)
      : result.text;
  }

  if (forking) {
    return typeof forking === 'boolean' ?
        unique(results.map((r) => r.text))
      : results.map((r) => r.text);
  }

  return results[0].text;
}
