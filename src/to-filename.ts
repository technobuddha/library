import { clean } from './clean.ts';
import { collapseWhitespace } from './collapse-whitespace.ts';
import { empty } from './unicode.ts';

/**
 * Regular expression matching one or more invalid filename characters.
 * @internal
 */
const badChars = /[/\\:*?<>|.]+/gu;

/**
 * Options for the {@link toFilename} function
 * @group String
 * @category Conversion
 */
export type FilenameOptions = {
  /** the file name will be truncated to this length */
  maxLength?: number;
  /** character to use to replace "bad" characters */
  replacement?: string;
  /** number of characters to preserve at the end of the filename when truncated (for disambiguation) */
  disambiguate?: number;
  /** string to separate the main section from the disambiguated section */
  separator?: string;
};

/**
 * Convert a string so that it can be used as a filename
 * @param input - The string to escape
 * @param options - see {@link FilenameOptions}
 * @returns the file name
 * @group String
 * @category Conversion
 */
export function toFilename(
  input: string,
  { maxLength = 64, replacement = '-', disambiguate = 10, separator = '…' }: FilenameOptions = {},
): string {
  let argInput = input;
  let suffix = empty;
  const compress = new RegExp(
    `\\s*${RegExp.escape(replacement)}[\\s${RegExp.escape(replacement)}]*`,
    'ug',
  );

  argInput = clean(
    collapseWhitespace(
      argInput.normalize('NFC').replaceAll('"', "'").replaceAll(badChars, replacement),
    ).replaceAll(compress, replacement),
    replacement,
  );

  if (suffix.length === 0 && argInput.length > maxLength) {
    suffix = argInput.slice(-disambiguate);
    argInput = argInput.slice(0, Math.max(0, argInput.length - suffix.length));
  }

  if (suffix.length > maxLength) {
    suffix = suffix.slice(0, Math.max(0, maxLength));
  }

  const length = maxLength - suffix.length;

  if (argInput.length > length) {
    argInput = argInput.slice(0, Math.max(0, length));
  }

  if (argInput.length === 0) {
    argInput = replacement;
  }

  if (suffix.length > 0) {
    return argInput + separator + suffix;
  }
  return argInput;
}
