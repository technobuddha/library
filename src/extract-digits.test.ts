// import expect from '#util/expect';
import extractDigits from './extract-digits';
import { empty } from './constants';

describe('extractDigits', () => {
  test('should add Suffixes when needed', () => {
    expect(extractDigits('abcdef')).toBe(empty);
    expect(extractDigits('a0b1c2d3e4')).toBe('01234');
    expect(extractDigits('123')).toBe('123');
    expect(extractDigits(empty)).toBe(empty);
  });
});
