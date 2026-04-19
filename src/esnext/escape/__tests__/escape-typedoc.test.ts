import { escapeTypedoc } from '../escape-typedoc.ts';

describe('escapeTypedoc', () => {
  test('should escape TypeDoc special characters', () => {
    expect(escapeTypedoc('<>@{}\\')).toBe('\\<\\>\\@\\{\\}\\\\');
  });

  test('should leave other characters unchanged', () => {
    expect(escapeTypedoc('Hello, world! 123')).toBe('Hello, world! 123');
  });

  test('should escape special characters embedded in text', () => {
    expect(escapeTypedoc('Use {@link Foo<T>} \\ path')).toBe(
      'Use \\{\\@link Foo\\<T\\>\\} \\\\ path',
    );
  });
});
