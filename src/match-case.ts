import { capitalize } from './capitalize.ts';
import { empty } from './constants.ts';
import { isUpperCase } from './is-upper-case.ts';

// cspell: ignore Capitalcase sMALLCASE
/**
 * Attempt to convert the input string into the same case as the target string
 *
 * @remarks The best guess is made to try to figure out what case the target is in:
 *  * lowercase
 *  * UPPERCASE
 *  * Capitalcase
 *  * PascalCase
 *
 * @param input - The input string
 * @param target - The target string
 * @returns The input in the case case as the target string
 * @group String
 * @category Case Conversion
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
