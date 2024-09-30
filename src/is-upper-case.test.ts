// import expect from '#util/expect';
import isUpperCase from '../is-upper-case';
import { empty, space } from '../constants';

describe('isUpperCase', () => {
  test('should detect lower case', () => {
    expect(isUpperCase('ABCDEF')).toBe(true);
    expect(isUpperCase('ABCdef')).toBe(false);
    expect(isUpperCase('abcdef')).toBe(false);
    expect(isUpperCase(space)).toBe(false);
    expect(isUpperCase(empty)).toBe(false);
    expect(isUpperCase('ABC.DEF')).toBe(false);
    expect(isUpperCase('$')).toBe(false);
  });
});
