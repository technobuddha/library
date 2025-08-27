import { toString } from './to-string.ts';
import { empty, space } from './unicode.ts';

/**
 * Options for creating a coordinated list with {@link conjoin}
 *
 * @group English
 * @category Parts of Speech
 */
export type ConjoinOptions = {
  /**
   * Conjunction to insert in the last position
   * @defaultValue 'and'
   */
  conjunction?: string;
  /**
   * If true, use the oxford comma
   * @defaultValue true
   */
  oxford?: boolean;
  /**
   * String used to separate values
   * @defaultValue ','
   */
  separator?: string;
};

// cspell:ignore Nederlander
/**
 * Create a list from an array, separating values and inserting a conjunction
 *
 * @param input - Array of values
 * @param options - see {@link ConjoinOptions}
 * @example
 * ```typescript
 * const stooges = ['Larry', 'Moe', 'Curly'];
 * conjoin(stooges);
 * // 'Larry, Moe, and Curly'
 * ```
 * ```typescript
 * const amigos = ['Lucky Day', 'Dusty Bottoms', 'Ned Nederlander'];
 * conjoin(amigos, { conjunction: 'or', oxford: false, separator: ';' });
 * // 'Lucky Day; Dusty Bottoms or Ned Nederlander'
 * ```
 * @group English
 * @category Parts of Speech
 */
export function conjoin<T = unknown>(
  input: ArrayLike<T>,
  { conjunction = 'and', oxford = true, separator = ',' }: ConjoinOptions = {},
): string {
  if (input.length > 0) {
    let text = toString(input[0]);

    let i = 1;
    for (; i < input.length - 1; i++) {
      text += separator + space + toString(input[i]);
    }

    if (input.length > 1) {
      text +=
        (oxford && input.length > 2 ? separator : empty) +
        space +
        conjunction +
        space +
        toString(input[i]);
    }

    return text;
  }
  return empty;
}
