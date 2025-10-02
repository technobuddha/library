import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { ensureArray } from '../esnext/array/ensure-array.ts';
import { type Flexible } from '../esnext/array/flexible.ts';

import { toPath } from './to-path.ts';

/**
 * Options for configuring the parent directory search behavior.
 *
 * @group File System
 * @category Location
 */
export type SearchParentOptions = {
  /** The directory to start searching from. Defaults to current working directory. */
  startDirectory?: string | URL;
  /** The directory to stop searching at. Defaults to user's home directory. */
  stopDirectory?: string | URL;
  /** Maximum number of matches to return. Defaults to Infinity. */
  limit?: number;
};

/**
 * Result of a parent directory search containing the directory path and matching files.
 *
 * @group File System
 * @category Location
 */
export type SearchParentResult = {
  /** The directory path where matches were found */
  dir: string;
  /** Array of file names that matched the search pattern */
  files: string[];
};

/**
 * Searches for files matching the given pattern(s) by traversing up the directory tree
 * from a starting directory until reaching a stop directory or the file system root.
 *
 * This function is useful for finding configuration files, package.json files, or other
 * files that might exist in parent directories of a project.
 *
 * @param pattern - File pattern(s) to search for. Can be a single pattern string, array of patterns, or any iterable of patterns.
 * @param options - Configuration options for the search behavior.
 * @returns Promise that resolves to an array of search results, each containing the directory and matching files.
 *
 * @example
 * ```typescript
 * // Search for package.json files
 * const results = await searchParent('package.json');
 * console.log(results); // [{ dir: '/path/to/project', files: ['package.json'] }]
 *
 * // Search for multiple patterns with custom options
 * const results = await searchParent(['*.json', '*.yaml'], {
 *   startDirectory: '/some/nested/path',
 *   stopDirectory: '/home/user',
 *   limit: 3
 * });
 * ```
 * @group File System
 * @category Location
 */
export async function searchParent(
  pattern: Flexible<string>,
  {
    startDirectory = process.cwd(),
    stopDirectory = os.homedir(),
    limit = Infinity,
  }: SearchParentOptions = {},
): Promise<SearchParentResult[]> {
  let directory = path.resolve(toPath(startDirectory));

  const { root } = path.parse(directory);
  const stopAt = path.resolve(directory, toPath(stopDirectory));

  const patterns = ensureArray(pattern);

  const matches: SearchParentResult[] = [];
  while (matches.length < limit) {
    const files: string[] = [];

    for (const pattern of patterns) {
      for await (const entry of fs.glob(pattern, { cwd: directory })) {
        files.push(entry);
      }
    }

    if (files.length > 0) {
      matches.push({ dir: directory, files: files });
    }

    if (directory === stopAt || directory === root) {
      break;
    }

    directory = path.dirname(directory);
  }

  return matches;
}
