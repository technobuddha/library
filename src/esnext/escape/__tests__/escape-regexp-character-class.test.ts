import { escapeRegExpCharacterClass } from '../escape-regexp-character-class.ts';

describe('escapeRegExpCharacterClass', () => {
  test('should escape hyphen character', () => {
    expect(escapeRegExpCharacterClass('-')).toBe('\\-');
    expect(escapeRegExpCharacterClass('a-z')).toBe('a\\-z');
  });

  test('should escape dot character', () => {
    expect(escapeRegExpCharacterClass('.')).toBe('\\.');
    expect(escapeRegExpCharacterClass('a.b')).toBe('a\\.b');
  });

  test('should escape asterisk character', () => {
    expect(escapeRegExpCharacterClass('*')).toBe('\\*');
    expect(escapeRegExpCharacterClass('a*b')).toBe('a\\*b');
  });

  test('should escape plus character', () => {
    expect(escapeRegExpCharacterClass('+')).toBe('\\+');
    expect(escapeRegExpCharacterClass('1+1')).toBe('1\\+1');
  });

  test('should escape question mark character', () => {
    expect(escapeRegExpCharacterClass('?')).toBe('\\?');
    expect(escapeRegExpCharacterClass('What?')).toBe('What\\?');
  });

  test('should escape caret character', () => {
    expect(escapeRegExpCharacterClass('^')).toBe('\\^');
    expect(escapeRegExpCharacterClass('^start')).toBe('\\^start');
  });

  test('should escape dollar character', () => {
    expect(escapeRegExpCharacterClass('$')).toBe('\\$');
    expect(escapeRegExpCharacterClass('$100')).toBe('\\$100');
  });

  test('should escape curly braces', () => {
    expect(escapeRegExpCharacterClass('{')).toBe('\\{');
    expect(escapeRegExpCharacterClass('}')).toBe('\\}');
    expect(escapeRegExpCharacterClass('{a,b}')).toBe('\\{a,b\\}');
  });

  test('should escape parentheses', () => {
    expect(escapeRegExpCharacterClass('(')).toBe('\\(');
    expect(escapeRegExpCharacterClass(')')).toBe('\\)');
    expect(escapeRegExpCharacterClass('(hello)')).toBe('\\(hello\\)');
  });

  test('should escape pipe character', () => {
    expect(escapeRegExpCharacterClass('|')).toBe('\\|');
    expect(escapeRegExpCharacterClass('a|b')).toBe('a\\|b');
  });

  test('should escape square brackets', () => {
    expect(escapeRegExpCharacterClass('[')).toBe('\\[');
    expect(escapeRegExpCharacterClass(']')).toBe('\\]');
    expect(escapeRegExpCharacterClass('[a-z]')).toBe('\\[a\\-z\\]');
  });

  test('should escape backslash character', () => {
    expect(escapeRegExpCharacterClass('\\')).toBe('\\\\');
    expect(escapeRegExpCharacterClass('a\\b')).toBe('a\\\\b');
  });

  test('should escape all special characters including hyphen', () => {
    expect(escapeRegExpCharacterClass('.*+?^$-')).toBe('\\.\\*\\+\\?\\^\\$\\-');
  });

  test('should handle string with no special characters', () => {
    expect(escapeRegExpCharacterClass('hello world')).toBe('hello world');
    expect(escapeRegExpCharacterClass('abc123')).toBe('abc123');
  });

  test('should handle empty string', () => {
    expect(escapeRegExpCharacterClass('')).toBe('');
  });

  test('should work in character class construction', () => {
    const chars = '.*+?';
    const pattern = new RegExp(`[${escapeRegExpCharacterClass(chars)}]`, 'v');
    expect(pattern.test('.')).toBeTrue();
    expect(pattern.test('*')).toBeTrue();
    expect(pattern.test('+')).toBeTrue();
    expect(pattern.test('?')).toBeTrue();
    expect(pattern.test('x')).toBeFalse();
  });

  test('should prevent range interpretation with escaped hyphen', () => {
    // Without escaping, 'a-z' would match any letter from a to z
    const withoutEscape = /[a-z]/v;
    expect(withoutEscape.test('m')).toBeTrue(); // matches range

    // With escaping, 'a-z' matches only literal 'a', '-', or 'z'
    const withEscape = new RegExp(`[${escapeRegExpCharacterClass('a-z')}]`, 'v');
    expect(withEscape.test('a')).toBeTrue();
    expect(withEscape.test('-')).toBeTrue();
    expect(withEscape.test('z')).toBeTrue();
    expect(withEscape.test('m')).toBeFalse(); // does not match range
  });

  test('should escape character class pattern', () => {
    const pattern = '[0-9]';
    const escaped = escapeRegExpCharacterClass(pattern);
    expect(escaped).toBe('\\[0\\-9\\]');

    const regex = new RegExp(`[${escaped}]`, 'v');
    expect(regex.test('[')).toBeTrue();
    expect(regex.test('0')).toBeTrue();
    expect(regex.test('-')).toBeTrue();
    expect(regex.test('9')).toBeTrue();
    expect(regex.test(']')).toBeTrue();
    expect(regex.test('5')).toBeFalse(); // doesn't match the range
  });

  test('should handle consecutive special characters', () => {
    expect(escapeRegExpCharacterClass('---')).toBe('\\-\\-\\-');
    expect(escapeRegExpCharacterClass('***')).toBe('\\*\\*\\*');
    expect(escapeRegExpCharacterClass('((()))')).toBe('\\(\\(\\(\\)\\)\\)');
  });

  test('should handle special characters at start and end', () => {
    expect(escapeRegExpCharacterClass('^hello$')).toBe('\\^hello\\$');
    expect(escapeRegExpCharacterClass('-important-')).toBe('\\-important\\-');
  });

  test('should handle all special characters together', () => {
    const allSpecial = '.*+?^$-{}()|[]\\';
    const escaped = escapeRegExpCharacterClass(allSpecial);
    expect(escaped).toBe('\\.\\*\\+\\?\\^\\$\\-\\{\\}\\(\\)\\|\\[\\]\\\\');
  });

  test('should work with user input for character class', () => {
    const userChars = '$#@-_';
    const pattern = new RegExp(`^[${escapeRegExpCharacterClass(userChars)}]+$`, 'v');
    expect(pattern.test('$#@-_')).toBeTrue();
    expect(pattern.test('$-_')).toBeTrue();
    expect(pattern.test('abc')).toBeFalse();
  });

  test('should preserve regular alphanumeric and common punctuation', () => {
    expect(escapeRegExpCharacterClass('Hello, World!')).toBe('Hello, World!');
    expect(escapeRegExpCharacterClass('test@example.com')).toBe('test@example\\.com');
    expect(escapeRegExpCharacterClass('a_b:c;d')).toBe('a_b:c;d');
  });

  test('should handle Unicode characters unchanged', () => {
    expect(escapeRegExpCharacterClass('Hello 世界')).toBe('Hello 世界');
    expect(escapeRegExpCharacterClass('😀😁')).toBe('😀😁');
  });

  test('should handle whitespace characters unchanged', () => {
    expect(escapeRegExpCharacterClass('a\tb\nc\rd')).toBe('a\tb\nc\rd');
  });

  test('should handle range-like patterns', () => {
    expect(escapeRegExpCharacterClass('0-9')).toBe('0\\-9');
    expect(escapeRegExpCharacterClass('A-Z')).toBe('A\\-Z');
    expect(escapeRegExpCharacterClass('a-zA-Z0-9')).toBe('a\\-zA\\-Z0\\-9');
  });

  test('should work with complex character class construction', () => {
    const allowed = 'a-z_';
    const pattern = new RegExp(`^[${escapeRegExpCharacterClass(allowed)}]+$`, 'v');
    expect(pattern.test('a-z_')).toBeTrue();
    expect(pattern.test('a_z')).toBeTrue();
    expect(pattern.test('abc')).toBeFalse(); // 'b' and 'c' not in literal chars
  });

  test('should handle negated character class pattern', () => {
    const chars = '^a-z';
    const escaped = escapeRegExpCharacterClass(chars);
    expect(escaped).toBe('\\^a\\-z');

    const pattern = new RegExp(`[${escaped}]`, 'v');
    expect(pattern.test('^')).toBeTrue();
    expect(pattern.test('a')).toBeTrue();
    expect(pattern.test('-')).toBeTrue();
    expect(pattern.test('z')).toBeTrue();
  });

  test('should handle mixed content with hyphens', () => {
    const input = 'foo-bar-baz';
    const escaped = escapeRegExpCharacterClass(input);
    expect(escaped).toBe('foo\\-bar\\-baz');
  });

  test('should work in complex regex patterns', () => {
    const specialChars = '.$*';
    const pattern = new RegExp(`^test[${escapeRegExpCharacterClass(specialChars)}]+end$`, 'v');
    expect(pattern.test('test.$*end')).toBeTrue();
    expect(pattern.test('test.**$end')).toBeTrue();
    expect(pattern.test('testxend')).toBeFalse();
  });
});
