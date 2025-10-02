import {
  type Difference,
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../../difference/difference.ts';

import { patchMake } from '../patch-make.ts';
import { type PatchInternal } from '../types.ts';

describe('patchMake', () => {
  const options: PatchInternal = {
    margin: 4,
    timeout: 1.0,
    editCost: 4,
    matchThreshold: 0.5,
    matchDistance: 1000,
    deleteThreshold: 0.5,
    maxBits: 32,
    deadline: Date.now() + 1000,
  };

  test('returns empty array for identical strings', () => {
    expect(patchMake('abc', 'abc', options)).toEqual([]);
  });

  test('creates patch for simple insert', () => {
    const patches = patchMake('abc', 'abcd', options);
    expect(patches).toHaveLength(1);
    expect(patches[0].diffs.some((d) => d.op === DIFFERENCE_INSERT && d.text === 'd')).toBeTrue();
  });

  test('creates patch for simple delete', () => {
    const patches = patchMake('abcd', 'abc', options);
    expect(patches).toHaveLength(1);
    expect(patches[0].diffs.some((d) => d.op === DIFFERENCE_DELETE && d.text === 'd')).toBeTrue();
  });

  test('creates patch for replace', () => {
    const patches = patchMake('abc', 'axc', options);
    expect(patches[0].diffs.some((d) => d.op === DIFFERENCE_DELETE && d.text === 'b')).toBeTrue();
    expect(patches[0].diffs.some((d) => d.op === DIFFERENCE_INSERT && d.text === 'x')).toBeTrue();
  });

  test('creates patch from diffs only', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'foo' },
      { op: DIFFERENCE_DELETE, text: 'bar' },
      { op: DIFFERENCE_INSERT, text: 'baz' },
    ];
    const patches = patchMake(undefined, diffs, options);
    expect(patches).toHaveLength(1);
    // Only non-equal diffs are included in patch.diffs
    expect(patches[0].diffs).toEqual([
      { op: DIFFERENCE_DELETE, text: 'bar' },
      { op: DIFFERENCE_INSERT, text: 'baz' },
    ]);
  });

  test('creates patch from text1 and diffs', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'foo' },
      { op: DIFFERENCE_DELETE, text: 'bar' },
      { op: DIFFERENCE_INSERT, text: 'baz' },
    ];
    const patches = patchMake('foobar', diffs, options);
    expect(patches).toHaveLength(1);
    // Only non-equal diffs are included in patch.diffs
    expect(patches[0].diffs).toEqual([
      { op: DIFFERENCE_DELETE, text: 'bar' },
      { op: DIFFERENCE_INSERT, text: 'baz' },
    ]);
  });

  test('throws error for invalid call signature', () => {
    // @ts-expect-error Invalid call signature for patchMake (should throw TypeError)
    expect(() => patchMake(123, 'abc', options)).toThrow(TypeError);
  });

  test('handles large margin', () => {
    const opts: PatchInternal = {
      margin: 100,
      timeout: 1.0,
      editCost: 4,
      matchThreshold: 0.5,
      matchDistance: 1000,
      deleteThreshold: 0.5,
      maxBits: 32,
      deadline: Date.now() + 1000,
    };
    const patches = patchMake('abc', 'abXYZc', opts);
    expect(patches.length).toBeGreaterThanOrEqual(1);
  });

  test('returns empty array for empty input', () => {
    expect(patchMake('', '', options)).toEqual([]);
  });
});
