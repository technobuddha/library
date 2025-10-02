import { splitChars } from '../tokenization/split-chars.ts';
import { space } from '../unicode/unicode.ts';

import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Options for the {@link mask} function
 * @group String
 * @category Template
 */
export type MaskOptions = {
  /** if the mask is longer, fill with character */
  missing?: string;
};

const tokenizer = /\\#|#|./gv;

/**
 * Use a simple mask to display a string
 * @remarks The simple mask is a string where '#' characters are replaced by characters from the input string.  Other characters in the mask
 * are output as-is, to output a '#' use '\#'
 * @param input - The string
 * @param simpleMask - The mask
 * @param options - see {@link MaskOptions}
 * @defaultValue missing space
 * @returns The mask filled with characters from the string
 * @group String
 * @category Template
 */
export function mask(
  input: StringLike,
  simpleMask: StringLike,
  { missing = space }: MaskOptions = {},
): string {
  const chars = splitChars(input);
  let index = 0;

  return toString(simpleMask).replaceAll(tokenizer, (token) =>
    token === '\\#' ? '#'
    : token === '#' ? (chars[index++] ?? missing)
    : token,
  );
}
