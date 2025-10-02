import path from 'node:path';

import { count } from '../esnext/string/count.ts';

/**
 * Calculates the depth of a file or directory path from the file system root.
 *
 * The depth is determined by counting the number of directory separators in the
 * absolute path. The root directory has a depth of 0.
 *
 * @param filename - The file or directory path to calculate depth for.
 * @returns The depth level as a number, where 0 is the root directory.
 *
 * @example
 * ```typescript
 * // Unix/Linux examples
 * pathDepth('/') // returns 0
 * pathDepth('/home') // returns 1
 * pathDepth('/home/user/documents') // returns 3
 *
 * // Windows examples
 * pathDepth('C:\\') // returns 0
 * pathDepth('C:\\Users') // returns 1
 * pathDepth('C:\\Users\\John\\Documents') // returns 3
 *
 * // Relative paths are resolved to absolute first
 * pathDepth('../folder') // returns depth of resolved absolute path
 * pathDepth('./file.txt') // returns depth of resolved absolute path
 * ```
 *
 * @group File System
 * @category Relativity
 */
export function pathDepth(filename: string): number {
  const absolute = path.resolve(filename);
  const { root } = path.parse(absolute);

  return absolute === root ? 0 : count(absolute, path.sep);
}
