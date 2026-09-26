import { isIterable } from '../iteration/is-iterable.ts';

/**
 * A Set-like base class that determines uniqueness by a derived string key.
 *
 * Extend this class and implement {@link KeyedSet.encodeKey} and {@link KeyedSet.decodeKey}
 * to define how values are serialized for storage and reconstructed for iteration.
 * @typeParam K - The value type stored in the set.
 * @example
 * ```typescript
 * type Cartesian = { x: number; y: number };
 *
 * class CartesianSet extends KeyedSet<Cartesian> {
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
 * const set = new CartesianSet([{ x: 1, y: 2 }, { x: 1, y: 2 }]);
 * set.size; // 1
 * ```
 * @group Data Structures
 * @category Set
 */
export abstract class KeyedSet<K = unknown> implements Iterable<K> {
  protected readonly keyedSet: Set<string>;

  public constructor(...inits: Iterable<K>[]) {
    this.keyedSet = new Set<string>();

    for (const init of inits) {
      for (const value of init) {
        this.keyedSet.add(this.encodeKey(value));
      }
    }
  }

  protected abstract encodeKey(value: K): string;
  protected abstract decodeKey(value: string): K;

  public has(value: K): boolean {
    return this.keyedSet.has(this.encodeKey(value));
  }

  public add(value: K | Iterable<K>): this {
    if (isIterable(value)) {
      for (const item of value) {
        this.keyedSet.add(this.encodeKey(item));
      }
    } else {
      this.keyedSet.add(this.encodeKey(value));
    }
    return this;
  }

  public delete(value: K): boolean {
    return this.keyedSet.delete(this.encodeKey(value));
  }

  public clear(): void {
    this.keyedSet.clear();
  }

  public *values(): Generator<K> {
    for (const key of this.keyedSet) {
      yield this.decodeKey(key);
    }
  }

  public *keys(): Generator<K> {
    yield* this.values();
  }

  public *entries(): Generator<[K, K]> {
    for (const value of this.values()) {
      yield [value, value];
    }
  }

  public some(predicate: (value: K) => boolean): boolean {
    for (const value of this.values()) {
      if (predicate(value)) {
        return true;
      }
    }
    return false;
  }

  public every(predicate: (value: K) => boolean): boolean {
    for (const value of this.values()) {
      if (!predicate(value)) {
        return false;
      }
    }
    return true;
  }

  public *map<U>(mapper: (value: K) => U): Generator<U> {
    for (const value of this.values()) {
      yield mapper(value);
    }
  }

  public *flatMap<U>(mapper: (value: K) => Iterable<U | U[]>): Generator<U> {
    for (const value of this.values()) {
      for (const item of mapper(value)) {
        if (Array.isArray(item)) {
          yield* item;
        } else {
          yield item;
        }
      }
    }
  }

  public *filter(predicate: (value: K) => boolean): Generator<K> {
    for (const value of this.values()) {
      if (predicate(value)) {
        yield value;
      }
    }
  }

  public get size(): number {
    return this.keyedSet.size;
  }

  public [Symbol.iterator](): SetIterator<K> {
    return this.values();
  }
}

/**
 * A readonly view of a {@link KeyedSet} subtype.
 *
 * Mutating members (`add`, `delete`, and `clear`) are omitted.
 * @typeParam K - A concrete {@link KeyedSet} subtype.
 * @group Data Structures
 * @category Set
 */
export type ReadonlyKeyedSet<KS extends KeyedSet> = Omit<KS, 'add' | 'delete' | 'clear'>;
