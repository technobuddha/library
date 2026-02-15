import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { locateNearest } from '../locate-nearest.ts';

describe('locateConfig', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'locate-config-test-'));
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  test('finds config file in current directory', async () => {
    const projectDir = path.join(tempDir, 'project');
    await fs.mkdir(projectDir, { recursive: true });
    await fs.writeFile(path.join(projectDir, 'myconfig.json'), '{"foo": "bar"}');

    const result = await locateNearest(projectDir, 'myconfig.json');
    expect(result).toBe(path.join(projectDir, 'myconfig.json'));
  });

  test('finds config file in parent directory', async () => {
    const projectDir = path.join(tempDir, 'project');
    const subDir = path.join(projectDir, 'sub');
    await fs.mkdir(subDir, { recursive: true });
    await fs.writeFile(path.join(projectDir, 'myconfig.json'), '{"foo": "bar"}');

    const result = await locateNearest(subDir, 'myconfig.json');
    expect(result).toBe(path.join(projectDir, 'myconfig.json'));
  });

  test('returns null when config file not found', async () => {
    const emptyDir = path.join(tempDir, 'empty');
    await fs.mkdir(emptyDir, { recursive: true });

    const result = await locateNearest(emptyDir, 'missing.json');
    expect(result).toBeNull();
  });

  test('ignores package.json in search', async () => {
    const projectDir = path.join(tempDir, 'project');
    await fs.mkdir(projectDir, { recursive: true });
    await fs.writeFile(path.join(projectDir, 'package.json'), '{"name": "test"}');

    const result = await locateNearest(projectDir, 'myconfig.json');
    expect(result).toBeNull();
  });

  test('finds config file when both config and package.json exist', async () => {
    const projectDir = path.join(tempDir, 'project');
    await fs.mkdir(projectDir, { recursive: true });
    await fs.writeFile(path.join(projectDir, 'package.json'), '{"name": "test"}');
    await fs.writeFile(path.join(projectDir, 'myconfig.json'), '{"foo": "bar"}');

    const result = await locateNearest(projectDir, 'myconfig.json');
    expect(result).toBe(path.join(projectDir, 'myconfig.json'));
  });

  test('finds config file in deeply nested structure', async () => {
    const projectDir = path.join(tempDir, 'deep');
    const deepDir = path.join(projectDir, 'a', 'b', 'c', 'd');
    await fs.mkdir(deepDir, { recursive: true });
    await fs.writeFile(path.join(projectDir, 'myconfig.json'), '{"foo": "bar"}');

    const result = await locateNearest(deepDir, 'myconfig.json');
    expect(result).toBe(path.join(projectDir, 'myconfig.json'));
  });
});
