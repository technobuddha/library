import { empty, space } from './constants.js';
import { isUpperCase } from './is-upper-case.js';

describe('isUpperCase', () => {
  test('should detect lower case', () => {
    expect(isUpperCase('ABCDEF')).toBeTrue();
    expect(isUpperCase('ABCdef')).toBeFalse();
    expect(isUpperCase('abcdef')).toBeFalse();
    expect(isUpperCase(space)).toBeFalse();
    expect(isUpperCase(empty)).toBeFalse();
    expect(isUpperCase('ABC.DEF')).toBeFalse();
    expect(isUpperCase('$')).toBeFalse();
  });
});
