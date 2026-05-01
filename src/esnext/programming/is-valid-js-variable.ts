import { isJsReservedWord } from './is-js-reserved-word.ts';
import { isValidJsIdentifier } from './is-valid-js-identifier.ts';

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
 * isValidJsVariable('myValue'); // true
 * isValidJsVariable('π'); // true
 * isValidJsVariable('class'); // false
 * isValidJsVariable('await'); // false
 * isValidJsVariable('1value'); // false
 * ```
 * @group Programming
 * @category Validation
 */
export function isValidJsVariable(token: string): boolean {
  return isValidJsIdentifier(token) && !isJsReservedWord(token, { strict: true, top: true });
}
