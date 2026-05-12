import fs from 'node:fs/promises';

import { toPath } from './to-path.ts';

/**
 * Checks if a directory exists at the specified path.
 *
 * @param filePath - The path to check for existence. Can be a string path or URL object.
 * @returns A promise that resolves to `true` if a directory exists at the path, `false` otherwise.
 *
 * @example
 * ```typescript
 * // Check if a directory exists
 * const exists = await directoryExists('./src');
 * console.log(exists); // true or false
 *
 * // Check with URL
 * const url = new URL('file:///home/user/documents');
 * const dirExists = await directoryExists(url);
 * ```
 * @group File System
 * @category Existence
 */
export async function directoryExists(filePath: string | URL): Promise<boolean> {
  const pathName = toPath(filePath);
  return fs
    .stat(pathName)
    .then((s) => s.isDirectory())
    .catch(() => false);
}
