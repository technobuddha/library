/**
 * Represents a generic cache interface for storing key-value pairs.
 *
 * @typeParam Key - The type of the keys used to identify cached values.
 * @typeParam Value - The type of the values stored in the cache.
 * @group Function
 * @category Memoization
 */
export type Cache<Key, Value> = {
  /** Checks if a value exists for the given key.
   * @param key - The key to check for existence.
   * @returns `true` if the key exists in the cache, otherwise `false`.
   */
  has(key: Key): boolean;

  /** Retrieves the value associated with the given key.
   * @param key - The key whose value should be retrieved.
   * @returns The value associated with the key, or `undefined` if not found.
   */
  get(key: Key): Value | undefined;

  /** Stores a value in the cache under the specified key.
   * @param key - The key under which to store the value.
   * @param value - The value to store.
   */
  set(key: Key, value: Value): void;

  /** Removes the value associated with the given key from the cache.
   * @param key - The key whose value should be removed.
   */
  delete(key: Key): void;

  /** Removes all entries from the cache. */
  clear: () => void;
};

/**
 * Type for a memoized function.
 * @group Function
 * @category Memoization
 */
export type Memoized<Key, Args, Return> = {
  (key: Key, ...args: Args[]): Return;
  /** The Map used for caching results. */
  cache: Cache<Key, Return>;
};

/**
 * Represents a function that takes a key and a variable number of arguments, returning a value.
 *
 * @typeParam Key - The type of the key used to identify the function call.
 * @typeParam Args - The type of the arguments passed to the function.
 * @typeParam Return - The type of the value returned by the function.
 * @param key - The key associated with the function call.
 * @param args - The arguments to be passed to the function.
 * @returns The result of the function execution.
 * @group Function
 * @category Memoization
 */
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
 * @group Function
 * @category Memoization
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
