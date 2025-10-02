import path from 'node:path';

/**
 * Converts a path to a relative path by ensuring it starts with './' or '../'.
 *
 * If the path already starts with './' or '../', it returns the path unchanged.
 * Otherwise, it prefixes the path with './'.
 *
 * @param pathName - The path to convert to a relative path
 * @returns The path as a relative path starting with './' or '../'
 *
 * @group File System
 * @category Relativity
 *
 * @example
 * ```typescript
 * relativePath('documents/file.txt'); // './documents/file.txt'
 * relativePath('./documents/file.txt'); // './documents/file.txt'
 * relativePath('../documents/file.txt'); // '../documents/file.txt'
 * relativePath('/absolute/path'); // './absolute/path'
 * ```
 */
export function relativePath(pathName: string): string {
  if (
    path.isAbsolute(pathName) ||
    pathName.startsWith(`.${path.sep}`) ||
    pathName.startsWith(`..${path.sep}`)
  ) {
    return pathName;
  }
  return `.${path.sep}${pathName}`;
}
