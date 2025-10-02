import { escapeRegExp } from '../escape/escape-regexp.ts';
import { escapeRegExpCharacterClass } from '../escape/escape-regexp-character-class.ts';
import { clean } from '../string/clean.ts';
import { collapseWhitespace } from '../string/collapse-whitespace.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { empty, space } from '../unicode/unicode.ts';

/**
 * Regular expression matching one or more invalid filename characters.
 * @internal
 */
const badChars = /[\/\\:*?<>\|.]+/gv;

/**
 * Options for the {@link toFilename} function
 * @group File System
 * @category Filename
 */
export type ToFilenameOptions = {
  /** the file name will be truncated to this length */
  maxLength?: number;
  /** character to use to replace "bad" characters */
  replacement?: string;
  /** number of characters to preserve at the end of the filename when truncated (for disambiguation) */
  disambiguate?: number;
  /** string to separate the main section from the disambiguated section */
  separator?: string;
  /** Whether to allow spaces */
  spaces?: boolean;
};

/**
 * Converts a string into a safe filename by replacing or removing invalid characters, collapsing whitespace, and optionally truncating.
 *
 * @param input - The string to convert to a filename.
 * @param options - Options to control filename formatting. See {@link ToFilenameOptions}.
 * @returns The sanitized filename string.
 * @group File System
 * @category Filename
 * @example
 * 'my-illegal-file-name-.txt' = toFilename('my:illegal/file*name?.txt')
 * @example
 * 'a-very-lo…name' = toFilename('a very long filename that should be truncated', maxLength: 10)
 * @example
 * 'spaces_and-dashes' = toFilename('spaces   and---dashes', replacement: '_')
 */
export function toFilename(
  input: StringLike,
  {
    maxLength = 64,
    replacement = '-',
    disambiguate = 10,
    separator = '…',
    spaces = true,
  }: ToFilenameOptions = {},
): string {
  let text = toString(input);
  let suffix = empty;
  const compress = new RegExp(
    `\\s*${escapeRegExp(replacement)}[\\s${escapeRegExpCharacterClass(replacement)}]*`,
    'vg',
  );

  text = collapseWhitespace(
    text.normalize('NFC').replaceAll('"', "'").replaceAll(badChars, replacement),
  );

  if (!spaces) {
    text = text.replaceAll(space, replacement);
  }

  text = clean(text.replaceAll(compress, replacement), replacement);

  if (suffix.length === 0 && text.length > maxLength) {
    suffix = text.slice(-disambiguate);
    text = text.slice(0, Math.max(0, text.length - suffix.length));
  }

  if (suffix.length > maxLength) {
    suffix = suffix.slice(0, Math.max(0, maxLength));
  }

  const length = maxLength - suffix.length;

  if (text.length > length) {
    text = text.slice(0, Math.max(0, length));
  }

  if (text.length === 0) {
    text = replacement;
  }

  if (suffix.length > 0) {
    return text + separator + suffix;
  }
  return text;
}
