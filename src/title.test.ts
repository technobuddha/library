import { title } from './title.ts';

describe('title', () => {
  test('should handle sentences', () => {
    expect(title('now is the time for all good men to come to the aid of their country.')).toBe(
      'Now Is the Time for All Good Men to Come to the Aid of Their Country.',
    );
  });

  test('should handle compound hyphenated words', () => {
    expect(title('mother-in-law')).toBe('Mother-in-Law');
  });

  test('should handle acronyms', () => {
    expect(title('AT&T')).toBe('AT&T');
  });
});
