type Cache<Key, Value> = {
  has(key: Key): boolean;
  get(key: Key): Value | undefined;
  set(key: Key, value: Value): void;
  delete(key: Key): void;
  clear: () => void;
};

/**
 * Type for a memoized function.
 * @group Utility
 * @category Function
 */
export type Memoized<Key, Args, Return> = {
  (key: Key, ...args: Args[]): Return;
  /** The Map used for caching results. */
  cache: Cache<Key, Return>;
};

export type KeyedFunction<Key, Args, Return> = (key: Key, ...args: readonly Args[]) => Return;

/**
 * Memoizes a function, caching results based on the first argument (the key).
 *
 * The returned function has a `cache` property containing the cache used for memoization.
 *
 * See [Memoization on Wikipedia](https://en.wikipedia.org/wiki/Memoization).
 * @param func - The function to memoize. The first argument must be a valid WeakMap key.
 * @param resolver - Optional function to resolve the cache key from arguments.
 * @returns The memoized function with a `cache` property.
 * @group Utility
 * @category Function
 * @example
 * ```typescript
 * function compute(obj: object): number {
 *   return Object.keys(obj).length;
 * }
 *
 * const memoizedCompute = memoize(compute);
 *
 * const a = { foo: 1, bar: 2 };
 * const b = { baz: 3 };
 *
 * // First call computes and caches the result
 * console.log(memoizedCompute(a)); // 2
 *
 * // Second call with the same object retrieves from cache
 * console.log(memoizedCompute(a)); // 2 (cached)
 *
 * // Call with a different object computes and caches
 * console.log(memoizedCompute(b)); // 1
 * ```
 */
export function memoize<Key, Args, Return>(
  func: KeyedFunction<Key, Args, Return>,
  resolver?: KeyedFunction<Key, Args, Key>,
): Memoized<Key, Args, Return> {
  const memoized: Memoized<Key, Args, Return> = (key: Key, ...args: Args[]): Return => {
    const { cache } = memoized;

    const resolvedKey = resolver ? resolver(key, ...args) : key;

    if (cache.has(resolvedKey)) {
      return cache.get(resolvedKey)!;
    }

    const result = func(key, ...args);
    cache.set(resolvedKey, result);
    return result;
  };
  memoized.cache = new Map<Key, Return>();
  return memoized;
}
