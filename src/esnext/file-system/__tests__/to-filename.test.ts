import { toFilename } from '../to-filename.ts';

describe('toFilename', () => {
  test('replaces bad characters', () => {
    expect(toFilename('x/x\\x:x*x?x<x>x|x.x-x')).toBe('x-x-x-x-x-x-x-x-x-x-x');
    expect(toFilename('x//y: :z*  ?q')).toBe('x-y-z-q');
    expect(toFilename('my:illegal/file*name?')).toBe('my-illegal-file-name');
  });

  test('truncates long text', () => {
    expect(
      toFilename('now is the time for all good men to come to the aid of their country.'),
    ).toBe('now is the time for all good men to come to the aid of…ir country');
    expect(toFilename('a very long filename that should be truncated', { maxLength: 30 })).toBe(
      'a very long filename… truncated',
    );
  });

  test('controls the disambiguate', () => {
    expect(
      toFilename('now is the time for all good men to come to the aid of their country.', {
        disambiguate: 20,
      }),
    ).toBe('now is the time for all good men to come to …aid of their country');
    expect(
      toFilename('now is the time for all good men to come to the aid of their country.', {
        maxLength: 15,
        disambiguate: 20,
      }),
    ).toBe('-…aid of their co');
  });

  test('controls the maxLength', () => {
    expect(
      toFilename('now is the time for all good men to come to the aid of their country.', {
        maxLength: 20,
      }),
    ).toBe('now is the…ir country');
  });

  test('controls the replacement character', () => {
    expect(toFilename('x/x\\x:x*x?x<x>x|x.x_x', { replacement: '_' })).toBe(
      'x_x_x_x_x_x_x_x_x_x_x',
    );
    expect(toFilename('spaces   and---dashes', { replacement: '_' })).toBe('spaces and---dashes');
  });

  test('removes spaces if spaces option is false', () => {
    expect(toFilename('file name with spaces', { spaces: false })).toBe('file-name-with-spaces');
  });

  test('returns replacement if result is empty', () => {
    expect(toFilename('////', { replacement: '_' })).toBe('_');
  });

  test('handles empty string', () => {
    expect(toFilename('', { replacement: '_' })).toBe('_');
  });

  test('custom separator', () => {
    expect(toFilename('abcdefg1234567', { maxLength: 8, disambiguate: 4, separator: '#' })).toBe(
      'abcd#4567',
    );
  });
});
