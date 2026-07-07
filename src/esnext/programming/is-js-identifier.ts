const VALID_IDENTIFIER = /^[$_\p{ID_Start}][$_\p{ID_Continue}\u{200C}\u{200D}]*$/v;

/**
 * Determines whether a string is a syntactically valid JavaScript identifier.
 *
 * This function validates identifier shape using Unicode-aware ECMAScript
 * identifier rules and does not exclude reserved words.
 *
 * @param token - The value to test.
 * @returns `true` if the token matches JavaScript identifier syntax; otherwise, `false`.
 * @example
 * ```typescript
 * isJsIdentifier('myValue'); // true
 * isJsIdentifier('éclair'); // true
 * isJsIdentifier('1value'); // false
 * isJsIdentifier('my-value'); // false
 * ```
 * @group Programming
 * @category Validation
 */
export function isJsIdentifier(token: string): boolean {
  return VALID_IDENTIFIER.test(token);
}
