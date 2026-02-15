import path from 'node:path';

import { searchParentSync } from './search-parent-sync.ts';

/**
 * The root file used to identify the project root when searching for configuration files.
 * @internal
 */
const ROOT_FILE = 'package.json';

/**
 * Synchronously locates a file by searching up the directory tree from a starting path.
 *
 * @param start - The directory path to start searching from
 * @param name - The name of the file to locate
 * @returns The absolute path to the file if found, otherwise null
 * @example
 * ```typescript
 * const configPath = locateNearestSync('/home/user/project', 'myconfig.json');
 * // configPath might be '/home/user/project/myconfig.json' or null
 * ```
 * @group Node
 * @category Config
 */
export function locateNearestSync(start: string, name: string): string | null {
  // eslint-disable-next-line n/no-sync
  const results = searchParentSync([name, ROOT_FILE], { startDirectory: start, limit: 1 });
  if (results.length > 0) {
    const [result] = results;
    const rootIndex = result.files.indexOf(ROOT_FILE);
    if (rootIndex !== -1) {
      result.files.splice(rootIndex, 1);
    }

    if (result.files.length > 0) {
      return path.join(result.dir, result.files[0]);
    }
  }
  return null;
}
