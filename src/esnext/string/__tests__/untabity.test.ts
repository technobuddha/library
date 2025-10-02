import { untabify } from '../untabify.ts';

describe('untabify', () => {
  test('replaces single tab with spaces', () => {
    expect(untabify('\tHello', 4)).toBe('    Hello');
  });

  test('replaces multiple tabs in one line', () => {
    expect(untabify('A\tB\tC', 4)).toBe('A   B   C');
  });

  test('handles tab stops correctly', () => {
    expect(untabify('123\t5', 4)).toBe('123 5'); // tab at col 3, so 1 space to col 4
  });

  test('works with custom tab width', () => {
    expect(untabify('A\tB', 2)).toBe('A B');
  });

  test('handles multiple lines', () => {
    expect(untabify('A\tB\nC\tD', 4)).toBe('A   B\nC   D');
  });

  test('no tabs returns original string', () => {
    expect(untabify('Hello World', 4)).toBe('Hello World');
  });

  test('empty string returns empty', () => {
    expect(untabify('', 4)).toBe('');
  });
});
