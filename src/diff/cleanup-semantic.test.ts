import { cleanupSemantic } from './cleanup-semantic.ts';
import { type Diff, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT } from './difference.ts';

// cspell: ignore wxyz cdfg abcxx xxdef abcxxx xxxdef xxxabc defxxx efghi
describe('cleanupSemantic', () => {
  test('Null case.', () => {
    const diffs: Diff[] = [];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([]);
  });

  test('No elimination #1.', () => {
    const diffs: Diff[] = [
      { op: DIFF_DELETE, text: 'ab' },
      { op: DIFF_INSERT, text: 'cd' },
      { op: DIFF_EQUAL, text: '12' },
      { op: DIFF_DELETE, text: 'e' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_DELETE, text: 'ab' },
      { op: DIFF_INSERT, text: 'cd' },
      { op: DIFF_EQUAL, text: '12' },
      { op: DIFF_DELETE, text: 'e' },
    ]);
  });

  test('No elimination #2.', () => {
    const diffs: Diff[] = [
      { op: DIFF_DELETE, text: 'abc' },
      { op: DIFF_INSERT, text: 'ABC' },
      { op: DIFF_EQUAL, text: '1234' },
      { op: DIFF_DELETE, text: 'wxyz' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_DELETE, text: 'abc' },
      { op: DIFF_INSERT, text: 'ABC' },
      { op: DIFF_EQUAL, text: '1234' },
      { op: DIFF_DELETE, text: 'wxyz' },
    ]);
  });

  test('Simple elimination.', () => {
    const diffs: Diff[] = [
      { op: DIFF_DELETE, text: 'a' },
      { op: DIFF_EQUAL, text: 'b' },
      { op: DIFF_DELETE, text: 'c' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_DELETE, text: 'abc' },
      { op: DIFF_INSERT, text: 'b' },
    ]);
  });

  test('Backpass elimination.', () => {
    const diffs: Diff[] = [
      { op: DIFF_DELETE, text: 'ab' },
      { op: DIFF_EQUAL, text: 'cd' },
      { op: DIFF_DELETE, text: 'e' },
      { op: DIFF_EQUAL, text: 'f' },
      { op: DIFF_INSERT, text: 'g' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_DELETE, text: 'abcdef' },
      { op: DIFF_INSERT, text: 'cdfg' },
    ]);
  });

  test('Multiple eliminations.', () => {
    const diffs: Diff[] = [
      { op: DIFF_INSERT, text: '1' },
      { op: DIFF_EQUAL, text: 'A' },
      { op: DIFF_DELETE, text: 'B' },
      { op: DIFF_INSERT, text: '2' },
      { op: DIFF_EQUAL, text: '_' },
      { op: DIFF_INSERT, text: '1' },
      { op: DIFF_EQUAL, text: 'A' },
      { op: DIFF_DELETE, text: 'B' },
      { op: DIFF_INSERT, text: '2' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_DELETE, text: 'AB_AB' },
      { op: DIFF_INSERT, text: '1A2_1A2' },
    ]);
  });

  test('Word boundaries.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'The c' },
      { op: DIFF_DELETE, text: 'ow and the c' },
      { op: DIFF_EQUAL, text: 'at.' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_EQUAL, text: 'The ' },
      { op: DIFF_DELETE, text: 'cow and the ' },
      { op: DIFF_EQUAL, text: 'cat.' },
    ]);
  });

  test('No overlap elimination.', () => {
    const diffs: Diff[] = [
      { op: DIFF_DELETE, text: 'abcxx' },
      { op: DIFF_INSERT, text: 'xxdef' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_DELETE, text: 'abcxx' },
      { op: DIFF_INSERT, text: 'xxdef' },
    ]);
  });

  test('Overlap elimination.', () => {
    const diffs: Diff[] = [
      { op: DIFF_DELETE, text: 'abcxxx' },
      { op: DIFF_INSERT, text: 'xxxdef' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_DELETE, text: 'abc' },
      { op: DIFF_EQUAL, text: 'xxx' },
      { op: DIFF_INSERT, text: 'def' },
    ]);
  });

  test('Reverse overlap elimination.', () => {
    const diffs: Diff[] = [
      { op: DIFF_DELETE, text: 'xxxabc' },
      { op: DIFF_INSERT, text: 'defxxx' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_INSERT, text: 'def' },
      { op: DIFF_EQUAL, text: 'xxx' },
      { op: DIFF_DELETE, text: 'abc' },
    ]);
  });

  test('Two overlap eliminations.', () => {
    const diffs: Diff[] = [
      { op: DIFF_DELETE, text: 'abcd1212' },
      { op: DIFF_INSERT, text: '1212efghi' },
      { op: DIFF_EQUAL, text: '----' },
      { op: DIFF_DELETE, text: 'A3' },
      { op: DIFF_INSERT, text: '3BC' },
    ];
    cleanupSemantic(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_DELETE, text: 'abcd' },
      { op: DIFF_EQUAL, text: '1212' },
      { op: DIFF_INSERT, text: 'efghi' },
      { op: DIFF_EQUAL, text: '----' },
      { op: DIFF_DELETE, text: 'A' },
      { op: DIFF_EQUAL, text: '3' },
      { op: DIFF_INSERT, text: 'BC' },
    ]);
  });
});
