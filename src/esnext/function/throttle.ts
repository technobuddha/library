import { debounce, type DebouncedFunction, type DebounceOptions } from './debounce.ts';

/**
 * Creates a throttled function that only invokes `func` at most once per every `wait` milliseconds.
 *
 * This is implemented using the `debounce` function with `leading: true` and `trailing: false` options by default.
 * Additional debounce options can be provided to customize the behavior.
 *
 * @param func - The function to throttle.
 * @param wait - The number of milliseconds to throttle invocations to.
 * @param options - Additional debounce options to control invocation timing.
 * @returns A throttled version of `func` with `cancel` and `flush` methods.
 *
 * @group Function
 * @category Timing
 */
export function throttle<Args extends unknown[], Return, This = void>(
  func: (this: This, ...args: Args) => Return,
  wait = 0,
  options: DebounceOptions = {},
): DebouncedFunction<Args, Return, This> {
  return debounce(func, wait, { leading: true, trailing: false, ...options });
}
