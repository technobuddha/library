import {
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../../difference/difference.ts';

import {
  applyPatches,
  patch,
  patchesFromText,
  patchesToText,
  type PatchOptions,
} from '../patch-public.ts';

describe('patch-public API', () => {
  const options: PatchOptions = { margin: 4, timeout: 1.0, editCost: 4 };

  test('patch creates patches from two strings', () => {
    const patches = patch('abc', 'abXc', options);
    expect(patches).toHaveLength(1);
    expect(patches[0].diffs.some((d) => d.op === DIFFERENCE_INSERT && d.text === 'X')).toBeTrue();
  });

  test('patch creates patches from diffs', () => {
    const diffs = [
      { op: DIFFERENCE_EQUAL, text: 'foo' },
      { op: DIFFERENCE_DELETE, text: 'bar' },
      { op: DIFFERENCE_INSERT, text: 'baz' },
    ];
    const patches = patch('foobar', diffs, options);
    expect(patches).toHaveLength(1);
    expect(patches[0].diffs.some((d) => d.op === DIFFERENCE_DELETE && d.text === 'bar')).toBeTrue();
    expect(patches[0].diffs.some((d) => d.op === DIFFERENCE_INSERT && d.text === 'baz')).toBeTrue();
  });

  test('applyPatches applies patch to text', () => {
    const patches = patch('abc', 'abXc', options);
    const result = applyPatches(patches, 'abc', options);
    expect(result.text).toBe('abXc');
    expect(result.results.every(Boolean)).toBeTrue();
  });

  test('patchesToText and patchesFromText round-trip', () => {
    const patches = patch('abc', 'abXc', options);
    const text = patchesToText(patches);
    const parsed = patchesFromText(text);
    expect(parsed).toEqual(patches);
  });

  test('patchesFromText throws on invalid input', () => {
    expect(() => patchesFromText('not a patch')).toThrow();
  });

  test('patch returns empty array for identical strings', () => {
    expect(patch('abc', 'abc', options)).toEqual([]);
  });

  test('applyPatches returns original text for empty patch', () => {
    const patches = patch('abc', 'abc', options);
    const result = applyPatches(patches, 'abc', options);
    expect(result.text).toBe('abc');
    expect(result.results).toEqual([]);
  });

  test('patch works with custom options', () => {
    const customOptions: PatchOptions = { margin: 10, timeout: 2.0, editCost: 2 };
    const patches = patch('abc', 'abYc', customOptions);
    expect(patches.length).toBeGreaterThanOrEqual(1);
  });
});
