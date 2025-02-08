import { empty } from './constants.ts';
import { isAlpha } from './is-alpha.ts';

describe('isAlpha', () => {
  test('should detect alphabetic strings', () => {
    // cspell:ignore AEIOU
    expect(isAlpha('AEIOU')).toBeTrue();
    expect(isAlpha('ÂÊîÔû')).toBeTrue();
    expect(isAlpha('A B')).toBeFalse();
    expect(isAlpha('A.B')).toBeFalse();
    expect(isAlpha(empty)).toBeFalse();
    expect(isAlpha('AB101')).toBeFalse();
    expect(isAlpha('01101001')).toBeFalse();
  });
});
