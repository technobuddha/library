import { isSubdirectory } from '../is-subdirectory.ts';

describe('isSubdirectory', () => {
  test('returns true when child is directly within parent', () => {
    const result = isSubdirectory('/home/user', '/home/user/documents');
    expect(result).toBeTrue();
  });

  test('returns true when child is nested deeply within parent', () => {
    const result = isSubdirectory('/home/user', '/home/user/documents/projects/app');
    expect(result).toBeTrue();
  });

  test('returns false when parent and child are identical', () => {
    const result = isSubdirectory('/home/user', '/home/user');
    expect(result).toBeFalse();
  });

  test('returns false when child is outside parent using relative path', () => {
    const result = isSubdirectory('/home/user', '/home/user/../other');
    expect(result).toBeFalse();
  });

  test('returns false when child is completely outside parent directory', () => {
    const result = isSubdirectory('/home/user', '/etc/passwd');
    expect(result).toBeFalse();
  });

  test('returns false when child is a sibling directory', () => {
    const result = isSubdirectory('/home/user', '/home/other');
    expect(result).toBeFalse();
  });

  test('returns false when child is parent directory', () => {
    const result = isSubdirectory('/home/user/documents', '/home/user');
    expect(result).toBeFalse();
  });

  test('handles relative parent and child paths', () => {
    const result = isSubdirectory('./parent', './parent/child');
    expect(result).toBeTrue();
  });

  test('returns false when relative path escapes parent', () => {
    const result = isSubdirectory('./parent', './parent/../sibling');
    expect(result).toBeFalse();
  });

  test('handles empty parent path with child', () => {
    const result = isSubdirectory('', 'child');
    expect(result).toBeTrue();
  });

  test('returns false when child is empty', () => {
    const result = isSubdirectory('/parent', '');
    expect(result).toBeFalse();
  });

  test('returns false when both paths are empty', () => {
    const result = isSubdirectory('', '');
    expect(result).toBeFalse();
  });

  test('handles paths with trailing slashes', () => {
    const result = isSubdirectory('/home/user/', '/home/user/documents/');
    expect(result).toBeTrue();
  });

  test('returns true for identical paths with different trailing slashes', () => {
    const result = isSubdirectory('/home/user', '/home/user/');
    expect(result).toBeTrue();
  });

  test('handles complex relative paths with dots', () => {
    const result = isSubdirectory('/home/user', '/home/user/./documents/../documents/file.txt');
    expect(result).toBeTrue();
  });

  test('returns false for path that escapes using multiple .. segments', () => {
    const result = isSubdirectory('/home/user', '/home/user/docs/../../../etc');
    expect(result).toBeFalse();
  });

  test('handles normalized paths correctly', () => {
    const result = isSubdirectory('/home/user', '/home/user/documents/./subfolder');
    expect(result).toBeTrue();
  });
});
