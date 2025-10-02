import { build } from '../build.ts';

describe('build', () => {
  test('should build strings', () => {
    expect(build()).toBe('');
    expect(build('a')).toBe('a');
    expect(build('a', 'b', 'c')).toBe('abc');
    expect(build(['a', 'b', 'c'])).toBe('abc');
    expect(build('a', ['b', 'c'], 'd')).toBe('abcd');
    expect(build('abc', ['d', 'e'], 'f')).toBe('abcdef');
  });

  test('should handle generators', () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    function* gen(): Generator<string> {
      yield '1';
      yield '2';
      yield '3';
    }
    expect(build(gen())).toBe('123');
  });

  test('should handle null and undefined values', () => {
    expect(build(null, 'a', undefined, 'b')).toBe('ab');
    expect(build(null, undefined)).toBe('');
  });
});
