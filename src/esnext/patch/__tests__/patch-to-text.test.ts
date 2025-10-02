import {
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../../difference/difference.ts';

import { patchToString, patchToText } from '../patch-to-text.ts';
import { type Patch } from '../types.ts';

describe('patchToText', () => {
  test('serializes a patch with insert, delete, and equal', () => {
    const patch: Patch = {
      diffs: [
        { op: DIFFERENCE_EQUAL, text: 'abc' },
        { op: DIFFERENCE_DELETE, text: 'def' },
        { op: DIFFERENCE_INSERT, text: 'xyz' },
      ],
      start1: 0,
      start2: 0,
      length1: 3,
      length2: 3,
    };
    const text = patchToText([patch]);
    expect(text).toContain('@@ -1,3 +1,3 @@');
    expect(text).toContain(' abc');
    expect(text).toContain('-def');
    expect(text).toContain('+xyz');
  });

  test('serializes multiple patches', () => {
    const patch1: Patch = {
      diffs: [{ op: DIFFERENCE_EQUAL, text: 'foo' }],
      start1: 0,
      start2: 0,
      length1: 3,
      length2: 3,
    };
    const patch2: Patch = {
      diffs: [{ op: DIFFERENCE_INSERT, text: 'bar' }],
      start1: 3,
      start2: 3,
      length1: 0,
      length2: 3,
    };
    const text = patchToText([patch1, patch2]);
    expect(text).toContain('@@ -1,3 +1,3 @@');
    expect(text).toContain('@@ -3,0 +4,3 @@');
    expect(text).toContain('+bar');
  });

  test('serializes patch with special characters', () => {
    const patch: Patch = {
      diffs: [{ op: DIFFERENCE_INSERT, text: 'a b+c%' }],
      start1: 0,
      start2: 0,
      length1: 0,
      length2: 6,
    };
    const text = patchToText([patch]);
    expect(text).toContain('+a b+c%25');
  });

  test('serializes empty patch array', () => {
    expect(patchToText([])).toBe('');
  });

  test('serializes patch with zero length', () => {
    const patch: Patch = {
      diffs: [],
      start1: 0,
      start2: 0,
      length1: 0,
      length2: 0,
    };
    const text = patchToText([patch]);
    expect(text).toContain('@@ -0,0 +0,0 @@');
  });

  test('patchToString matches patchToText for single patch', () => {
    const patch: Patch = {
      diffs: [{ op: DIFFERENCE_DELETE, text: 'abc' }],
      start1: 0,
      start2: 0,
      length1: 3,
      length2: 0,
    };
    expect(patchToText([patch])).toBe(patchToString(patch));
  });
});
