// cspell:ignore xyza dxyzxyz

import { clean, cleanEnd, cleanStart } from './clean.ts';
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

describe('cleanStart', () => {
  test('should trim whitespace', () => {
    expect(cleanStart(empty)).toBe(empty);
    expect(cleanStart('a b c d')).toBe('a b c d');
    expect(cleanStart('   a b c d   ')).toBe('a b c d   ');
  });

  test('should accept string characters', () => {
    expect(cleanStart('***a b c d***', '*')).toBe('a b c d***');
    expect(cleanStart('*#*a b c d#*#', '*#')).toBe('a b c d#*#');
  });

  test('should accept regular expressions', () => {
    expect(cleanStart('@@@a b c d@@@', /@/u)).toBe('a b c d@@@');
    expect(cleanStart('xyza b c dxyzxyz', /xyz/u)).toBe('a b c dxyzxyz');
  });

  test('should accept arrays of strings', () => {
    expect(cleanStart('@%!a b c d!%@', ['@', '%!'])).toBe('a b c d!%@');
  });

  test('should accept arrays of regular expressions', () => {
    expect(cleanStart('@%!a b c d!%@', [/@/u, /%|!/u])).toBe('a b c d!%@');
  });

  test('should accept mixed arrays of regular expressions', () => {
    expect(cleanStart('@%!a b c d!%@', [/@/u, '%!'])).toBe('a b c d!%@');
  });
});
