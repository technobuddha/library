import { space } from './constants.js';
import { splitChars } from './split-chars.js';

export type MaskOptions = {
  /** if the mask is longer, fill with character */
  missing?: string;
};

const tokenizer = /\\#|#|./gu;

/**
 * Use a simple mask to display a string
 *
 * @remarks The simple mask is a string where '#' characters are replaced by characters from the input string.  Other characters in the mask
 * are output as-is, to output a '#' use '\#'
 *
 * @param input - The string
 * @param simpleMask - The mask
 * @param __namedParameters - see {@link MaskOptions}
 * @defaultValue missing space
 * @returns The mask filled with characters from the string
 */
export function mask(
  input: string,
  simpleMask: string,
  { missing = space }: MaskOptions = {},
): string {
  const chars = splitChars(input);
  let index = 0;

  return simpleMask.replaceAll(tokenizer, (token) =>
    token === '\\#' ? '#'
    : token === '#' ? (chars[index++] ?? missing)
    : token,
  );
}
