export type CountOptions = {
  /** if true, counts overlapping strings */
  overlap?: boolean;
};

/**
 * Compute the number of times a substring occurs within a string
 *
 * @param input - The string
 * @param substring - The substring to look for
 * @param __namedParameters - see {@link CountOptions}
 * @returns number of times *substring* occurs within *input*
 */
export function count(
  input: string,
  substring: string,
  { overlap = false }: CountOptions = {},
): number {
  const step = overlap ? 1 : substring.length;
  let cnt = 0;
  let pos = 0;

  while ((pos = input.indexOf(substring, pos)) >= 0) {
    cnt++;
    pos += step;
  }

  return cnt;
}
