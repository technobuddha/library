/* eslint-disable n/no-sync */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { searchParentSync } from '../search-parent-sync.ts';

describe('searchParentSync', () => {
  let tempDir: string;
  let testStructure: string;

  beforeEach(async () => {
    // Create a temporary directory structure for testing
    tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'search-parent-test-'));

    // Create nested directory structure: tempDir/project/nested/deep
    testStructure = path.join(tempDir, 'project', 'nested', 'deep');
    await fs.promises.mkdir(testStructure, { recursive: true });

    // Create test files in different directories
    await fs.promises.writeFile(path.join(tempDir, 'root-config.json'), '{}');
    await fs.promises.writeFile(path.join(tempDir, 'project', 'package.json'), '{}');
    await fs.promises.writeFile(path.join(tempDir, 'project', 'project.yaml'), 'test');
    await fs.promises.writeFile(
      path.join(tempDir, 'project', 'nested', 'nested-file.txt'),
      'content',
    );
    await fs.promises.writeFile(path.join(tempDir, 'project', 'nested', 'config.json'), '{}');
    await fs.promises.writeFile(path.join(testStructure, 'deep-file.md'), '# Test');
  });

  afterEach(async () => {
    // Clean up temporary directory
    await fs.promises.rm(tempDir, { recursive: true, force: true });
  });

  test('finds files with single pattern', () => {
    const result = searchParentSync('package.json', {
      startDirectory: testStructure,
      stopDirectory: tempDir,
    });

    expect(result).toHaveLength(1);
    expect(result[0].dir).toEqual(path.join(tempDir, 'project'));
    expect(result[0].files).toEqual(['package.json']);
  });

  test('finds files with multiple patterns', () => {
    const result = searchParentSync(['package.json', '*.yaml'], {
      startDirectory: testStructure,
      stopDirectory: tempDir,
    });

    expect(result).toHaveLength(1);
    expect(result[0].dir).toEqual(path.join(tempDir, 'project'));
    expect(result[0].files).toEqual(expect.arrayContaining(['package.json', 'project.yaml']));
  });

  test('traverses up directory tree until files found', () => {
    const result = searchParentSync('*.json', {
      startDirectory: testStructure,
      stopDirectory: tempDir,
    });

    // Should find JSON files in nested, project, and root directories
    expect(result).toHaveLength(3);

    // First result should be from the nested directory (closest to start)
    expect(result[0].dir).toEqual(path.join(tempDir, 'project', 'nested'));
    expect(result[0].files).toEqual(['config.json']);

    // Second result should be from the project directory
    expect(result[1].dir).toEqual(path.join(tempDir, 'project'));
    expect(result[1].files).toEqual(['package.json']);

    // Third result should be from the root directory
    expect(result[2].dir).toEqual(tempDir);
    expect(result[2].files).toEqual(['root-config.json']);
  });

  test('stops at stop directory', () => {
    const result = searchParentSync('*.json', {
      startDirectory: testStructure,
      stopDirectory: path.join(tempDir, 'project'),
    });

    // Should find config.json in nested directory, but stop before searching project directory
    // However, based on the implementation, it likely searches the stop directory too
    expect(result).toHaveLength(2);
    expect(result[0].dir).toEqual(path.join(tempDir, 'project', 'nested'));
    expect(result[0].files).toEqual(['config.json']);
    expect(result[1].dir).toEqual(path.join(tempDir, 'project'));
    expect(result[1].files).toEqual(['package.json']);
  });

  test('respects limit option', () => {
    const result = searchParentSync('*.json', {
      startDirectory: testStructure,
      stopDirectory: tempDir,
      limit: 1,
    });

    expect(result).toHaveLength(1);
    expect(result[0].dir).toEqual(path.join(tempDir, 'project', 'nested'));
    expect(result[0].files).toEqual(['config.json']);
  });

  test('uses custom start directory', () => {
    const result = searchParentSync('nested-file.txt', {
      startDirectory: path.join(tempDir, 'project', 'nested'),
      stopDirectory: tempDir,
    });

    expect(result).toHaveLength(1);
    expect(result[0].dir).toEqual(path.join(tempDir, 'project', 'nested'));
    expect(result[0].files).toEqual(['nested-file.txt']);
  });

  test('handles URL start directory', () => {
    const startUrl = new URL(`file://${testStructure}`);
    const result = searchParentSync('deep-file.md', {
      startDirectory: startUrl,
      stopDirectory: tempDir,
    });

    expect(result).toHaveLength(1);
    expect(result[0].dir).toEqual(testStructure);
    expect(result[0].files).toEqual(['deep-file.md']);
  });

  test('returns empty array when no files found', () => {
    const result = searchParentSync('nonexistent.xyz', {
      startDirectory: testStructure,
      stopDirectory: tempDir,
    });

    expect(result).toEqual([]);
  });

  test('finds multiple files in same directory', () => {
    // Create additional files in the same directory
    const testDir = path.join(tempDir, 'multi-files');
    fs.mkdirSync(testDir);
    fs.writeFileSync(path.join(testDir, 'file1.json'), '{}');
    fs.writeFileSync(path.join(testDir, 'file2.json'), '{}');
    fs.writeFileSync(path.join(testDir, 'file3.json'), '{}');

    const result = searchParentSync('*.json', {
      startDirectory: testDir,
      stopDirectory: tempDir,
    });

    // Should find files in testDir first, then potentially in tempDir (root-config.json)
    expect(result).toHaveLength(2);
    expect(result[0].dir).toEqual(testDir);
    expect(result[0].files).toHaveLength(3);
    expect(result[0].files).toEqual(
      expect.arrayContaining(['file1.json', 'file2.json', 'file3.json']),
    );

    // Second result should be from tempDir
    expect(result[1].dir).toEqual(tempDir);
    expect(result[1].files).toEqual(['root-config.json']);
  });

  test('handles empty patterns array', () => {
    const result = searchParentSync([], {
      startDirectory: testStructure,
      stopDirectory: tempDir,
    });

    expect(result).toEqual([]);
  });

  test('uses default options when none provided', () => {
    // Save original cwd and change to test directory
    const originalCwd = process.cwd();
    process.chdir(testStructure);

    try {
      const result = searchParentSync('deep-file.md');

      expect(result).toHaveLength(1);
      expect(result[0].dir).toEqual(testStructure);
      expect(result[0].files).toEqual(['deep-file.md']);
    } finally {
      // Restore original cwd
      process.chdir(originalCwd);
    }
  });

  test('handles glob patterns correctly', () => {
    const result = searchParentSync('*.{json,yaml}', {
      startDirectory: path.join(tempDir, 'project'),
      stopDirectory: tempDir,
    });

    // Should find files in project directory, then potentially in tempDir
    expect(result).toHaveLength(2);
    expect(result[0].dir).toEqual(path.join(tempDir, 'project'));
    expect(result[0].files).toHaveLength(2);
    expect(result[0].files).toEqual(expect.arrayContaining(['package.json', 'project.yaml']));

    // Second result should be from tempDir (root-config.json)
    expect(result[1].dir).toEqual(tempDir);
    expect(result[1].files).toEqual(['root-config.json']);
  });

  test('continues searching when directory has no matches', () => {
    // Create a directory with no matching files
    const emptyDir = path.join(tempDir, 'empty', 'nested');
    fs.mkdirSync(emptyDir, { recursive: true });

    const result = searchParentSync('root-config.json', {
      startDirectory: emptyDir,
      stopDirectory: tempDir,
    });

    expect(result).toHaveLength(1);
    expect(result[0].dir).toEqual(tempDir);
    expect(result[0].files).toEqual(['root-config.json']);
  });
});
