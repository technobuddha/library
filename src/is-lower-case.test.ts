import { empty, space } from './constants.js';
import { isLowerCase } from './is-lower-case.js';

describe('isLowerCase', () => {
  test('should detect lower case', () => {
    expect(isLowerCase('abcdef')).toBeTrue();
    expect(isLowerCase('ABCdef')).toBeFalse();
    expect(isLowerCase('ABCDEF')).toBeFalse();
    expect(isLowerCase(space)).toBeFalse();
    expect(isLowerCase(empty)).toBeFalse();
    expect(isLowerCase('abc.def')).toBeFalse();
    expect(isLowerCase('$')).toBeFalse();
  });
});
