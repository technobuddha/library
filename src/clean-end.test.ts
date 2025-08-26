// cspell:ignore xyza dxyzxyz

import { cleanEnd } from './clean-end.ts';
import { empty } from './unicode.ts';

describe('cleanEnd', () => {
  test('should trim whitespace', () => {
    expect(cleanEnd(empty)).toBe(empty);
    expect(cleanEnd('a b c d')).toBe('a b c d');
    expect(cleanEnd('   a b c d   ')).toBe('   a b c d');
  });

  test('should accept string characters', () => {
    expect(cleanEnd('***a b c d***', '*')).toBe('***a b c d');
    expect(cleanEnd('*#*a b c d#*#', '*#')).toBe('*#*a b c d');
  });

  test('should accept regular expressions', () => {
    expect(cleanEnd('@@@a b c d@@@', /@/u)).toBe('@@@a b c d');
    expect(cleanEnd('xyza b c dxyzxyz', /xyz/u)).toBe('xyza b c d');
  });

  test('should accept arrays of strings', () => {
    expect(cleanEnd('@%!a b c d!%@', ['@', '%!'])).toBe('@%!a b c d');
  });

  test('should accept arrays of regular expressions', () => {
    expect(cleanEnd('@%!a b c d!%@', [/@/u, /%|!/u])).toBe('@%!a b c d');
  });

  test('should accept mixed arrays of regular expressions', () => {
    expect(cleanEnd('@%!a b c d!%@', [/@/u, '%!'])).toBe('@%!a b c d');
  });
});
