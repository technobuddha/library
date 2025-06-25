import { matches } from './matches.ts';

/**
 * Convert a string to a numeric value
 *
 * @param input - The string to convert
 * @param tests - Array of tests (string value or regular expressions)
 * @returns The index of the first test to match the input string
 * @group String
 * @category Conversion
 */
export function toEnumeration(
  input: string,
  ...tests: (Iterable<string | RegExp> | string | RegExp)[]
): number | undefined {
  for (let i = 0; i < tests.length; ++i) {
    if (matches(input, tests[i])) {
      return i;
    }
  }

  return undefined;
}
