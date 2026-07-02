import { type Flexible } from '../array/flexible.ts';
import { type KeepOptions } from '../string/keep.ts';

/**
 * Replacement rule for phonetic algorithms.
 *
 * Used to define a regular expression pattern and its replacement string for transforming input text during phonetic encoding.
 * Typically used in the `priorRules` and `laterRules` arrays of phonetic algorithm configurations.
 *
 * @example
 * // Replace 'PH' with 'F'
 * const rule: Replacer = \{ r: /PH/g, s: 'F' \};
 *
 * @group Phonetic
 * @category Algorithm
 */
export type Replacer = {
  /**
   * Regular expression pattern to match in the input string.
   */
  r: RegExp;
  /**
   * Replacement string to substitute for matches of the pattern.
   */
  s: string;
};

/**
 * Position indicator:
 * - 'b': only at the beginning of the string (index 0)
 * - 'ḃ': just after the beginning (index 1)
 * - 'B': not at the beginning (index \> 0)
 * - 'm': only in the middle (not at start or end)
 * - 'M': at the start or end (index 0 or last possible position)
 * - 'e': only at the end (last possible position)
 * - 'ė': almost the end (next to last position)
 * - 'E': not at the end (anywhere but last possible position)
 * - '1': at index 1 (second character)
 * @group Phonetic
 * @category Algorithm
 */
export type Position = 'b' | 'B' | 'm' | 'M' | 'e' | 'E' | 'ḃ' | 'ė';

/**
 * Substring-to-code translation rule for phonetic algorithms.
 *
 * Used to define how specific substrings or characters in the input are mapped to phonetic codes.
 * Typically used in the `scan` array of phonetic algorithm configurations.
 *
 * @example
 * // Map 'CH' at the beginning to 'X', 'C' to 'K'
 * const rules: Scanner[] = [
 *   \{ m: 'CH', i: 'b', o: 'X' \},
 *   \{ m: 'C', o: 'K' \},
 * ];
 *
 * @group Phonetic
 * @category Algorithm
 */
export type Scanner = {
  /**
   * The substring or character to match in the input.
   */
  m: string;
  /**
   * Length of the match to consume from the input string. If not specified, defaults to m.length.
   * Useful for multi-character matches or when the rule should consume a different number of characters than the pattern length.
   */
  l?: number;
  /**
   * Position indicator for the match. Restricts the rule to certain positions in the input string:
   */
  i?: Position;
  /**
   * Beginning-of-string character(s) required for the match to apply (positive lookahead at start).
   * Example: b: 'A' means the string must start with 'A'.
   */
  b?: Flexible<string>;
  /**
   * Beginning-of-string character(s) that must NOT be present for the match to apply (negative lookahead at start).
   * Example: ḃ: 'A' means the string must NOT start with 'A'.
   */
  ḃ?: Flexible<string>;
  /**
   * End-of-string character(s) required for the match to apply (positive lookahead at end).
   * Example: e: 'Z' means the string must end with 'Z'.
   */
  e?: Flexible<string>;
  /**
   * End-of-string character(s) that must NOT be present for the match to apply (negative lookahead at end).
   * Example: ė: 'Z' means the string must NOT end with 'Z'.
   */
  ė?: Flexible<string>;
  /**
   * Next character(s) required for the match to apply (positive lookahead).
   * Example: n: 'A' means the next character must be 'A'.
   */
  n?: Flexible<string>;
  /**
   * Next character(s) that must NOT be present for the match to apply (negative lookahead).
   * Example: ṅ: 'A' means the next character must NOT be 'A'.
   */
  ṅ?: Flexible<string>;
  /**
   * Previous character(s) required at the current position (offset 0) for the match to apply.
   * Example: p: 'A' means the character immediately before must be 'A'.
   */
  p?: Flexible<string>;
  /**
   * Previous character(s) required at offset -1 for the match to apply.
   */
  p1?: Flexible<string>;
  /**
   * Previous character(s) required at offset -2 for the match to apply.
   */
  p2?: Flexible<string>;
  /**
   * Previous character(s) required at offset -3 for the match to apply.
   */
  p3?: Flexible<string>;
  /**
   * Previous character(s) that must NOT be present at the current position (offset 0) for the match to apply (negative lookbehind).
   * Example: ṗ: 'A' means the character immediately before must NOT be 'A'.
   */
  ṗ?: Flexible<string>;
  /**
   * Previous character(s) that must NOT be present at offset -1 for the match to apply.
   */
  ṗ1?: Flexible<string>;
  /**
   * Previous character(s) that must NOT be present at offset -2 for the match to apply.
   */
  ṗ2?: Flexible<string>;
  /**
   * Previous character(s) that must NOT be present at offset -3 for the match to apply.
   */
  ṗ3?: Flexible<string>;
  /**
   * The output value for the match (may override x).
   */
  o?: Flexible<string>;
  /**
   * Query condition: restricts the rule to apply only if a certain context query is present (or absent) in the current set of queries.
   * If q starts with '!', the rule applies only if the query is NOT present. Otherwise, applies only if the query IS present.
   * Used for context-dependent or stateful phonetic rules.
   * Example: q: 'vowel' applies only if 'vowel' is in the current query set; q: '!start' applies only if 'start' is NOT in the query set.
   */
  q?: string;
};

/**
 * Base configuration for phonetic algorithms.
 *
 * Provides options for case conversion, normalization, duplicate removal, replacement rules, scan rules, and output formatting.
 *
 * @example
 * // Basic configuration with scan rules and padding
 * const config: BasePhonetic = \{
 *   scan: [\{ m: 'A', o: '1' \}],
 *   pad: '0',
 *   length: 4,
 * \};
 *
 * @group Phonetic
 * @category Algorithm
 */
export type BasePhonetic = {
  /**
   * Case conversion to apply to the input ('upper' or 'lower').
   */
  convertCase?: 'upper' | 'lower';
  /**
   * Character set normalization to apply before scanning.
   *
   * - 'basic-latin': Remove diacritics from Latin characters (e.g., é → E, ü → U).
   * - 'full-unicode': No diacritic removal; preserves all Unicode characters as-is.
   *
   * (Default: 'basic-latin')
   *
   * @remarks
   * If set to 'basic-latin', all diacritics are stripped from Latin characters, so 'café' becomes 'CAFE'.
   * If set to 'full-unicode', diacritics are preserved, so 'café' remains 'CAFÉ'.
   *
   * @example
   * phonetic('café', \{ charSet: 'basic-latin' \}); // 'CAFE'
   * phonetic('café', \{ charSet: 'full-unicode' \}); // 'CAFÉ'
   */
  charSet?: 'basic-latin' | 'full-unicode';
  /**
   * Strip all non-alphabetic characters
   */
  keep?: KeepOptions;
  /**
   * Strategy for removing duplicate characters ('last', 'metaphone', or 'none').
   */
  removeDuplicates?: 'last' | 'metaphone' | 'none' | 'full';
  /**
   * How to handle characters not found in the scan rules ('ignore' or 'notFound').
   */
  notFound?: 'ignore' | 'reset';
  /**
   * Padding
   */
  padding?: boolean;
  /**
   * How to preserve the first letter ('prefix', 'replace', 'separate', or 'vowel').
   */
  firstLetter?: 'prefix' | 'replace' | 'separate' | 'vowel';
  /**
   * Silent letters (used by firstLetter = 'replace').
   */
  silentLetters?: string[];
  /**
   * Character used for padding output to specified length.
   */
  pad?: string;
  /**
   * Desired output length (0 = no padding).
   */
  length?: number;
  /**
   * Replacement rules applied before any processing (see {@link Replacer}).
   */
  preprocessRules?: Replacer[];
  /**
   * Replacement rules applied before translation (see {@link Replacer}).
   */
  priorRules?: Replacer[];
  /**
   * Get rules that run before scanning and after first letter separation
   */
  prepareRules?: Replacer[];
  /**
   * Replacement rules applied after translation (see {@link Replacer}).
   */
  laterRules?: Replacer[];
  /**
   * Get the values for queries (q)
   */
  setQueries?: (text: string) => Iterable<string>;
};

/**
 * BasePhoneticAlgorithm extends BasePhonetic with an optional scan array.
 *
 * @example
 * const config: BasePhoneticAlgorithm = \{
 *   scan: [ \{ m: 'A', o: '1' \} ],
 *   pad: '0',
 *   length: 4,
 * \};
 *
 * @group Phonetic
 * @category Algorithm
 */
export type BasePhoneticAlgorithm = BasePhonetic & {
  /**
   * Array of scan rules for character/code translation.
   */
  scan?: Scanner[];
};

/**
 * Forking marker for forking phonetic algorithms.
 *
 * @group Phonetic
 * @category Algorithm
 */
export type Forking = {
  /**
   * If true or a number, enables forking (multiple possible encodings).
   */
  forking: true | number;
};

/**
 * Non-forking marker for phonetic algorithms.
 *
 * @group Phonetic
 * @category Algorithm
 */
export type NonForking = {
  /**
   * If false or omitted, disables forking (single encoding).
   */
  forking?: false;
};

/**
 * Configuration for a forking phonetic algorithm (multiple encodings).
 *
 * @group Phonetic
 * @category Algorithm
 */
export type ForkingPhoneticAlgorithm = BasePhoneticAlgorithm & Forking;

/**
 * Configuration for a non-forking phonetic algorithm (single encoding).
 *
 * @group Phonetic
 * @category Algorithm
 */
export type NonForkingPhoneticAlgorithm = BasePhoneticAlgorithm & NonForking;

/**
 * Union of forking and non-forking phonetic algorithm configurations.
 *
 * @group Phonetic
 * @category Algorithm
 */
export type PhoneticAlgorithm = ForkingPhoneticAlgorithm | NonForkingPhoneticAlgorithm;

/**
 * Base compiled phonetic configuration, with scan rules grouped by first character.
 *
 * @group Phonetic
 * @category Algorithm
 */
export type BaseCompiledPhonetic = BasePhonetic & {
  /**
   * Scan rules grouped by first character for efficient lookup.
   */
  scan?: Record<string, Scanner[]>;
};

/**
 * Compiled configuration for a non-forking phonetic algorithm.
 *
 * @group Phonetic
 * @category Algorithm
 */
export type CompiledNonForkingPhonetic = BaseCompiledPhonetic & NonForking;

/**
 * Compiled configuration for a forking phonetic algorithm.
 *
 * @group Phonetic
 * @category Algorithm
 */
export type CompiledForkingPhonetic = BaseCompiledPhonetic & Forking;

/**
 * Union of compiled forking and non-forking phonetic configurations.
 *
 * @group Phonetic
 * @category Algorithm
 */
export type CompiledPhonetic = CompiledForkingPhonetic | CompiledNonForkingPhonetic;

/**
 * Compiles a forking phonetic algorithm configuration
 * @param options - The phonetic algorithm configuration to process and group.
 * @returns The compiled configuration object, with scan rules grouped for optimal matching.
 *
 * @example
 * // Groups scan rules by first character
 * const config = \{ forking: true, scan: [ \{ m: 'CH', i: 'b', o: 'X' \}, \{ m: 'C', o: 'K' \} ] \};
 * const compiled = createAlgorithm(config);
 * // compiled.scan['C'] contains both rules
 */
export function createAlgorithm(options: ForkingPhoneticAlgorithm): CompiledForkingPhonetic;
/**
 * Compiles a phonetic algorithm configuration, grouping scan rules by their first character for efficient lookup.
 *
 * If a `scan` array is present, it is transformed into an object where each key is the first character of a rule's `m` property,
 * and the value is an array of all rules starting with that character. All other properties are preserved.
 *
 * @param options - The phonetic algorithm configuration to process and group.
 * @returns The compiled configuration object, with scan rules grouped for optimal matching.
 *
 * @example
 * // Groups scan rules by first character
 * const config = \{ scan: [ \{ m: 'CH', i: 'b', o: 'X' \}, \{ m: 'C', o: 'K' \} ] \};
 * const compiled = createAlgorithm(config);
 * // compiled.scan['C'] contains both rules
 */
export function createAlgorithm(options: NonForkingPhoneticAlgorithm): CompiledNonForkingPhonetic;
/**
 * Compiles a phonetic algorithm configuration.
 *
 * If a `scan` array is present, it is transformed into an object where each key is the first character of a rule's `m` property,
 * and the value is an array of all rules starting with that character. All other properties are preserved.
 * @group Phonetic
 * @category Algorithm
 */
export function createAlgorithm(options: PhoneticAlgorithm): CompiledPhonetic {
  const { scan, ...rest } = options;
  const compiled: CompiledPhonetic = rest;

  if (scan) {
    const grouped = Object.groupBy(scan, ({ m }) => m.slice(0, 1));
    compiled.scan = {};

    for (const [key, rules] of Object.entries(grouped)) {
      if (rules) {
        compiled.scan[key] = rules;
      }
    }
  }

  return compiled;
}
