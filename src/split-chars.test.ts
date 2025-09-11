import { splitChars } from './split-chars.ts';
import { empty } from './unicode.ts';

describe('splitChars', () => {
  test('should split strings', () => {
    expect(splitChars('abcdefghi')).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);
    expect(splitChars(empty)).toEqual([]);
    expect(splitChars('⒜⒝⒞⒟')).toEqual(['⒜', '⒝', '⒞', '⒟']);
    expect(splitChars('😀😁😂😺😸😹')).toEqual(['😀', '😁', '😂', '😺', '😸', '😹']);
  });
});
