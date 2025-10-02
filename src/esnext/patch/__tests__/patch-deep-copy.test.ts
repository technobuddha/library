import { patchDeepCopy } from '../patch-deep-copy.ts';
import { type Patch } from '../types.ts';

function makePatch(
  start1: number,
  start2: number,
  length1: number,
  length2: number,
  diffs: unknown[] = [],
): Patch {
  return {
    start1,
    start2,
    length1,
    length2,
    diffs: [...diffs],
  } as Patch;
}

describe('patchDeepCopy', () => {
  test('returns a deep copy of patches', () => {
    const original = [
      makePatch(0, 0, 3, 3, [{ op: 1, text: 'abc' }]),
      makePatch(1, 2, 2, 2, [{ op: -1, text: 'xy' }]),
    ];
    const copy = patchDeepCopy(original);
    expect(copy).toEqual(original);
    expect(copy).not.toBe(original);
    expect(copy[0]).not.toBe(original[0]);
    expect(copy[0].diffs).not.toBe(original[0].diffs);
  });

  test('modifying copy does not affect original', () => {
    const original = [makePatch(0, 0, 1, 1, [{ op: 1, text: 'a' }])];
    const copy = patchDeepCopy(original);
    copy[0].diffs[0].text = 'b';
    expect(original[0].diffs[0].text).toBe('a');
  });

  test('handles empty array', () => {
    const copy = patchDeepCopy([]);
    expect(copy).toEqual([]);
  });

  test('handles patch with empty diffs', () => {
    const original = [makePatch(0, 0, 0, 0, [])];
    const copy = patchDeepCopy(original);
    expect(copy[0].diffs).toEqual([]);
  });
});
