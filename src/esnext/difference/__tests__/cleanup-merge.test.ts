import { empty } from '../../unicode/unicode.ts';

import { cleanupMerge } from '../cleanup-merge.ts';
import {
  type Difference,
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../difference.ts';

describe('cleanupMerge', () => {
  test('Null case.', () => {
    const diffs: Difference[] = [];
    cleanupMerge(diffs);
    expect(diffs).toEqual([]);
  });

  test('No change case.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_DELETE, text: 'b' },
      { op: DIFFERENCE_INSERT, text: 'c' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toEqual([
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_DELETE, text: 'b' },
      { op: DIFFERENCE_INSERT, text: 'c' },
    ]);
  });

  test('Merge equalities.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 'b' },
      { op: DIFFERENCE_EQUAL, text: 'c' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([{ op: DIFFERENCE_EQUAL, text: 'abc' }]);
  });

  test('Merge deletions.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_DELETE, text: 'b' },
      { op: DIFFERENCE_DELETE, text: 'c' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([{ op: DIFFERENCE_DELETE, text: 'abc' }]);
  });

  test('Merge insertions.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_INSERT, text: 'a' },
      { op: DIFFERENCE_INSERT, text: 'b' },
      { op: DIFFERENCE_INSERT, text: 'c' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([{ op: DIFFERENCE_INSERT, text: 'abc' }]);
  });

  test('Merge interweave.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_INSERT, text: 'b' },
      { op: DIFFERENCE_DELETE, text: 'c' },
      { op: DIFFERENCE_INSERT, text: 'd' },
      { op: DIFFERENCE_EQUAL, text: 'e' },
      { op: DIFFERENCE_EQUAL, text: 'f' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_DELETE, text: 'ac' },
      { op: DIFFERENCE_INSERT, text: 'bd' },
      { op: DIFFERENCE_EQUAL, text: 'ef' },
    ]);
  });

  test('Prefix and suffix detection.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_INSERT, text: 'abc' },
      { op: DIFFERENCE_DELETE, text: 'dc' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_DELETE, text: 'd' },
      { op: DIFFERENCE_INSERT, text: 'b' },
      { op: DIFFERENCE_EQUAL, text: 'c' },
    ]);
  });

  test('Prefix and suffix detection with equalities.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'x' },
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_INSERT, text: 'abc' },
      { op: DIFFERENCE_DELETE, text: 'dc' },
      { op: DIFFERENCE_EQUAL, text: 'y' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'xa' },
      { op: DIFFERENCE_DELETE, text: 'd' },
      { op: DIFFERENCE_INSERT, text: 'b' },
      { op: DIFFERENCE_EQUAL, text: 'cy' },
    ]);
  });

  test('Slide edit left.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_INSERT, text: 'ba' },
      { op: DIFFERENCE_EQUAL, text: 'c' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_INSERT, text: 'ab' },
      { op: DIFFERENCE_EQUAL, text: 'ac' },
    ]);
  });

  test('Slide edit right.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'c' },
      { op: DIFFERENCE_INSERT, text: 'ab' },
      { op: DIFFERENCE_EQUAL, text: 'a' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'ca' },
      { op: DIFFERENCE_INSERT, text: 'ba' },
    ]);
  });

  test('Slide edit left recursive.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_DELETE, text: 'b' },
      { op: DIFFERENCE_EQUAL, text: 'c' },
      { op: DIFFERENCE_DELETE, text: 'ac' },
      { op: DIFFERENCE_EQUAL, text: 'x' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_DELETE, text: 'abc' },
      { op: DIFFERENCE_EQUAL, text: 'acx' },
    ]);
  });

  test('Slide edit right recursive.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'x' },
      { op: DIFFERENCE_DELETE, text: 'ca' },
      { op: DIFFERENCE_EQUAL, text: 'c' },
      { op: DIFFERENCE_DELETE, text: 'b' },
      { op: DIFFERENCE_EQUAL, text: 'a' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'xca' },
      { op: DIFFERENCE_DELETE, text: 'cba' },
    ]);
  });

  test('Empty merge.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'b' },
      { op: DIFFERENCE_INSERT, text: 'ab' },
      { op: DIFFERENCE_EQUAL, text: 'c' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_INSERT, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 'bc' },
    ]);
  });

  test('Empty equality.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: empty },
      { op: DIFFERENCE_INSERT, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 'b' },
    ];
    cleanupMerge(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_INSERT, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 'b' },
    ]);
  });
});
