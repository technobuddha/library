import { isUpperCase } from './is-upper-case.ts';
import { empty, space } from './unicode.ts';

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
