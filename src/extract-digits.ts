import { empty } from './constants';

/**
 * Remove all non-digit characters from a string
 *
 * @param input The string
 * @returns digits from the string
 */
export function extractDigits(input: string): string {
  return input.replaceAll(/\D/gu, empty);
}

export default extractDigits;
