/* eslint-disable require-unicode-regexp */
import { matches } from '../matches.ts';

describe('matches', () => {
  test('should match string', () => {
    expect(matches('abc', 'xyz')).toBeFalse();
    expect(matches('abc', 'abc')).toBeTrue();
  });

  test('should ignore case', () => {
    expect(matches('abc', 'ABC')).toBeTrue();
  });

  test('should match regexp', () => {
    expect(matches('abc', /abc/v)).toBeTrue();
  });

  test('should match array', () => {
    expect(matches('abc', [/abc/v, 'xyz'])).toBeTrue();
    expect(matches('abc', [/xyz/v, 'abc'])).toBeTrue();
    expect(matches('abc', [/xyz/v, 'xyz'])).toBeFalse();
    expect(matches('abc', [])).toBeFalse();
  });

  test('should match nested array (iterable branch)', () => {
    // Positive: inner array contains a matching string
    expect(matches('abc', [['abc', /def/]])).toBeTrue();
    // Positive: inner array contains a matching regexp
    expect(matches('abc', [[/abc/v, 'def']])).toBeTrue();
    // Negative: inner array contains no match
    expect(matches('abc', [['def', /xyz/v]])).toBeFalse();
    // Negative: multiple inner arrays, none match
    expect(matches('abc', [['def', /xyz/v], ['ghi']])).toBeFalse();
    // Positive: multiple inner arrays, one matches
    expect(matches('abc', [['def', /xyz/v], ['abc']])).toBeTrue();
  });
});
