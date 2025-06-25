import { matches } from './matches.ts';

describe('matches', () => {
  test('should match string', () => {
    expect(matches('abc', 'xyz')).toBeFalse();
    expect(matches('abc', 'abc')).toBeTrue();
  });

  test('should ignore case', () => {
    expect(matches('abc', 'ABC')).toBeTrue();
  });

  test('should match regexp', () => {
    expect(matches('abc', /abc/u)).toBeTrue();
  });

  test('should match array', () => {
    expect(matches('abc', [/abc/u, 'xyz'])).toBeTrue();
    expect(matches('abc', [/xyz/u, 'abc'])).toBeTrue();
    expect(matches('abc', [/xyz/u, 'xyz'])).toBeFalse();
    expect(matches('abc', [])).toBeFalse();
  });
});
