/* eslint-disable n/no-sync */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { locateNearestSync } from '../locate-nearest-sync.ts';

describe('locateConfigSync', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'locate-config-sync-test-'));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  test('finds config file in current directory', () => {
    const projectDir = path.join(tempDir, 'project');
    fs.mkdirSync(projectDir, { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'myconfig.json'), '{"foo": "bar"}');

    const result = locateNearestSync(projectDir, 'myconfig.json');
    expect(result).toBe(path.join(projectDir, 'myconfig.json'));
  });

  test('finds config file in parent directory', () => {
    const projectDir = path.join(tempDir, 'project');
    const subDir = path.join(projectDir, 'sub');
    fs.mkdirSync(subDir, { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'myconfig.json'), '{"foo": "bar"}');

    const result = locateNearestSync(subDir, 'myconfig.json');
    expect(result).toBe(path.join(projectDir, 'myconfig.json'));
  });

  test('returns null when config file not found', () => {
    const emptyDir = path.join(tempDir, 'empty');
    fs.mkdirSync(emptyDir, { recursive: true });

    const result = locateNearestSync(emptyDir, 'missing.json');
    expect(result).toBeNull();
  });

  test('ignores package.json in search', () => {
    const projectDir = path.join(tempDir, 'project');
    fs.mkdirSync(projectDir, { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'package.json'), '{"name": "test"}');

    const result = locateNearestSync(projectDir, 'myconfig.json');
    expect(result).toBeNull();
  });

  test('finds config file when both config and package.json exist', () => {
    const projectDir = path.join(tempDir, 'project');
    fs.mkdirSync(projectDir, { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'package.json'), '{"name": "test"}');
    fs.writeFileSync(path.join(projectDir, 'myconfig.json'), '{"foo": "bar"}');

    const result = locateNearestSync(projectDir, 'myconfig.json');
    expect(result).toBe(path.join(projectDir, 'myconfig.json'));
  });

  test('finds config file in deeply nested structure', () => {
    const projectDir = path.join(tempDir, 'deep');
    const deepDir = path.join(projectDir, 'a', 'b', 'c', 'd');
    fs.mkdirSync(deepDir, { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'myconfig.json'), '{"foo": "bar"}');

    const result = locateNearestSync(deepDir, 'myconfig.json');
    expect(result).toBe(path.join(projectDir, 'myconfig.json'));
  });
});
