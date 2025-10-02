import { searchParent, type SearchParentOptions } from './search-parent.ts';

/**
 * Finds the root directory of a project by searching for a `package.json` file.
 *
 * This function searches upward from the starting directory (current working directory by default)
 * through parent directories until it finds a `package.json` file, which typically indicates
 * the root of a Node.js project.
 *
 * @param options - Optional configuration for the search behavior.
 * @returns A promise that resolves to the directory path containing the first `package.json` found,
 *          or `null` if no `package.json` file is found within the search parameters.
 *
 *
 * @example
 * ```typescript
 * // Find project root from current directory
 * const rootDir = await locateRootDirectory();
 * if (rootDir) {
 *   console.log('Project root:', rootDir);
 * } else {
 *   console.log('No package.json found');
 * }
 *
 * // Find project root starting from specific directory
 * const rootDir = await locateRootDirectory({
 *   startDirectory: '/path/to/nested/folder'
 * });
 *
 * // Limit search with custom stop directory
 * const rootDir = await locateRootDirectory({
 *   startDirectory: '/project/src/components',
 *   stopDirectory: '/project'
 * });
 * ```
 * @group File System
 * @category Location
 */
export async function locateRootDirectory(options?: SearchParentOptions): Promise<string | null> {
  const results = await searchParent('package.json', options);
  if (results.length > 0) {
    return results[0].dir;
  }
  return null;
}
