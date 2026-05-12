import fs from 'node:fs';

import { toPath } from './to-path.ts';

/**
 * Synchronously checks if a directory exists at the specified path.
 *
 * @param filePath - The path to check for existence. Can be a string path or URL object.
 * @returns `true` if a directory exists at the path, `false` otherwise.
 *
 * @example
 * ```typescript
 * // Check if a directory exists synchronously
 * const exists = directoryExistsSync('./src');
 * console.log(exists); // true or false
 *
 * // Check with URL
 * const url = new URL('file:///home/user/documents');
 * const dirExists = directoryExistsSync(url);
 * ```
 * @group File System
 * @category Existence
 */
export function directoryExistsSync(filePath: string | URL): boolean {
  const pathName = toPath(filePath);
  try {
    return fs.statSync(pathName).isDirectory();
  } catch {
    return false;
  }
}
