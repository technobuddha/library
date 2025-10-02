import path from 'node:path';

import { count } from '../esnext/string/count.ts';
import { empty } from '../esnext/unicode/unicode.ts';

/**
 * Calculates the subdirectory level of a child path relative to a parent path.
 *
 * Returns the number of directory levels that the child is nested under the parent.
 * If the child is not a subdirectory of the parent, it returns `0`.
 *
 * @param parent - The parent directory path
 * @param child - The child directory path to check
 * @returns The number of subdirectory levels (`0` if not a subdirectory)
 *
 * @example
 * ```typescript
 * subdirectoryLevel('/home/user', '/home/user/documents'); // returns 1
 * subdirectoryLevel('/home/user', '/home/user/documents/files'); // returns 2
 * subdirectoryLevel('/home/user', '/home/user'); // returns 0
 * subdirectoryLevel('/home/user', '/other/path'); // returns 0
 * ```
 *
 * @group File System
 * @category Relativity
 */
export function subdirectoryLevel(parent: string, child: string): number {
  const rp = path.relative(parent, child);
  return rp === empty || rp.startsWith(`..`) ? 0 : count(rp, path.sep) + 1;
}
