import { matches } from '../regexp/matches.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Convert a string to a numeric value
 * @param input - The string to convert
 * @param tests - Array of tests (string value or regular expressions)
 * @returns The index of the first test to match the input string
 * @group Number
 * @category Conversion
 */
export function toEnumeration(
  input: StringLike,
  ...tests: (Iterable<string | RegExp> | string | RegExp)[]
): number | undefined {
  const value = toString(input);

  for (let i = 0; i < tests.length; ++i) {
    if (matches(value, tests[i])) {
      return i;
    }
  }

  return undefined;
}
