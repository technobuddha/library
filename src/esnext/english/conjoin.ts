import { type List } from '../array/list.ts';
import { toArray } from '../array/to-array.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { empty, space } from '../unicode/unicode.ts';

/**
 * Options for creating a coordinated list with {@link conjoin}
 * @group English
 * @category Conjunctions
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
/**
 * Create a list from an array, separating values and inserting a conjunction
 * @param list - Array of values
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
 * @category Conjunctions
 */
export function conjoin(
  list: StringLike | List<StringLike>,
  { conjunction = 'and', oxford = true, separator = ',' }: ConjoinOptions = {},
): string {
  const array = toArray(list).map((item) => toString(item));

  if (array.length > 0) {
    let [text] = array;

    let i = 1;
    for (; i < array.length - 1; i++) {
      text += separator + space + array[i];
    }

    if (array.length > 1) {
      text +=
        (oxford && array.length > 2 ? separator : empty) + space + conjunction + space + array[i];
    }

    return text;
  }
  return empty;
}
