import { fileURLToPath } from 'node:url';

/**
 * Converts a URL or string to a file system path.
 *
 * If the input is already a string, it returns the string unchanged.
 * If the input is a URL object, it converts it to a file system path using Node.js's fileURLToPath.
 *
 * @param value - The URL object or string to convert to a path
 * @returns The file system path as a string
 *
 * @example
 * ```typescript
 * toPath('/home/user/file.txt'); // returns '/home/user/file.txt'
 * toPath(new URL('file:///home/user/file.txt')); // returns '/home/user/file.txt'
 * ```
 *
 * @group File System
 * @category Filename
 */
export function toPath(value: URL | string): string {
  return typeof value === 'string' && !value.startsWith('file:/') ? value : fileURLToPath(value);
}
