import { isAlphaNumeric } from './is-alpha-numeric.ts';
import { empty } from './unicode.ts';

describe('isAlphaNumeric', () => {
  test('should detect alphanumeric strings', () => {
    // cspell:ignore AEIOU
    expect(isAlphaNumeric('AEIOU')).toBeTrue();
    expect(isAlphaNumeric('ÂÊîÔû')).toBeTrue();
    expect(isAlphaNumeric('A B')).toBeFalse();
    expect(isAlphaNumeric('A.B')).toBeFalse();
    expect(isAlphaNumeric(empty)).toBeFalse();
    expect(isAlphaNumeric('AB101')).toBeTrue();
    expect(isAlphaNumeric('01101001')).toBeTrue();
  });
});
