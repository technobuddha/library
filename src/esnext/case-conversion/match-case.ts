import { isUpperCase } from '../unicode/is-upper-case.ts';
import { empty } from '../unicode/unicode.ts';

import { capitalize } from './capitalize.ts';
/**
 * Attempt to convert the input string into the same case as the target string
 * @remarks The best guess is made to try to figure out what case the target is in:
 *  * lowercase
 *  * UPPERCASE
 *  * Capitalcase
 *  * PascalCase
 * @param input - The input string
 * @param target - The target string
 * @returns The input in the case case as the target string
 * @group Case Conversion
 * @category Matching
 */
export function matchCase(input: string, target: string): string {
  if (target === empty) {
    return input;
  }
  if (input === empty) {
    return empty;
  }

  if (isUpperCase(target)) {
    return input.toLocaleUpperCase();
  } else if (isUpperCase(target[0])) {
    return capitalize(input.toLocaleLowerCase());
  }
  return input.toLocaleLowerCase();
}
