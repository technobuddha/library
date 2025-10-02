import path from 'node:path';

/**
 * Checks if a child path is within a parent directory.
 *
 * This function determines whether the child path is located within the parent directory
 * by checking if the relative path from parent to child starts with '..' or is absolute.
 *
 * @param parent - The parent directory path
 * @param child - The child path to check
 * @returns `true` if the child path is within the parent directory, `false` otherwise
 *
 * @group File System
 * @category Relativity
 *
 * @example
 * ```typescript
 * isWithinDirectory('/home/user', '/home/user/documents'); // true
 * isWithinDirectory('/home/user', '/home/user/../other'); // false
 * isWithinDirectory('/home/user', '/etc/passwd'); // false
 * ```
 */
export function isWithinDirectory(parent: string, child: string): boolean {
  const relative = path.relative(parent, child);
  return !relative.startsWith('..') && !path.isAbsolute(relative);
}
