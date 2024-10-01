import { empty } from './constants.js';
import isAlpha from './is-alpha.js';

describe('isAlpha', () => {
  test('should detect alphabetic strings', () => {
    // cspell:disable
    expect(isAlpha('AEIOU')).toBeTrue();
    expect(isAlpha('ÂÊîÔû')).toBeTrue();
    expect(isAlpha('A B')).toBeFalse();
    expect(isAlpha('A.B')).toBeFalse();
    expect(isAlpha(empty)).toBeFalse();
    expect(isAlpha('AB101')).toBeFalse();
    expect(isAlpha('01101001')).toBeFalse();
    // cspell:enable
  });
});
