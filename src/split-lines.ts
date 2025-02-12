import { empty } from './constants.js';

/**
 * Split a string into an array of lines
 *
 * @param input - The string to split
 * @returns array of lines
 * @group String
 * @category Split
 */
export function splitLines(input: string): string[] {
  if (input === empty) {
    return [];
  }
  return input.split(/\r\n|\n\r|\r|\n|\0/u);
}
