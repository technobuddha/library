import { type AnyFunction } from './any-function.ts';

/**
 * Options for configuring the debounce behavior.
 *
 * @group Function
 * @category Timing
 */
export type DebounceOptions = {
  /** Invoke on the leading edge of the timeout. */
  leading?: boolean;
  /** Maximum time to wait before invoking. */
  maxWait?: number;
  /** Invoke on the trailing edge of the timeout. */
  trailing?: boolean;
};

/**
 * Represents a debounced function with `cancel` and `flush` methods.
 *
 * @group Function
 * @category Timing
 */
export type DebouncedFunction<Args extends unknown[], Return, This = void> = {
  (this: This, ...args: Args): Return | undefined;
  /** Cancel any pending invocation. */
  cancel: () => void;
  /** Immediately invoke if pending, otherwise return last result. */
  flush: () => Return | undefined;
};

type Timer = unknown;
type SetTimeout = (callback: (...args: unknown[]) => void, ms: number) => Timer;
type ClearTimeout = (timerId: Timer) => void;

/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * Optionally, the function can be invoked on the leading and/or trailing edge of the timeout,
 * and a maximum wait time can be specified.
 *
 * @param func - The function to debounce.
 * @param wait - The number of milliseconds to delay.
 * @param options - Configuration options for leading/trailing invocation and max wait.
 * @returns A debounced version of `func` with `cancel` and `flush` methods.
 *
 * @group Function
 * @category Timing
 */
export function debounce<Args extends unknown[], Return, This = void>(
  func: AnyFunction<Args, Return, This>,
  wait = 0,
  options: DebounceOptions = {},
): DebouncedFunction<Args, Return, This> {
  if ('setTimeout' in globalThis && 'clearTimeout' in globalThis) {
    const { setTimeout, clearTimeout } = globalThis as unknown as {
      setTimeout: SetTimeout;
      clearTimeout: ClearTimeout;
    };

    let timerId: Timer | undefined;
    let { leading = false, maxWait, trailing = true } = options;
    if (maxWait != null) {
      maxWait = Math.max(maxWait, wait);
    }

    let lastCall = 0;
    let lastInvoke = 0;
    let lastArgs: Args | undefined;
    let lastThis: This | undefined;
    let lastResult: Return | undefined;

    function invokeFunc(time: number): ReturnType<typeof func> {
      const nextArgs = lastArgs;
      const nextThis = lastThis;

      lastArgs = undefined;
      lastThis = undefined;
      lastInvoke = time;
      lastResult = func.apply(nextThis!, nextArgs!);

      return lastResult;
    }

    function shouldInvoke(time: number): boolean {
      if (lastCall) {
        const timeSinceLastCall = time - lastCall;
        const timeSinceLastInvoke = time - lastInvoke;

        // activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (
          timeSinceLastCall >= wait ||
          timeSinceLastCall < 0 ||
          (maxWait != null && timeSinceLastInvoke >= maxWait)
        );
      }

      // This is the first call.
      return true;
    }

    function timerStart(time: number): void {
      const timeSinceLastCall = time - lastCall;
      const timeSinceLastInvoke = time - lastInvoke;
      const remaining = wait - timeSinceLastCall;

      const timeout =
        maxWait === undefined ? remaining : Math.min(remaining, maxWait - timeSinceLastInvoke);

      timerCancel();
      timerId = setTimeout(timerExpired, timeout);
    }

    function timerExpired(): Return | undefined {
      timerId = undefined;

      const now = Date.now();
      if (shouldInvoke(now)) {
        return trailingEdge(now);
      }
      timerStart(now);
      return undefined;
    }

    function timerCancel(): void {
      if (timerId !== undefined) {
        clearTimeout(timerId);
        timerId = undefined;
      }
    }

    function trailingEdge(time: number): Return | undefined {
      timerCancel();

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }

      lastArgs = undefined;
      lastThis = undefined;
      return lastResult;
    }

    function cancel(): void {
      timerCancel();

      lastInvoke = 0;
      lastCall = 0;
      lastArgs = undefined;
      lastThis = undefined;
      timerId = undefined;
    }

    function flush(): Return | undefined {
      return timerId === undefined ? lastResult : trailingEdge(Date.now());
    }

    function debounced(this: This, ...args: Args): Return | undefined {
      const now = Date.now();
      const invoke = shouldInvoke(now);

      lastArgs = args;
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      lastThis = this;
      lastCall = now;

      if (invoke) {
        if (timerId == null) {
          // Reset any `maxWait` timer.
          lastInvoke = now;
          // Start the timer for the trailing edge.
          timerStart(now);
          // Invoke the leading edge.
          return leading ? invokeFunc(now) : lastResult;
        }

        // Handle invocations in a tight loop.
        timerStart(now);
        return invokeFunc(lastCall);
      }

      if (timerId === undefined) {
        timerStart(now);
      }

      return lastResult;
    }

    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  throw new TypeError('Environment does not support setTimeout/clearTimeout');
}
