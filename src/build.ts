import { collapse } from './collapse.ts';
import { empty } from './unicode.ts';

/**
 * Concatenates strings and/or arrays of strings
 *
 * @param args - Concatenates a list of strings, string arrays, or functions that return a string or string array.
 * @returns The concatenation of *args*.
 * @group String
 * @category Build
 */
export function build(...args: Parameters<typeof collapse<string>>): string {
  return collapse(...args).join(empty);
}
