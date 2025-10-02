/**
 * Generic function type.
 * @group Function
 * @category Type Checking
 */
export type AnyFunction<Args extends unknown[], Return, This = void> = (
  this: This,
  ...args: Args
) => Return;
