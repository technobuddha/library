import { enclosed } from '../enclosed.ts';

describe('enclosed', () => {
  test('should find basic enclosed content with default delimiters', () => {
    const result = enclosed('before (content) after');
    expect(result).not.toBeNull();
    expect(result?.prev).toBe('before ');
    expect(result?.start).toBe('(');
    expect(result?.body).toBe('content');
    expect(result?.close).toBe(')');
    expect(result?.next).toBe(' after');
  });

  test('should handle nested enclosures', () => {
    const result = enclosed('outer (inner (nested) content) end');
    expect(result).not.toBeNull();
    expect(result?.prev).toBe('outer ');
    expect(result?.start).toBe('(');
    expect(result?.body).toBe('inner (nested) content');
    expect(result?.close).toBe(')');
    expect(result?.next).toBe(' end');
  });

  test('should work with custom delimiters', () => {
    const result = enclosed('text [array items] more', { start: '[', close: ']' });
    expect(result).not.toBeNull();
    expect(result?.prev).toBe('text ');
    expect(result?.start).toBe('[');
    expect(result?.body).toBe('array items');
    expect(result?.close).toBe(']');
    expect(result?.next).toBe(' more');
  });

  test('should handle curly braces', () => {
    const result = enclosed('code { block } text', { start: '{', close: '}' });
    expect(result).not.toBeNull();
    expect(result?.prev).toBe('code ');
    expect(result?.start).toBe('{');
    expect(result?.body).toBe(' block ');
    expect(result?.close).toBe('}');
    expect(result?.next).toBe(' text');
  });

  test('should return null when no enclosure is found', () => {
    const result = enclosed('no delimiters here');
    expect(result).toBeNull();
  });

  test('should return null when only opening delimiter is found', () => {
    const result = enclosed('only opening (delimiter');
    expect(result).toBeNull();
  });

  test('should return null when only closing delimiter is found', () => {
    const result = enclosed('only closing) delimiter');
    expect(result).toBeNull();
  });

  test('should handle escaped delimiters', () => {
    const result = enclosed('text (content \\) still inside) after');
    expect(result).not.toBeNull();
    expect(result?.body).toBe('content \\) still inside');
    expect(result?.next).toBe(' after');
  });

  test('should skip escaped open delimiter', () => {
    // When the start delimiter is escaped, it should be skipped
    const result = enclosed('skip \\( this and find (real) content');
    expect(result).not.toBeNull();
    expect(result?.body).toBe('real');
  });

  test('should handle multiple escaped characters', () => {
    const result = enclosed('text (content \\\\) outside', { escape: '\\' });
    expect(result).not.toBeNull();
    expect(result?.body).toBe('content \\\\');
    expect(result?.next).toBe(' outside');
  });

  test('should skip quoted content', () => {
    const result = enclosed('text (content "with ) quote") end');
    expect(result).not.toBeNull();
    expect(result?.body).toBe('content "with ) quote"');
    expect(result?.next).toBe(' end');
  });

  test('should skip single-quoted content', () => {
    const result = enclosed("text (content 'with ) quote') end");
    expect(result).not.toBeNull();
    expect(result?.body).toBe("content 'with ) quote'");
    expect(result?.next).toBe(' end');
  });

  test('should handle escaped quotes within quotes', () => {
    const result = enclosed('text (content "with \\" escaped") end');
    expect(result).not.toBeNull();
    expect(result?.body).toBe('content "with \\" escaped"');
  });

  test('should skip single-line comments', () => {
    const result = enclosed('text (content // with ) comment\nmore) end');
    expect(result).not.toBeNull();
    expect(result?.body).toBe('content // with ) comment\nmore');
    expect(result?.next).toBe(' end');
  });

  test('should skip multi-line comments', () => {
    const result = enclosed('text (content /* with ) comment */ more) end');
    expect(result).not.toBeNull();
    expect(result?.body).toBe('content /* with ) comment */ more');
    expect(result?.next).toBe(' end');
  });

  test('should handle deeply nested enclosures', () => {
    const result = enclosed('a (b (c (d) e) f) g');
    expect(result).not.toBeNull();
    expect(result?.prev).toBe('a ');
    expect(result?.body).toBe('b (c (d) e) f');
    expect(result?.next).toBe(' g');
  });

  test('should work with RegExp delimiters', () => {
    const result = enclosed('text <tag>content</tag> more', {
      start: /</v,
      close: />/v,
    });
    expect(result).not.toBeNull();
    expect(result?.start).toBe('<');
    expect(result?.body).toBe('tag');
    expect(result?.close).toBe('>');
  });

  test('should handle empty enclosure', () => {
    const result = enclosed('text () more');
    expect(result).not.toBeNull();
    expect(result?.body).toBe('');
    expect(result?.prev).toBe('text ');
    expect(result?.next).toBe(' more');
  });

  test('should handle enclosure at start of string', () => {
    const result = enclosed('(content) after');
    expect(result).not.toBeNull();
    expect(result?.prev).toBe('');
    expect(result?.body).toBe('content');
    expect(result?.next).toBe(' after');
  });

  test('should handle enclosure at end of string', () => {
    const result = enclosed('before (content)');
    expect(result).not.toBeNull();
    expect(result?.prev).toBe('before ');
    expect(result?.body).toBe('content');
    expect(result?.next).toBe('');
  });

  test('should handle entire string as enclosure', () => {
    const result = enclosed('(content)');
    expect(result).not.toBeNull();
    expect(result?.prev).toBe('');
    expect(result?.body).toBe('content');
    expect(result?.next).toBe('');
  });

  test('should handle custom escape character', () => {
    const result = enclosed('text (content ^) inside) after', { escape: '^' });
    expect(result).not.toBeNull();
    expect(result?.body).toBe('content ^) inside');
  });

  test('should handle custom quote characters', () => {
    const result = enclosed('text (content `with ) tick`) end', { quote: '`' });
    expect(result).not.toBeNull();
    expect(result?.body).toBe('content `with ) tick`');
  });

  test('should handle custom comment markers', () => {
    const result = enclosed('text (content # with ) comment\nmore) end', {
      commentLine: '#',
    });
    expect(result).not.toBeNull();
    expect(result?.body).toBe('content # with ) comment\nmore');
  });

  test('should handle custom multi-line comment markers', () => {
    const result = enclosed('text (content <!-- with ) comment --> more) end', {
      commentStart: '<!--',
      commentEnd: '-->',
    });
    expect(result).not.toBeNull();
    expect(result?.body).toBe('content <!-- with ) comment --> more');
  });

  test('should handle unicode characters', () => {
    const result = enclosed('текст (содержание) конец');
    expect(result).not.toBeNull();
    expect(result?.prev).toBe('текст ');
    expect(result?.body).toBe('содержание');
    expect(result?.next).toBe(' конец');
  });

  test('should handle surrogate pairs', () => {
    const result = enclosed('text (content 🎉) more');
    expect(result).not.toBeNull();
    expect(result?.body).toBe('content 🎉');
  });

  test('should return first outermost enclosure when multiple exist', () => {
    const result = enclosed('first (one) second (two)');
    expect(result).not.toBeNull();
    expect(result?.body).toBe('one');
    expect(result?.next).toBe(' second (two)');
  });

  test('should handle mismatched nesting correctly', () => {
    const result = enclosed('text (open (nested) after');
    expect(result).toBeNull();
  });

  test('should handle complex nested structure', () => {
    const result = enclosed('fn((a, b), { x: (1 + 2) }) end');
    expect(result).not.toBeNull();
    expect(result?.body).toBe('(a, b), { x: (1 + 2) }');
  });

  test('should handle line breaks in content', () => {
    const result = enclosed('text (line1\nline2\nline3) end');
    expect(result).not.toBeNull();
    expect(result?.body).toBe('line1\nline2\nline3');
  });

  test('should handle CRLF line endings in comments', () => {
    const result = enclosed('text (content // comment\r\nmore) end');
    expect(result).not.toBeNull();
    expect(result?.body).toBe('content // comment\r\nmore');
  });
});
