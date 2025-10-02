import { strip } from '../strip.ts';

describe('strip', () => {
  test('does not remove anything by default', () => {
    const input = 'foo\u001B[31mbar\u001B[0mbaz123!@#';
    expect(strip(input, {})).toBe('foo\u001B[31mbar\u001B[0mbaz123!@#');
  });

  test('removes OSC escape sequences when ansiEscapes is enabled', () => {
    // OSC: ESC ] ... BEL
    const input = 'foo\u001B]0;title\u0007bar';
    expect(strip(input, { ansiEscapes: true })).toBe('foobar');

    // OSC: ESC ] ... ESC \
    const input2 = 'foo\u001B]0;title\u001B\\bar';
    expect(strip(input2, { ansiEscapes: true })).toBe('foobar');

    // OSC: ESC ] ... ST (0x9c)
    const input3 = 'foo\u001B]0;title\u009cbar';
    expect(strip(input3, { ansiEscapes: true })).toBe('foobar');
  });

  test('removes CSI escape sequences when ansiEscapes is enabled', () => {
    // CSI: ESC [31m (set foreground color red)
    const input = 'foo\u001B[31mbar';
    expect(strip(input, { ansiEscapes: true })).toBe('foobar');

    // CSI: C1 0x9B [32m (set foreground color green)
    const input2 = 'foo\u009B[32mbar';
    expect(strip(input2, { ansiEscapes: true })).toBe('foobar');

    // CSI: ESC [1;34m (bold blue)
    const input3 = 'foo\u001B[1;34m bar';
    expect(strip(input3, { ansiEscapes: true })).toBe('foo bar');
  });

  test('removes multiple and mixed ANSI escape sequences when enabled', () => {
    const input = '\u001B[31mred\u001B[0m normal \u001B]0;title\u0007text';
    expect(strip(input, { ansiEscapes: true })).toBe('red normal text');
  });

  test('returns string unchanged if no matching sequences', () => {
    const input = 'plain text';
    expect(strip(input, { ansiEscapes: true })).toBe('plain text');
  });

  test('removes escape sequences in the middle of text when enabled', () => {
    const input = 'foo\u001B[31mbar\u001B[0mbaz';
    expect(strip(input, { ansiEscapes: true })).toBe('foobarbaz');
  });

  test('removes nested and repeated ANSI sequences when enabled', () => {
    const input = '\u001B[31mfoo\u001B[32mbar\u001B[0mbaz\u001B[1;34mqux\u001B[0m';
    expect(strip(input, { ansiEscapes: true })).toBe('foobarbazqux');
  });

  test('handles empty string', () => {
    expect(strip('', { ansiEscapes: true })).toBe('');
  });

  test('handles only escape sequences', () => {
    const input = '\u001B[31m\u001B[0m\u001B]0;title\u0007';
    expect(strip(input, { ansiEscapes: true })).toBe('');
  });

  test('does not remove non-ANSI Unicode or control characters by default', () => {
    const input = 'foo\u2022bar\u0009baz'; // bullet and tab
    expect(strip(input, { ansiEscapes: true })).toBe('foo\u2022bar\u0009baz');
  });

  test('removes single-line comments when comments is enabled', () => {
    const input = 'code // this is a comment\nmore code';
    expect(strip(input, { comments: true })).toBe('code more code');

    const input2 = 'line1 // comment1\nline2 // comment2\nline3';
    expect(strip(input2, { comments: true })).toBe('line1 line2 line3');

    const input3 = '// comment at start\ncode';
    expect(strip(input3, { comments: true })).toBe('code');
  });

  test('removes multi-line comments when comments is enabled', () => {
    const input = 'code /* this is a comment */ more';
    expect(strip(input, { comments: true })).toBe('code  more');

    // Multi-line comments with newlines work with the v flag
    const input2 = 'start /* multi\nline\ncomment */ end';
    expect(strip(input2, { comments: true })).toBe('start  end');

    const input3 = '/* comment */ code /* another */';
    expect(strip(input3, { comments: true })).toBe(' code ');
  });

  test('removes both single and multi-line comments when enabled', () => {
    const input = 'code // single\nmore /* multi */ text';
    expect(strip(input, { comments: true })).toBe('code more  text');

    const input2 = '/* block */ code // line\nend';
    expect(strip(input2, { comments: true })).toBe(' code end');
  });

  test('handles nested comment-like syntax', () => {
    // The regex is greedy and non-nested, so nested comments are handled simply
    const input = 'code /* outer /* inner */ still comment */ end';
    expect(strip(input, { comments: true })).toBe('code  still comment */ end');
  });

  test('combines comments option with other options', () => {
    const input3 = 'foo\u001B[31mbar // comment\u001B[0m\nbaz /* block */';
    expect(strip(input3, { comments: true, ansiEscapes: true })).toBe('foobar baz ');
  });

  test('handles empty comments', () => {
    const input = 'code /**/ more';
    expect(strip(input, { comments: true })).toBe('code  more');

    const input2 = 'code //\nmore';
    expect(strip(input2, { comments: true })).toBe('code more');
  });

  test('preserves comment-like strings that are not actual comments', () => {
    // Single / or * should not be removed
    const input = 'http://example.com and 2*3=6';
    expect(strip(input, { comments: true })).toBe('http://example.com and 2*3=6');
  });

  test('handles comments with special characters', () => {
    const input = 'code // comment with !@#$%^&*()\nmore';
    expect(strip(input, { comments: true })).toBe('code more');

    const input2 = 'code /* comment with !@#$%^&*() */ more';
    expect(strip(input2, { comments: true })).toBe('code  more');
  });

  test('handles multiple consecutive comments', () => {
    const input = 'code // first\n// second\n// third\nmore';
    expect(strip(input, { comments: true })).toBe('code more');

    const input2 = 'code /* first *//* second *//* third */ more';
    expect(strip(input2, { comments: true })).toBe('code  more');
  });
});
