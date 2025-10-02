import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { searchParent, type SearchParentOptions } from '../search-parent.ts';

describe('searchParent', () => {
  let tempDir: string;
  let originalCwd: string;

  beforeEach(async () => {
    // Create a temporary directory for each test
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'search-parent-test-'));
    originalCwd = process.cwd();
  });

  afterEach(async () => {
    // Clean up temp directory and restore cwd
    process.chdir(originalCwd);
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  test('searches for a single pattern starting from current directory', async () => {
    // Create a project directory structure
    const projectDir = path.join(tempDir, 'project');
    await fs.mkdir(projectDir, { recursive: true });
    await fs.writeFile(path.join(projectDir, 'package.json'), '{}');

    // Change to project directory
    process.chdir(projectDir);

    const result = await searchParent('package.json');

    expect(result).toEqual([{ dir: projectDir, files: ['package.json'] }]);
  });

  test('searches for multiple patterns', async () => {
    // Create a project directory structure
    const projectDir = path.join(tempDir, 'project');
    await fs.mkdir(projectDir, { recursive: true });
    await fs.writeFile(path.join(projectDir, 'package.json'), '{}');
    await fs.writeFile(path.join(projectDir, '.gitignore'), 'node_modules/');

    // Change to project directory
    process.chdir(projectDir);

    const result = await searchParent(['package.json', '.gitignore']);

    expect(result).toEqual([{ dir: projectDir, files: ['package.json', '.gitignore'] }]);
  });

  test('uses custom start directory', async () => {
    // Create a custom directory structure
    const customDir = path.join(tempDir, 'custom', 'start', 'path');
    await fs.mkdir(customDir, { recursive: true });
    await fs.writeFile(path.join(customDir, 'config.json'), '{}');

    const options: SearchParentOptions = {
      startDirectory: customDir,
    };

    const result = await searchParent('config.json', options);

    expect(result).toEqual([{ dir: customDir, files: ['config.json'] }]);
  });

  test('uses URL as start directory', async () => {
    // Create a custom directory structure
    const customDir = path.join(tempDir, 'custom', 'url', 'path');
    await fs.mkdir(customDir, { recursive: true });
    await fs.writeFile(path.join(customDir, 'file.txt'), 'content');

    const url = new URL(`file://${customDir}`);
    const options: SearchParentOptions = {
      startDirectory: url,
    };

    const result = await searchParent('file.txt', options);

    expect(result).toEqual([{ dir: customDir, files: ['file.txt'] }]);
  });

  test('respects the limit option', async () => {
    // Create nested directory structure with multiple files
    const subDir = path.join(tempDir, 'user', 'subdir');
    const parentDir = path.join(tempDir, 'user');
    await fs.mkdir(subDir, { recursive: true });

    // Create files in subdirectory (2 files)
    await fs.writeFile(path.join(subDir, 'file1.txt'), 'content1');
    await fs.writeFile(path.join(subDir, 'file2.txt'), 'content2');

    // Create file in parent directory (1 file)
    await fs.writeFile(path.join(parentDir, 'file3.txt'), 'content3');

    process.chdir(subDir);

    const options: SearchParentOptions = {
      limit: 1,
    };

    const result = await searchParent('*.txt', options);

    expect(result).toHaveLength(1);
    expect(result).toEqual([{ dir: subDir, files: ['file1.txt', 'file2.txt'] }]);
  });

  test('searches parent directories when no matches found', async () => {
    // Create nested directory structure
    const projectDir = path.join(tempDir, 'user', 'project');
    const userDir = path.join(tempDir, 'user');
    await fs.mkdir(projectDir, { recursive: true });

    // Put target file only in parent directory
    await fs.writeFile(path.join(userDir, 'target.json'), '{}');

    process.chdir(projectDir);

    const result = await searchParent('target.json');

    expect(result).toEqual([{ dir: userDir, files: ['target.json'] }]);
  });

  test('stops at specified stop directory', async () => {
    // Create nested directory structure
    const subFolder = path.join(tempDir, 'user', 'project', 'subfolder');
    const userDir = path.join(tempDir, 'user');
    await fs.mkdir(subFolder, { recursive: true });

    // Put a file above the stop directory to ensure it's not found
    await fs.writeFile(path.join(tempDir, 'nonexistent.json'), '{}');

    process.chdir(subFolder);

    const options: SearchParentOptions = {
      stopDirectory: userDir,
    };

    const result = await searchParent('nonexistent.json', options);

    expect(result).toEqual([]);
  });

  test('handles empty results', async () => {
    // Create empty directory structure
    const userDir = path.join(tempDir, 'user');
    await fs.mkdir(userDir, { recursive: true });

    process.chdir(userDir);

    const result = await searchParent('nonexistent.json');

    expect(result).toEqual([]);
  });

  test('uses default options when none provided', async () => {
    // Create a current directory
    const currentDir = path.join(tempDir, 'current', 'dir');
    await fs.mkdir(currentDir, { recursive: true });
    await fs.writeFile(path.join(currentDir, 'found.txt'), 'content');

    process.chdir(currentDir);

    const result = await searchParent('found.txt');

    expect(result).toEqual([{ dir: currentDir, files: ['found.txt'] }]);
  });
});
