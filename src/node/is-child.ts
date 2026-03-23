import path from 'node:path';

import { empty } from '../esnext/unicode/unicode.ts';

/**
 * Checks if a child path is an immediate child of a parent directory.
 *
 * This function determines whether the child path is a direct child of the parent directory,
 * meaning it is located exactly one level below the parent. It returns `false` for paths
 * that are at the same level, outside the parent, or nested deeper than one level.
 *
 * @param parent - The parent directory path
 * @param child - The child path to check
 * @returns `true` if the child path is an immediate child of the parent, `false` otherwise
 *
 * @example
 * ```typescript
 * isChild('/home/user', '/home/user/documents'); // true
 * isChild('/home/user', '/home/user/documents/files'); // false (grandchild)
 * isChild('/home/user', '/home/user'); // false (same directory)
 * isChild('/home/user', '/home/other'); // false (outside parent)
 * isChild('/home/user', '/etc/passwd'); // false (outside parent)
 * ```
 *
 * @group File System
 * @category Relativity
 */
export function isChild(parent: string, child: string): boolean {
  const relative = path.relative(parent, child);
  return relative !== empty && !relative.startsWith('..') && !relative.includes(path.sep);
}
