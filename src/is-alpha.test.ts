// import expect from '#util/expect';
import isAlpha from './is-alpha';
import { empty } from './constants';

describe('isAlpha', () => {
  test('should detect alphabetic strings', () => {
    // cspell:disable
    expect(isAlpha('AEIOU')).toBe(true);
    expect(isAlpha('ÂÊîÔû')).toBe(true);
    expect(isAlpha('A B')).toBe(false);
    expect(isAlpha('A.B')).toBe(false);
    expect(isAlpha(empty)).toBe(false);
    expect(isAlpha('AB101')).toBe(false);
    expect(isAlpha('01101001')).toBe(false);
    // cspell:enable
  });
});
