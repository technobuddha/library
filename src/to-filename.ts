import { escapeRegExp } from 'lodash-es';

import { clean } from './clean.js';
import { collapseWhitespace } from './collapse-whitespace.js';
import { empty } from './constants.js';

const badChars = /[/\\:*?<>|.]+/gu;

/**
 * @group String
 * @category Conversion
 */
export type ToFilenameOptions = {
  /** the file name will be truncated to this length */
  maxLength?: number;
  /** character to use to replace "bad" characters */
  replacement?: string;
  /** number of characters to presere at the end of the filename when truncated (for disambiguation) */
  disambiguate?: number;
  /** string to separate the main section from the disambiguated section */
  separator?: string;
};

/**
 * Convert a string so that it can be used as a filename
 *
 * @param input - The string to escape
 * @param __namedParameters - see {@link ToFilenameOptions}
 * @returns the file name
 * @group String
 * @category Conversion
 */
export function toFilename(
  input: string,
  { maxLength = 64, replacement = '-', disambiguate = 10, separator = '…' }: ToFilenameOptions = {},
): string {
  let argInput = input;
  let suffix = empty;
  const compress = new RegExp(
    `\\s*${escapeRegExp(replacement)}[\\s${escapeRegExp(replacement)}]*`,
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
