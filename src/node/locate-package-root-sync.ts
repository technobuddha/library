import { type SearchParentOptions } from './search-parent.ts';
import { searchParentSync } from './search-parent-sync.ts';

/**
 * Synchronous version of {@link locatePackageRoot}.
 * @param options - Optional configuration for the search behavior.
 * @returns The directory path containing the first `package.json` found,
 *          or `null` if no `package.json` file is found within the search parameters.
 *
 *
 * @example
 * ```typescript
 * // Find project root from current directory
 * const rootDir = locatePackageRootSync();
 * if (rootDir) {
 *   console.log('Project root:', rootDir);
 * } else {
 *   console.log('No package.json found');
 * }
 *
 * // Find project root starting from specific directory
 * const rootDir = locatePackageRootSync({
 *   startDirectory: '/path/to/nested/folder'
 * });
 *
 * // Limit search with custom stop directory
 * const rootDir = locatePackageRootSync({
 *   startDirectory: '/project/src/components',
 *   stopDirectory: '/project'
 * });
 * ```
 * @group File System
 * @category Location
 */
export function locatePackageRootSync(options?: SearchParentOptions): string | null {
  // eslint-disable-next-line n/no-sync
  const results = searchParentSync('package.json', options);
  if (results.length > 0) {
    return results[0].dir;
  }
  return null;
}
