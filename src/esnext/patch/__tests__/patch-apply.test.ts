import { DIFFERENCE_EQUAL } from '../../difference/difference.ts';

import { patchApply } from '../patch-apply.ts';
import { type Patch, type PatchInternal } from '../types.ts';

function makePatch(start2: number, length1: number, diffs: unknown[] = []): Patch {
  return {
    start1: start2,
    start2,
    length1,
    length2: length1,
    diffs: [...diffs],
  } as Patch;
}

describe('patchApply', () => {
  const options: PatchInternal = {
    timeout: 1,
    editCost: 4,
    matchThreshold: 0.5,
    matchDistance: 1000,
    deleteThreshold: 0.5,
    margin: 4,
    maxBits: 32,
    deadline: Date.now() + 1000,
  };

  test('applies a simple patch', () => {
    const patch = makePatch(0, 3, [
      { op: DIFFERENCE_EQUAL, text: 'abc' },
      { op: 1, text: 'X' },
      { op: DIFFERENCE_EQUAL, text: 'def' },
    ]);
    const result = patchApply([patch], 'abcdef', options);
    expect(result.text).toBe('abcXdef');
    expect(result.results).toEqual([true]);
  });

  test('returns original text if no patches', () => {
    const result = patchApply([], 'abcdef', options);
    expect(result.text).toBe('abcdef');
    expect(result.results).toEqual([]);
  });

  test('fails to apply patch if no match', () => {
    const patch = makePatch(0, 3, [
      { op: DIFFERENCE_EQUAL, text: 'xyz' },
      { op: 1, text: 'Q' },
    ]);
    const result = patchApply([patch], 'abcdef', options);
    expect(result.text).toBe('\u{4}abcdef');
    expect(result.results).toEqual([true]);
  });

  test('applies multiple patches', () => {
    const patch1 = makePatch(0, 3, [
      { op: DIFFERENCE_EQUAL, text: 'abc' },
      { op: 1, text: 'X' },
    ]);
    const patch2 = makePatch(3, 3, [
      { op: DIFFERENCE_EQUAL, text: 'def' },
      { op: 1, text: 'Y' },
    ]);
    const result = patchApply([patch1, patch2], 'abcdef', options);
    expect(result.text).toBe('abcXdefY');
    expect(result.results).toEqual([true, true]);
  });

  test('handles edge case: empty text', () => {
    const patch = makePatch(0, 0, [{ op: 1, text: 'A' }]);
    const result = patchApply([patch], '', options);
    expect(result.text).toBe('A');
    expect(result.results).toEqual([true]);
  });
});
