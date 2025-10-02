import fs from 'node:fs/promises';
import path from 'node:path';

import { subtractTime } from '../esnext/time/subtract-time.ts';
import { type TimeIncrement } from '../esnext/time/time-increment.ts';

/**
 * Recursively purges files and directories from a specified directory that are older than the given time.
 *
 * This function traverses the directory recursively and removes any files or directories whose
 * modification time is earlier than the calculated expiry time. If an error occurs while reading
 * the directory, the entire directory will be removed.
 *
 * @param dir - The directory path to purge files from.
 * @param time - The time increment to determine file age threshold. Files older than this will be removed.
 * @returns A Promise that resolves when the purge operation is complete.
 *
 * @example
 * ```typescript
 * // Remove files older than 7 days
 * await purgeFiles('/tmp/cache', { days: -7 });
 *
 * // Remove files older than 1 hour
 * await purgeFiles('/var/log/temp', { hours: -1 });
 *
 * // Remove files older than 30 minutes
 * await purgeFiles('./temp', { minutes: -30 });
 * ```
 *
 * @group File System
 * @category Utilities
 */
export async function purgeFiles(dir: string, time: TimeIncrement): Promise<void> {
  const expiry = subtractTime(new Date(), time);
  await fs
    .readdir(dir, { withFileTypes: true, recursive: true })
    .then(async (entries) => {
      for (const entry of entries) {
        await fs.stat(path.join(entry.parentPath, entry.name)).then(async (stat) => {
          if (stat.mtime < expiry) {
            return fs.rm(path.join(entry.parentPath, entry.name), {
              recursive: true,
              force: true,
            });
          }
        });
      }
      return undefined;
    })
    .catch(async () => fs.rm(dir, { force: true, recursive: true }));
}
