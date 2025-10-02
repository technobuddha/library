import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { locateRootDirectory } from '../locate-root-directory.ts';
import { type SearchParentOptions } from '../search-parent.ts';

describe('locateRootDirectory', () => {
  let tempDir: string;
  let originalCwd: string;

  beforeEach(async () => {
    // Create a temporary directory for each test
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'locate-test-'));
    originalCwd = process.cwd();
  });

  afterEach(async () => {
    // Clean up temp directory and restore cwd
    process.chdir(originalCwd);
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  test('finds package.json in current directory', async () => {
    // Create a project directory with package.json
    const projectDir = path.join(tempDir, 'project');
    await fs.mkdir(projectDir, { recursive: true });
    await fs.writeFile(path.join(projectDir, 'package.json'), '{"name": "test-project"}');

    // Change to project directory
    process.chdir(projectDir);

    const result = await locateRootDirectory();

    expect(result).toBe(projectDir);
  });

  test('finds package.json in parent directory', async () => {
    // Create nested directory structure with package.json in root
    const projectDir = path.join(tempDir, 'project');
    const srcDir = path.join(projectDir, 'src');
    const componentsDir = path.join(srcDir, 'components');
    await fs.mkdir(componentsDir, { recursive: true });
    await fs.writeFile(path.join(projectDir, 'package.json'), '{"name": "test-project"}');

    // Change to nested directory
    process.chdir(componentsDir);

    const result = await locateRootDirectory();

    expect(result).toBe(projectDir);
  });

  test('returns null when no package.json found', async () => {
    // Create directory without package.json
    const emptyDir = path.join(tempDir, 'empty');
    await fs.mkdir(emptyDir, { recursive: true });

    process.chdir(emptyDir);

    const result = await locateRootDirectory();

    expect(result).toBeNull();
  });

  test('uses custom start directory', async () => {
    // Create project structure
    const projectDir = path.join(tempDir, 'custom', 'project');
    const srcDir = path.join(projectDir, 'src');
    await fs.mkdir(srcDir, { recursive: true });
    await fs.writeFile(path.join(projectDir, 'package.json'), '{"name": "custom-project"}');

    const options: SearchParentOptions = {
      startDirectory: srcDir,
    };

    const result = await locateRootDirectory(options);

    expect(result).toBe(projectDir);
  });

  test('uses URL as start directory', async () => {
    // Create project structure
    const projectDir = path.join(tempDir, 'url', 'project');
    const srcDir = path.join(projectDir, 'src');
    await fs.mkdir(srcDir, { recursive: true });
    await fs.writeFile(path.join(projectDir, 'package.json'), '{"name": "url-project"}');

    const url = new URL(`file://${srcDir}`);
    const options: SearchParentOptions = {
      startDirectory: url,
    };

    const result = await locateRootDirectory(options);

    expect(result).toBe(projectDir);
  });

  test('respects stop directory option', async () => {
    // Create nested structure with multiple package.json files
    const rootDir = path.join(tempDir, 'root');
    const projectDir = path.join(rootDir, 'project');
    const srcDir = path.join(projectDir, 'src');
    await fs.mkdir(srcDir, { recursive: true });

    // Create package.json in both root and project directories
    await fs.writeFile(path.join(rootDir, 'package.json'), '{"name": "root-project"}');
    await fs.writeFile(path.join(projectDir, 'package.json'), '{"name": "nested-project"}');

    const options: SearchParentOptions = {
      startDirectory: srcDir,
      stopDirectory: projectDir,
    };

    const result = await locateRootDirectory(options);

    // Should find the project-level package.json, not the root one
    expect(result).toBe(projectDir);
  });

  test('finds first package.json when multiple exist in search path', async () => {
    // Create nested structure with multiple package.json files
    const rootDir = path.join(tempDir, 'multi');
    const projectDir = path.join(rootDir, 'project');
    const srcDir = path.join(projectDir, 'src');
    await fs.mkdir(srcDir, { recursive: true });

    // Create package.json in both directories
    await fs.writeFile(path.join(projectDir, 'package.json'), '{"name": "inner-project"}');
    await fs.writeFile(path.join(rootDir, 'package.json'), '{"name": "outer-project"}');

    const options: SearchParentOptions = {
      startDirectory: srcDir,
    };

    const result = await locateRootDirectory(options);

    // Should find the closest (inner) package.json first
    expect(result).toBe(projectDir);
  });

  test('works with default options when none provided', async () => {
    // Create project structure
    const projectDir = path.join(tempDir, 'default');
    await fs.mkdir(projectDir, { recursive: true });
    await fs.writeFile(path.join(projectDir, 'package.json'), '{"name": "default-project"}');

    process.chdir(projectDir);

    const result = await locateRootDirectory();

    expect(result).toBe(projectDir);
  });

  test('handles deeply nested directory structure', async () => {
    // Create very deep nested structure
    const projectDir = path.join(tempDir, 'deep');
    const deepDir = path.join(projectDir, 'src', 'components', 'ui', 'forms', 'inputs');
    await fs.mkdir(deepDir, { recursive: true });
    await fs.writeFile(path.join(projectDir, 'package.json'), '{"name": "deep-project"}');

    const options: SearchParentOptions = {
      startDirectory: deepDir,
    };

    const result = await locateRootDirectory(options);

    expect(result).toBe(projectDir);
  });
});
