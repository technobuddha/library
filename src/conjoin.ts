import { toString } from 'lodash-es';

import { empty, space } from './constants.ts';

/**
 * Options for creating a coordinate string
 *
 * @group English
 * @category Parts of Speech
 */
export type ConjoinCoordinateOptions = {
  /** Conjunction to insert in the last position (default 'and') */
  conjunction?: string;
  /** If true, use the oxford comma */
  oxford?: boolean;
  /** String used to separate values (default ',') */
  separator?: string;
};

/**
 * Create a string from an array, separating values and inserting a conjunction
 *
 * @param input - Array of values
 * @param options - see {@link ConjoinCoordinateOptions}
 * @group English
 * @category Parts of Speech
 */
export function conjoin<T = unknown>(
  input: ArrayLike<T>,
  { conjunction = 'and', oxford = true, separator = ',' }: ConjoinCoordinateOptions = {},
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
