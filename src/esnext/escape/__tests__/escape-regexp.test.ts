import { escapeRegExp } from '../escape-regexp.ts';

describe('escapeRegExp', () => {
  test('should escape dot character', () => {
    expect(escapeRegExp('.')).toBe('\\.');
    expect(escapeRegExp('a.b')).toBe('a\\.b');
  });

  test('should escape asterisk character', () => {
    expect(escapeRegExp('*')).toBe('\\*');
    expect(escapeRegExp('a*b')).toBe('a\\*b');
  });

  test('should escape plus character', () => {
    expect(escapeRegExp('+')).toBe('\\+');
    expect(escapeRegExp('1+1')).toBe('1\\+1');
  });

  test('should escape question mark character', () => {
    expect(escapeRegExp('?')).toBe('\\?');
    expect(escapeRegExp('What?')).toBe('What\\?');
  });

  test('should escape caret character', () => {
    expect(escapeRegExp('^')).toBe('\\^');
    expect(escapeRegExp('^start')).toBe('\\^start');
  });

  test('should escape dollar character', () => {
    expect(escapeRegExp('$')).toBe('\\$');
    expect(escapeRegExp('$100')).toBe('\\$100');
  });

  test('should escape curly braces', () => {
    expect(escapeRegExp('{')).toBe('\\{');
    expect(escapeRegExp('}')).toBe('\\}');
    expect(escapeRegExp('{a,b}')).toBe('\\{a,b\\}');
  });

  test('should escape parentheses', () => {
    expect(escapeRegExp('(')).toBe('\\(');
    expect(escapeRegExp(')')).toBe('\\)');
    expect(escapeRegExp('(hello)')).toBe('\\(hello\\)');
  });

  test('should escape pipe character', () => {
    expect(escapeRegExp('|')).toBe('\\|');
    expect(escapeRegExp('a|b')).toBe('a\\|b');
  });

  test('should escape square brackets', () => {
    expect(escapeRegExp('[')).toBe('\\[');
    expect(escapeRegExp(']')).toBe('\\]');
    expect(escapeRegExp('[a-z]')).toBe('\\[a-z\\]');
  });

  test('should escape backslash character', () => {
    expect(escapeRegExp('\\')).toBe('\\\\');
    expect(escapeRegExp('a\\b')).toBe('a\\\\b');
  });

  test('should escape multiple special characters', () => {
    expect(escapeRegExp('.*+?^$')).toBe('\\.\\*\\+\\?\\^\\$');
  });

  test('should escape all special characters in a complex string', () => {
    expect(escapeRegExp('Hello. How are you?')).toBe('Hello\\. How are you\\?');
  });

  test('should escape special characters in mathematical expression', () => {
    expect(escapeRegExp('1 + 1 = 2')).toBe('1 \\+ 1 = 2');
  });

  test('should escape special characters in price string', () => {
    expect(escapeRegExp('Cost: $50 (USD)')).toBe('Cost: \\$50 \\(USD\\)');
  });

  test('should handle string with no special characters', () => {
    expect(escapeRegExp('hello world')).toBe('hello world');
    expect(escapeRegExp('abc123')).toBe('abc123');
  });

  test('should handle empty string', () => {
    expect(escapeRegExp('')).toBe('');
  });

  test('should work in regex pattern construction', () => {
    const userInput = '1 + 1 = 2';
    const pattern = new RegExp(escapeRegExp(userInput), 'v');
    expect(pattern.test('1 + 1 = 2')).toBeTrue();
    expect(pattern.test('1+1=2')).toBeFalse();
  });

  test('should work with RegExp constructor for exact match', () => {
    const literal = 'Price: $10.99';
    const regex = new RegExp(`^${escapeRegExp(literal)}$`, 'v');
    expect(regex.test('Price: $10.99')).toBeTrue();
    expect(regex.test('Price: 10.99')).toBeFalse();
  });

  test('should escape regex pattern to use as literal', () => {
    const regexPattern = '^[a-z]+$';
    const escaped = escapeRegExp(regexPattern);
    expect(escaped).toBe('\\^\\[a-z\\]\\+\\$');
    const regex = new RegExp(escaped, 'v');
    expect(regex.test('^[a-z]+$')).toBeTrue();
    expect(regex.test('abc')).toBeFalse();
  });

  test('should work with replaceAll to escape patterns', () => {
    const text = 'The cost is $5.00 and $10.00';
    const search = '$5.00';
    const result = text.replaceAll(new RegExp(escapeRegExp(search), 'vg'), '$3.00');
    expect(result).toBe('The cost is $3.00 and $10.00');
  });

  test('should handle consecutive special characters', () => {
    expect(escapeRegExp('??')).toBe('\\?\\?');
    expect(escapeRegExp('***')).toBe('\\*\\*\\*');
    expect(escapeRegExp('((()))')).toBe('\\(\\(\\(\\)\\)\\)');
  });

  test('should handle special characters at start and end', () => {
    expect(escapeRegExp('^hello$')).toBe('\\^hello\\$');
    expect(escapeRegExp('*important*')).toBe('\\*important\\*');
  });

  test('should handle all special characters together', () => {
    const allSpecial = '.*+?^${}()|[]\\';
    const escaped = escapeRegExp(allSpecial);
    expect(escaped).toBe('\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
  });

  test('should preserve regular alphanumeric and common punctuation', () => {
    expect(escapeRegExp('Hello, World!')).toBe('Hello, World!');
    expect(escapeRegExp('test@example.com')).toBe('test@example\\.com');
    expect(escapeRegExp('a-b_c:d;e')).toBe('a-b_c:d;e');
  });

  test('should handle Unicode characters unchanged', () => {
    expect(escapeRegExp('Hello 世界')).toBe('Hello 世界');
    expect(escapeRegExp('😀😁')).toBe('😀😁');
  });

  test('should handle whitespace characters unchanged', () => {
    expect(escapeRegExp('a\tb\nc\rd')).toBe('a\tb\nc\rd');
  });

  test('should work with function name as pattern', () => {
    const funcName = 'test()';
    const escaped = escapeRegExp(funcName);
    expect(escaped).toBe('test\\(\\)');
    const regex = new RegExp(escaped, 'v');
    expect(regex.test('test()')).toBeTrue();
    expect(regex.test('test')).toBeFalse();
  });

  test('should work with file path patterns', () => {
    const path = 'C:\\Users\\file.txt';
    const escaped = escapeRegExp(path);
    expect(escaped).toBe('C:\\\\Users\\\\file\\.txt');
  });

  test('should handle quantifier patterns', () => {
    expect(escapeRegExp('a{2,5}')).toBe('a\\{2,5\\}');
    expect(escapeRegExp('x+')).toBe('x\\+');
    expect(escapeRegExp('y*')).toBe('y\\*');
    expect(escapeRegExp('z?')).toBe('z\\?');
  });

  test('should handle character class patterns', () => {
    expect(escapeRegExp('[0-9]')).toBe('\\[0-9\\]');
    expect(escapeRegExp('[^a-z]')).toBe('\\[\\^a-z\\]');
  });

  test('should handle alternation patterns', () => {
    expect(escapeRegExp('cat|dog')).toBe('cat\\|dog');
    expect(escapeRegExp('(red|blue)')).toBe('\\(red\\|blue\\)');
  });

  test('should handle boundary and anchor patterns', () => {
    expect(escapeRegExp('^start')).toBe('\\^start');
    expect(escapeRegExp('end$')).toBe('end\\$');
    expect(escapeRegExp('^exact$')).toBe('\\^exact\\$');
  });
});
