/**
 * Generates a range of numbers between start and end values with an optional step.
 *
 * @param start - The starting number value
 * @param end - The ending number value
 * @param step - The increment/decrement step (defaults to 1 for ascending, -1 for descending)
 * @returns Array of numbers from start to end (inclusive)
 */
export function range(start: number, end: number, step?: number): Generator<number>;

/**
 * Generates a range of bigint values between start and end values with an optional step.
 *
 * @param start - The starting bigint value
 * @param end - The ending bigint value
 * @param step - The increment/decrement step (defaults to 1n for ascending, -1n for descending)
 * @returns Array of bigint values from start to end (inclusive)
 */
export function range(start: bigint, end: bigint, step?: bigint): Generator<bigint>;

/**
 * Generates a range of single character strings between start and end characters.
 *
 * @param start - The starting single character string
 * @param end - The ending single character string
 * @returns Array of character strings from start to end (inclusive) based on Unicode code points
 */
export function range(start: string, end: string): Generator<string>;

/**
 * Generates a range of values between start and end with optional step increment.
 *
 * This function supports three data types:
 * - Numbers: Creates numeric ranges with customizable step values
 * - BigInts: Creates bigint ranges for large integer values
 * - Strings: Creates character ranges based on Unicode code points (single characters only)
 *
 * For numeric and bigint ranges:
 * - If end \> start, the range ascends (default step: 1)
 * - If end \< start, the range descends (default step: -1)
 * - Custom step values must have correct sign for the direction
 *
 * For string ranges:
 * - Only single character strings are supported
 * - Range is based on Unicode code point values
 * - Step parameter is not supported for strings
 *
 * @example
 * ```typescript
 * // Number ranges
 * range(1, 5)        // [1, 2, 3, 4, 5]
 * range(5, 1)        // [5, 4, 3, 2, 1]
 * range(0, 10, 2)    // [0, 2, 4, 6, 8, 10]
 * range(10, 0, -3)   // [10, 7, 4, 1]
 *
 * // BigInt ranges
 * range(1n, 5n)      // [1n, 2n, 3n, 4n, 5n]
 * range(10n, 5n, -2n) // [10n, 8n, 6n]
 *
 * // Character ranges
 * range('a', 'e')    // ['a', 'b', 'c', 'd', 'e']
 * range('Z', 'X')    // ['Z', 'Y', 'X']
 * range('0', '5')    // ['0', '1', '2', '3', '4', '5']
 *
 * // Invalid cases return empty array
 * range(1, 5, -1)    // [] (wrong step direction)
 * range(5, 1, 1)     // [] (wrong step direction)
 * range('ab', 'cd')  // [] (multi-character strings not supported)
 * ```
 *
 * @group Array
 * @category Construction
 */
export function* range(
  start: number | bigint | string,
  end: number | bigint | string,
  step?: number | bigint,
): Generator<number | bigint | string> {
  if (typeof start === 'number' && typeof end === 'number') {
    if (end > start) {
      const inc = Number(step ?? 1);
      if (inc > 0) {
        for (let i = start; i <= end; i += inc) {
          yield i;
        }
      }
    } else {
      const dec = Number(step ?? -1);
      if (dec < 0) {
        for (let i = start; i >= end; i += dec) {
          yield i;
        }
      }
    }
  } else if (typeof start === 'bigint' && typeof end === 'bigint') {
    if (end > start) {
      const inc = BigInt(step ?? 1);
      if (inc > 0) {
        for (let i = start; i <= end; i += inc) {
          yield i;
        }
      }
    } else {
      const dec = BigInt(step ?? -1);
      if (dec < 0) {
        for (let i = start; i >= end; i += dec) {
          yield i;
        }
      }
    }
  } else if (
    typeof start === 'string' &&
    typeof end === 'string' &&
    start.length === 1 &&
    end.length === 1
  ) {
    const s = start.codePointAt(0)!;
    const e = end.codePointAt(0)!;
    if (e > s) {
      for (let i = s; i <= e; ++i) {
        yield String.fromCodePoint(i);
      }
      return;
    }
    for (let i = s; i >= e; --i) {
      yield String.fromCodePoint(i);
    }
  }
}
