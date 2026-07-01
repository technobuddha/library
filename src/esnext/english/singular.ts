import { database } from '../@data/pluralization.ts';
import { matchCase } from '../case-conversion/match-case.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { empty } from '../unicode/unicode.ts';

/**
 * Attempts to invert plural rules from the database by swapping suffixes in the regex and replacement.
 * Returns an array of invertible rules and logs rules that cannot be inverted by simple suffix swap.
 *
 * @internal
 * @remarks
 * This function is used to automate the reversal of pluralization rules for singularization. See AGENTS.md for documentation and limitations.
 */
export function generateSingularRulesFromPlural(): [RegExp, string][] {
  const invertible: [RegExp, string][] = [];
  for (const [regex, replacement] of database.rules) {
    const regexStr = regex.source;
    // Reverse simple irregulars: /child$/iv, 'children' => /children$/iv, 'child'
    if (/^[a-z]+\$/v.test(regexStr) && /^[a-z]+$/v.test(replacement)) {
      const singularPattern = new RegExp(`${replacement}$`, 'vi');
      invertible.push([singularPattern, regexStr.replace(/\$/v, '')]);
      continue;
    }
    // Generic reversal for /(group)suffix$/iv, '$1otherSuffix' <-> /(group)otherSuffix$/iv, '$1suffix'
    const groupMatch = /\(([^\)]+)\)([a-z]+)\$/v.exec(regexStr);
    const replMatch = /^\$1([a-z]+)$/v.exec(replacement);
    if (groupMatch && replMatch) {
      invertible.push([
        new RegExp(`(${groupMatch[1]})${replMatch[1]}$`, 'vi'),
        `$1${groupMatch[2]}`,
      ]);
    }
  }
  return invertible;
}

/**
 * @remarks
 * Reversing pluralization rules to obtain singular forms is not always possible or reliable.
 * Most plural rules are handled generically via automated inversion and the irregulars map.
 * Only truly ambiguous cases (such as 'themself'/'themselves') require explicit exceptions in singularRules.
 * @internal
 */
const irregularsReverse: Record<string, string> = Object.entries(database.irregulars).reduce<
  Record<string, string>
>((acc, [singular, plural]) => {
  acc[plural] = singular;
  return acc;
}, {});

// Only truly ambiguous cases require explicit exceptions
const singularRules: [RegExp, string][] = [
  [/themselves$/iv, 'themself'], // handle reflexive pronoun exception
];

/**
 * Return the singular version of the input string
 *
 * Attempts to reverse pluralization rules and applies explicit exceptions only for truly ambiguous cases.
 * Most singular forms are derived generically via automated rule inversion and the irregulars map.
 *
 * @param word - The word to singularize
 * @returns The singular form of the input
 * @example
 * ```typescript
 * singular('cats'); // cat
 * singular('mice'); // mouse
 * singular('children'); // child
 * singular('dogs'); // dog
 * singular('geese'); // goose
 * singular('feet'); // foot
 * singular('people'); // person
 * singular('themselves'); // themself
 * ```
 * @group English
 * @category Numbering
 */
export function singular(word: StringLike): string {
  const input = toString(word);
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

  // Reverse irregulars
  if (!result && Object.hasOwn(irregularsReverse, lc)) {
    result = matchCase(prefix + irregularsReverse[lc] + suffix, input);
  }

  if (!result) {
    for (const v of database.uncountableRules) {
      if (v.test(lc)) {
        result = matchCase(prefix + lc + suffix, input);
        break;
      }
    }
  }

  // Apply explicit singular rules first
  if (!result) {
    for (const [pluralPattern, singularReplacement] of singularRules) {
      if (pluralPattern.test(lc)) {
        result = matchCase(prefix + lc.replace(pluralPattern, singularReplacement) + suffix, input);
        break;
      }
    }
    // Apply all generated reversible rules
    if (!result) {
      for (const [pattern, replacement] of generateSingularRulesFromPlural()) {
        if (pattern.test(lc)) {
          result = matchCase(prefix + lc.replace(pattern, replacement) + suffix, input);
          break;
        }
      }
    }
  }

  // Fallback: remove trailing 's' if present, not uncountable, not 'ss', and word length > 2
  return (
    result ??
    ((
      lc.endsWith('s') &&
      !database.uncountableWords.includes(lc) &&
      !lc.endsWith('ss') &&
      lc.length > 2
    ) ?
      matchCase(prefix + lc.slice(0, -1) + suffix, input)
    : matchCase(prefix + lc + suffix, input))
  );
}
