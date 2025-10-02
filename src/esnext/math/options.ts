/**
 * Options for precision-related math operations.
 * @group Math
 * @category Operations
 */
export type Precision = {
  /** The number of decimal places to consider when applying the ceiling. Defaults to 0. */
  precision?: number;
};

/**
 * Options for tolerance-related math operations.
 * @group Math
 * @category Operations
 */
export type Tolerance = {
  /** A small value to add to the input before applying the floor, useful for floating-point tolerance. Defaults to 0. */
  tolerance?: number;
};
