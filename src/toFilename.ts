import { escapeRegExp } from 'lodash-es';

import clean from './clean';
import collapseWhitespace from './collapseWhitespace';
import { empty } from './constants';

const badChars = /[/\\:*?<>|.]+/gu;

export type Options = {
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
 * @param input The string to escape
 * @param __namedParameters see {@link Options}
 * @default maxLength 64
 * @default replacement - (dash)
 * @default disambiguate 10
 * @default separator … (ellipsis)
 * @returns the file name
 */
export function toFilename(
  input: string,
  { maxLength = 64, replacement = '-', disambiguate = 10, separator = '…' }: Options = {},
): string {
  let suffix = empty;
  const compress = new RegExp(
    `\\s*${escapeRegExp(replacement)}[\\s${escapeRegExp(replacement)}]*`,
    'ug',
  );

  let filename = clean(
    collapseWhitespace(
      input.normalize('NFC').replaceAll('"', "'").replaceAll(badChars, replacement),
    ).replaceAll(compress, replacement),
    replacement,
  );

  if (suffix.length === 0 && filename.length > maxLength) {
    suffix = filename.slice(-disambiguate);
    filename = filename.slice(0, Math.max(0, filename.length - suffix.length));
  }

  if (suffix.length > maxLength) suffix = suffix.slice(0, Math.max(0, maxLength));

  const length = maxLength - suffix.length;

  if (filename.length > length) filename = filename.slice(0, Math.max(0, length));

  if (filename.length === 0) filename = replacement;

  if (suffix.length > 0) return filename + separator + suffix;
  return filename;
}

export default toFilename;
