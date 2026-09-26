/**
 * A Map-like base class that compares keys by a derived string representation.
 *
 * Extend this class and implement {@link KeyedMap.encodeKey} and {@link KeyedMap.decodeKey}
 * to control how keys are serialized for lookup and reconstructed for iteration.
 * @typeParam K - The logical key type.
 * @typeParam V - The value type.
 * @example
 * ```typescript
 * type Cartesian = { x: number; y: number };
 *
 * class CartesianMap<T = unknown> extends KeyedMap<Cartesian, T> {
 *   protected encodeKey(value: Cartesian): string {
 *     return `${value.x}:${value.y}`;
 *   }
 *
 *   protected decodeKey(value: string): Cartesian {
 *     const [x, y] = value.split(':').map(Number);
 *     return { x, y };
 *   }
 * }
 *
 * const map = new CartesianMap<string>([[{ x: 1, y: 2 }, 'value']]);
 * map.get({ x: 1, y: 2 }); // 'value'
 * ```
 * @group Data Structures
 * @category Map
 */
export abstract class KeyedMap<K = unknown, V = unknown> implements Iterable<[K, V]> {
  protected readonly keyedMap: Map<string, V>;

  public readonly [Symbol.toStringTag] = 'KeyedMap';

  public constructor(...inits: Iterable<[K, V]>[]) {
    this.keyedMap = new Map<string, V>();

    for (const init of inits) {
      for (const [key, value] of init) {
        this.keyedMap.set(this.encodeKey(key), value);
      }
    }
  }

  protected abstract encodeKey(value: K): string;
  protected abstract decodeKey(value: string): K;

  public get(key: K): V | undefined {
    return this.keyedMap.get(this.encodeKey(key));
  }

  /**
   * Gets the value for a key, inserting and returning a default when absent.
   * @param key - The logical key.
   * @param defaultValue - The value to insert when the key does not exist.
   * @returns The existing or inserted value.
   */
  public getOrInsert(key: K, defaultValue: V): V {
    const encodedKey = this.encodeKey(key);
    if (!this.keyedMap.has(encodedKey)) {
      this.keyedMap.set(encodedKey, defaultValue);
    }
    return this.keyedMap.get(encodedKey)!;
  }

  /**
   * Gets the value for a key, computing and inserting one when absent.
   * @param key - The logical key.
   * @param computeValue - Computes the value when the key does not exist.
   * @returns The existing or computed value.
   */
  public getOrInsertComputed(key: K, computeValue: () => V): V {
    const encodedKey = this.encodeKey(key);
    if (!this.keyedMap.has(encodedKey)) {
      this.keyedMap.set(encodedKey, computeValue());
    }
    return this.keyedMap.get(encodedKey)!;
  }

  public has(key: K): boolean {
    return this.keyedMap.has(this.encodeKey(key));
  }

  public get size(): number {
    return this.keyedMap.size;
  }

  public *values(): Generator<V> {
    for (const value of this.keyedMap.values()) {
      yield value;
    }
  }

  public *keys(): Generator<K> {
    for (const key of this.keyedMap.keys()) {
      yield this.decodeKey(key);
    }
  }

  public *entries(): Generator<[K, V]> {
    for (const [key, value] of this.keyedMap) {
      yield [this.decodeKey(key), value];
    }
  }

  public [Symbol.iterator](): Generator<[K, V]> {
    return this.entries();
  }
  public set(key: K, value: V): this {
    this.keyedMap.set(this.encodeKey(key), value);
    return this;
  }

  public clear(): void {
    this.keyedMap.clear();
  }

  public delete(key: K): boolean {
    return this.keyedMap.delete(this.encodeKey(key));
  }
}

/**
 * A readonly view of a {@link KeyedMap} subtype.
 *
 * Mutating members (`set`, `clear`, `delete`, `getOrInsert`, and `getOrInsertComputed`) are omitted.
 * @typeParam KM - A concrete {@link KeyedMap} subtype.
 * @group Data Structures
 * @category Map
 */
export type ReadonlyKeyedMap<KM extends KeyedMap> = Omit<
  KM,
  'set' | 'clear' | 'delete' | 'getOrInsert' | 'getOrInsertComputed'
>;
