// import expect from '#util/expect';
import splitChars from './split-chars';
import { empty } from './constants';

// cspell:ignore abcdefghi
describe('splitChars', () => {
  test('should split strings', () => {
    expect(splitChars('abcdefghi')).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);
    expect(splitChars(empty)).toEqual([]);
    expect(splitChars('⒜⒝⒞⒟')).toEqual(['⒜', '⒝', '⒞', '⒟']);
    expect(splitChars('😀😁😂😺😸😹')).toEqual(['😀', '😁', '😂', '😺', '😸', '😹']);
  });
});
