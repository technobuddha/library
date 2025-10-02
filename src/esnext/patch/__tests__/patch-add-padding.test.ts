import { DIFFERENCE_EQUAL } from '../../difference/difference.ts';

import { patchAddPadding } from '../patch-add-padding.ts';
import { type Patch, type PatchInternal } from '../types.ts';

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

describe('patchAddPadding', () => {
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

  test('adds padding to empty patch', () => {
    const patch = makePatch(0, 0, 0, 0, []);
    const padding = patchAddPadding([patch], options);
    expect(padding.length).toBe(options.margin);
    expect(patch.diffs[0]).toEqual({ op: DIFFERENCE_EQUAL, text: padding });
    expect(patch.diffs.at(-1)).toEqual({ op: DIFFERENCE_EQUAL, text: padding });
  });

  test('adds padding to patch with non-equal diffs', () => {
    const patch = makePatch(0, 0, 3, 3, [{ op: 1, text: 'abc' }]);
    const padding = patchAddPadding([patch], options);
    expect(patch.diffs[0]).toEqual({ op: DIFFERENCE_EQUAL, text: padding });
    expect(patch.diffs.at(-1)).toEqual({ op: DIFFERENCE_EQUAL, text: padding });
  });

  test('grows first and last equality if present', () => {
    const patch = makePatch(0, 0, 3, 3, [
      { op: DIFFERENCE_EQUAL, text: 'x' },
      { op: 1, text: 'abc' },
      { op: DIFFERENCE_EQUAL, text: 'y' },
    ]);
    const padding = patchAddPadding([patch], options);
    expect(patch.diffs[0].text.startsWith(padding.slice(1))).toBeTrue();
    expect(patch.diffs.at(-1)?.text.endsWith(padding.slice(0, options.margin - 1))).toBeTrue();
  });

  test('returns correct padding string', () => {
    const patch = makePatch(0, 0, 1, 1, []);
    const padding = patchAddPadding([patch], options);
    expect(padding).toBe(
      String.fromCharCode(1) +
        String.fromCharCode(2) +
        String.fromCharCode(3) +
        String.fromCharCode(4),
    );
  });
});
