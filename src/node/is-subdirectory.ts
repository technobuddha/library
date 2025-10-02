import { isWithinDirectory } from './is-within-directory.ts';

/**
 * Checks if a child path is a subdirectory of a parent directory.
 *
 * This function determines whether the child path is located within the parent directory
 * but excludes the case where the parent and child paths are identical.
 *
 * @param parent - The parent directory path
 * @param child - The child path to check
 * @returns `true` if the child path is a subdirectory of the parent, `false` otherwise
 *
 * @group File System
 * @category Relativity
 *
 * @example
 * ```typescript
 * isSubDirectory('/home/user', '/home/user/documents'); // true
 * isSubDirectory('/home/user', '/home/user'); // false (same directory)
 * isSubDirectory('/home/user', '/home/user/../other'); // false
 * isSubDirectory('/home/user', '/etc/passwd'); // false
 * ```
 */
export function isSubdirectory(parent: string, child: string): boolean {
  return parent === child ? false : isWithinDirectory(parent, child);
}
