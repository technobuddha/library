import { empty } from '../unicode.ts';

import { cleanupMerge } from './cleanup-merge.ts';
import { type Diff, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT } from './difference.ts';

describe('cleanupMerge', () => {
  test('Null case.', () => {
    const diffs: Diff[] = [];
    cleanupMerge(diffs);
    expect(diffs).toEqual([]);
  });

  test('No change case.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'a' },
      { op: DIFF_DELETE, text: 'b' },
      { op: DIFF_INSERT, text: 'c' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toEqual([
      { op: DIFF_EQUAL, text: 'a' },
      { op: DIFF_DELETE, text: 'b' },
      { op: DIFF_INSERT, text: 'c' },
    ]);
  });

  test('Merge equalities.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'a' },
      { op: DIFF_EQUAL, text: 'b' },
      { op: DIFF_EQUAL, text: 'c' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([{ op: DIFF_EQUAL, text: 'abc' }]);
  });

  test('Merge deletions.', () => {
    const diffs: Diff[] = [
      { op: DIFF_DELETE, text: 'a' },
      { op: DIFF_DELETE, text: 'b' },
      { op: DIFF_DELETE, text: 'c' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([{ op: DIFF_DELETE, text: 'abc' }]);
  });

  test('Merge insertions.', () => {
    const diffs: Diff[] = [
      { op: DIFF_INSERT, text: 'a' },
      { op: DIFF_INSERT, text: 'b' },
      { op: DIFF_INSERT, text: 'c' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([{ op: DIFF_INSERT, text: 'abc' }]);
  });

  test('Merge interweave.', () => {
    const diffs: Diff[] = [
      { op: DIFF_DELETE, text: 'a' },
      { op: DIFF_INSERT, text: 'b' },
      { op: DIFF_DELETE, text: 'c' },
      { op: DIFF_INSERT, text: 'd' },
      { op: DIFF_EQUAL, text: 'e' },
      { op: DIFF_EQUAL, text: 'f' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_DELETE, text: 'ac' },
      { op: DIFF_INSERT, text: 'bd' },
      { op: DIFF_EQUAL, text: 'ef' },
    ]);
  });

  test('Prefix and suffix detection.', () => {
    const diffs: Diff[] = [
      { op: DIFF_DELETE, text: 'a' },
      { op: DIFF_INSERT, text: 'abc' },
      { op: DIFF_DELETE, text: 'dc' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_EQUAL, text: 'a' },
      { op: DIFF_DELETE, text: 'd' },
      { op: DIFF_INSERT, text: 'b' },
      { op: DIFF_EQUAL, text: 'c' },
    ]);
  });

  test('Prefix and suffix detection with equalities.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'x' },
      { op: DIFF_DELETE, text: 'a' },
      { op: DIFF_INSERT, text: 'abc' },
      { op: DIFF_DELETE, text: 'dc' },
      { op: DIFF_EQUAL, text: 'y' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_EQUAL, text: 'xa' },
      { op: DIFF_DELETE, text: 'd' },
      { op: DIFF_INSERT, text: 'b' },
      { op: DIFF_EQUAL, text: 'cy' },
    ]);
  });

  test('Slide edit left.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'a' },
      { op: DIFF_INSERT, text: 'ba' },
      { op: DIFF_EQUAL, text: 'c' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_INSERT, text: 'ab' },
      { op: DIFF_EQUAL, text: 'ac' },
    ]);
  });

  test('Slide edit right.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'c' },
      { op: DIFF_INSERT, text: 'ab' },
      { op: DIFF_EQUAL, text: 'a' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_EQUAL, text: 'ca' },
      { op: DIFF_INSERT, text: 'ba' },
    ]);
  });

  test('Slide edit left recursive.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'a' },
      { op: DIFF_DELETE, text: 'b' },
      { op: DIFF_EQUAL, text: 'c' },
      { op: DIFF_DELETE, text: 'ac' },
      { op: DIFF_EQUAL, text: 'x' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_DELETE, text: 'abc' },
      { op: DIFF_EQUAL, text: 'acx' },
    ]);
  });

  test('Slide edit right recursive.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'x' },
      { op: DIFF_DELETE, text: 'ca' },
      { op: DIFF_EQUAL, text: 'c' },
      { op: DIFF_DELETE, text: 'b' },
      { op: DIFF_EQUAL, text: 'a' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_EQUAL, text: 'xca' },
      { op: DIFF_DELETE, text: 'cba' },
    ]);
  });

  test('Empty merge.', () => {
    const diffs: Diff[] = [
      { op: DIFF_DELETE, text: 'b' },
      { op: DIFF_INSERT, text: 'ab' },
      { op: DIFF_EQUAL, text: 'c' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_INSERT, text: 'a' },
      { op: DIFF_EQUAL, text: 'bc' },
    ]);
  });

  test('Empty equality.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: empty },
      { op: DIFF_INSERT, text: 'a' },
      { op: DIFF_EQUAL, text: 'b' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_INSERT, text: 'a' },
      { op: DIFF_EQUAL, text: 'b' },
    ]);
  });
});
