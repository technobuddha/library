import { empty } from './constants.js';

/**
 * Insert a substring into a string
 *
 * @param input - The string
 * @param start - The position which to insert the substring
 * @param deleteCount - The number of characters to delete
 * @param items - The substring(s) to insert
 * @returns The modified strings
 */
export function splice(
  input: string,
  start: number,
  deleteCount: number,
  ...items: string[]
): string {
  let s = start;

  if (s < 0) {
    s = input.length + s + 1;
    if (s < 0) {
      s = 0;
    }
  }

  return input.slice(0, s) + items.join(empty) + input.slice(s + Math.max(deleteCount, 0));
}
