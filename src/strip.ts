import { ansiEscapes } from './regexp.ts';
import { empty } from './unicode.ts';

/**
 * Options for stripping unwanted characters or sequences from strings.
 */
export type StripOptions = {
  /**
   * If true, ANSI escape codes will be removed from the string.
   */
  ansiEscape?: boolean;
};

/**
 * Removes unwanted sequences from the input string.
 *
 * By default, this function strips ANSI escape codes from the input string.
 *
 * @param input - The string to be processed.
 * @param options - Options to control what is stripped.  see {@link StripOptions}.
 * @returns The processed string with specified sequences removed.
 */
export function strip(input: string, { ansiEscape = true }: StripOptions = {}): string {
  let output = input;

  if (ansiEscape) {
    output = output.replaceAll(ansiEscapes, empty);
  }

  return output;
}
