/* eslint-disable no-template-curly-in-string */
import { removeComments } from '../remove-comments.ts';

describe('strip', () => {
  test('handles single-quoted string inside template expression', () => {
    const input = "`foo ${'bar // not a comment'} baz`";
    expect(removeComments(input)).toBe("`foo ${'bar // not a comment'} baz`");
  });

  test('handles double-quoted string inside template expression', () => {
    const input = '`foo ${"bar // not a comment"} baz`';
    expect(removeComments(input)).toBe('`foo ${"bar // not a comment"} baz`');
  });

  test('handles nested template literal inside template expression', () => {
    const input = '`foo ${`bar // not a comment`} baz`';
    expect(removeComments(input)).toBe('`foo ${`bar // not a comment`} baz`');
  });
  test('handles unterminated single-quoted string', () => {
    const input = "'foo bar\nbaz";
    // Should treat as unterminated and return as is (no comment stripping inside)
    expect(removeComments(input)).toBe("'foo bar\nbaz");
  });

  test('handles unterminated double-quoted string', () => {
    const input = '"foo bar\nbaz';
    // Should treat as unterminated and return as is (no comment stripping inside)
    expect(removeComments(input)).toBe('"foo bar\nbaz');
  });

  test('handles end of line comment with newline', () => {
    const input = 'foo // comment\nbar';
    expect(removeComments(input)).toBe('foo \nbar');
  });

  test('handles end of line comment with carriage return', () => {
    const input = 'foo // comment\rbar';
    expect(removeComments(input)).toBe('foo \rbar');
  });

  test('handles end of block comment', () => {
    const input = 'foo /* comment */bar';
    expect(removeComments(input)).toBe('foo bar');
  });

  test('handles end of block comment with replacement', () => {
    const input = 'foo /* comment */bar';
    expect(removeComments(input, { replacement: ' ' })).toBe('foo              bar');
  });
  test('handles escaped quotes in single-quoted strings', () => {
    const input = "'foo \\'bar\\' // not a comment'";
    expect(removeComments(input)).toBe("'foo \\'bar\\' // not a comment'");
  });

  test('handles escaped quotes in double-quoted strings', () => {
    const input = '"foo \\"bar\\" // not a comment"';
    expect(removeComments(input)).toBe('"foo \\"bar\\" // not a comment"');
  });

  test('handles escaped backticks in template literals', () => {
    const input = '`foo \\`bar\\` // not a comment`';
    expect(removeComments(input)).toBe('`foo \\`bar\\` // not a comment`');
  });

  test('handles escaped backslashes in strings', () => {
    const input = "'foo \\\\ // not a comment'";
    expect(removeComments(input)).toBe("'foo \\\\ // not a comment'");
  });

  test('removes single-line comments when comments is enabled', () => {
    const input = 'code // this is a comment\nmore code';
    expect(removeComments(input)).toBe('code \nmore code');

    const input2 = 'line1 // comment1\nline2 // comment2\nline3';
    expect(removeComments(input2)).toBe('line1 \nline2 \nline3');

    const input3 = '// comment at start\ncode';
    expect(removeComments(input3)).toBe('\ncode');
  });

  test('removes multi-line comments when comments is enabled', () => {
    const input = 'code /* this is a comment */ more';
    expect(removeComments(input)).toBe('code  more');

    // Multi-line comments with newlines work with the v flag
    const input2 = 'start /* multi\nline\ncomment */ end';
    expect(removeComments(input2)).toBe('start  end');

    const input3 = '/* comment */ code /* another */';
    expect(removeComments(input3)).toBe(' code ');
  });

  test('removes both single and multi-line comments when enabled', () => {
    const input = 'code // single\nmore /* multi */ text';
    expect(removeComments(input)).toBe('code \nmore  text');

    const input2 = '/* block */ code // line\nend';
    expect(removeComments(input2)).toBe(' code \nend');
  });

  test('handles nested comment-like syntax', () => {
    // The regex is greedy and non-nested, so nested comments are handled simply
    const input = 'code /* outer /* inner */ still comment */ end';
    expect(removeComments(input)).toBe('code  still comment */ end');
  });

  test('handles empty comments', () => {
    const input = 'code /**/ more';
    expect(removeComments(input)).toBe('code  more');

    const input2 = 'code //\nmore';
    expect(removeComments(input2)).toBe('code \nmore');
  });

  test('handles comments with special characters', () => {
    const input = 'code // comment with !@#$%^&*()\nmore';
    expect(removeComments(input)).toBe('code \nmore');

    const input2 = 'code /* comment with !@#$%^&*() */ more';
    expect(removeComments(input2)).toBe('code  more');
  });

  test('handles multiple consecutive comments', () => {
    const input = 'code // first\n// second\n// third\nmore';
    expect(removeComments(input)).toBe('code \n\n\nmore');

    const input2 = 'code /* first *//* second *//* third */ more';
    expect(removeComments(input2)).toBe('code  more');
  });
  test('removes comments inside template literals', () => {
    const input = '`foo // not a comment\nbar /* not a comment */ baz`';
    expect(removeComments(input)).toBe(
      '`foo // not a comment\nbar /* not a comment */ baz`',
    );
  });

  test('removes comments inside template expressions', () => {
    const input = '`foo ${1 + 2 // comment\n} bar`';
    expect(removeComments(input)).toBe('`foo ${1 + 2 \n} bar`');

    const input2 = '`foo ${/* block comment */ 42} bar`';
    expect(removeComments(input2)).toBe('`foo ${ 42} bar`');
  });

  test('handles nested quotes and comments in template expressions', () => {
    const input = "`foo ${'string // not a comment' // comment\n} bar`";
    expect(removeComments(input)).toBe("`foo ${'string // not a comment' \n} bar`");
  });
});
