import path from 'node:path';

import { subdirectoryLevel } from '../subdirectory-level.ts';

describe('subdirectoryLevel', () => {
  test('should return 1 for direct subdirectory', () => {
    expect(subdirectoryLevel('/parent', '/parent/child')).toBe(1);
    expect(subdirectoryLevel('parent', 'parent/child')).toBe(1);
  });

  test('should return correct level for nested subdirectories', () => {
    expect(subdirectoryLevel('/parent', '/parent/child/grandchild')).toBe(2);
    expect(subdirectoryLevel('/parent', '/parent/child/grandchild/great')).toBe(3);
    expect(subdirectoryLevel('parent', 'parent/child/grandchild')).toBe(2);
  });

  test('should return 0 when paths are the same', () => {
    expect(subdirectoryLevel('/parent', '/parent')).toBe(0);
    expect(subdirectoryLevel('parent', 'parent')).toBe(0);
    expect(subdirectoryLevel('.', '.')).toBe(0);
  });

  test('should return 0 when child is not a subdirectory of parent', () => {
    expect(subdirectoryLevel('/parent', '/other')).toBe(0);
    expect(subdirectoryLevel('/parent/child', '/parent')).toBe(0);
    expect(subdirectoryLevel('parent', 'sibling')).toBe(0);
  });

  test('should handle absolute paths correctly', () => {
    expect(subdirectoryLevel('/home/user', '/home/user/documents/file.txt')).toBe(2);
    expect(subdirectoryLevel('/var', '/var/log/app/error.log')).toBe(3);
  });

  test('should handle relative paths correctly', () => {
    expect(subdirectoryLevel('./child', './child/subchild')).toBe(1);
    expect(subdirectoryLevel('docs', 'docs/api/reference')).toBe(2);
  });

  test('should handle mixed path types', () => {
    const absoluteParent = path.resolve('parent');
    const relativeChild = path.join(absoluteParent, 'child/subchild');
    expect(subdirectoryLevel(absoluteParent, relativeChild)).toBe(2);
  });

  test('should handle paths with trailing separators', () => {
    expect(subdirectoryLevel('/parent/', '/parent/child/')).toBe(1);
    expect(subdirectoryLevel('parent/', 'parent/child/')).toBe(1);
  });

  test('should handle root path scenarios', () => {
    expect(subdirectoryLevel('/', '/usr/local/bin')).toBe(3);
    expect(subdirectoryLevel('/', '/')).toBe(0);
  });

  test('should handle complex relative paths', () => {
    expect(subdirectoryLevel('../parent', '../parent/child')).toBe(1);
    expect(subdirectoryLevel('./parent/../parent', './parent/../parent/child')).toBe(1);
  });
});
