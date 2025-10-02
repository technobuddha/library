/**
 * Determines whether the provided value is a bigint or a BigInt object.
 * @param value - The value to test.
 * @returns True if the value is a bigint or a BigInt object; otherwise, false.
 * @example
 * ```typescript
 * isBigInt(42n); // true
 * isBigInt(Object(42n)); // true
 * isBigInt(BigInt(42)); // true
 * isBigInt(42); // false
 * isBigInt('42'); // false
 * isBigInt(null); // false
 * ```
 * @group Number
 * @category Type Checking
 */
export function isBigInt(value: unknown): value is bigint {
  return (
    typeof value === 'bigint' ||
    (typeof value === 'object' &&
      value != null &&
      Object.prototype.toString.call(value) === '[object BigInt]')
  );
}
