import { toCodePoints } from '../to-code-points.ts';

describe('toCodePoints', () => {
  test('returns an empty array for an empty string', () => {
    expect(toCodePoints('')).toEqual([]);
  });

  test('converts basic latin characters to code points', () => {
    expect(toCodePoints('ABC')).toEqual([65, 66, 67]);
  });

  test('converts astral plane characters to single code points', () => {
    expect(toCodePoints('😀')).toEqual([0x1f600]);
    expect(toCodePoints('A😀Z')).toEqual([65, 0x1f600, 90]);
  });

  test('preserves individual code points in grapheme clusters', () => {
    expect(toCodePoints('👨‍👩‍👧‍👦')).toEqual([
      0x1f468, 0x200d, 0x1f469, 0x200d, 0x1f467, 0x200d, 0x1f466,
    ]);
  });
});
