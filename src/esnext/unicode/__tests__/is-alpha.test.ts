import { isAlpha } from '../is-alpha.ts';
import { empty } from '../unicode.ts';

describe('isAlpha', () => {
  test('should detect alphabetic strings', () => {
    expect(isAlpha('AEIOU')).toBeTrue();
    expect(isAlpha('ÂÊîÔû')).toBeTrue();
    expect(isAlpha('A B')).toBeFalse();
    expect(isAlpha('A.B')).toBeFalse();
    expect(isAlpha(empty)).toBeFalse();
    expect(isAlpha('AB101')).toBeFalse();
    expect(isAlpha('01101001')).toBeFalse();
  });
});
