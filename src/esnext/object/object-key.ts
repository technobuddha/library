/**
 * Represents a valid JavaScript object key type.
 *
 * Objects in JavaScript can have keys that are strings, numbers, or symbols. This type
 * represents the union of all three possible key types used for object property access.
 *
 * @example
 * ```typescript
 * const stringKey: ObjectKey = 'name';
 * const numberKey: ObjectKey = 42;
 * const symbolKey: ObjectKey = Symbol('id');
 *
 * const obj: Record<ObjectKey, unknown> = {
 *   'name': 'John',
 *   42: 'forty-two',
 *   [Symbol.for('id')]: 123,
 * };
 * ```
 *
 * @group Object
 * @category Types
 */
export type ObjectKey = string | number | symbol;

