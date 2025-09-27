import { cleanupSemanticLossless } from './cleanup-semantic-lossless.ts';
import { type Diff, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT } from './difference.ts';

describe('cleanupSemanticLossless', () => {
  test('Null case.', () => {
    const diffs: Diff[] = [];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([]);
  });
  test('Blank lines.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'AAA\r\n\r\nBBB' },
      { op: DIFF_INSERT, text: '\r\nDDD\r\n\r\nBBB' },
      { op: DIFF_EQUAL, text: '\r\nEEE' },
    ];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_EQUAL, text: 'AAA\r\n\r\n' },
      { op: DIFF_INSERT, text: 'BBB\r\nDDD\r\n\r\n' },
      { op: DIFF_EQUAL, text: 'BBB\r\nEEE' },
    ]);
  });
  test('Line boundaries.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'AAA\r\nBBB' },
      { op: DIFF_INSERT, text: ' DDD\r\nBBB' },
      { op: DIFF_EQUAL, text: ' EEE' },
    ];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_EQUAL, text: 'AAA\r\n' },
      { op: DIFF_INSERT, text: 'BBB DDD\r\n' },
      { op: DIFF_EQUAL, text: 'BBB EEE' },
    ]);
  });
  test('Word boundaries.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'The c' },
      { op: DIFF_INSERT, text: 'ow and the c' },
      { op: DIFF_EQUAL, text: 'at.' },
    ];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_EQUAL, text: 'The ' },
      { op: DIFF_INSERT, text: 'cow and the ' },
      { op: DIFF_EQUAL, text: 'cat.' },
    ]);
  });
  test('Alphanumeric boundaries.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'The-c' },
      { op: DIFF_INSERT, text: 'ow-and-the-c' },
      { op: DIFF_EQUAL, text: 'at.' },
    ];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_EQUAL, text: 'The-' },
      { op: DIFF_INSERT, text: 'cow-and-the-' },
      { op: DIFF_EQUAL, text: 'cat.' },
    ]);
  });
  test('Hitting the start.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'a' },
      { op: DIFF_DELETE, text: 'a' },
      { op: DIFF_EQUAL, text: 'ax' },
    ];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_DELETE, text: 'a' },
      { op: DIFF_EQUAL, text: 'aax' },
    ]);
  });
  test('Hitting the end.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'xa' },
      { op: DIFF_DELETE, text: 'a' },
      { op: DIFF_EQUAL, text: 'a' },
    ];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_EQUAL, text: 'xaa' },
      { op: DIFF_DELETE, text: 'a' },
    ]);
  });
  test('Sentence boundaries.', () => {
    const diffs: Diff[] = [
      { op: DIFF_EQUAL, text: 'The xxx. The ' },
      { op: DIFF_INSERT, text: 'zzz. The ' },
      { op: DIFF_EQUAL, text: 'yyy.' },
    ];
    cleanupSemanticLossless(diffs);
    expect(diffs).toStrictEqual([
      { op: DIFF_EQUAL, text: 'The xxx.' },
      { op: DIFF_INSERT, text: ' The zzz.' },
      { op: DIFF_EQUAL, text: ' The yyy.' },
    ]);
  });
});
