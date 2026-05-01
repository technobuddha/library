const VALID_IDENTIFIER = /^[$_\p{ID_Start}][$_\p{ID_Continue}\u200C\u200D]*$/v;

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
 * isValidJsIdentifier('myValue'); // true
 * isValidJsIdentifier('éclair'); // true
 * isValidJsIdentifier('1value'); // false
 * isValidJsIdentifier('my-value'); // false
 * ```
 * @group Programming
 * @category Validation
 */
export function isValidJsIdentifier(token: string): boolean {
  return VALID_IDENTIFIER.test(token);
}
