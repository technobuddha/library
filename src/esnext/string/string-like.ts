/**
 * A type representing any value that can be treated as a string.
 *
 * Accepts both primitive strings and String objects.
 *
 * @example
 * ```typescript
 * function printString(s: StringLike) {
 *   console.log(String(s));
 * }
 * printString('hello');
 * printString(new String('world'));
 * ```
 *
 * @group String
 * @category Representation
 */
// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export type StringLike = string | String;
