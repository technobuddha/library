import { empty } from '../unicode.ts';

import { linesToChars } from './lines-to-chars.ts';

describe('linesToChars', () => {
  test('Convert lines down to characters', () => {
    expect(linesToChars('alpha\nbeta\nalpha\n', 'beta\nalpha\nbeta\n')).toEqual({
      chars1: '\u0001\u0002\u0001',
      chars2: '\u0002\u0001\u0002',
      lineArray: [empty, 'alpha\n', 'beta\n'],
    });

    expect(linesToChars(empty, 'alpha\r\nbeta\r\n\r\n\r\n')).toEqual({
      chars1: empty,
      chars2: '\u0001\u0002\u0003\u0003',
      lineArray: [empty, 'alpha\r\n', 'beta\r\n', '\r\n'],
    });

    expect(linesToChars('a', 'b')).toEqual({
      chars1: '\u0001',
      chars2: '\u0002',
      lineArray: [empty, 'a', 'b'],
    });

    const n = 300;
    const lineList: string[] = [];
    const charList: string[] = [];
    for (let i = 0; i < n; i++) {
      lineList[i] = `${i + 1}\n`;

      charList[i] = String.fromCharCode(i + 1);
    }
    expect(lineList).toHaveLength(n);
    const lines = lineList.join(empty);
    const chars = charList.join(empty);
    expect(chars).toHaveLength(n);
    lineList.unshift(empty);

    expect(linesToChars(lines, empty)).toEqual({
      chars1: chars,
      chars2: empty,
      lineArray: lineList,
    });
  });
});
