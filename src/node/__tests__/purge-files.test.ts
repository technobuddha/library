import fs, { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { purgeFiles } from '../purge-files.ts';

describe('purgeFiles', () => {
  let testDir: string;

  beforeEach(async () => {
    // Create a unique temporary directory for each test
    testDir = await mkdtemp(path.join(tmpdir(), 'purge-files-test-'));
  });

  afterEach(async () => {
    // Clean up the test directory after each test
    await fs.rm(testDir, { recursive: true, force: true });
  });

  test('should remove files older than specified time', async () => {
    // Create test files with different timestamps
    const oldFile = path.join(testDir, 'old-file.txt');
    const newFile = path.join(testDir, 'new-file.txt');

    await fs.writeFile(oldFile, 'old content');
    await fs.writeFile(newFile, 'new content');

    // Set old file timestamp to 2 days ago
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    await fs.utimes(oldFile, twoDaysAgo, twoDaysAgo);

    // Purge files older than 1 day
    await purgeFiles(testDir, { days: 1 });

    // Check that old file was removed and new file remains
    await expect(fs.access(oldFile)).rejects.toThrow();
    await expect(fs.access(newFile)).resolves.toBeUndefined();
  });

  test('should remove nested files and directories when older than specified time', async () => {
    // Create nested directory structure
    const subDir = path.join(testDir, 'subdir');
    await fs.mkdir(subDir);

    const nestedFile = path.join(subDir, 'nested-file.txt');
    const topLevelFile = path.join(testDir, 'top-level.txt');

    await fs.writeFile(nestedFile, 'nested content');
    await fs.writeFile(topLevelFile, 'top content');

    // Set timestamps to 2 days ago
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    await fs.utimes(nestedFile, twoDaysAgo, twoDaysAgo);
    await fs.utimes(topLevelFile, twoDaysAgo, twoDaysAgo);

    // Purge files older than 1 day
    await purgeFiles(testDir, { days: 1 });

    // Check that both files were removed
    await expect(fs.access(nestedFile)).rejects.toThrow();
    await expect(fs.access(topLevelFile)).rejects.toThrow();
  });

  test('should preserve files newer than specified time', async () => {
    // Create files with current timestamp (new)
    const newFile1 = path.join(testDir, 'new-file-1.txt');
    const newFile2 = path.join(testDir, 'new-file-2.txt');

    await fs.writeFile(newFile1, 'new content 1');
    await fs.writeFile(newFile2, 'new content 2');

    // Purge files older than 1 day (should not affect new files)
    await purgeFiles(testDir, { days: 1 });

    // Check that new files remain
    await expect(fs.access(newFile1)).resolves.toBeUndefined();
    await expect(fs.access(newFile2)).resolves.toBeUndefined();
  });

  test('should handle different time increments', async () => {
    const testFile = path.join(testDir, 'test-file.txt');
    await fs.writeFile(testFile, 'test content');

    // Set file timestamp to 2 hours ago
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    await fs.utimes(testFile, twoHoursAgo, twoHoursAgo);

    // Purge files older than 1 hour
    await purgeFiles(testDir, { hours: 1 });

    // File should be removed
    await expect(fs.access(testFile)).rejects.toThrow();
  });

  test('should handle minutes time increment', async () => {
    const testFile = path.join(testDir, 'test-file.txt');
    await fs.writeFile(testFile, 'test content');

    // Set file timestamp to 10 minutes ago
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    await fs.utimes(testFile, tenMinutesAgo, tenMinutesAgo);

    // Purge files older than 5 minutes
    await purgeFiles(testDir, { minutes: 5 });

    // File should be removed
    await expect(fs.access(testFile)).rejects.toThrow();
  });

  test('should handle empty directory', async () => {
    // Test with empty directory
    await expect(purgeFiles(testDir, { days: 1 })).resolves.toBeUndefined();

    // Directory should still exist
    await expect(fs.access(testDir)).resolves.toBeUndefined();
  });

  test('should handle non-existent directory by removing it', async () => {
    const nonExistentDir = path.join(testDir, 'non-existent');

    // Should not throw error when directory doesn't exist
    await expect(purgeFiles(nonExistentDir, { days: 1 })).resolves.toBeUndefined();
  });

  test('should remove directory recursively when readdir fails', async () => {
    // Create a directory and then make it unreadable by removing it
    const subDir = path.join(testDir, 'will-be-removed');
    await fs.mkdir(subDir);
    await fs.rmdir(subDir); // Remove directory to cause readdir to fail

    // Should handle the error by attempting to remove the directory
    await expect(purgeFiles(subDir, { days: 1 })).resolves.toBeUndefined();
  });

  test('should handle mixed old and new files in same directory', async () => {
    // Create mix of old and new files
    const oldFile1 = path.join(testDir, 'old-1.txt');
    const oldFile2 = path.join(testDir, 'old-2.txt');
    const newFile1 = path.join(testDir, 'new-1.txt');
    const newFile2 = path.join(testDir, 'new-2.txt');

    await fs.writeFile(oldFile1, 'old content 1');
    await fs.writeFile(oldFile2, 'old content 2');
    await fs.writeFile(newFile1, 'new content 1');
    await fs.writeFile(newFile2, 'new content 2');

    // Set old files timestamp to 2 days ago
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    await fs.utimes(oldFile1, twoDaysAgo, twoDaysAgo);
    await fs.utimes(oldFile2, twoDaysAgo, twoDaysAgo);

    // Purge files older than 1 day
    await purgeFiles(testDir, { days: 1 });

    // Check results
    await expect(fs.access(oldFile1)).rejects.toThrow();
    await expect(fs.access(oldFile2)).rejects.toThrow();
    await expect(fs.access(newFile1)).resolves.toBeUndefined();
    await expect(fs.access(newFile2)).resolves.toBeUndefined();
  });

  test('should handle complex nested directory structure', async () => {
    // Create complex nested structure
    const level1 = path.join(testDir, 'level1');
    const level2 = path.join(level1, 'level2');
    const level3 = path.join(level2, 'level3');

    await fs.mkdir(level1);
    await fs.mkdir(level2);
    await fs.mkdir(level3);

    const files = [
      path.join(testDir, 'root.txt'),
      path.join(level1, 'level1.txt'),
      path.join(level2, 'level2.txt'),
      path.join(level3, 'level3.txt'),
    ];

    // Create all files and set them as old
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    for (const file of files) {
      await fs.writeFile(file, `content for ${path.basename(file)}`);
      await fs.utimes(file, twoDaysAgo, twoDaysAgo);
    }

    // Purge files older than 1 day
    await purgeFiles(testDir, { days: 1 });

    // All files should be removed
    for (const file of files) {
      await expect(fs.access(file)).rejects.toThrow();
    }
  });
});
