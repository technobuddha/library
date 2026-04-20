/**
 * Removes TypeDoc backslash escapes from comment text.
 *
 * This reverses {@link escapeTypedoc} for the TypeDoc-reserved characters `<`, `>`, `@`,
 * `{`, `}`, and `\`.
 *
 * @param comment - The escaped comment text to unescape.
 * @returns The comment text with TypeDoc escape sequences resolved.
 * @example
 * ```typescript
 * unescapeTypedoc('Use \\{\\@link Foo\\<T\\>\\}');
 * // 'Use {@link Foo<T>}'
 * ```
 * @group Escape
 * @category TypeDoc
 */
export function unescapeTypedoc(comment: string): string {
  return comment.replaceAll(/\\([<>@\{\}\\])/gv, '$1');
}
