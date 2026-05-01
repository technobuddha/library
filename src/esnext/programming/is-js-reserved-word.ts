/**
 * Set of JavaScript and TypeScript reserved words that cannot be used as unquoted identifiers.
 *
 * This includes keywords, literals, and strict mode reserved words that would cause syntax errors
 * if used as property names without quotes in TypeScript/JavaScript code.
 *
 * Based on ECMAScript 2025 specification (section 12.7.2 & other sections).
 * https://tc39.es/ecma262/2025/#sec-keywords-and-reserved-words
 *
 * @internal
 */
const RESERVED_WORDS = new Set([
  // ECMAScript reserved words
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'null',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'yield',
]);

const STRICT_MODE_RESERVED_WORDS = new Set([
  // strict mode
  'implements',
  'interface',
  'let',
  'package',
  'private',
  'protected',
  'public',
  'static',
  'eval',
  'arguments',
]);

const TOP_LEVEL_RESERVED_WORDS = new Set(['await']);

type IsJsReservedWordOptions = {
  /** Include words reserved only in strict mode. */
  strict?: boolean;
  /** Include words reserved only in top-level module or async contexts. */
  top?: boolean;
};

/**
 * Determines whether a string is a JavaScript reserved word.
 *
 * This includes ECMAScript keywords and literals, and can optionally include
 * words reserved only in strict mode or only in top-level module or async
 * contexts.
 *
 * @param token - The string to test.
 * @param options - Controls whether strict-mode and top-level-only reserved words are included.
 * @returns `true` if the token is reserved in the selected contexts; otherwise, `false`.
 *
 * @example
 * ```typescript
 * isJsReservedWord('class'); // true
 * isJsReservedWord('implements'); // true
 * isJsReservedWord('implements', { strict: false }); // false
 * isJsReservedWord('await'); // true
 * isJsReservedWord('await', { top: false }); // false
 * isJsReservedWord('myValue'); // false
 * ```
 *
 * @group Programming
 * @category Validation
 */
export function isJsReservedWord(
  token: string,
  { strict = true, top = true }: IsJsReservedWordOptions = {},
): boolean {
  return (
    RESERVED_WORDS.has(token) ||
    (strict && STRICT_MODE_RESERVED_WORDS.has(token)) ||
    (top && TOP_LEVEL_RESERVED_WORDS.has(token))
  );
}
