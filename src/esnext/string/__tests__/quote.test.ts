import { determineQuote, quote } from '../quote.ts';

describe('quote', () => {
  test('should surround text with single quotes by default', () => {
    expect(quote('Hello')).toBe("'Hello'");
  });

  test('should use double quotes when specified', () => {
    expect(quote('Hello', { quote: 'double' })).toBe('"Hello"');
  });

  test('should escape quotes using backslash', () => {
    expect(quote('He said, "Hello!"', { quote: 'double', escape: 'backslash' })).toBe(
      '"He said, \\"Hello!\\""',
    );
  });

  test('should escape quotes by repeating', () => {
    expect(quote('He said, "Hello!"', { quote: 'double', escape: 'repeat' })).toBe(
      '"He said, ""Hello!"""',
    );
  });

  // New tests
  test('should handle empty strings', () => {
    expect(quote('')).toBe("''");
    expect(quote('', { quote: 'double' })).toBe('""');
  });

  test('should handle strings with only quotes', () => {
    expect(quote('"')).toBe("'\"'");
    expect(quote('"', { quote: 'double', escape: 'backslash' })).toBe('"\\""');
    expect(quote('"', { quote: 'double', escape: 'repeat' })).toBe('""""');
  });

  test('should handle strings with mixed quotes', () => {
    expect(quote('\'"Hello"\'', { quote: 'prefer-single' })).toBe("'\\'\"Hello\"\\''");
    expect(quote('\'"Hello"\'', { quote: 'prefer-double' })).toBe('"\'\\"Hello\\"\'"');
  });

  test('should handle special characters', () => {
    expect(quote('Hello\nWorld')).toBe("'Hello\nWorld'");
    expect(quote('Hello\tWorld', { escape: 'repeat' })).toBe("'Hello\tWorld'");
  });

  test('should handle long strings', () => {
    const longString = 'a'.repeat(1000);
    expect(quote(longString)).toBe(`'${longString}'`);
  });

  test('should handle prefer-double with mixed quotes', () => {
    expect(quote("'Hello'", { quote: 'prefer-double' })).toBe('"\'Hello\'"');
  });

  test('should handle prefer-single with mixed quotes', () => {
    expect(quote('"Hello"', { quote: 'prefer-single' })).toBe('\'"Hello"\'');
  });

  test('should handle escape=repeat with no quotes', () => {
    expect(quote('Hello', { escape: 'repeat' })).toBe("'Hello'");
  });
});

describe('determineQuote', () => {
  test('should prefer single quotes when both are present', () => {
    expect(determineQuote('He said, "Hello!"', 'prefer-single')).toBe("'");
  });

  test('should prefer double quotes when both are present', () => {
    expect(determineQuote("It's a test", 'prefer-double')).toBe('"');
  });

  test('should use single quotes when specified', () => {
    expect(determineQuote('Hello', 'single')).toBe("'");
  });

  test('should use double quotes when specified', () => {
    expect(determineQuote('Hello', 'double')).toBe('"');
  });

  // New tests
  test('should handle empty strings', () => {
    expect(determineQuote('', 'prefer-single')).toBe("'");
    expect(determineQuote('', 'prefer-double')).toBe('"');
  });

  test('should handle strings with only quotes', () => {
    expect(determineQuote('"', 'prefer-single')).toBe("'");
    expect(determineQuote("'", 'prefer-double')).toBe('"');
  });

  test('should handle strings with mixed quotes', () => {
    expect(determineQuote('\'"Hello"\'', 'prefer-single')).toBe("'");
    expect(determineQuote('\'"Hello"\'', 'prefer-double')).toBe('"');
  });

  test('should choose double quotes when prefer-single but string has single quotes', () => {
    // When prefer-single but string has ' and no ", return "
    expect(determineQuote("It's a test", 'prefer-single')).toBe('"');
  });

  test('should choose single quotes when prefer-double but string has double quotes', () => {
    // When prefer-double but string has " and no ', return '
    expect(determineQuote('He said "hello"', 'prefer-double')).toBe("'");
  });
});
