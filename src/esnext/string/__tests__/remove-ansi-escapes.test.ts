import { removeANSIEscapes } from '../remove-ansi-escapes.ts';

describe('removeANSIEscapes', () => {
  test('returns unchanged text when there are no ANSI escape sequences', () => {
    expect(removeANSIEscapes('plain text')).toBe('plain text');
  });

  test('removes ANSI CSI color sequences', () => {
    const input = '\u001b[31mred\u001b[39m';
    expect(removeANSIEscapes(input)).toBe('red');
  });

  test('removes multiple ANSI sequences from one string', () => {
    const input = '\u001b[1mBold\u001b[22m and \u001b[4munderlined\u001b[24m';
    expect(removeANSIEscapes(input)).toBe('Bold and underlined');
  });

  test('removes ANSI OSC sequences', () => {
    const input = '\u001b]8;;https://example.com\u0007link\u001b]8;;\u0007';
    expect(removeANSIEscapes(input)).toBe('link');
  });

  test('handles empty input', () => {
    expect(removeANSIEscapes('')).toBe('');
  });
});
