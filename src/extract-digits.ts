import { empty } from './constants.js';

/**
 * Remove all non-digit characters from a string
 *
 * @param input - The string
 * @returns digits from the string
 * @group String
 * @category Extraction
 */
export function extractDigits(input: string): string {
  return input.replaceAll(/\D/gu, empty);
}
