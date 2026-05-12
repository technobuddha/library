import fs from 'node:fs';

import { toPath } from './to-path.ts';

/**
 * Synchronously checks if a file or directory exists at the specified path.
 *
 * @param filePath - The path to check for existence. Can be a string path or URL object.
 * @returns `true` if the file/directory exists, `false` otherwise.
 *
 * @group File System
 * @category Existence
 *
 * @example
 * ```typescript
 * // Check if a file exists synchronously
 * const exists = nodeExistsSync('./package.json');
 * console.log(exists); // true or false
 *
 * // Check with URL
 * const url = new URL('file:///home/user/file.txt');
 * const urlExists = nodeExistsSync(url);
 * ```
 */
export function nodeExistsSync(filePath: string | URL): boolean {
  const pathName = toPath(filePath);
  return fs.existsSync(pathName);
}
