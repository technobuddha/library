import { empty } from '../../unicode/unicode.ts';

import { cleanStart } from '../clean-start.ts';

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
    expect(cleanStart('@@@a b c d@@@', /@/v)).toBe('a b c d@@@');
    expect(cleanStart('xyza b c dxyzxyz', /xyz/v)).toBe('a b c dxyzxyz');
  });

  test('should accept arrays of strings', () => {
    expect(cleanStart('@%!a b c d!%@', ['@', '%!'])).toBe('a b c d!%@');
  });

  test('should accept arrays of regular expressions', () => {
    expect(cleanStart('@%!a b c d!%@', [/@/v, /%|!/v])).toBe('a b c d!%@');
  });

  test('should accept mixed arrays of regular expressions', () => {
    expect(cleanStart('@%!a b c d!%@', [/@/v, '%!'])).toBe('a b c d!%@');
  });
});
