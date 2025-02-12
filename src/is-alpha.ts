const reAlpha = /^\p{L}+$/u;

/**
 * Test a string for all alphaetic characters
 *
 * @param input - string to test
 * @returns true, if all characters in the string are alphabetic
 * @group String
 * @category Categorization
 */
export function isAlpha(input: string): boolean {
  return reAlpha.test(input);
}
