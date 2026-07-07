import { isJsIdentifier } from './is-js-identifier.ts';
import { isJsReservedWord } from './is-js-reserved-word.ts';

/**
 * Determines whether a string is a valid JavaScript variable identifier.
 *
 * A valid variable name must satisfy JavaScript identifier syntax and must not
 * be reserved in standard, strict-mode, or top-level module or async contexts.
 *
 * @param token - The string to test.
 * @returns `true` if the token can be used as a JavaScript variable name; otherwise, `false`.
 * @example
 * ```typescript
 * isJsVariable('myValue'); // true
 * isJsVariable('π'); // true
 * isJsVariable('class'); // false
 * isJsVariable('await'); // false
 * isJsVariable('1value'); // false
 * ```
 * @group Programming
 * @category Validation
 */
export function isJsVariable(token: string): boolean {
  return isJsIdentifier(token) && !isJsReservedWord(token, { strict: true, top: true });
}
