import { titleCase } from './title-case.ts';

describe('titleCase', () => {
  test('should handle sentences', () => {
    expect(titleCase('now is the time for all good men to come to the aid of their country.')).toBe(
      'Now Is the Time for All Good Men to Come to the Aid of Their Country.',
    );
  });

  test('should handle compound hyphenated words', () => {
    expect(titleCase('mother-in-law')).toBe('Mother-in-Law');
  });

  test('should handle acronyms', () => {
    expect(titleCase('AT&T')).toBe('AT&T');
  });
});
