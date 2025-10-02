import {
  type Difference,
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../../difference/difference.ts';

import { levenshtein } from '../levenshtein.ts';

describe('levenshtein', () => {
  test('Empty diffs array.', () => {
    const diffs: Difference[] = [];
    expect(levenshtein(diffs)).toBe(0);
  });

  test('Single equality.', () => {
    const diffs: Difference[] = [{ op: DIFFERENCE_EQUAL, text: 'abc' }];
    expect(levenshtein(diffs)).toBe(0);
  });

  test('Single insertion.', () => {
    const diffs: Difference[] = [{ op: DIFFERENCE_INSERT, text: 'abc' }];
    expect(levenshtein(diffs)).toBe(3);
  });

  test('Single deletion.', () => {
    const diffs: Difference[] = [{ op: DIFFERENCE_DELETE, text: 'abc' }];
    expect(levenshtein(diffs)).toBe(3);
  });

  test('Multiple insertions.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_INSERT, text: 'ab' },
      { op: DIFFERENCE_INSERT, text: 'cd' },
    ];
    expect(levenshtein(diffs)).toBe(4);
  });

  test('Multiple deletions.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'ab' },
      { op: DIFFERENCE_DELETE, text: 'cd' },
    ];
    expect(levenshtein(diffs)).toBe(4);
  });

  test('Substitution (delete and insert).', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_INSERT, text: 'b' },
      { op: DIFFERENCE_EQUAL, text: 'c' },
    ];
    expect(levenshtein(diffs)).toBe(1);
  });

  test('Multiple substitutions.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'ab' },
      { op: DIFFERENCE_INSERT, text: 'cd' },
      { op: DIFFERENCE_EQUAL, text: 'e' },
      { op: DIFFERENCE_DELETE, text: 'fg' },
      { op: DIFFERENCE_INSERT, text: 'hi' },
    ];
    expect(levenshtein(diffs)).toBe(4);
  });

  test('Unbalanced substitution (more insertions).', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_INSERT, text: 'bcd' },
      { op: DIFFERENCE_EQUAL, text: 'e' },
    ];
    expect(levenshtein(diffs)).toBe(3);
  });

  test('Unbalanced substitution (more deletions).', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'abc' },
      { op: DIFFERENCE_INSERT, text: 'd' },
      { op: DIFFERENCE_EQUAL, text: 'e' },
    ];
    expect(levenshtein(diffs)).toBe(3);
  });

  test('Complex sequence with mixed operations.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'The ' },
      { op: DIFFERENCE_DELETE, text: 'quick' },
      { op: DIFFERENCE_INSERT, text: 'slow' },
      { op: DIFFERENCE_EQUAL, text: ' ' },
      { op: DIFFERENCE_DELETE, text: 'brown' },
      { op: DIFFERENCE_INSERT, text: 'red' },
      { op: DIFFERENCE_EQUAL, text: ' fox' },
    ];
    // 'quick' -> 'slow' = max(5, 4) = 5
    // 'brown' -> 'red' = max(5, 3) = 5
    // Total = 10
    expect(levenshtein(diffs)).toBe(10);
  });

  test('Insertions and deletions without equality separator.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'abc' },
      { op: DIFFERENCE_INSERT, text: 'def' },
    ];
    // Without an equality, these accumulate and are counted at the end as max(3, 3) = 3
    expect(levenshtein(diffs)).toBe(3);
  });

  test('Multiple equalities reset counters.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'ab' },
      { op: DIFFERENCE_INSERT, text: 'cd' },
      { op: DIFFERENCE_EQUAL, text: 'e' },
      { op: DIFFERENCE_EQUAL, text: 'f' },
      { op: DIFFERENCE_DELETE, text: 'gh' },
      { op: DIFFERENCE_INSERT, text: 'ij' },
      { op: DIFFERENCE_EQUAL, text: 'k' },
    ];
    expect(levenshtein(diffs)).toBe(4);
  });

  test('Only equalities.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'abc' },
      { op: DIFFERENCE_EQUAL, text: 'def' },
      { op: DIFFERENCE_EQUAL, text: 'ghi' },
    ];
    expect(levenshtein(diffs)).toBe(0);
  });

  test('Trailing insertions and deletions.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'abc' },
      { op: DIFFERENCE_DELETE, text: 'def' },
      { op: DIFFERENCE_INSERT, text: 'ghij' },
    ];
    expect(levenshtein(diffs)).toBe(4);
  });

  test('Empty text operations.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: '' },
      { op: DIFFERENCE_INSERT, text: '' },
      { op: DIFFERENCE_EQUAL, text: 'abc' },
    ];
    expect(levenshtein(diffs)).toBe(0);
  });

  test('Real world example - cat to dog.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'c' },
      { op: DIFFERENCE_INSERT, text: 'd' },
      { op: DIFFERENCE_EQUAL, text: 'o' },
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 't' },
      { op: DIFFERENCE_INSERT, text: 'g' },
    ];
    // First substitution: c->d = 1
    // Second: a deleted = 1
    // Third: g inserted = 1
    // Total = 3
    expect(levenshtein(diffs)).toBe(3);
  });

  test('All operations in sequence.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_INSERT, text: 'a' },
      { op: DIFFERENCE_DELETE, text: 'b' },
      { op: DIFFERENCE_EQUAL, text: 'c' },
      { op: DIFFERENCE_INSERT, text: 'd' },
      { op: DIFFERENCE_DELETE, text: 'e' },
      { op: DIFFERENCE_EQUAL, text: 'f' },
    ];
    expect(levenshtein(diffs)).toBe(2);
  });
});
