import { empty } from '../../unicode/unicode.ts';

import { charsToLines } from '../chars-to-lines.ts';
import {
  type Difference,
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../difference.ts';
import { linesToChars } from '../lines-to-chars.ts';

describe('charsToLines', () => {
  test('Convert chars up to lines.', () => {
    const diffs: Difference[] = [
      { op: DIFFERENCE_EQUAL, text: '\u{1}\u{2}\u{1}' },
      { op: DIFFERENCE_INSERT, text: '\u{2}\u{1}\u{2}' },
    ];
    charsToLines(diffs, [empty, 'alpha\n', 'beta\n']);
    expect(diffs).toStrictEqual([
      { op: DIFFERENCE_EQUAL, text: 'alpha\nbeta\nalpha\n' },
      { op: DIFFERENCE_INSERT, text: 'beta\nalpha\nbeta\n' },
    ]);
  });

  test('More than 256 to reveal any 8-bit limitations.', () => {
    const n = 300;
    const lineList = [];
    const charList = [];
    for (let i = 1; i < n + 1; i++) {
      lineList[i - 1] = `${i}\n`;
      charList[i - 1] = String.fromCharCode(i);
    }
    expect(lineList).toHaveLength(n);
    const lines = lineList.join(empty);
    const chars = charList.join(empty);
    expect(chars).toHaveLength(n);
    lineList.unshift(empty);
    const diffs: Difference[] = [{ op: DIFFERENCE_DELETE, text: chars }];
    charsToLines(diffs, lineList);
    expect(diffs).toStrictEqual([{ op: DIFFERENCE_DELETE, text: lines }]);
  });

  test('More than 65536 to verify any 16-bit limitation.', () => {
    const lineList: string[] = [];
    for (let i = 0; i < 66000; i++) {
      lineList[i] = `${i}\n`;
    }
    const chars = lineList.join(empty);
    const results = linesToChars(chars, empty);
    const diffs: Difference[] = [{ op: DIFFERENCE_INSERT, text: results.chars1 }];
    charsToLines(diffs, results.lineArray);
    expect(diffs[0].text).toBe(chars);
  });
});
