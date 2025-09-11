const re = /^(\p{P})+$/u;

/**
 * Test a string for all punctuation characters
 * @param input - string to test
 * @returns true, if all characters in the string are punctuation
 * @group String
 * @category Categorization
 */
export function isPunctuation(input: string): boolean {
  return re.test(input);
}
