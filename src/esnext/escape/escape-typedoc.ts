/**
 * Escapes the characters that must be backslash-escaped in TypeDoc comments.
 *
 * TypeDoc reserves `<`, `>`, `@`, `{`, `}`, and `\` within comment text. This helper
 * prefixes each occurrence with a backslash so the text can be emitted literally.
 *
 * @param comment - The comment text to escape for TypeDoc.
 * @returns The comment text with TypeDoc-reserved characters escaped.
 * @example
 * ```typescript
 * escapeTypedoc('Use {@link Foo<T>}');
 * // 'Use \\{\\@link Foo\\<T\\>\\}'
 * ```
 * @group Escape
 * @category TypeDoc
 */
export function escapeTypedoc(comment: string): string {
  return comment.replaceAll(/[<>@\{\}\\]/gv, '\\$&');
}
