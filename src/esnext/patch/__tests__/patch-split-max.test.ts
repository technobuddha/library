import {
  type Difference,
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../../difference/difference.ts';

import { patchSplitMax } from '../patch-split-max.ts';
import { type Patch, type PatchInternal } from '../types.ts';

const makePatch = (diffs: Difference[], length1: number, length2: number): Patch => ({
  diffs,
  start1: 0,
  start2: 0,
  length1,
  length2,
});

describe('patchSplitMax', () => {
  const options: PatchInternal = {
    margin: 4,
    timeout: 1.0,
    editCost: 4,
    matchThreshold: 0.5,
    matchDistance: 1000,
    deleteThreshold: 0.5,
    maxBits: 10,
    deadline: Date.now() + 1000,
  };

  test('does not split patch below maxBits', () => {
    const patch = makePatch(
      [
        { op: DIFFERENCE_EQUAL, text: 'abc' },
        { op: DIFFERENCE_INSERT, text: 'def' },
      ],
      3,
      6,
    );
    const patches = [patch];
    patchSplitMax(patches, options);
    expect(patches).toHaveLength(1);
    expect(patches[0].diffs).toEqual(patch.diffs);
  });

  test('splits patch above maxBits', () => {
    const patch = makePatch(
      [
        { op: DIFFERENCE_EQUAL, text: 'abcdefghijklmnopqrst' }, // 20 chars
        { op: DIFFERENCE_DELETE, text: 'xxxxxxxxxxxx' }, // 12 chars
      ],
      32,
      20,
    );
    const patches = [patch];
    patchSplitMax(patches, options);
    expect(patches.length).toBeGreaterThan(1);
    expect(
      patches.map((p) => p.length1).every((l) => l <= options.maxBits + options.margin),
    ).toBeTrue();
  });

  test('handles large deletion', () => {
    const patch = makePatch([{ op: DIFFERENCE_DELETE, text: 'a'.repeat(30) }], 30, 0);
    const patches = [patch];
    patchSplitMax(patches, options);
    expect(patches.length).toBeGreaterThan(1);
    expect(patches.every((p) => p.diffs.some((d) => d.op === DIFFERENCE_DELETE))).toBeTrue();
  });

  test('does not split patch with only insertions', () => {
    const patch = makePatch([{ op: DIFFERENCE_INSERT, text: 'abcdefghij' }], 0, 10);
    const patches = [patch];
    patchSplitMax(patches, options);
    expect(patches).toHaveLength(1);
    expect(patches[0].diffs).toEqual(patch.diffs);
  });

  test('handles empty patch array', () => {
    const patches: Patch[] = [];
    patchSplitMax(patches, options);
    expect(patches).toEqual([]);
  });

  test('handles patch with only equalities', () => {
    const patch = makePatch([{ op: DIFFERENCE_EQUAL, text: 'abcdefghij' }], 10, 10);
    const patches = [patch];
    patchSplitMax(patches, options);
    expect(patches).toHaveLength(1);
    expect(patches[0].diffs).toEqual(patch.diffs);
  });
});
