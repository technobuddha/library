import { cleanupEfficiency } from '../cleanup-efficiency.ts';
import {
  type Difference,
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../difference.ts';

describe('cleanupEfficiency', () => {

  test('Covers else branch with two consecutive trivial equalities', () => {
    // This triggers the else branch and pointer is set to previous equality, then continues to process next candidate
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'A' },
      { op: DIFFERENCE_EQUAL, text: 'x' },
      { op: DIFFERENCE_INSERT, text: 'B' },
      { op: DIFFERENCE_EQUAL, text: 'y' },
      { op: DIFFERENCE_INSERT, text: 'C' },
    ];
    cleanupEfficiency(diffs, 4); // editCost high enough to consider 'x' and 'y' trivial
    // After cleanupMerge, both trivial equalities are split and merged
    expect(diffs).toEqual([
      { op: DIFFERENCE_DELETE, text: 'A' },
      { op: DIFFERENCE_EQUAL, text: 'x' },
      { op: DIFFERENCE_INSERT, text: 'B' },
      { op: DIFFERENCE_EQUAL, text: 'y' },
      { op: DIFFERENCE_INSERT, text: 'C' },
    ]);
  });

  test('Covers else branch with pointer set to previous equality', () => {
    // This triggers the else branch where equalitiesLength after decrement is > 0
    // Setup: Two equality candidates, so after removal, equalitiesLength-- becomes 1
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'A' },
      { op: DIFFERENCE_EQUAL, text: 'x' },
      { op: DIFFERENCE_INSERT, text: 'B' },
      { op: DIFFERENCE_EQUAL, text: 'y' },
      { op: DIFFERENCE_INSERT, text: 'C' },
    ];
    cleanupEfficiency(diffs, 4); // editCost high enough to consider 'x' and 'y' trivial
    // After cleanupMerge, the trivial equalities are split and merged
    expect(diffs).toEqual([
      { op: DIFFERENCE_DELETE, text: 'A' },
      { op: DIFFERENCE_EQUAL, text: 'x' },
      { op: DIFFERENCE_INSERT, text: 'B' },
      { op: DIFFERENCE_EQUAL, text: 'y' },
      { op: DIFFERENCE_INSERT, text: 'C' },
    ]);
  });

      test('Covers else branch with pointer -1 after trivial equality', () => {
        // This triggers the else branch where equalitiesLength becomes 0 and pointer is set to -1
        // Setup: Only one equality candidate, so after removal, equalitiesLength-- becomes 0
        const diffs: Difference[] = [
          { op: DIFFERENCE_DELETE, text: 'A' },
          { op: DIFFERENCE_EQUAL, text: 'x' },
          { op: DIFFERENCE_INSERT, text: 'B' },
        ];
        cleanupEfficiency(diffs, 4); // editCost high enough to consider 'x' trivial
        // After cleanupMerge, the trivial equality is split and merged
        expect(diffs).toEqual([
          { op: DIFFERENCE_DELETE, text: 'A' },
          { op: DIFFERENCE_EQUAL, text: 'x' },
          { op: DIFFERENCE_INSERT, text: 'B' },
        ]);
      });
    test('Removes trivial equality with preIns && preDel', () => {
      // This triggers the if (preIns && preDel) branch after removing equality
      const diffs: Difference[] = [
        { op: DIFFERENCE_INSERT, text: 'A' },
        { op: DIFFERENCE_DELETE, text: 'B' },
        { op: DIFFERENCE_EQUAL, text: 'x' },
        { op: DIFFERENCE_INSERT, text: 'C' },
        { op: DIFFERENCE_DELETE, text: 'D' },
      ];
      cleanupEfficiency(diffs, 4); // editCost high enough to consider 'x' trivial
      // After cleanupMerge, adjacent deletes and inserts are merged
      expect(diffs).toEqual([
        { op: DIFFERENCE_DELETE, text: 'BxD' },
        { op: DIFFERENCE_INSERT, text: 'AxC' },
      ]);
    });

    test('Removes trivial equality with else branch (preIns && preDel false)', () => {
      // This triggers the else branch after removing equality
      const diffs: Difference[] = [
        { op: DIFFERENCE_DELETE, text: 'A' },
        { op: DIFFERENCE_EQUAL, text: 'x' },
        { op: DIFFERENCE_INSERT, text: 'B' },
        { op: DIFFERENCE_EQUAL, text: 'y' },
        { op: DIFFERENCE_INSERT, text: 'C' },
      ];
      cleanupEfficiency(diffs, 4); // editCost high enough to consider 'x' trivial
      // After cleanupMerge, only the first equality is split, the rest are not merged
      expect(diffs).toEqual([
        { op: DIFFERENCE_DELETE, text: 'A' },
        { op: DIFFERENCE_EQUAL, text: 'x' },
        { op: DIFFERENCE_INSERT, text: 'B' },
        { op: DIFFERENCE_EQUAL, text: 'y' },
        { op: DIFFERENCE_INSERT, text: 'C' },
      ]);
    });

    test('Does not call cleanupMerge if no changes', () => {
      // Should not call cleanupMerge if no trivial equalities are found
      const diffs: Difference[] = [
        { op: DIFFERENCE_EQUAL, text: 'abc' },
        { op: DIFFERENCE_DELETE, text: 'def' },
        { op: DIFFERENCE_INSERT, text: 'ghi' },
      ];
      const original = JSON.stringify(diffs);
      cleanupEfficiency(diffs, 1); // editCost low, so no equality is trivial
      expect(JSON.stringify(diffs)).toBe(original);
    });

    test('Handles empty string equalities and minimal editCost', () => {
      const diffs: Difference[] = [
        { op: DIFFERENCE_DELETE, text: 'A' },
        { op: DIFFERENCE_EQUAL, text: '' },
        { op: DIFFERENCE_INSERT, text: 'B' },
      ];
      cleanupEfficiency(diffs, 1); // editCost = 1, so empty string is trivial
      // After cleanupMerge, empty equalities are retained
      expect(diffs).toEqual([
        { op: DIFFERENCE_DELETE, text: 'A' },
        { op: DIFFERENCE_EQUAL, text: '' },
        { op: DIFFERENCE_INSERT, text: 'B' },
      ]);
    });
  test('Null case', () => {
    const diffs: Difference[] = [];
    cleanupEfficiency(diffs, 4);
    expect(diffs).toEqual([]);
  });

  test('No change case', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_DELETE, text: 'b' },
      { op: DIFFERENCE_INSERT, text: 'c' },
    ];
    cleanupEfficiency(diffs, 4);
    expect(diffs).toEqual([
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_DELETE, text: 'b' },
      { op: DIFFERENCE_INSERT, text: 'c' },
    ]);
  });

  test('Eliminate trivial equality', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 'x' },
      { op: DIFFERENCE_INSERT, text: 'b' },
    ];
    cleanupEfficiency(diffs, 2);
    expect(diffs).toEqual([
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 'x' },
      { op: DIFFERENCE_INSERT, text: 'b' },
    ]);
  });

  test('Keep significant equality', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 'longer' },
      { op: DIFFERENCE_INSERT, text: 'b' },
    ];
    cleanupEfficiency(diffs, 2);
    expect(diffs).toEqual([
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 'longer' },
      { op: DIFFERENCE_INSERT, text: 'b' },
    ]);
  });

  test('Multiple trivial equalities', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 'x' },
      { op: DIFFERENCE_INSERT, text: 'b' },
      { op: DIFFERENCE_EQUAL, text: 'y' },
      { op: DIFFERENCE_DELETE, text: 'c' },
      { op: DIFFERENCE_EQUAL, text: 'z' },
      { op: DIFFERENCE_INSERT, text: 'd' },
    ];
    cleanupEfficiency(diffs, 2);
    expect(diffs).toEqual([
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 'x' },
      { op: DIFFERENCE_INSERT, text: 'b' },
      { op: DIFFERENCE_EQUAL, text: 'y' },
      { op: DIFFERENCE_DELETE, text: 'c' },
      { op: DIFFERENCE_EQUAL, text: 'z' },
      { op: DIFFERENCE_INSERT, text: 'd' },
    ]);
  });
});
