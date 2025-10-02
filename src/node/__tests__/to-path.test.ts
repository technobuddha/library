import { toPath } from '../to-path.ts';

describe('toPath', () => {
  test('returns string as-is when input is a string', () => {
    const path = '/home/user/file.txt';
    expect(toPath(path)).toBe(path);
  });

  test('returns empty string when input is empty string', () => {
    expect(toPath('')).toBe('');
  });

  test('converts file URL to path when input is URL object', () => {
    const url = new URL('file:///home/user/file.txt');
    expect(toPath(url)).toBe('/home/user/file.txt');
  });

  test('handles relative paths as strings', () => {
    const relativePath = './src/index.ts';
    expect(toPath(relativePath)).toBe('./src/index.ts');
  });

  test('handles absolute paths as strings', () => {
    const absolutePath = '/usr/local/bin/node';
    expect(toPath(absolutePath)).toBe('/usr/local/bin/node');
  });

  test('handles file URLs with special characters', () => {
    const url = new URL('file:///home/user/my%20file.txt');
    expect(toPath(url)).toBe('/home/user/my file.txt');
  });
});
