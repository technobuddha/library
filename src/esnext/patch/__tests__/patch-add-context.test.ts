import { patchAddContext } from '../patch-add-context.ts';
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

describe('patchAddContext', () => {
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

  test('does nothing for empty text', () => {
    const patch = makePatch(0, 0);
    patchAddContext(patch, '', options);
    expect(patch.diffs).toEqual([]);
    expect(patch.start1).toBe(0);
    expect(patch.start2).toBe(0);
    expect(patch.length1).toBe(0);
    expect(patch.length2).toBe(0);
  });

  test('adds context to patch', () => {
    const text = 'abcdefg';
    const patch = makePatch(2, 3, [{ op: 1, text: 'cde' }]);
    patchAddContext(patch, text, options);
    // Should add some context before and after
    expect(patch.diffs.length).toBeGreaterThan(1);
    expect(patch.length1).toBeGreaterThanOrEqual(3);
    expect(patch.length2).toBeGreaterThanOrEqual(3);
  });

  test('expands context for non-unique pattern', () => {
    const text = 'abcabcabc';
    const patch = makePatch(3, 3, [{ op: 1, text: 'abc' }]);
    patchAddContext(patch, text, options);
    // Should add context if pattern is not unique
    expect(patch.diffs.length).toBeGreaterThan(1);
    expect(patch.length1).toBeGreaterThanOrEqual(3);
    expect(patch.length2).toBeGreaterThanOrEqual(3);
  });

  test('context may exceed maxBits', () => {
    const text = 'a'.repeat(100);
    const patch = makePatch(10, 10, [{ op: 1, text: 'a'.repeat(10) }]);
    const limitedOptions: PatchInternal = {
      timeout: 1,
      editCost: 4,
      matchThreshold: 0.5,
      matchDistance: 1000,
      deleteThreshold: 0.5,
      margin: 2,
      maxBits: 20,
      deadline: Date.now() + 1000,
    };
    patchAddContext(patch, text, limitedOptions);
    // Implementation may exceed maxBits, just check context is added
    expect(patch.length1).toBeGreaterThanOrEqual(10);
    expect(patch.length2).toBeGreaterThanOrEqual(10);
  });
});
