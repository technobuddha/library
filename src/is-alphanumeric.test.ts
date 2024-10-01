import { empty } from './constants.js';
import isAlphaNumeric from './is-alphanumeric.js';

// cspell:ignore AEIOU
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
