import { isChild } from '../is-child.ts';

describe('isChild', () => {
  test('returns true when child is directly within parent', () => {
    const result = isChild('/home/user', '/home/user/documents');
    expect(result).toBeTrue();
  });

  test('returns true for immediate child with relative paths', () => {
    const result = isChild('./parent', './parent/child');
    expect(result).toBeTrue();
  });

  test('returns false when child is nested deeply within parent (grandchild)', () => {
    const result = isChild('/home/user', '/home/user/documents/projects');
    expect(result).toBeFalse();
  });

  test('returns false when child is nested multiple levels deep', () => {
    const result = isChild('/home/user', '/home/user/documents/projects/app');
    expect(result).toBeFalse();
  });

  test('returns false when parent and child are identical', () => {
    const result = isChild('/home/user', '/home/user');
    expect(result).toBeFalse();
  });

  test('returns false when child is outside parent using relative path', () => {
    const result = isChild('/home/user', '/home/user/../other');
    expect(result).toBeFalse();
  });

  test('returns false when child is completely outside parent directory', () => {
    const result = isChild('/home/user', '/etc/passwd');
    expect(result).toBeFalse();
  });

  test('returns false when child is a sibling directory', () => {
    const result = isChild('/home/user', '/home/other');
    expect(result).toBeFalse();
  });

  test('returns false when child is parent directory', () => {
    const result = isChild('/home/user/documents', '/home/user');
    expect(result).toBeFalse();
  });

  test('returns false when relative path escapes parent', () => {
    const result = isChild('./parent', './parent/../sibling');
    expect(result).toBeFalse();
  });

  test('handles paths with trailing slashes', () => {
    const result = isChild('/home/user/', '/home/user/documents');
    expect(result).toBeTrue();
  });

  test('handles child path with trailing slash', () => {
    const result = isChild('/home/user', '/home/user/documents/');
    expect(result).toBeTrue();
  });

  test('returns false for empty parent with child', () => {
    const result = isChild('', 'child');
    expect(result).toBeFalse();
  });

  test('returns false for parent with empty child', () => {
    const result = isChild('parent', '');
    expect(result).toBeFalse();
  });

  test('returns false when both paths are empty', () => {
    const result = isChild('', '');
    expect(result).toBeFalse();
  });

  test('handles root directory as parent', () => {
    const result = isChild('/', '/home');
    expect(result).toBeTrue();
  });

  test('returns false for root directory grandchild', () => {
    const result = isChild('/', '/home/user');
    expect(result).toBeFalse();
  });

  test('handles Windows-style paths', () => {
    const result = isChild('C:\\Users', 'C:\\Users\\Documents');
    expect(result).toBeTrue();
  });

  test('returns false for Windows-style grandchild', () => {
    const result = isChild('C:\\Users', 'C:\\Users\\Documents\\Files');
    expect(result).toBeFalse();
  });
});
