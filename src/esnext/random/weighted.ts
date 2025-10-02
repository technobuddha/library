/**
 * Represents an object with an associated weight value.
 *
 * This type is typically used in scenarios where items are selected
 * based on their relative weights, such as in weighted random selection.
 * @group Random
 * @category Pick
 */
export type Weighted = {
  /** The numeric weight assigned to the object. */
  weight: number;
};
