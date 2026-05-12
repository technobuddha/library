import fs from 'node:fs';

import { toPath } from './to-path.ts';

/**
 * Synchronously checks if a file exists at the specified path.
 *
 * @param filePath - The path to check for existence. Can be a string path or URL object.
 * @returns `true` if a file exists at the path, `false` otherwise.
 *
 * @example
 * ```typescript
 * // Check if a file exists synchronously
 * const exists = fileExistsSync('./package.json');
 * console.log(exists); // true or false
 *
 * // Check with URL
 * const url = new URL('file:///home/user/file.txt');
 * const fileExists = fileExistsSync(url);
 * ```
 * @group File System
 * @category Existence
 */
export function fileExistsSync(filePath: string | URL): boolean {
  const pathName = toPath(filePath);
  try {
    return fs.statSync(pathName).isFile();
  } catch {
    return false;
  }
}
