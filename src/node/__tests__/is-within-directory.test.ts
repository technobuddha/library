import path from 'node:path';

import { isWithinDirectory } from '../is-within-directory.ts';

describe('isWithinDirectory', () => {
  test('returns true when child is directly within parent', () => {
    const result = isWithinDirectory('/home/user', '/home/user/documents');
    expect(result).toBeTrue();
  });

  test('returns true when child is nested deeply within parent', () => {
    const result = isWithinDirectory('/home/user', '/home/user/documents/projects/app');
    expect(result).toBeTrue();
  });

  test('returns false when child is outside parent using relative path', () => {
    const result = isWithinDirectory('/home/user', '/home/user/../other');
    expect(result).toBeFalse();
  });

  test('returns false when child is completely outside parent directory', () => {
    const result = isWithinDirectory('/home/user', '/etc/passwd');
    expect(result).toBeFalse();
  });

  test('returns false when child is a sibling directory', () => {
    const result = isWithinDirectory('/home/user', '/home/other');
    expect(result).toBeFalse();
  });

  test('returns false when child is parent directory', () => {
    const result = isWithinDirectory('/home/user/documents', '/home/user');
    expect(result).toBeFalse();
  });

  test('returns true when paths are identical', () => {
    const result = isWithinDirectory('/home/user', '/home/user');
    expect(result).toBeTrue();
  });

  test('handles relative parent and child paths', () => {
    const result = isWithinDirectory('./parent', './parent/child');
    expect(result).toBeTrue();
  });

  test('returns false when relative path escapes parent', () => {
    const result = isWithinDirectory('./parent', './parent/../sibling');
    expect(result).toBeFalse();
  });

  test('handles empty parent path', () => {
    const result = isWithinDirectory('', 'child');
    expect(result).toBeTrue();
  });

  test('handles empty child path', () => {
    const result = isWithinDirectory('/parent', '');
    expect(result).toBeFalse();
  });

  test('handles both empty paths', () => {
    const result = isWithinDirectory('', '');
    expect(result).toBeTrue();
  });

  test('handles paths with trailing slashes', () => {
    const result = isWithinDirectory('/home/user/', '/home/user/documents/');
    expect(result).toBeTrue();
  });

  test('returns false when relative path is absolute', () => {
    const mockRelative = vi.spyOn(path, 'relative').mockReturnValue('/absolute/path');
    const mockIsAbsolute = vi.spyOn(path, 'isAbsolute').mockReturnValue(true);

    const result = isWithinDirectory('/parent', '/child');

    expect(result).toBeFalse();
    expect(mockRelative).toHaveBeenCalledWith('/parent', '/child');
    expect(mockIsAbsolute).toHaveBeenCalledWith('/absolute/path');

    mockRelative.mockRestore();
    mockIsAbsolute.mockRestore();
  });

  test('returns false when relative path starts with double dots', () => {
    const mockRelative = vi.spyOn(path, 'relative').mockReturnValue('../outside');
    const mockIsAbsolute = vi.spyOn(path, 'isAbsolute').mockReturnValue(false);

    const result = isWithinDirectory('/parent', '/outside');

    expect(result).toBeFalse();
    expect(mockRelative).toHaveBeenCalledWith('/parent', '/outside');

    mockRelative.mockRestore();
    mockIsAbsolute.mockRestore();
  });

  test('returns true when relative path is valid and not absolute', () => {
    const mockRelative = vi.spyOn(path, 'relative').mockReturnValue('child/nested');
    const mockIsAbsolute = vi.spyOn(path, 'isAbsolute').mockReturnValue(false);

    const result = isWithinDirectory('/parent', '/parent/child/nested');

    expect(result).toBeTrue();
    expect(mockRelative).toHaveBeenCalledWith('/parent', '/parent/child/nested');
    expect(mockIsAbsolute).toHaveBeenCalledWith('child/nested');

    mockRelative.mockRestore();
    mockIsAbsolute.mockRestore();
  });

  test('handles complex relative paths with dots', () => {
    const result = isWithinDirectory('/home/user', '/home/user/./documents/../documents/file.txt');
    expect(result).toBeTrue();
  });

  test('returns false for path that starts with .. in middle', () => {
    const result = isWithinDirectory('/home/user', '/home/user/docs/../../../etc');
    expect(result).toBeFalse();
  });
});
