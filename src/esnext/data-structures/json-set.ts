import { type JSONValue } from '../serialization/json.ts';

import { jsonDeserialize } from './json-deserialize.ts';
import { jsonSerialize } from './json-serialize.ts';

/**
 * A Set-like collection for objects that can be serialized to JSON.
 *
 * `JSONSet` stores objects by serializing them to JSON strings, allowing for deep equality
 * comparison of objects rather than reference equality. This is useful for storing and comparing
 * objects with the same structure and values, regardless of their references.
 * @typeParam T - The type of objects stored in the set. Must extend `JSONValue`.
 * @example
 * ```typescript
 * const set = new JSONSet<{ a: number }>();
 * set.add({ a: 1 });
 * set.has({ a: 1 }); // true
 * set.has({ a: 2 }); // false
 * ```
 * @remarks
 * - All objects are serialized using a `serialize` function and deserialized with a `deserialize` function.
 * - The set supports standard set operations such as union, intersection, difference, and symmetricDifference.
 * - Iteration yields deserialized objects.
 * @see Set
 * @group Data Structures
 * @category Set
 */
export class JSONSet<T extends JSONValue> implements Set<T> {
  protected set = new Set<string>();

  /**
   * The string tag used by Object.prototype.toString for this class.
   */
  public readonly [Symbol.toStringTag] = 'JSONSet';

  public constructor(values?: Iterable<T> | null) {
    if (values) {
      for (const value of values) {
        this.add(value);
      }
    }
  }

  protected replicate<X = T>(values?: Iterable<X> | null): Set<X> {
    const Maker = this.constructor as new (values?: Iterable<X> | null) => Set<X>;
    return new Maker(values);
  }

  /**
   * Gets the number of elements in the set.
   */
  public get size(): number {
    return this.set.size;
  }

  /**
   * Adds a serialized value to the set.
   */
  public add(value: T): this {
    this.set.add(jsonSerialize(value));
    return this;
  }

  /**
   * Removes all elements from the set.
   */
  public clear(): void {
    this.set.clear();
  }

  /**
   * Removes the specified value from the set if it exists.
   */
  public delete(value: T): boolean {
    return this.set.delete(jsonSerialize(value));
  }

  /**
   * Returns a new set containing elements present in this set but not in the other set.
   */
  public difference<U>(other: ReadonlySetLike<U>): Set<T> {
    return this.replicate(
      Array.from(this.values()).filter((value) => !other.has(value as unknown as U)),
    );
  }

  /**
   * Returns an iterator over the set's values as [value, value] pairs.
   */
  public *entries(): SetIterator<[T, T]> {
    for (const value of this.values()) {
      yield [value, value];
    }
  }

  /**
   * Executes a provided function once for each value in the set.
   */
  public forEach(callback: (value: T, key: T, set: Set<T>) => void, thisArg?: unknown): void {
    for (const value of this.values()) {
      callback.call(thisArg, value, value, this);
    }
  }

  /**
   * Determines whether the specified value exists in the set.
   */
  public has(value: T): boolean {
    return this.set.has(jsonSerialize(value));
  }

  /**
   * Returns a new set containing only the elements present in both this set and the provided set.
   */
  public intersection<U>(other: ReadonlySetLike<U>): Set<T & U> {
    return this.replicate<T & U>(
      Array.from(this.values() as Iterable<T & U>).filter((value) =>
        other.has(value as unknown as U),
      ),
    );
  }

  /**
   * Determines whether this set and the specified set have no elements in common.
   */
  public isDisjointFrom(other: ReadonlySetLike<unknown>): boolean {
    for (const value of this.values()) {
      if (other.has(value)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Determines whether all elements of this set are contained in another set.
   */
  public isSubsetOf(other: ReadonlySetLike<unknown>): boolean {
    for (const value of this.values()) {
      if (!other.has(value)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Determines whether this set contains all elements of the specified set.
   */
  public isSupersetOf(other: ReadonlySetLike<unknown>): boolean {
    for (const value of other.keys() as unknown as Iterable<unknown>) {
      if (!this.has(value as T)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns an iterator over the keys in the set.
   */
  public *keys(): SetIterator<T> {
    yield* this.values();
  }

  /**
   * Returns a new set containing elements that are in either this set or the other set, but not in both.
   */
  public symmetricDifference<U>(other: ReadonlySetLike<U>): Set<T | U> {
    const result = this.replicate<T | U>();

    for (const value of this.keys()) {
      if (!other.has(value as unknown as U)) {
        result.add(value);
      }
    }

    for (const value of other.keys() as SetIterator<U>) {
      if (!this.has(value as unknown as T)) {
        result.add(value);
      }
    }
    return result;
  }

  /**
   * Returns a new set containing all unique elements from this set and another set.
   */
  public union<U>(other: ReadonlySetLike<U>): Set<T | U> {
    return this.replicate<T | U>([...this.keys(), ...(other.keys() as SetIterator<U>)]);
  }

  /**
   * Returns an iterator that yields each value in the set after deserialization.
   */
  public *values(): SetIterator<T> {
    for (const object of this.set) {
      yield jsonDeserialize(object) as T;
    }
  }

  /**
   * Returns an iterator over the values in the set.
   */
  public [Symbol.iterator](): SetIterator<T> {
    return this.values();
  }
}
