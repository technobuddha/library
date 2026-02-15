/* eslint-disable n/no-sync */
import fs from 'node:fs';
import path from 'node:path';

import { ensureArray } from '../esnext/array/ensure-array.ts';

import { type SearchParentOptions, type SearchParentResult } from './search-parent.ts';
import { toPath } from './to-path.ts';

/**
 * Synchronous version of the {@link searchParent} function.
 *
 * @example
 * ```typescript
 * // Search for package.json files
 * const results = searchParentSync('package.json');
 * console.log(results); // [{ dir: '/path/to/project', files: ['package.json'] }]
 *
 * // Search for multiple patterns with custom options
 * const results = searchParentSync(['*.json', '*.yaml'], {
 *   startDirectory: '/some/nested/path',
 *   stopDirectory: '/home/user',
 *   limit: 3
 * });
 * ```
 * @group File System
 * @category Location
 */
export function searchParentSync(
  pattern: string | string[],
  { startDirectory = process.cwd(), stopDirectory, limit = Infinity }: SearchParentOptions = {},
): SearchParentResult[] {
  let directory = path.resolve(toPath(startDirectory));

  const { root } = path.parse(directory);
  const stopAt = path.resolve(directory, toPath(stopDirectory ?? root));

  const patterns = ensureArray(pattern);

  const matches: SearchParentResult[] = [];
  while (matches.length < limit) {
    const files = fs.globSync(patterns, { cwd: directory });

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
