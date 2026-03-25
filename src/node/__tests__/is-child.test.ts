import path from 'node:path';

import { isChild } from '../is-child.ts';

const s = path.sep;

describe('isChild', () => {
  test('returns true when child is directly within parent', () => {
    const result = isChild(`${s}home${s}user`, `${s}home${s}user${s}documents`);
    expect(result).toBeTrue();
  });

  test('returns true for immediate child with relative paths', () => {
    const result = isChild(`.${s}parent`, `.${s}parent${s}child`);
    expect(result).toBeTrue();
  });

  test('returns false when child is nested deeply within parent (grandchild)', () => {
    const result = isChild(`${s}home${s}user`, `${s}home${s}user${s}documents${s}projects`);
    expect(result).toBeFalse();
  });

  test('returns false when child is nested multiple levels deep', () => {
    const result = isChild(`${s}home${s}user`, `${s}home${s}user${s}documents${s}projects${s}app`);
    expect(result).toBeFalse();
  });

  test('returns false when parent and child are identical', () => {
    const result = isChild(`${s}home${s}user`, `${s}home${s}user`);
    expect(result).toBeFalse();
  });

  test('returns false when child is outside parent using relative path', () => {
    const result = isChild(`${s}home${s}user`, `${s}home${s}user${s}..${s}other`);
    expect(result).toBeFalse();
  });

  test('returns false when child is completely outside parent directory', () => {
    const result = isChild(`${s}home${s}user`, `${s}etc${s}passwd`);
    expect(result).toBeFalse();
  });

  test('returns false when child is a sibling directory', () => {
    const result = isChild(`${s}home${s}user`, `${s}home${s}other`);
    expect(result).toBeFalse();
  });

  test('returns false when child is parent directory', () => {
    const result = isChild(`${s}home${s}user${s}documents`, `${s}home${s}user`);
    expect(result).toBeFalse();
  });

  test('returns false when relative path escapes parent', () => {
    const result = isChild(`.${s}parent`, `.${s}parent${s}..${s}sibling`);
    expect(result).toBeFalse();
  });

  test('handles paths with trailing slashes', () => {
    const result = isChild(`${s}home${s}user${s}`, `${s}home${s}user${s}documents`);
    expect(result).toBeTrue();
  });

  test('handles child path with trailing slash', () => {
    const result = isChild(`${s}home${s}user`, `${s}home${s}user${s}documents${s}`);
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
    const result = isChild(s, `${s}home`);
    expect(result).toBeTrue();
  });

  test('returns false for root directory grandchild', () => {
    const result = isChild(s, `${s}home${s}user`);
    expect(result).toBeFalse();
  });

  test('handles Windows-style paths', () => {
    const result = isChild(`C:${s}Users`, `C:${s}Users${s}Documents`);
    expect(result).toBeTrue();
  });

  test('returns false for Windows-style grandchild', () => {
    const result = isChild(`C:${s}Users`, `C:${s}Users${s}Documents${s}Files`);
    expect(result).toBeFalse();
  });
});
