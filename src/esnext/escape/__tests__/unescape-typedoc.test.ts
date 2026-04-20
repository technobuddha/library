import { unescapeTypedoc } from '../unescape-typedoc.ts';

describe('unescapeTypedoc', () => {
  test('should unescape TypeDoc special characters', () => {
    expect(unescapeTypedoc('\\<\\>\\@\\{\\}\\\\')).toBe('<>@{}\\');
  });

  test('should leave plain text unchanged', () => {
    expect(unescapeTypedoc('Hello, world! 123')).toBe('Hello, world! 123');
  });

  test('should not alter backslashes before non-TypeDoc characters', () => {
    expect(unescapeTypedoc('\\n \\x \\/')).toBe('\\n \\x \\/');
  });

  test('should reverse escaped TypeDoc text embedded in a sentence', () => {
    expect(unescapeTypedoc('Use \\{\\@link Foo\\<T\\>\\} \\\\ path')).toBe(
      'Use {@link Foo<T>} \\ path',
    );
  });
});
