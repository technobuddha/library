import { cleanupSemanticLossless } from '../cleanup-semantic-lossless.ts';
import {
  type Difference,
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../difference.ts';

describe('cleanupSemanticLossless', () => {
  test('Blank line boundary (score 5 branch)', () => {
    // This triggers the blank line branch in cleanupSemanticScore
    // The edit is at a blank line boundary
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'foo\n\n' },
      { op: DIFFERENCE_INSERT, text: 'bar' },
      { op: DIFFERENCE_EQUAL, text: '\n\nbaz' },
    ];
    cleanupSemanticLossless(diffs);
    // The edit should remain, but the branch is exercised
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'foo\n\n' },
      { op: DIFFERENCE_INSERT, text: 'bar' },
      { op: DIFFERENCE_EQUAL, text: '\n\nbaz' },
    ]);
  });

  test('Whitespace boundary (score 2 branch)', () => {
    // This triggers the whitespace branch in cleanupSemanticScore
    // The edit is at a space boundary
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'foo ' },
      { op: DIFFERENCE_INSERT, text: 'bar' },
      { op: DIFFERENCE_EQUAL, text: ' baz' },
    ];
    cleanupSemanticLossless(diffs);
    // The edit should remain, but the branch is exercised
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'foo ' },
      { op: DIFFERENCE_INSERT, text: 'bar' },
      { op: DIFFERENCE_EQUAL, text: ' baz' },
    ]);
  });

  test('Non-alphanumeric boundary (score 1 branch)', () => {
    // This triggers the non-alphanumeric branch in cleanupSemanticScore
    // The edit is at a comma boundary
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'foo,' },
      { op: DIFFERENCE_INSERT, text: 'bar' },
      { op: DIFFERENCE_EQUAL, text: 'baz' },
    ];
    cleanupSemanticLossless(diffs);
    // The edit should remain, but the branch is exercised
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'foo,' },
      { op: DIFFERENCE_INSERT, text: 'bar' },
      { op: DIFFERENCE_EQUAL, text: 'baz' },
    ]);
  });

  test('End of sentence boundary (score 3 branch)', () => {
    // This triggers the end of sentence branch in cleanupSemanticScore
    // The edit is at a period followed by a space
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'Hello.' },
      { op: DIFFERENCE_INSERT, text: ' ' },
      { op: DIFFERENCE_EQUAL, text: 'World' },
    ];
    cleanupSemanticLossless(diffs);
    // The edit should remain, but the branch is exercised
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'Hello.' },
      { op: DIFFERENCE_INSERT, text: ' ' },
      { op: DIFFERENCE_EQUAL, text: 'World' },
    ]);
  });

  test('No boundary score (return 0 branch)', () => {
    // This triggers the final return 0 in cleanupSemanticScore
    // Use two equalities and an edit with only alphanumeric, no whitespace or punctuation
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'abc' },
      { op: DIFFERENCE_INSERT, text: 'def' },
      { op: DIFFERENCE_EQUAL, text: 'ghi' },
    ];
    cleanupSemanticLossless(diffs);
    // No shifting should occur, as there are no boundaries
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'abc' },
      { op: DIFFERENCE_INSERT, text: 'def' },
      { op: DIFFERENCE_EQUAL, text: 'ghi' },
    ]);
  });
  test('Null case.', () => {
    const diffs: Difference[] = [];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([]);
  });
  test('Blank lines.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'AAA\r\n\r\nBBB' },
      { op: DIFFERENCE_INSERT, text: '\r\nDDD\r\n\r\nBBB' },
      { op: DIFFERENCE_EQUAL, text: '\r\nEEE' },
    ];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'AAA\r\n\r\n' },
      { op: DIFFERENCE_INSERT, text: 'BBB\r\nDDD\r\n\r\n' },
      { op: DIFFERENCE_EQUAL, text: 'BBB\r\nEEE' },
    ]);
  });
  test('Line boundaries.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'AAA\r\nBBB' },
      { op: DIFFERENCE_INSERT, text: ' DDD\r\nBBB' },
      { op: DIFFERENCE_EQUAL, text: ' EEE' },
    ];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'AAA\r\n' },
      { op: DIFFERENCE_INSERT, text: 'BBB DDD\r\n' },
      { op: DIFFERENCE_EQUAL, text: 'BBB EEE' },
    ]);
  });
  test('Word boundaries.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'The c' },
      { op: DIFFERENCE_INSERT, text: 'ow and the c' },
      { op: DIFFERENCE_EQUAL, text: 'at.' },
    ];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'The ' },
      { op: DIFFERENCE_INSERT, text: 'cow and the ' },
      { op: DIFFERENCE_EQUAL, text: 'cat.' },
    ]);
  });
  test('Alphanumeric boundaries.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'The-c' },
      { op: DIFFERENCE_INSERT, text: 'ow-and-the-c' },
      { op: DIFFERENCE_EQUAL, text: 'at.' },
    ];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'The-' },
      { op: DIFFERENCE_INSERT, text: 'cow-and-the-' },
      { op: DIFFERENCE_EQUAL, text: 'cat.' },
    ]);
  });
  test('Hitting the start.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'a' },
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 'ax' },
    ];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 'aax' },
    ]);
  });
  test('Hitting the end.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'xa' },
      { op: DIFFERENCE_DELETE, text: 'a' },
      { op: DIFFERENCE_EQUAL, text: 'a' },
    ];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'xaa' },
      { op: DIFFERENCE_DELETE, text: 'a' },
    ]);
  });
  test('Sentence boundaries.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: 'The xxx. The ' },
      { op: DIFFERENCE_INSERT, text: 'zzz. The ' },
      { op: DIFFERENCE_EQUAL, text: 'yyy.' },
    ];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'The xxx.' },
      { op: DIFFERENCE_INSERT, text: ' The zzz.' },
      { op: DIFFERENCE_EQUAL, text: ' The yyy.' },
    ]);
  });
});
