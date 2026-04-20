/**
 * Represents any object.
 *
 * @group Object
 * @category Type Checking
 */
export type ObjectLike<T = unknown> = Record<string, T> | Record<string | symbol, T>;
