// cspell:ignore xyza dxyzxyz

import { clean } from './clean.ts';
import { empty } from './constants.ts';

describe('clean', () => {
  test('should trim whitespace', () => {
    expect(clean(empty)).toBe(empty);
    expect(clean('a b c d')).toBe('a b c d');
    expect(clean('   a b c d   ')).toBe('a b c d');
  });

  test('should accept string characters', () => {
    expect(clean('***a b c d***', '*')).toBe('a b c d');
    expect(clean('*#*a b c d#*#', '*#')).toBe('a b c d');
  });

  test('should accept regular expressions', () => {
    expect(clean('@@@a b c d@@@', /@/u)).toBe('a b c d');
    expect(clean('xyza b c dxyzxyz', /xyz/u)).toBe('a b c d');
  });

  test('should accept arrays of strings', () => {
    expect(clean('@%!a b c d!%@', ['@', '%!'])).toBe('a b c d');
  });

  test('should accept arrays of regular expressions', () => {
    expect(clean('@%!a b c d!%@', [/@/u, /%|!/u])).toBe('a b c d');
  });

  test('should accept mixed arrays of regular expressions', () => {
    expect(clean('@%!a b c d!%@', [/@/u, '%!'])).toBe('a b c d');
  });
});
