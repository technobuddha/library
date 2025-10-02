/**
 * Represents any object.
 *
 * @group Object
 * @category Type Checking
 */
export type ObjectLike<
  T = unknown,
  K extends string | number | symbol = string | number | symbol,
> = {
  [P in K]: T;
};
