import {
  DIFFERENCE_DELETE,
  DIFFERENCE_EQUAL,
  DIFFERENCE_INSERT,
} from '../../difference/difference.ts';

import { patchFromText } from '../patch-from-text.ts';

describe('patchFromText', () => {
  test('parses a simple patch', () => {
    const text = '@@ -1,3 +1,3 @@\n abc\n-def\n+xyz\n';
    const patches = patchFromText(text);
    expect(patches).toHaveLength(1);
    expect(patches[0].start1).toBe(0);
    expect(patches[0].length1).toBe(3);
    expect(patches[0].start2).toBe(0);
    expect(patches[0].length2).toBe(3);
    expect(patches[0].diffs).toEqual([
      { op: DIFFERENCE_EQUAL, text: 'abc' },
      { op: DIFFERENCE_DELETE, text: 'def' },
      { op: DIFFERENCE_INSERT, text: 'xyz' },
    ]);
  });

  test('returns empty array for empty input', () => {
    expect(patchFromText('')).toEqual([]);
  });

  test('throws error for invalid header', () => {
    expect(() => patchFromText('invalid header')).toThrow();
  });

  test('throws error for illegal escape', () => {
    const text = '@@ -1,1 +1,1 @@\n-%E0%A4%A'; // incomplete URI
    expect(() => patchFromText(text)).toThrow();
  });

  test('parses multiple patches', () => {
    const text = '@@ -1,1 +1,1 @@\n abc\n@@ -2,1 +2,1 @@\n def\n';
    const patches = patchFromText(text);
    expect(patches).toHaveLength(2);
    expect(patches[0].diffs[0]).toEqual({ op: DIFFERENCE_EQUAL, text: 'abc' });
    expect(patches[1].diffs[0]).toEqual({ op: DIFFERENCE_EQUAL, text: 'def' });
  });
});
