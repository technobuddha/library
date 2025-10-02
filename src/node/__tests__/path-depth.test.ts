import path from 'node:path';

import { count } from '../../esnext/string/count.ts';

import { pathDepth } from '../path-depth.ts';

describe('pathDepth', () => {
  test('should return correct depth for absolute paths', () => {
    expect(pathDepth('/home/user/documents')).toBe(3);
    expect(pathDepth('/var/log/app')).toBe(3);
    expect(pathDepth('/usr/local/bin/node')).toBe(4);
  });

  test('should return correct depth for root path', () => {
    expect(pathDepth('/')).toBe(0);
  });

  test('should resolve relative paths and return correct depth', () => {
    const currentDir = process.cwd();
    const currentDepth = pathDepth(currentDir);

    expect(pathDepth('.')).toBe(currentDepth);
    expect(pathDepth('./file.txt')).toBe(currentDepth + 1);
    expect(pathDepth('../parent')).toBe(currentDepth);
  });

  test('should handle paths with file extensions', () => {
    expect(pathDepth('/home/user/document.pdf')).toBe(3);
    expect(pathDepth('/var/log/error.log')).toBe(3);
  });

  test('should handle nested directory structures', () => {
    expect(pathDepth('/a/b/c/d/e/f')).toBe(6);
    expect(pathDepth('/very/deeply/nested/folder/structure/file.txt')).toBe(6);
  });

  test('should handle paths with trailing separators', () => {
    expect(pathDepth('/home/user/')).toBe(pathDepth('/home/user'));
    expect(pathDepth('/var/log/')).toBe(pathDepth('/var/log'));
  });

  test('should handle current and parent directory references', () => {
    const resolved = path.resolve('./test/../test');
    const expectedDepth = count(resolved, path.sep);
    expect(pathDepth('./test/../test')).toBe(expectedDepth);
  });

  test('should handle empty string as current directory', () => {
    const currentDir = process.cwd();
    const currentDepth = pathDepth(currentDir);
    expect(pathDepth('')).toBe(currentDepth);
  });
});
