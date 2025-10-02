import { cleanupSemantic } from '../cleanup-semantic.ts';
import {
  type Difference,
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../difference.ts';

describe('cleanupSemantic', () => {
  test('Null case.', () => {
    const diffs: Difference[] = [];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([]);
  });

  test('No elimination #1.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'ab' },
      { op: DIFFERENCE_INSERT, text: 'cd' },
      { op: DIFFERENCE_EQUAL, text: '12' },
      { op: DIFFERENCE_DELETE, text: 'e' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_DELETE, text: 'ab' },
      { op: DIFFERENCE_INSERT, text: 'cd' },
      { op: DIFFERENCE_EQUAL, text: '12' },
      { op: DIFFERENCE_DELETE, text: 'e' },
    ]);
  });

  test('No elimination #2.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'abc' },
      { op: DIFFERENCE_INSERT, text: 'ABC' },
      { op: DIFFERENCE_EQUAL, text: '1234' },
      { op: DIFFERENCE_DELETE, text: 'wxyz' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_DELETE, text: 'abc' },
      { op: DIFFERENCE_INSERT, text: 'ABC' },
      { op: DIFFERENCE_EQUAL, text: '1234' },
      { op: DIFFERENCE_DELETE, text: 'wxyz' },
    ]);
  });

  test('Simple elimination.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 'b' },
      { op: DIFFERENCE_DELETE, text: 'c' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_DELETE, text: 'abc' },
      { op: DIFFERENCE_INSERT, text: 'b' },
    ]);
  });

  test('Backpass elimination.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'ab' },
      { op: DIFFERENCE_EQUAL, text: 'cd' },
      { op: DIFFERENCE_DELETE, text: 'e' },
      { op: DIFFERENCE_EQUAL, text: 'f' },
      { op: DIFFERENCE_INSERT, text: 'g' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_DELETE, text: 'abcdef' },
      { op: DIFFERENCE_INSERT, text: 'cdfg' },
    ]);
  });

  test('Multiple eliminations.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_INSERT, text: '1' },
      { op: DIFFERENCE_EQUAL, text: 'A' },
      { op: DIFFERENCE_DELETE, text: 'B' },
      { op: DIFFERENCE_INSERT, text: '2' },
      { op: DIFFERENCE_EQUAL, text: '_' },
      { op: DIFFERENCE_INSERT, text: '1' },
      { op: DIFFERENCE_EQUAL, text: 'A' },
      { op: DIFFERENCE_DELETE, text: 'B' },
      { op: DIFFERENCE_INSERT, text: '2' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_DELETE, text: 'AB_AB' },
      { op: DIFFERENCE_INSERT, text: '1A2_1A2' },
    ]);
  });

  test('Word boundaries.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'The c' },
      { op: DIFFERENCE_DELETE, text: 'ow and the c' },
      { op: DIFFERENCE_EQUAL, text: 'at.' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'The ' },
      { op: DIFFERENCE_DELETE, text: 'cow and the ' },
      { op: DIFFERENCE_EQUAL, text: 'cat.' },
    ]);
  });

  test('No overlap elimination.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'abcxx' },
      { op: DIFFERENCE_INSERT, text: 'xxdef' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_DELETE, text: 'abcxx' },
      { op: DIFFERENCE_INSERT, text: 'xxdef' },
    ]);
  });

  test('Overlap elimination.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'abcxxx' },
      { op: DIFFERENCE_INSERT, text: 'xxxdef' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_DELETE, text: 'abc' },
      { op: DIFFERENCE_EQUAL, text: 'xxx' },
      { op: DIFFERENCE_INSERT, text: 'def' },
    ]);
  });

  test('Reverse overlap elimination.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'xxxabc' },
      { op: DIFFERENCE_INSERT, text: 'defxxx' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_INSERT, text: 'def' },
      { op: DIFFERENCE_EQUAL, text: 'xxx' },
      { op: DIFFERENCE_DELETE, text: 'abc' },
    ]);
  });

  test('Two overlap eliminations.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_DELETE, text: 'abcd1212' },
      { op: DIFFERENCE_INSERT, text: '1212efghi' },
      { op: DIFFERENCE_EQUAL, text: '----' },
      { op: DIFFERENCE_DELETE, text: 'A3' },
      { op: DIFFERENCE_INSERT, text: '3BC' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_DELETE, text: 'abcd' },
      { op: DIFFERENCE_EQUAL, text: '1212' },
      { op: DIFFERENCE_INSERT, text: 'efghi' },
      { op: DIFFERENCE_EQUAL, text: '----' },
      { op: DIFFERENCE_DELETE, text: 'A' },
      { op: DIFFERENCE_EQUAL, text: '3' },
      { op: DIFFERENCE_INSERT, text: 'BC' },
    ]);
  });
});
