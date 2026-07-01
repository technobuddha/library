import { removeANSIEscapes } from '../remove-ansi-escapes.ts';

describe('removeANSIEscapes', () => {
  test('returns unchanged text when there are no ANSI escape sequences', () => {
    expect(removeANSIEscapes('plain text')).toBe('plain text');
  });

  test('removes ANSI CSI color sequences', () => {
    const input = '\u{1B}[31mred\u{1B}[39m';
    expect(removeANSIEscapes(input)).toBe('red');
  });

  test('removes multiple ANSI sequences from one string', () => {
    const input = '\u{1B}[1mBold\u{1B}[22m and \u{1B}[4munderlined\u{1B}[24m';
    expect(removeANSIEscapes(input)).toBe('Bold and underlined');
  });

  test('removes ANSI OSC sequences', () => {
    const input = '\u{1B}]8;;https://example.com\u{7}link\u{1B}]8;;\u{7}';
    expect(removeANSIEscapes(input)).toBe('link');
  });

  test('handles empty input', () => {
    expect(removeANSIEscapes('')).toBe('');
  });
});
