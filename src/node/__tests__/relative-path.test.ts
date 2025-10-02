import path from 'node:path';

import { relativePath } from '../relative-path.ts';

describe('relativePath', () => {
  test('prefixes path with ./ when it does not start with . or ..', () => {
    const result = relativePath('documents/file.txt');
    expect(result).toBe(`./documents/file.txt`);
  });

  test('returns path unchanged when it starts with ./', () => {
    const input = `./documents/file.txt`;
    const result = relativePath(input);
    expect(result).toBe(input);
  });

  test('returns path unchanged when it starts with ../', () => {
    const input = `../documents/file.txt`;
    const result = relativePath(input);
    expect(result).toBe(input);
  });

  test('leaves absolute path unchanged', () => {
    const result = relativePath('/absolute/path/file.txt');
    expect(result).toBe(`/absolute/path/file.txt`);
  });

  test('handles empty string by prefixing with ./', () => {
    const result = relativePath('');
    expect(result).toBe(`./`);
  });

  test('handles single file name by prefixing with ./', () => {
    const result = relativePath('file.txt');
    expect(result).toBe(`./file.txt`);
  });

  test('handles path with only dots that does not start with ./ or ../', () => {
    const result = relativePath('...');
    expect(result).toBe(`./...`);
  });

  test('handles nested relative paths starting with ./', () => {
    const input = `./nested/deep/path/file.txt`;
    const result = relativePath(input);
    expect(result).toBe(input);
  });

  test('handles nested relative paths starting with ../', () => {
    const input = `../nested/deep/path/file.txt`;
    const result = relativePath(input);
    expect(result).toBe(input);
  });

  test('handles Windows-style paths when path.sep is backslash', () => {
    // Mock path.sep for Windows testing
    vi.spyOn(path, 'sep', 'get').mockReturnValue('\\');

    const result = relativePath('documents\\file.txt');
    expect(result).toBe('.\\documents\\file.txt');

    // Test existing relative paths
    expect(relativePath('.\\documents\\file.txt')).toBe('.\\documents\\file.txt');
    expect(relativePath('..\\documents\\file.txt')).toBe('..\\documents\\file.txt');

    vi.restoreAllMocks();
  });

  test('does not modify path that starts with . but not followed by path separator', () => {
    const result = relativePath('.hidden-file');
    expect(result).toBe(`./.hidden-file`);
  });

  test('does not modify path that starts with .. but not followed by path separator', () => {
    const result = relativePath('..hidden-file');
    expect(result).toBe(`./..hidden-file`);
  });

  test('handles path with multiple consecutive separators', () => {
    const result = relativePath('path//with///separators');
    expect(result).toBe(`./path//with///separators`);
  });

  test('handles path starting with current directory reference', () => {
    const input = `./`;
    const result = relativePath(input);
    expect(result).toBe(input);
  });

  test('handles path starting with parent directory reference', () => {
    const input = `../`;
    const result = relativePath(input);
    expect(result).toBe(input);
  });
});
