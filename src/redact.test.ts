import { redact } from './redact.ts';

describe('redact', () => {
  test('removes OSC escape sequences', () => {
    // OSC: ESC ] ... BEL
    const input = 'foo\u001B]0;title\u0007bar';
    expect(redact(input)).toBe('foobar');

    // OSC: ESC ] ... ESC \
    const input2 = 'foo\u001B]0;title\u001B\\bar';
    expect(redact(input2)).toBe('foobar');

    // OSC: ESC ] ... ST (0x9c)
    const input3 = 'foo\u001B]0;title\u009cbar';
    expect(redact(input3)).toBe('foobar');
  });

  test('removes CSI escape sequences', () => {
    // CSI: ESC [31m (set foreground color red)
    const input = 'foo\u001B[31mbar';
    expect(redact(input)).toBe('foobar');

    // CSI: C1 0x9B [32m (set foreground color green)
    const input2 = 'foo\u009B[32mbar';
    expect(redact(input2)).toBe('foobar');

    // CSI: ESC [1;34m (bold blue)
    const input3 = 'foo\u001B[1;34mbar';
    expect(redact(input3)).toBe('foobar');
  });

  test('removes multiple and mixed ANSI escape sequences', () => {
    const input = '\u001B[31mred\u001B[0m normal \u001B]0;title\u0007text';
    expect(redact(input)).toBe('red normal text');
  });

  test('returns string unchanged if no ANSI sequences', () => {
    const input = 'plain text';
    expect(redact(input)).toBe('plain text');
  });

  test('removes escape sequences in the middle of text', () => {
    const input = 'foo\u001B[31mbar\u001B[0mbaz';
    expect(redact(input)).toBe('foobarbaz');
  });

  test('removes nested and repeated ANSI sequences', () => {
    const input = '\u001B[31mfoo\u001B[32mbar\u001B[0mbaz\u001B[1;34mqux\u001B[0m';
    expect(redact(input)).toBe('foobarbazqux');
  });

  test('handles empty string', () => {
    expect(redact('')).toBe('');
  });

  test('handles only escape sequences', () => {
    const input = '\u001B[31m\u001B[0m\u001B]0;title\u0007';
    expect(redact(input)).toBe('');
  });

  test('does not remove non-ANSI Unicode or control characters', () => {
    const input = 'foo\u2022bar\u0009baz'; // bullet and tab
    expect(redact(input)).toBe('foo\u2022bar\u0009baz');
  });
});
