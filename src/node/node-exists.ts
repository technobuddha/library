import fs from 'node:fs/promises';

import { toPath } from './to-path.ts';

/**
 * Checks if a file or directory exists at the specified path.
 *
 * @param filePath - The path to check for existence. Can be a string path or URL object.
 * @returns A promise that resolves to `true` if the file/directory exists, `false` otherwise.
 *
 * @group File System
 * @category Existence
 *
 * @example
 * ```typescript
 * // Check if a file exists
 * const exists = await nodeExists('./package.json');
 * console.log(exists); // true or false
 *
 * // Check with URL
 * const url = new URL('file:///home/user/file.txt');
 * const urlExists = await nodeExists(url);
 * ```
 */
export async function nodeExists(filePath: string | URL): Promise<boolean> {
  const pathName = toPath(filePath);
  return fs
    .stat(pathName)
    .then(() => true)
    .catch(() => false);
}
