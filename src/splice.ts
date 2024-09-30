import { empty } from './constants';

/**
 * Insert a substring into a string
 *
 * @param input The string
 * @param start The position which to insert the substring
 * @param deleteCount The number of characters to delete
 * @param items The substring(s) to insert
 * @returns The modified strings
 */
export function splice(
  input: string,
  start: number,
  deleteCount: number,
  ...items: string[]
): string {
  let begin = start;

  if (start < 0) {
    begin = input.length + begin + 1;
    if (begin < 0) begin = 0;
  }

  return (
    input.slice(0, begin) +
    items.join(empty) +
    input.slice(begin + (deleteCount < 0 ? 0 : deleteCount))
  );
}

export default splice;
