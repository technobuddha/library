import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { locatePackageRootSync } from '../locate-package-root-sync.ts';

describe('locatePackageRootSync', () => {
  let tempDir: string;
  let testStructure: string;

  beforeEach(async () => {
    // Create a temporary directory structure for testing
    tempDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'locate-test-'));

    // Create nested directory structure: tempDir/project/nested/deep
    testStructure = path.join(tempDir, 'project', 'nested', 'deep');
    await fs.promises.mkdir(testStructure, { recursive: true });

    // Create package.json files in different directories
    await fs.promises.writeFile(
      path.join(tempDir, 'project', 'package.json'),
      JSON.stringify({ name: 'test-project', version: '1.0.0' }),
    );
    await fs.promises.writeFile(
      path.join(tempDir, 'project', 'nested', 'package.json'),
      JSON.stringify({ name: 'nested-project', version: '1.0.0' }),
    );

    // Create other files that are not package.json
    await fs.promises.writeFile(path.join(tempDir, 'config.json'), '{}');
    await fs.promises.writeFile(path.join(testStructure, 'README.md'), '# Test');
  });

  afterEach(async () => {
    // Clean up temporary directory
    await fs.promises.rm(tempDir, { recursive: true, force: true });
  });

  test('finds closest package.json from current directory', () => {
    const result = locatePackageRootSync({
      startDirectory: testStructure,
      stopDirectory: tempDir,
    });

    expect(result).toEqual(path.join(tempDir, 'project', 'nested'));
  });

  test('finds package.json from project directory', () => {
    const result = locatePackageRootSync({
      startDirectory: path.join(tempDir, 'project'),
      stopDirectory: tempDir,
    });

    expect(result).toEqual(path.join(tempDir, 'project'));
  });

  test('returns null when no package.json found', () => {
    const emptyDir = path.join(tempDir, 'empty');
    fs.mkdirSync(emptyDir);

    const result = locatePackageRootSync({
      startDirectory: emptyDir,
      stopDirectory: tempDir,
    });

    expect(result).toBeNull();
  });

  test('uses default options when none provided', () => {
    // Save original cwd and change to test directory with package.json
    const originalCwd = process.cwd();
    process.chdir(path.join(tempDir, 'project', 'nested'));

    try {
      const result = locatePackageRootSync();

      expect(result).toEqual(path.join(tempDir, 'project', 'nested'));
    } finally {
      // Restore original cwd
      process.chdir(originalCwd);
    }
  });

  test('respects custom start directory', () => {
    const result = locatePackageRootSync({
      startDirectory: path.join(tempDir, 'project', 'nested', 'deep'),
      stopDirectory: tempDir,
    });

    expect(result).toEqual(path.join(tempDir, 'project', 'nested'));
  });

  test('respects custom stop directory', () => {
    const result = locatePackageRootSync({
      startDirectory: testStructure,
      stopDirectory: path.join(tempDir, 'project'),
    });

    expect(result).toEqual(path.join(tempDir, 'project', 'nested'));
  });

  test('returns null when stop directory prevents finding package.json', () => {
    const result = locatePackageRootSync({
      startDirectory: testStructure,
      stopDirectory: testStructure,
    });

    expect(result).toBeNull();
  });

  test('handles URL start directory', () => {
    const startUrl = new URL(`file://${testStructure}`);
    const result = locatePackageRootSync({
      startDirectory: startUrl,
      stopDirectory: tempDir,
    });

    expect(result).toEqual(path.join(tempDir, 'project', 'nested'));
  });

  test('handles URL stop directory', () => {
    const stopUrl = new URL(`file://${path.join(tempDir, 'project')}`);
    const result = locatePackageRootSync({
      startDirectory: testStructure,
      stopDirectory: stopUrl,
    });

    expect(result).toEqual(path.join(tempDir, 'project', 'nested'));
  });

  test('finds first package.json when multiple exist', () => {
    // Create another package.json higher up
    fs.writeFileSync(
      path.join(tempDir, 'package.json'),
      JSON.stringify({ name: 'root-project', version: '1.0.0' }),
    );

    const result = locatePackageRootSync({
      startDirectory: testStructure,
      stopDirectory: tempDir,
    });

    // Should find the closest one (nested), not the root one
    expect(result).toEqual(path.join(tempDir, 'project', 'nested'));
  });

  test('returns null for directory without parents containing package.json', () => {
    // Create an isolated directory structure without package.json
    const isolatedDir = path.join(tempDir, 'isolated', 'deep', 'folder');
    fs.mkdirSync(isolatedDir, { recursive: true });

    const result = locatePackageRootSync({
      startDirectory: isolatedDir,
      stopDirectory: tempDir,
    });

    expect(result).toBeNull();
  });

  test('works with complex directory structures', () => {
    // Create a more complex structure
    const complexDir = path.join(tempDir, 'workspace', 'apps', 'frontend', 'src');
    fs.mkdirSync(complexDir, { recursive: true });

    // Add package.json in workspace root
    fs.writeFileSync(
      path.join(tempDir, 'workspace', 'package.json'),
      JSON.stringify({ name: 'workspace', version: '1.0.0' }),
    );

    const result = locatePackageRootSync({
      startDirectory: complexDir,
      stopDirectory: tempDir,
    });

    expect(result).toEqual(path.join(tempDir, 'workspace'));
  });

  test('handles case when starting from directory containing package.json', () => {
    const result = locatePackageRootSync({
      startDirectory: path.join(tempDir, 'project', 'nested'),
      stopDirectory: tempDir,
    });

    expect(result).toEqual(path.join(tempDir, 'project', 'nested'));
  });
});
