import path from 'node:path';

import { empty } from '../esnext/unicode/unicode.ts';

/**
 * Replaces the file extension of a given file path with a new extension.
 *
 * Takes a file path and replaces its extension with the provided new extension.
 * If no new extension is provided, the extension is removed entirely.
 *
 * @param filePath - The file path whose extension should be replaced
 * @param ext - The new extension to use (defaults to empty string to remove extension)
 * @returns The file path with the new extension
 *
 * @example
 * ```typescript
 * replaceExtension('/path/to/file.txt', '.js'); // returns '/path/to/file.js'
 * replaceExtension('/path/to/file.txt', 'html'); // returns '/path/to/file.html'
 * replaceExtension('/path/to/file.txt'); // returns '/path/to/file' (removes extension)
 * replaceExtension('document.pdf', '.docx'); // returns 'document.docx'
 * ```
 *
 * @group File System
 * @category Filename
 */
export function replaceExtension(filePath: string, ext: string = empty): string {
  const { dir, name } = path.parse(filePath);
  return path.format({ dir, name, ext });
}
