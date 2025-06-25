import { empty } from './constants.ts';
import { isAlphaNumeric } from './is-alpha-numeric.ts';

describe('isAlphaNumeric', () => {
  test('should detect alphanumeric strings', () => {
    expect(isAlphaNumeric('AEIOU')).toBeTrue();
    expect(isAlphaNumeric('ÂÊîÔû')).toBeTrue();
    expect(isAlphaNumeric('A B')).toBeFalse();
    expect(isAlphaNumeric('A.B')).toBeFalse();
    expect(isAlphaNumeric(empty)).toBeFalse();
    expect(isAlphaNumeric('AB101')).toBeTrue();
    expect(isAlphaNumeric('01101001')).toBeTrue();
  });
});
